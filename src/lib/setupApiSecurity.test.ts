import { describe, expect, it, vi } from 'vitest';
import type { ApiRequest, ApiResponse } from '../../api/_lib/http.js';
import { createSystemConnectorsHandler } from '../../api/setup/system-connectors.js';
import { createVerifyConnectorHandler } from '../../api/setup/connectors/verify.js';

function request(method: string, body?: unknown): ApiRequest {
  return {
    method,
    headers: { authorization: 'Bearer valid-test-token' },
    body
  } as ApiRequest;
}

function response() {
  let body = '';
  const headers = new Map<string, string>();
  const mock = {
    statusCode: 200,
    setHeader: (name: string, value: string) => { headers.set(name, value); },
    end: (value?: string) => { body = value ?? ''; }
  } as unknown as ApiResponse;
  return { mock, headers, body: () => body };
}

describe('server-authorized setup administration', () => {
  it('denies a normal user even if the browser tries the admin endpoint directly', async () => {
    const auditDenied = vi.fn();
    const handler = createSystemConnectorsHandler({
      verifyToken: async () => ({ uid: 'normal-user', roles: ['user'] }),
      auditDenied
    });
    const target = response();

    await handler(request('GET'), target.mock);

    expect(target.mock.statusCode).toBe(403);
    expect(JSON.parse(target.body()).error.code).toBe('CAPABILITY_DENIED');
    expect(auditDenied).toHaveBeenCalledWith(expect.objectContaining({
      event: 'setup.system_connectors.denied',
      actorId: 'normal-user',
      capability: 'system.connectors.read'
    }));
  });

  it('uses a server-verified custom claim and still reports unknown health honestly', async () => {
    const handler = createSystemConnectorsHandler({
      verifyToken: async () => ({ uid: 'admin-user', systemAdmin: true })
    });
    const target = response();

    await handler(request('GET'), target.mock);

    expect(target.mock.statusCode).toBe(200);
    const payload = JSON.parse(target.body());
    expect(payload.connectors).toHaveLength(3);
    expect(payload.connectors.every((connector: { state: string }) => connector.state === 'UNKNOWN')).toBe(true);
  });
});

describe('credential-boundary stub', () => {
  it('never verifies or echoes a secret while no credential store exists', async () => {
    const secret = 'sk-test-never-echo-this-value';
    const handler = createVerifyConnectorHandler({
      verifyToken: async () => ({ uid: 'normal-user' })
    });
    const target = response();

    await handler(request('POST', { type: 'ai', provider: 'openai', secret }), target.mock);

    expect(target.mock.statusCode).toBe(503);
    expect(JSON.parse(target.body()).error.code).toBe('CREDENTIAL_STORE_NOT_CONFIGURED');
    expect(target.body()).not.toContain(secret);
    expect(target.headers.get('Cache-Control')).toBe('no-store');
  });
});
