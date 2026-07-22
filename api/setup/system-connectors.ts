import type { ApiRequest, ApiResponse } from '../_lib/http.js';
import { correlationId, sendJson } from '../_lib/http.js';
import { AuthError, authenticate, hasCapability, type TokenVerifier } from '../_lib/auth.js';

interface HandlerDependencies {
  verifyToken?: TokenVerifier;
  auditDenied?: (event: Record<string, string>) => void;
}

const SAFE_SYSTEM_CONNECTORS = [
  {
    id: 'firebase',
    label: 'Firebase Auth/Firestore',
    state: 'UNKNOWN',
    reasonCode: 'HEALTH_CHECK_NOT_IMPLEMENTED'
  },
  {
    id: 'neon',
    label: 'Neon (PostgreSQL)',
    state: 'UNKNOWN',
    reasonCode: 'HEALTH_CHECK_NOT_IMPLEMENTED',
    consoleUrl: 'https://console.neon.tech'
  },
  {
    id: 'n8n',
    label: 'n8n Instanz',
    state: 'UNKNOWN',
    reasonCode: 'HEALTH_CHECK_NOT_IMPLEMENTED',
    consoleUrl: 'https://n8n.lichtreich.info'
  }
] as const;

export function createSystemConnectorsHandler({
  verifyToken,
  auditDenied = (event) => console.warn(JSON.stringify(event))
}: HandlerDependencies = {}) {
  return async function handler(request: ApiRequest, response: ApiResponse): Promise<void> {
    if (request.method !== 'GET') {
      response.setHeader('Allow', 'GET');
      sendJson(response, 405, { error: { code: 'METHOD_NOT_ALLOWED' } });
      return;
    }

    const requestId = correlationId(request);
    try {
      const actor = await authenticate(request, verifyToken);
      if (!hasCapability(actor, 'system.connectors.read')) {
        auditDenied({
          event: 'setup.system_connectors.denied',
          actorId: actor.uid,
          capability: 'system.connectors.read',
          correlationId: requestId
        });
        sendJson(response, 403, { error: { code: 'CAPABILITY_DENIED' }, correlationId: requestId });
        return;
      }
      sendJson(response, 200, { connectors: SAFE_SYSTEM_CONNECTORS, correlationId: requestId });
    } catch (error) {
      const code = error instanceof AuthError ? error.code : 'AUTH_SERVICE_UNAVAILABLE';
      sendJson(response, code === 'AUTH_REQUIRED' ? 401 : 503, { error: { code }, correlationId: requestId });
    }
  };
}

export default createSystemConnectorsHandler();
