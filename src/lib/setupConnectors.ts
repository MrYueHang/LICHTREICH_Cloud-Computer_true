export type ConnectorType = 'ai' | 'storage' | 'mail' | 'calendar';
export type ConnectorLamp = 'idle' | 'testing' | 'green' | 'red';

export interface SafeConnectorStatus {
  provider: string;
  configured: boolean;
  lamp: ConnectorLamp;
  error?: string;
  errorCode?: string;
  credentialRef?: string;
  maskedFingerprint?: string;
  verifiedAt?: string;
}

export interface ConnectorsState {
  ai: SafeConnectorStatus;
  storage: SafeConnectorStatus;
  mail: SafeConnectorStatus;
  calendar: SafeConnectorStatus;
}

export interface SetupCapabilities {
  capabilities: string[];
  errorCode?: string;
}

export interface SystemConnectorStatus {
  id: string;
  label: string;
  state: 'UNKNOWN' | 'UNAVAILABLE' | 'VERIFIED';
  reasonCode?: string;
  consoleUrl?: string;
}

interface VerificationPayload {
  status?: unknown;
  credentialRef?: unknown;
  maskedFingerprint?: unknown;
  verifiedAt?: unknown;
  error?: {
    code?: unknown;
  };
}

interface VerifyConnectorOptions {
  type: ConnectorType;
  provider: string;
  secret?: string;
  getIdToken: () => Promise<string>;
  fetcher?: typeof fetch;
  endpoint?: string;
}

const LAMPS = new Set<ConnectorLamp>(['idle', 'testing', 'green', 'red']);
const SAFE_STATUS_KEYS = new Set([
  'provider',
  'configured',
  'lamp',
  'errorCode',
  'credentialRef',
  'maskedFingerprint',
  'verifiedAt'
]);

const ERROR_MESSAGES: Record<string, string> = {
  AUTH_REQUIRED: 'Anmeldung konnte nicht bestätigt werden.',
  AUTH_SERVICE_UNAVAILABLE: 'Der serverseitige Anmeldedienst ist noch nicht konfiguriert.',
  CREDENTIAL_STORE_NOT_CONFIGURED: 'Der sichere Credential Store ist noch nicht verbunden. Es wurde nichts gespeichert.',
  INVALID_CREDENTIAL_FORMAT: 'Der eingegebene Zugangsschlüssel hat kein gültiges Format.',
  INVALID_REQUEST: 'Der Connector-Test wurde vom Server abgelehnt.',
  NETWORK_UNAVAILABLE: 'Der Test-Endpunkt ist nicht erreichbar. Der Connector bleibt unverifiziert.',
  PROTOCOL_ERROR: 'Der Test-Endpunkt lieferte keinen belastbaren Verifikationsnachweis.',
  VERIFICATION_FAILED: 'Die Verbindung konnte nicht verifiziert werden.',
  LEGACY_UNVERIFIED_STATE: 'Ein früherer Grün-Status hatte keinen echten Verifikationsnachweis und wurde zurückgesetzt.'
};

const emptyStatus = (): SafeConnectorStatus => ({
  provider: '',
  configured: false,
  lamp: 'idle'
});

export const INITIAL_CONNECTORS_STATE: ConnectorsState = {
  ai: emptyStatus(),
  storage: emptyStatus(),
  mail: emptyStatus(),
  calendar: emptyStatus()
};

