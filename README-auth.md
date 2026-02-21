# Auth & API Mocking — Developer Guide

## Overview

This app uses a **two-phase development approach** to handle the enterprise SSO authentication:

| Phase | Mode | Backend | SSOcookie |
|---|---|---|---|
| **Phase 1: Mock** | `development` | MSW (no server needed) | Fake cookie seeded automatically |
| **Phase 2: Integration** | `integration` | Real Orchestra server via Vite proxy | Real cookie from SSO login |
| **Production** | `production` | Direct calls (same origin) | Real cookie set by enterprise portal |

---

## How Authentication Works

When a user logs into the enterprise portal, the SSO system sets two cookies:

```
SSOcookie=<uuid>        ← Main session token, validated on every API call
BAYEUX_BROWSER=<id>     ← Qmatic-specific, used for real-time queue push events
```

Our `apiClient` always uses `credentials: 'include'` on every `fetch`, which automatically
sends these cookies to the server — no manual header management needed.

---

## Phase 1: Mock Mode (Default for Development)

### What happens
1. `main.tsx` detects `VITE_USE_MOCK=true`
2. Fake `SSOcookie` and `BAYEUX_BROWSER` cookies are seeded into the browser via `seedDevCookies.ts`
3. MSW Service Worker starts and intercepts all `/api/*` calls
4. Each handler validates the fake `SSOcookie` and returns mock data
5. The React app renders and works fully — no server required

### How to run
```bash
npm run dev
# Uses .env.development automatically (VITE_USE_MOCK=true)
```

### First-time setup
MSW requires a service worker file in `/public`. Run this **once** after installing MSW:
```bash
npx msw init public/ --save
```

---

## Phase 2: Integration Mode (Real Backend)

### What happens
1. `VITE_USE_MOCK=false` — MSW is never started
2. Vite dev server proxies all `/api/*` calls to the real Orchestra server
3. Your real `SSOcookie` (from logging into Orchestra) is forwarded automatically
4. The app works against live data

### How to run
```bash
# Step 1: Update .env.integration with your Orchestra server address
VITE_ORCHESTRA_TARGET=http://your-orchestra-server:8080

# Step 2: Log into your Orchestra dev/staging instance in Chrome
# (this sets the real SSOcookie in your browser)

# Step 3: Run in integration mode
npm run dev -- --mode integration
```

### Add the script to package.json
```json
"scripts": {
  "dev": "vite",
  "dev:integration": "vite --mode integration",
  "build": "tsc && vite build",
  "preview": "vite preview"
}
```

---

## Production

No changes needed. The enterprise portal sets `SSOcookie` on login.
The app is served from the same origin as the API, so all `fetch` calls
with `credentials: 'include'` just work.

---

## Adding a New API Endpoint

### 1. Add the handler in `src/mocks/handlers.ts`
```ts
http.get('/api/your-endpoint', async ({ request }) => {
  await delay();
  if (!isAuthenticated(request)) return unauthorized();
  return HttpResponse.json(yourMockData);
}),
```

### 2. Add mock data in `src/mocks/data/yourDomain.ts`
```ts
export const mockYourData: YourType[] = [ ... ];
```

### 3. Call it via apiClient in your component/service
```ts
const { data, error } = await apiClient.get<YourType[]>('/api/your-endpoint');
```

When you move to Phase 2, the exact same call hits the real server — no code changes needed.

---

## File Reference

```
src/
├── services/
│   └── apiClient.ts          ← Central fetch wrapper (credentials: include)
├── mocks/
│   ├── browser.ts            ← MSW worker setup
│   ├── handlers.ts           ← All API route handlers
│   ├── seedDevCookies.ts     ← Seeds fake SSOcookie in browser
│   └── data/
│       ├── branches.ts
│       ├── counters.ts
│       ├── queues.ts
│       ├── staff.ts
│       └── customers.ts
.env.development              ← VITE_USE_MOCK=true
.env.integration              ← VITE_USE_MOCK=false + proxy target
.env.production               ← VITE_USE_MOCK=false
vite.config.ts                ← Proxy config (only active in integration mode)
```
