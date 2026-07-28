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

env.backends.onnx.wasm.proxy = true;

const MODEL_ID = 'Xenova/musicgen-small';

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

type RenderState = {
  status: 'idle' | 'queued' | 'generating' | 'done' | 'error';
  progress: number;
  url?: string;
  error?: string;
};

const EMPTY_RENDER: RenderState = { status: 'idle', progress: 0 };

export default function Taktor() {
  const [brief, setBrief] = useState(BASE_BRIEF);
  const [duration, setDuration] = useState(8);
  const [guidance, setGuidance] = useState(3);
  const [temperature, setTemperature] = useState(1);
  const [modelStatus, setModelStatus] = useState('Modell noch nicht geladen');
  const [modelProgress, setModelProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const [renders, setRenders] = useState<Record<string, RenderState>>({
    A: EMPTY_RENDER,
    B: EMPTY_RENDER,
    C: EMPTY_RENDER,
  });

  const modelPromise = useRef<any>(null);
  const tokenizerPromise = useRef<any>(null);
  const createdUrls = useRef<string[]>([]);

  const canUseBrowser = useMemo(
    () => typeof WebAssembly !== 'undefined' && typeof indexedDB !== 'undefined',
    [],
  );

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

  const loadModel = async () => {
    if (!canUseBrowser) throw new Error('Dieser Browser unterstützt den lokalen Modellbetrieb nicht.');
    if (modelPromise.current && tokenizerPromise.current) {
      await Promise.all([modelPromise.current, tokenizerPromise.current]);
      return;
    }

    setModelStatus('Lade quantisiertes MusicGen-Modell — einmalig ca. 656 MB …');
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
        setModelStatus(`Modell wird lokal geladen: ${Math.round(progress * 100)} %`);
      },
      dtype: {
        text_encoder: 'q8',
        decoder_model_merged: 'q8',
        encodec_decode: 'fp32',
      },
      device: 'wasm',
    });

    tokenizerPromise.current = AutoTokenizer.from_pretrained(MODEL_ID);
    await Promise.all([modelPromise.current, tokenizerPromise.current]);
    setModelProgress(1);
    setModelStatus('Modell lokal bereit und im Browser-Cache gespeichert');
  };

  const generateVariant = async (variant: (typeof VARIANTS)[number]) => {
    updateRender(variant.id, { status: 'generating', progress: 0, error: undefined });
    await loadModel();

    const [model, tokenizer] = await Promise.all([
      modelPromise.current,
      tokenizerPromise.current,
    ]);

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
    updateRender(variant.id, { status: 'done', progress: 1, url });
  };

  const generateAll = async () => {
    setBusy(true);
    setRenders({
      A: { status: 'queued', progress: 0 },
      B: { status: 'queued', progress: 0 },
      C: { status: 'queued', progress: 0 },
    });

    for (const variant of VARIANTS) {
      try {
        await generateVariant(variant);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        updateRender(variant.id, { status: 'error', error: message });
      }
    }
    setBusy(false);
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
        <div className="status-dot" data-ready={modelProgress === 1} />
        <div>
          <strong>{modelStatus}</strong>
          <p>Keine Replit-Credits · kein HF-Token · Audiodaten verlassen den Browser nicht</p>
        </div>
        <div className="model-progress" aria-label="Modellfortschritt">
          <span style={{ width: `${modelProgress * 100}%` }} />
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
            </label>
          </div>

          <button className="generate-button" onClick={generateAll} disabled={busy || !canUseBrowser}>
            {busy ? 'TAKTØR ARBEITET …' : '3 SOUND-IDs ERZEUGEN'}
          </button>

          <div className="license-gate">
            <b>DEV-/LIZENZ-GATE</b>
            <p>
              Der lokale Prototyp nutzt Xenova/musicgen-small unter CC BY-NC 4.0.
              Nicht für kommerzielle Veröffentlichung; Produktionsprovider folgt separat.
            </p>
          </div>
        </aside>

        <section className="variant-list">
          {VARIANTS.map((variant) => {
            const state = renders[variant.id];
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
                    <audio controls src={state.url} />
                    <a download={`TAKTOR_${variant.id}_${variant.name.replaceAll(' ', '-')}.wav`} href={state.url}>
                      WAV ↓
                    </a>
                  </div>
                ) : (
                  <div className="audio-placeholder">
                    {state.error ? `FEHLER: ${state.error}` : 'WARTET AUF LOKALEN RENDER'}
                  </div>
                )}
                <div className="review-row">
                  <button type="button">KEEP</button>
                  <button type="button">MIX</button>
                  <button type="button">REJECT</button>
                </div>
              </article>
            );
          })}
        </section>
      </section>
    </main>
  );
}
