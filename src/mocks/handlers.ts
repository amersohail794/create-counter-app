/**
 * handlers.ts
 *
 * MSW (Mock Service Worker) request handlers.
 *
 * Each handler:
 *  1. Validates the SSOcookie is present (simulates real backend auth check).
 *  2. Returns the appropriate mock data.
 *
 * API routes defined here should exactly match the real Orchestra API paths
 * so that switching from mock → real (Phase 2) requires zero component changes.
 *
 * When you discover the real API paths, update the route strings here only.
 */

import { http, HttpResponse } from 'msw';
import { MOCK_SSO_COOKIE_VALUE } from './seedDevCookies';
import { mockBranches }       from './data/branches';
import { mockCounters, mockCountersSimple, mockProfiles } from './data/counters';
import { mockQueues }         from './data/queues';
import { mockStaff }          from './data/staff';
import { mockCustomers, mockNextTicket } from './data/customers';

// ─── Auth helper ─────────────────────────────────────────────────

/**
 * Validates that the request carries a valid SSOcookie.
 * In real Orchestra, the server checks the session store.
 * Here we just verify the cookie exists and matches our seeded value.
 */
type ResolverCookies = {
  get?: (name: string) => string | undefined;
  [key: string]: unknown;
};

function isAuthenticated(cookies: ResolverCookies): boolean {
  // In MSW, resolver cookies can be either a plain object or a cookie-store-like object.
  // Read both shapes to avoid false 401s across environments.
  const rawValue =
    typeof cookies?.get === 'function'
      ? cookies.get('SSOcookie')
      : typeof cookies?.SSOcookie === 'string'
        ? cookies.SSOcookie
        : undefined;

  const cookieValue = rawValue ? decodeURIComponent(rawValue) : undefined;
  return cookieValue === MOCK_SSO_COOKIE_VALUE;
}

function unauthorized() {
  return new HttpResponse(
    JSON.stringify({ error: 'Unauthorized', message: 'Invalid or missing SSOcookie' }),
    { status: 401, headers: { 'Content-Type': 'application/json' } }
  );
}

// ─── Simulated network delay (makes dev feel realistic) ──────────

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// ─── Handlers ────────────────────────────────────────────────────

export const handlers = [

  // GET /api/branches
  http.get('/api/branches', async ({ cookies }) => {
    await delay();
    if (!isAuthenticated(cookies)) return unauthorized();
    return HttpResponse.json(mockBranches);
  }),

  // GET /api/counters  (simple list for selection screen)
  http.get('/api/counters', async ({ cookies }) => {
    await delay();
    if (!isAuthenticated(cookies)) return unauthorized();
    return HttpResponse.json(mockCountersSimple);
  }),

  // GET /api/counters/detail  (full detail with staff + status for transfer)
  http.get('/api/counters/detail', async ({ cookies }) => {
    await delay();
    if (!isAuthenticated(cookies)) return unauthorized();
    return HttpResponse.json(mockCounters);
  }),

  // GET /api/profiles
  http.get('/api/profiles', async ({ cookies }) => {
    await delay();
    if (!isAuthenticated(cookies)) return unauthorized();
    return HttpResponse.json(mockProfiles);
  }),

  // GET /api/queues
  http.get('/api/queues', async ({ cookies }) => {
    await delay();
    if (!isAuthenticated(cookies)) return unauthorized();
    return HttpResponse.json(mockQueues);
  }),

  // GET /api/staff
  http.get('/api/staff', async ({ cookies }) => {
    await delay();
    if (!isAuthenticated(cookies)) return unauthorized();
    return HttpResponse.json(mockStaff);
  }),

  // GET /api/customers/search?q=...
  http.get('/api/customers/search', async ({ request, cookies }) => {
    await delay();
    if (!isAuthenticated(cookies)) return unauthorized();

    const url    = new URL(request.url);
    const query  = url.searchParams.get('q')?.toLowerCase() ?? '';

    const results = query.length > 0
      ? mockCustomers.filter(c =>
          `${c.firstName} ${c.lastName}`.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query) ||
          c.phone.includes(query)
        )
      : [];

    return HttpResponse.json(results);
  }),

  // POST /api/tickets/next  — call next customer
  http.post('/api/tickets/next', async ({ cookies }) => {
    await delay(500); // slightly longer — simulates queue processing
    if (!isAuthenticated(cookies)) return unauthorized();
    return HttpResponse.json(mockNextTicket);
  }),

  // POST /api/tickets/:ticketNumber/finish
  http.post('/api/tickets/:ticketNumber/finish', async ({ cookies }) => {
    await delay();
    if (!isAuthenticated(cookies)) return unauthorized();
    return new HttpResponse(null, { status: 204 });
  }),

  // POST /api/tickets/:ticketNumber/transfer
  http.post('/api/tickets/:ticketNumber/transfer', async ({ cookies }) => {
    await delay();
    if (!isAuthenticated(cookies)) return unauthorized();
    return new HttpResponse(null, { status: 204 });
  }),

];
