type AccessTokenPayload = {
  sub?: number;
  portifolioId?: number;
  exp?: number;
};

export function getAccessTokenPayload(token: string): AccessTokenPayload | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(normalizedPayload)) as AccessTokenPayload;
  } catch {
    return null;
  }
}

export function isExpiredToken(payload: AccessTokenPayload): boolean {
  return Boolean(payload.exp && payload.exp * 1000 <= Date.now());
}
