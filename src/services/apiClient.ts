/**
 * apiClient.ts
 *
 * Centralized HTTP client for all backend API calls.
 *
 * Auth strategy:
 *  - Phase 1 (VITE_USE_MOCK=true):  MSW intercepts requests; mock SSOcookie is validated by handlers.
 *  - Phase 2 (VITE_USE_MOCK=false): Real requests proxy through Vite dev server to Orchestra backend.
 *    The real SSOcookie set by the SSO login is automatically included via `credentials: 'include'`.
 *
 * Cookie flow:
 *  - In dev/mock mode:  A fake SSOcookie is seeded by src/mocks/seedDevCookies.ts on app start.
 *  - In integration:    The real SSOcookie is set by the enterprise SSO portal on login.
 *  - In production:     Same as integration — no code change needed.
 *
 * Usage:
 *   import { apiClient } from '@/services/apiClient';
 *   const branches = await apiClient.get<Branch[]>('/api/branches');
 */

const BASE_URL = import.meta.env.VITE_API_BASE ?? '';

// ─── Response wrapper ────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

// ─── Core request helper ─────────────────────────────────────────

async function request<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  path: string,
  body?: unknown,
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${path}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const init: RequestInit = {
    method,
    headers,
    // CRITICAL: This tells the browser to include cookies (SSOcookie, BAYEUX_BROWSER)
    // on every request — both in dev (mock cookie) and production (real SSO cookie).
    credentials: 'include',
  };

  if (body !== undefined) {
    init.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, init);

    if (response.status === 401) {
      // Session expired or invalid — in production the enterprise shell handles redirect to SSO.
      // In dev, this means the mock SSOcookie was not seeded. Check seedDevCookies.ts.
      console.warn('[apiClient] 401 Unauthorized — SSOcookie may be missing or expired.');
      return { data: null, error: 'Unauthorized', status: 401 };
    }

    if (!response.ok) {
      const text = await response.text();
      return { data: null, error: text || response.statusText, status: response.status };
    }

    // Handle empty responses (e.g. 204 No Content)
    if (response.status === 204) {
      return { data: null, error: null, status: 204 };
    }

    const data: T = await response.json();
    return { data, error: null, status: response.status };

  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error';
    console.error(`[apiClient] ${method} ${path} failed:`, message);
    return { data: null, error: message, status: 0 };
  }
}

// ─── Public API ──────────────────────────────────────────────────

export const apiClient = {
  get:    <T>(path: string)                  => request<T>('GET',    path),
  post:   <T>(path: string, body: unknown)   => request<T>('POST',   path, body),
  put:    <T>(path: string, body: unknown)   => request<T>('PUT',    path, body),
  patch:  <T>(path: string, body: unknown)   => request<T>('PATCH',  path, body),
  delete: <T>(path: string)                  => request<T>('DELETE', path),
};
