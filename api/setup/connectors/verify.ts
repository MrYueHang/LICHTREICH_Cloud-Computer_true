import type { ApiRequest, ApiResponse } from '../../_lib/http';
import { correlationId, readJsonBody, sendJson } from '../../_lib/http';
import { AuthError, authenticate, type TokenVerifier } from '../../_lib/auth';

interface HandlerDependencies {
  verifyToken?: TokenVerifier;
}

const PROVIDERS_BY_TYPE = {
  ai: new Set(['gemini', 'groq', 'openai']),
  storage: new Set(['drive']),
  mail: new Set(['imap']),
  calendar: new Set(['google_calendar'])
} as const;

export function createVerifyConnectorHandler({ verifyToken }: HandlerDependencies = {}) {
  return async function handler(request: ApiRequest, response: ApiResponse): Promise<void> {
    if (request.method !== 'POST') {
      response.setHeader('Allow', 'POST');
      sendJson(response, 405, { error: { code: 'METHOD_NOT_ALLOWED' } });
      return;
    }

    const requestId = correlationId(request);
    try {
      await authenticate(request, verifyToken);
      const body = readJsonBody(request);
      const type = body?.type;
      const provider = body?.provider;
      const allowedProviders = typeof type === 'string' && type in PROVIDERS_BY_TYPE
        ? PROVIDERS_BY_TYPE[type as keyof typeof PROVIDERS_BY_TYPE] as ReadonlySet<string>
        : null;
      if (
        typeof type !== 'string'
        || typeof provider !== 'string'
        || !allowedProviders?.has(provider)
      ) {
        sendJson(response, 400, { error: { code: 'INVALID_REQUEST' }, correlationId: requestId });
        return;
      }

      if (type === 'ai' && (typeof body?.secret !== 'string' || body.secret.length < 8)) {
        sendJson(response, 400, { error: { code: 'INVALID_CREDENTIAL_FORMAT' }, correlationId: requestId });
        return;
      }

      // Stop-the-line stub: the request body is deliberately not logged or persisted.
      // A connector may become VERIFIED only after package 4 adds an approved credential
      // store and a real read-only provider verification that returns an opaque reference.
      sendJson(response, 503, {
        status: 'FAILED',
        error: { code: 'CREDENTIAL_STORE_NOT_CONFIGURED' },
        correlationId: requestId
      });
    } catch (error) {
      const code = error instanceof AuthError ? error.code : 'AUTH_SERVICE_UNAVAILABLE';
      sendJson(response, code === 'AUTH_REQUIRED' ? 401 : 503, { error: { code }, correlationId: requestId });
    }
  };
}

export default createVerifyConnectorHandler();
