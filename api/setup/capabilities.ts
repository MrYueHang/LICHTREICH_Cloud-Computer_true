import type { ApiRequest, ApiResponse } from '../_lib/http';
import { sendJson } from '../_lib/http';
import { AuthError, authenticate } from '../_lib/auth';

export default async function handler(request: ApiRequest, response: ApiResponse): Promise<void> {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    sendJson(response, 405, { error: { code: 'METHOD_NOT_ALLOWED' } });
    return;
  }

  try {
    const actor = await authenticate(request);
    sendJson(response, 200, { actorId: actor.uid, capabilities: actor.capabilities });
  } catch (error) {
    const code = error instanceof AuthError ? error.code : 'AUTH_SERVICE_UNAVAILABLE';
    sendJson(response, code === 'AUTH_REQUIRED' ? 401 : 503, { error: { code } });
  }
}
