// @ts-nocheck
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  env,
  AutoTokenizer,
  MusicgenForConditionalGeneration,
  BaseStreamer,
} from '@huggingface/transformers';
import { encodeWav } from '../lib/taktorAudio';
import './Taktor.css';

// Chrome/macOS-compatible fallback: no proxy worker and no threaded WASM.
// This avoids the "no available backend found / ProgressEvent" failure when
// cross-origin isolation or worker startup is unavailable.
env.backends.onnx.wasm.proxy = false;
env.backends.onnx.wasm.numThreads = 1;

const MODEL_ID = 'Xenova/musicgen-small';
const REVIEW_STORAGE_KEY = 'taktor-sound-id-review-v01';

const BASE_BRIEF =
  'instrumental underground techno, warm deep elastic bass, hypnotic rolling groove, organic mechanical movement, bodily and spacious, patient musical evolution, coherent flow, no vocals, no harsh noise, no white-noise riser, no EDM drop, no generic trance lead, no abrupt scene changes';

const VARIANTS = [
  {
    id: 'A',
    name: 'WARM ROLLING',
    text: 'warm and rolling, playful psychedelic micro-details, open-air night floor, subtle harmonic light, humorous but not comic',
  },
  {
    id: 'B',
    name: 'MECHANICAL BODY',
    text: 'resistant mechanical texture, physical low-end ownership, restrained acid motion, industrial character without darkness or harshness',
  },
  {
    id: 'C',
    name: 'MRJUEHANG CORE',
    text: 'warm foundation, hypnotic movement, resistant texture, light resolution, barefoot despite steel-toe boots, strange affectionate details, freedom and forward motion',
  },
];

class CallbackStreamer extends BaseStreamer {
  callback: (value?: unknown) => void;

  constructor(callback: (value?: unknown) => void) {
    super();
    this.callback = callback;
  }

  put(value: unknown) {
    this.callback(value);
  }

  end() {
    this.callback();
  }
}

type ReviewDecision = 'KEEP' | 'MIX' | 'REJECT';

type RenderState = {
  status: 'idle' | 'queued' | 'generating' | 'done' | 'error';
  progress: number;
  url?: string;
  fileName?: string;
  error?: string;
};

const EMPTY_RENDER: RenderState = { status: 'idle', progress: 0 };