function safeErrorStatus(provider: string, errorCode: string): SafeConnectorStatus {
  return {
    provider,
    configured: false,
    lamp: 'red',
    errorCode,
    error: ERROR_MESSAGES[errorCode] ?? ERROR_MESSAGES.VERIFICATION_FAILED
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function optionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function isValidCredentialRef(value: string | undefined): value is string {
  return Boolean(value && /^cred_[A-Za-z0-9_-]{12,128}$/.test(value));
}

function isValidFingerprint(value: string | undefined): value is string {
  return Boolean(value && value.length <= 64);
}

function isValidVerifiedAt(value: string | undefined): value is string {
  return Boolean(value && value.length <= 40 && !Number.isNaN(Date.parse(value)));
}

export function normalizeConnectorStatus(value: unknown): SafeConnectorStatus {
  if (!isRecord(value)) return emptyStatus();

  const provider = optionalString(value.provider) ?? '';
  const lamp = typeof value.lamp === 'string' && LAMPS.has(value.lamp as ConnectorLamp)
    ? value.lamp as ConnectorLamp
    : 'idle';
  const credentialRef = optionalString(value.credentialRef);
  const maskedFingerprint = optionalString(value.maskedFingerprint);
  const verifiedAt = optionalString(value.verifiedAt);

  // A historical green state without a server receipt is not evidence.
  if (lamp === 'green' && (
    !isValidCredentialRef(credentialRef)
    || !isValidFingerprint(maskedFingerprint)
    || !isValidVerifiedAt(verifiedAt)
  )) {
    return safeErrorStatus(provider, 'LEGACY_UNVERIFIED_STATE');
  }

  const normalized: SafeConnectorStatus = {
    provider,
    configured: lamp === 'green' && value.configured === true,
    lamp
  };

  const errorCode = optionalString(value.errorCode);
  if (errorCode) {
    normalized.errorCode = errorCode;
    normalized.error = ERROR_MESSAGES[errorCode] ?? ERROR_MESSAGES.VERIFICATION_FAILED;
  }
  if (credentialRef) normalized.credentialRef = credentialRef;
  if (maskedFingerprint) normalized.maskedFingerprint = maskedFingerprint;
  if (verifiedAt) normalized.verifiedAt = verifiedAt;

  return normalized;
}

export function normalizeConnectorsState(value: unknown): ConnectorsState {
  const raw = isRecord(value) ? value : {};
  return {
    ai: normalizeConnectorStatus(raw.ai),
    storage: normalizeConnectorStatus(raw.storage),
    mail: normalizeConnectorStatus(raw.mail),
    calendar: normalizeConnectorStatus(raw.calendar)
  };
}

export function toPersistedConnectorsState(value: unknown): ConnectorsState {
  const state = normalizeConnectorsState(value);
  const stripDisplayText = (status: SafeConnectorStatus): SafeConnectorStatus => {
    const { error: _displayOnly, ...persisted } = status;
    return persisted;
  };
  return {
    ai: stripDisplayText(state.ai),
    storage: stripDisplayText(state.storage),
    mail: stripDisplayText(state.mail),
    calendar: stripDisplayText(state.calendar)
  };
}

export function containsUnsafeConnectorFields(value: unknown): boolean {
  if (!isRecord(value)) return false;

  for (const [key, nested] of Object.entries(value)) {
    const lowered = key.toLowerCase();
    const allowedReference = lowered === 'credentialref' || lowered === 'maskedfingerprint';
    if (!allowedReference && /(key|secret|token|password|credential|data)/i.test(lowered)) return true;
    if (isRecord(nested) && containsUnsafeConnectorFields(nested)) return true;
  }
  return false;
}

export function isSafePersistedConnectorsState(value: unknown): boolean {
  if (!isRecord(value) || containsUnsafeConnectorFields(value)) return false;
  const connectorTypes = ['ai', 'storage', 'mail', 'calendar'] as const;
  if (
    Object.keys(value).length !== connectorTypes.length
    || !Object.keys(value).every((key) => connectorTypes.includes(key as typeof connectorTypes[number]))
  ) return false;
  return connectorTypes.every((type) => {
    const status = value[type];
    return isRecord(status) && Object.keys(status).every((key) => SAFE_STATUS_KEYS.has(key));
  });
}

export async function verifyConnector({
  type,
  provider,
  secret,
  getIdToken,
  fetcher = fetch,
  endpoint = '/api/setup/connectors/verify'
}: VerifyConnectorOptions): Promise<SafeConnectorStatus> {
  if (type === 'ai' && (!secret || secret.trim().length < 8)) {
    return safeErrorStatus(provider, 'INVALID_CREDENTIAL_FORMAT');
  }

  let idToken: string;
  try {
    idToken = await getIdToken();
  } catch {
    return safeErrorStatus(provider, 'AUTH_REQUIRED');
  }

  let response: Response;
  try {
    response = await fetcher(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ type, provider, ...(secret ? { secret } : {}) }),
      cache: 'no-store',
      redirect: 'error'
    });
  } catch {
    return safeErrorStatus(provider, 'NETWORK_UNAVAILABLE');
  }

  let payload: VerificationPayload = {};
  try {
    payload = await response.json() as VerificationPayload;
  } catch {
    // HTML, redirects and malformed bodies are never accepted as verification.
  }

  if (!response.ok) {
    const code = optionalString(payload.error?.code) ?? 'VERIFICATION_FAILED';
    return safeErrorStatus(provider, code);
  }

  const credentialRef = optionalString(payload.credentialRef);
  const maskedFingerprint = optionalString(payload.maskedFingerprint);
  const verifiedAt = optionalString(payload.verifiedAt);
  if (
    payload.status !== 'VERIFIED'
    || !isValidCredentialRef(credentialRef)
    || !isValidFingerprint(maskedFingerprint)
    || !isValidVerifiedAt(verifiedAt)
  ) {
    return safeErrorStatus(provider, 'PROTOCOL_ERROR');
  }

  return {
    provider,
    configured: true,
    lamp: 'green',
    credentialRef,
    maskedFingerprint,
    verifiedAt
  };
}

export async function fetchSetupCapabilities(
  getIdToken: () => Promise<string>,
  fetcher: typeof fetch = fetch,
  endpoint = '/api/setup/capabilities'
): Promise<SetupCapabilities> {
  try {
    const idToken = await getIdToken();
    const response = await fetcher(endpoint, {
      headers: { Authorization: `Bearer ${idToken}` },
      cache: 'no-store',
      redirect: 'error'
    });
    if (!response.ok) return { capabilities: [], errorCode: 'AUTH_REQUIRED' };
    const payload = await response.json() as { capabilities?: unknown };
    return {
      capabilities: Array.isArray(payload.capabilities)
        ? payload.capabilities.filter((item): item is string => typeof item === 'string')
        : []
    };
  } catch {
    return { capabilities: [], errorCode: 'AUTH_SERVICE_UNAVAILABLE' };
  }
}

export async function fetchSystemConnectorStatuses(
  getIdToken: () => Promise<string>,
  fetcher: typeof fetch = fetch,
  endpoint = '/api/setup/system-connectors'
): Promise<SystemConnectorStatus[]> {
  const idToken = await getIdToken();
  const response = await fetcher(endpoint, {
    headers: { Authorization: `Bearer ${idToken}` },
    cache: 'no-store',
    redirect: 'error'
  });
  if (!response.ok) throw new Error('SYSTEM_CONNECTORS_FORBIDDEN');
  const payload = await response.json() as { connectors?: unknown };
  if (!Array.isArray(payload.connectors)) return [];
  return payload.connectors.filter((item): item is SystemConnectorStatus => (
    isRecord(item)
    && typeof item.id === 'string'
    && typeof item.label === 'string'
    && (item.state === 'UNKNOWN' || item.state === 'UNAVAILABLE' || item.state === 'VERIFIED')
  ));
}
