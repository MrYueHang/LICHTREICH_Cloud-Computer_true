import { applicationDefault, cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import type { ApiRequest } from './http';

export interface VerifiedActor {
  uid: string;
  capabilities: string[];
}

export interface TokenClaims {
  uid?: string;
  sub?: string;
  capabilities?: unknown;
  roles?: unknown;
  systemAdmin?: unknown;
}

export type TokenVerifier = (token: string) => Promise<TokenClaims>;

export class AuthError extends Error {
  constructor(public readonly code: 'AUTH_REQUIRED' | 'AUTH_SERVICE_UNAVAILABLE') {
    super(code);
  }
}

function firebaseAdminApp() {
  const existing = getApps()[0];
  if (existing) return existing;

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (projectId && clientEmail && privateKey) {
    return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }), projectId });
  }
  if (projectId) {
    return initializeApp({ credential: applicationDefault(), projectId });
  }
  throw new AuthError('AUTH_SERVICE_UNAVAILABLE');
}

export function capabilitiesFromClaims(claims: TokenClaims): string[] {
  const capabilities = new Set<string>();
  if (Array.isArray(claims.capabilities)) {
    for (const capability of claims.capabilities) {
      if (typeof capability === 'string') capabilities.add(capability);
    }
  }

  const roles = Array.isArray(claims.roles)
    ? claims.roles.filter((role): role is string => typeof role === 'string')
    : [];
  if (claims.systemAdmin === true || roles.includes('system_admin')) {
    capabilities.add('system.connectors.read');
    capabilities.add('system.connectors.manage');
  }
  return [...capabilities].sort();
}

export const verifyFirebaseToken: TokenVerifier = async (token) => {
  try {
    return await getAuth(firebaseAdminApp()).verifyIdToken(token, true) as TokenClaims;
  } catch (error) {
    if (error instanceof AuthError) throw error;
    throw new AuthError('AUTH_REQUIRED');
  }
};

export async function authenticate(
  request: ApiRequest,
  verifyToken: TokenVerifier = verifyFirebaseToken
): Promise<VerifiedActor> {
  const authorization = request.headers.authorization;
  if (!authorization?.startsWith('Bearer ')) throw new AuthError('AUTH_REQUIRED');
  const token = authorization.slice('Bearer '.length).trim();
  if (!token) throw new AuthError('AUTH_REQUIRED');

  const claims = await verifyToken(token);
  const uid = typeof claims.uid === 'string' ? claims.uid : claims.sub;
  if (!uid) throw new AuthError('AUTH_REQUIRED');
  return { uid, capabilities: capabilitiesFromClaims(claims) };
}

export function hasCapability(actor: VerifiedActor, capability: string): boolean {
  return actor.capabilities.includes(capability);
}
