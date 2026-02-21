/**
 * handlers.ts
 *
 * MSW (Mock Service Worker) request handlers.
 * Only active in dev mode (VITE_USE_MOCK=true) — never runs in production.
 *
 * Routes here match the real Orchestra API paths so switching to the real
 * backend in integration/production mode requires zero component changes.
 */

import { http, HttpResponse } from 'msw';
import { mockBranches } from './data/branches';
import { mockCounters, mockCountersSimple, mockProfiles } from './data/counters';
import { mockQueues } from './data/queues';
import { mockStaff } from './data/staff';
import { mockCustomers, mockNextTicket } from './data/customers';

// ─── Simulated network delay (makes dev feel realistic) ──────────

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// ─── Handlers ────────────────────────────────────────────────────

export const handlers = [

    // GET /api/branches
    http.get('/api/branches', async () => {
        await delay();
        return HttpResponse.json(mockBranches);
    }),

    // GET /api/branches/:branchId/counters
    // Called by SelectionScreen after a branch is selected.
    http.get('/api/branches/:branchId/counters', async () => {
        await delay();
        // In real Orchestra counters are filtered by branch.
        // Mock returns the full list for all branches.
        return HttpResponse.json(mockCountersSimple);
    }),

    // GET /api/branches/:branchId/counters/:counterId/profiles
    // Called by SelectionScreen after a counter is selected.
    http.get('/api/branches/:branchId/counters/:counterId/profiles', async () => {
        await delay();
        // In real Orchestra profiles are filtered by branch + counter.
        // Mock returns the full list.
        return HttpResponse.json(mockProfiles);
    }),

    // GET /api/counters  (simple flat list — kept for any direct use)
    http.get('/api/counters', async () => {
        await delay();
        return HttpResponse.json(mockCountersSimple);
    }),

    // GET /api/counters/detail  (full detail with staff + status for transfer)
    http.get('/api/counters/detail', async () => {
        await delay();
        return HttpResponse.json(mockCounters);
    }),

    // GET /api/profiles  (flat list — kept for any direct use)
    http.get('/api/profiles', async () => {
        await delay();
        return HttpResponse.json(mockProfiles);
    }),

    // GET /api/queues
    http.get('/api/queues', async () => {
        await delay();
        return HttpResponse.json(mockQueues);
    }),

    // GET /api/staff
    http.get('/api/staff', async () => {
        await delay();
        return HttpResponse.json(mockStaff);
    }),

    // GET /api/customers/search?q=...
    http.get('/api/customers/search', async ({ request }) => {
        await delay();
        const url   = new URL(request.url);
        const query = url.searchParams.get('q')?.toLowerCase() ?? '';

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
    http.post('/api/tickets/next', async () => {
        await delay(500); // slightly longer — simulates queue processing
        return HttpResponse.json(mockNextTicket);
    }),

    // POST /api/tickets/:ticketNumber/finish
    http.post('/api/tickets/:ticketNumber/finish', async () => {
        await delay();
        return new HttpResponse(null, { status: 204 });
    }),

    // POST /api/tickets/:ticketNumber/transfer
    http.post('/api/tickets/:ticketNumber/transfer', async () => {
        await delay();
        return new HttpResponse(null, { status: 204 });
    }),

];
