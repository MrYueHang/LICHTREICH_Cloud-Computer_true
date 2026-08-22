import type { IncomingMessage, ServerResponse } from 'node:http';

export interface ApiRequest extends IncomingMessage {
  body?: unknown;
}

export type ApiResponse = ServerResponse;

export function sendJson(response: ApiResponse, status: number, payload: unknown): void {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.end(JSON.stringify(payload));
}

export function readJsonBody(request: ApiRequest): Record<string, unknown> | null {
  if (request.body && typeof request.body === 'object' && !Array.isArray(request.body)) {
    return request.body as Record<string, unknown>;
  }
  if (typeof request.body !== 'string') return null;
  try {
    const parsed = JSON.parse(request.body) as unknown;
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed as Record<string, unknown>
      : null;
  } catch {
    return null;
  }
}

export function correlationId(request: ApiRequest): string {
  const header = request.headers['x-correlation-id'];
  if (typeof header === 'string' && /^[a-zA-Z0-9._-]{8,80}$/.test(header)) return header;
  return crypto.randomUUID();
}
