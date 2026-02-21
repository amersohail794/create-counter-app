/**
 * browser.ts
 *
 * Sets up the MSW Service Worker for browser environments.
 * Imported only in main.tsx when VITE_USE_MOCK=true.
 *
 * The service worker file (mockServiceWorker.js) must be present in /public.
 * Run once after install:  npx msw init public/ --save
 */

import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
