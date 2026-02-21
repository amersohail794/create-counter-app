/**
 * seedDevCookies.ts
 *
 * Seeds fake browser cookies that mimic what the enterprise SSO portal
 * sets after a real login. Only runs in mock/dev mode.
 *
 * These values are validated by src/mocks/handlers.ts.
 * They are arbitrary strings — just need to be present and non-empty.
 *
 * In integration/production, the real SSO portal sets these cookies and
 * this file is never imported.
 */

export const MOCK_SSO_COOKIE_VALUE = 'mock-sso-session-dev-9852da7c';
export const MOCK_BAYEUX_VALUE     = 'mock-bayeux-dev-12sw9lh';

export function seedDevCookies(): void {
  const isProd = import.meta.env.PROD;
  if (isProd) {
    console.warn('[seedDevCookies] Should not run in production. Check your entry point.');
    return;
  }

  // Set cookies on the current origin so they are sent with every fetch({ credentials: 'include' })
  document.cookie = `SSOcookie=${MOCK_SSO_COOKIE_VALUE}; path=/; SameSite=Lax`;
  document.cookie = `BAYEUX_BROWSER=${MOCK_BAYEUX_VALUE}; path=/; SameSite=Lax`;

  console.info(
    '[Dev] Mock cookies seeded:\n' +
    `  SSOcookie     = ${MOCK_SSO_COOKIE_VALUE}\n` +
    `  BAYEUX_BROWSER = ${MOCK_BAYEUX_VALUE}`
  );
}