function safeTimestamp(): string {
  return new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function fileSlug(value: string): string {
  return value.toUpperCase().replace(/[^A-Z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function describeBackendError(error: unknown): string {
  const raw = error instanceof Error ? error.message : String(error);
  if (/no available backend|progressEvent|\[wasm\]|backend/i.test(raw)) {
    return 'WASM-Audiobackend konnte nicht starten. Die Modelldateien bleiben im Cache. Seite neu laden und BACKEND ERNEUT STARTEN drücken.';
  }
  return raw || 'Unbekannter Fehler beim lokalen Audio-Render.';
}

function readStoredReviews(): Record<string, ReviewDecision | undefined> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(window.localStorage.getItem(REVIEW_STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

export default function Taktor() {
  const [brief, setBrief] = useState(BASE_BRIEF);
  const [duration, setDuration] = useState(8);
  const [guidance, setGuidance] = useState(3);
  const [temperature, setTemperature] = useState(1);
  const [modelStatus, setModelStatus] = useState('Modell noch nicht geladen');
  const [modelProgress, setModelProgress] = useState(0);
  const [backendReady, setBackendReady] = useState(false);
  const [backendError, setBackendError] = useState('');
  const [busy, setBusy] = useState(false);
  const [decisions, setDecisions] = useState<Record<string, ReviewDecision | undefined>>(
    readStoredReviews,
  );
  const [renders, setRenders] = useState<Record<string, RenderState>>({
    A: EMPTY_RENDER,
    B: EMPTY_RENDER,
    C: EMPTY_RENDER,
  });

  const modelPromise = useRef<any>(null);
  const tokenizerPromise = useRef<any>(null);
  const modelReady = useRef(false);
  const createdUrls = useRef<string[]>([]);

  const canUseBrowser = useMemo(
    () => typeof WebAssembly !== 'undefined' && typeof indexedDB !== 'undefined',
    [],
  );

  useEffect(() => {
    window.localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(decisions));
  }, [decisions]);

  useEffect(() => {
    return () => {
      createdUrls.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const updateRender = (id: string, patch: Partial<RenderState>) => {
    setRenders((current) => ({
      ...current,
      [id]: { ...current[id], ...patch },
    }));
  };

  const resetBackend = () => {
    modelPromise.current = null;
    tokenizerPromise.current = null;
    modelReady.current = false;
    setBackendReady(false);
    setBackendError('');
    setModelStatus('Backend zurückgesetzt — Modelldateien bleiben im Browser-Cache');
  };

  const loadModel = async () => {
    if (!canUseBrowser) {
      throw new Error('Dieser Browser unterstützt WebAssembly oder Browser-Cache nicht.');
    }
    if (modelReady.current) return;
    if (modelPromise.current && tokenizerPromise.current) {
      await Promise.all([modelPromise.current, tokenizerPromise.current]);
      return;
    }

    setBackendError('');
    setBackendReady(false);
    setModelStatus('Lade Modelldateien — einmalig ca. 656 MB; danach Browser-Cache …');
    const files = new Map<string, { loaded: number; total: number }>();

    modelPromise.current = MusicgenForConditionalGeneration.from_pretrained(MODEL_ID, {
      progress_callback: (data: any) => {
        if (data.status !== 'progress' || !data.file) return;
        files.set(data.file, { loaded: data.loaded ?? 0, total: data.total ?? 0 });
        let loaded = 0;
        let total = 0;
        files.forEach((item) => {
          loaded += item.loaded;
          total += item.total;
        });
        const progress = total > 0 ? loaded / total : 0;
        setModelProgress(progress);
        setModelStatus(`Modelldateien werden lokal geladen: ${Math.round(progress * 100)} %`);
      },
      dtype: {
        text_encoder: 'q8',
        decoder_model_merged: 'q8',
        encodec_decode: 'fp32',
      },
      device: 'wasm',
    });

    tokenizerPromise.current = AutoTokenizer.from_pretrained(MODEL_ID);

    try {
      setModelStatus('Initialisiere Audio-Backend — WASM kompatibel / 1 Thread …');
      await Promise.all([modelPromise.current, tokenizerPromise.current]);
      modelReady.current = true;
      setModelProgress(1);
      setBackendReady(true);
      setModelStatus('TAKTØR lokal bereit — Modell im Browser-Cache, Backend aktiv');
    } catch (error) {
      const message = describeBackendError(error);
      modelPromise.current = null;
      tokenizerPromise.current = null;
      modelReady.current = false;
      setBackendReady(false);
      setBackendError(message);
      setModelStatus('Modelldateien gecacht — Audio-Backend noch nicht aktiv');
      throw new Error(message);
    }
  };

  const generateVariant = async (variant: (typeof VARIANTS)[number], model: any, tokenizer: any) => {
    updateRender(variant.id, { status: 'generating', progress: 0, error: undefined });

    const prompt = `${brief}. Specific direction: ${variant.text}.`;
    const inputs = tokenizer(prompt);
    const maxLength = Math.min(
      Math.max(Math.floor(duration * 50), 1) + 4,
      model.generation_config.max_length ?? 1500,
    );

    let tokenCount = 0;
    const streamer = new CallbackStreamer((value?: unknown) => {
      const progress = value === undefined ? 1 : Math.min(++tokenCount / maxLength, 1);
      updateRender(variant.id, { progress });
    });

    const audioValues = await model.generate({
      ...inputs,
      max_length: maxLength,
      guidance_scale: guidance,
      temperature,
      do_sample: true,
      streamer,
    });

    const sampleRate = model.config.audio_encoder.sampling_rate;
    const wav = encodeWav(audioValues.data, sampleRate);
    const blob = new Blob([wav], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    createdUrls.current.push(url);
    const fileName = [
      'TAKTOR-SOUND-ID-v01',
      variant.id,
      fileSlug(variant.name),
      `${duration}s`,
      `G${guidance}`,
      `T${temperature}`,
      safeTimestamp(),
    ].join('_') + '.wav';

    updateRender(variant.id, { status: 'done', progress: 1, url, fileName });
  };

  const generateAll = async () => {
    if (busy) return;
    setBusy(true);
    setRenders({
      A: { status: 'queued', progress: 0 },
      B: { status: 'queued', progress: 0 },
      C: { status: 'queued', progress: 0 },
    });

    try {
      await loadModel();
      const [model, tokenizer] = await Promise.all([
        modelPromise.current,
        tokenizerPromise.current,
      ]);

      for (const variant of VARIANTS) {
        try {
          await generateVariant(variant, model, tokenizer);
        } catch (error) {
          updateRender(variant.id, {
            status: 'error',
            error: describeBackendError(error),
          });
        }
      }
    } catch (error) {
      const message = describeBackendError(error);
      setRenders({
        A: { status: 'error', progress: 0, error: message },
        B: { status: 'error', progress: 0, error: message },
        C: { status: 'error', progress: 0, error: message },
      });
    } finally {
      setBusy(false);
    }
  };

  const setDecision = (id: string, decision: ReviewDecision) => {
    if (renders[id]?.status !== 'done') return;
    setDecisions((current) => ({ ...current, [id]: decision }));
  };

  return (
    <main className="taktor-page">
      <header className="taktor-header">
        <div>
          <p className="taktor-kicker">LICHTREICH / CREATIVE SOCIETY / LOCAL PROVIDER</p>
          <h1>TAKTØR</h1>
          <p className="taktor-subtitle">MrJueHang Sound-ID Generator — lokal im Browser</p>
        </div>
        <a className="taktor-back" href="/">← LICHTREICH</a>
      </header>

      <section className="taktor-status">
        <div className="status-dot" data-ready={backendReady} />
        <div>
          <strong>{modelStatus}</strong>
          <p>
            Keine Replit-Credits · kein HF-Token · Audio verlässt den Browser nicht ·
            Backend: WASM / 1 Thread
          </p>
          {backendError && <p className="backend-error">{backendError}</p>}
        </div>
        <div className="status-tail">
          <div className="model-progress" aria-label="Modellfortschritt">
            <span style={{ width: `${modelProgress * 100}%` }} />
          </div>
          {backendError && (
            <button className="backend-reset" type="button" onClick={resetBackend} disabled={busy}>
              BACKEND ERNEUT STARTEN
            </button>
          )}
        </div>
      </section>

      <section className="taktor-grid">
        <aside className="taktor-control">
          <label htmlFor="brief">CREATIVE BRIEF</label>
          <textarea id="brief" value={brief} onChange={(event) => setBrief(event.target.value)} />

          <div className="control-row">
            <label>
              DAUER <b>{duration}s</b>
              <input
                type="range"
                min="3"
                max="20"
                value={duration}
                onChange={(event) => setDuration(Number(event.target.value))}
                disabled={busy}
              />
              <small className="control-help">Länge jeder einzelnen Sound-ID. Drei Varianten werden nacheinander erzeugt.</small>
            </label>
            <label>
              GUIDANCE <b>{guidance}</b>
              <input
                type="range"
                min="1"
                max="8"
                step="0.5"
                value={guidance}
                onChange={(event) => setGuidance(Number(event.target.value))}
                disabled={busy}
              />
              <small className="control-help">Prompt-Treue: niedrig = freier; hoch = wörtlicher, aber oft steifer. Startbereich 2,5–4.</small>
            </label>
            <label>
              TEMPERATUR <b>{temperature}</b>
              <input
                type="range"
                min="0.5"
                max="1.8"
                step="0.1"
                value={temperature}
                onChange={(event) => setTemperature(Number(event.target.value))}
                disabled={busy}
              />
              <small className="control-help">Zufall/Mut: niedrig = stabiler; hoch = überraschender, aber riskanter. Startbereich 0,8–1,1.</small>
            </label>
          </div>

          <button className="generate-button" onClick={generateAll} disabled={busy || !canUseBrowser}>
            {busy ? 'TAKTØR ARBEITET …' : backendError ? 'BACKEND + 3 SOUND-IDs STARTEN' : '3 SOUND-IDs ERZEUGEN'}
          </button>

          <div className="file-note">
            <b>DATEIEN</b>
            <p>
              Audio wird zunächst nur als flüchtiger Browser-Blob erzeugt. Erst `WAV ↓` speichert die Datei
              im normalen Download-Ordner deines Browsers. Das Modell liegt separat im Browser-Cache.
            </p>
          </div>

          <div className="license-gate">
            <b>DEV-/LIZENZ-GATE</b>
            <p>
              Der lokale Prototyp nutzt Xenova/musicgen-small unter CC BY-NC 4.0.
              Nur für Entwicklung und nichtkommerzielle Tests; Produktionsprovider folgt separat.
            </p>
          </div>
        </aside>

        <section className="variant-list">
          {VARIANTS.map((variant) => {
            const state = renders[variant.id];
            const decision = decisions[variant.id];
            const reviewEnabled = state.status === 'done';
            return (
              <article className="variant-card" key={variant.id}>
                <div className="variant-topline">
                  <span>{variant.id}</span>
                  <h2>{variant.name}</h2>
                  <em>{state.status.toUpperCase()}</em>
                </div>
                <p>{variant.text}</p>
                <div className="render-progress">
                  <span style={{ width: `${state.progress * 100}%` }} />
                </div>
                {state.url ? (
                  <div className="audio-row">
                    <audio controls preload="metadata" src={state.url} />
                    <a download={state.fileName} href={state.url} title={state.fileName}>
                      WAV ↓
                    </a>
                  </div>
                ) : (
                  <div className="audio-placeholder">
                    {state.error ? `FEHLER: ${state.error}` : 'WARTET AUF LOKALEN RENDER'}
                  </div>
                )}
                <div className="review-row" aria-label={`Review ${variant.name}`}>
                  {(['KEEP', 'MIX', 'REJECT'] as ReviewDecision[]).map((option) => (
                    <button
                      type="button"
                      key={option}
                      disabled={!reviewEnabled}
                      className={decision === option ? 'active' : ''}
                      onClick={() => setDecision(variant.id, option)}
                      title={
                        option === 'KEEP'
                          ? 'Klangkörper behalten'
                          : option === 'MIX'
                            ? 'Mit Elementen anderer Varianten kombinieren'
                            : 'Variante verwerfen'
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <p className="review-note">
                  {reviewEnabled
                    ? decision
                      ? `Review lokal gespeichert: ${decision}`
                      : 'Jetzt KEEP, MIX oder REJECT wählen.'
                    : 'Review wird nach erfolgreichem Render freigeschaltet.'}
                </p>
              </article>
            );
          })}
        </section>
      </section>
    </main>
  );
}
