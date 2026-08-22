import { describe, expect, it, vi } from 'vitest';
import {
  containsUnsafeConnectorFields,
  isSafePersistedConnectorsState,
  normalizeConnectorsState,
  toPersistedConnectorsState,
  verifyConnector
} from './setupConnectors';

describe('honest connector verification', () => {
  it('stays red when the verification endpoint is offline', async () => {
    const status = await verifyConnector({
      type: 'ai',
      provider: 'openai',
      secret: 'sk-test-not-a-real-key',
      getIdToken: async () => 'firebase-token',
      fetcher: vi.fn(async () => { throw new Error('offline'); })
    });

    expect(status.lamp).toBe('red');
    expect(status.configured).toBe(false);
    expect(status.errorCode).toBe('NETWORK_UNAVAILABLE');
  });

  it('rejects a short key before any network request', async () => {
    const fetcher = vi.fn<typeof fetch>();
    const status = await verifyConnector({
      type: 'ai',
      provider: 'gemini',
      secret: 'short',
      getIdToken: async () => 'firebase-token',
      fetcher
    });

    expect(fetcher).not.toHaveBeenCalled();
    expect(status.lamp).toBe('red');
    expect(status.errorCode).toBe('INVALID_CREDENTIAL_FORMAT');
  });

  it('does not convert a non-2xx backend response into green', async () => {
    const status = await verifyConnector({
      type: 'ai',
      provider: 'groq',
      secret: 'gsk_test-not-a-real-key',
      getIdToken: async () => 'firebase-token',
      fetcher: vi.fn(async () => new Response(JSON.stringify({
        status: 'FAILED',
        error: { code: 'CREDENTIAL_STORE_NOT_CONFIGURED' }
      }), { status: 503, headers: { 'Content-Type': 'application/json' } }))
    });

    expect(status.lamp).toBe('red');
    expect(status.errorCode).toBe('CREDENTIAL_STORE_NOT_CONFIGURED');
  });

  it('requires a complete server receipt before showing green', async () => {
    const status = await verifyConnector({
      type: 'ai',
      provider: 'openai',
      secret: 'sk-test-not-a-real-key',
      getIdToken: async () => 'firebase-token',
      fetcher: vi.fn(async () => new Response(JSON.stringify({ status: 'VERIFIED' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }))
    });

    expect(status.lamp).toBe('red');
    expect(status.errorCode).toBe('PROTOCOL_ERROR');
  });
});

describe('secret-safe Firestore projection', () => {
  it('detects and strips legacy data.key fields', () => {
    const legacy = {
      ai: {
        provider: 'openai',
        configured: true,
        lamp: 'green',
        data: { provider: 'openai', key: 'sk-super-secret-value' }
      },
      storage: { provider: '', configured: false, lamp: 'idle' },
      mail: { provider: '', configured: false, lamp: 'idle' },
      calendar: { provider: '', configured: false, lamp: 'idle' }
    };

    expect(containsUnsafeConnectorFields(legacy)).toBe(true);
    const safe = toPersistedConnectorsState(normalizeConnectorsState(legacy));
    expect(JSON.stringify(safe)).not.toContain('sk-super-secret-value');
    expect(safe.ai.lamp).toBe('red');
    expect(safe.ai.errorCode).toBe('LEGACY_UNVERIFIED_STATE');
    expect(isSafePersistedConnectorsState(safe)).toBe(true);
  });

  it('persists an error code but no server or credential text', () => {
    const state = normalizeConnectorsState({
      ai: {
        provider: 'openai',
        configured: false,
        lamp: 'red',
        errorCode: 'VERIFICATION_FAILED',
        error: 'provider accidentally echoed sk-super-secret-value'
      }
    });
    const persisted = toPersistedConnectorsState(state);

    expect(persisted.ai.errorCode).toBe('VERIFICATION_FAILED');
    expect(JSON.stringify(persisted)).not.toContain('sk-super-secret-value');
    expect(JSON.stringify(persisted)).not.toContain('accidentally echoed');
  });
});
