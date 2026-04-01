import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

async function prepare(): Promise<void> {
    if (import.meta.env.VITE_USE_MOCK === 'true') {
        // Start MSW service worker — must be ready before first API call
        const { worker } = await import('./mocks/browser')
        await worker.start({
            onUnhandledRequest: 'warn', // warn in console for any unhandled routes
        })

        console.info('[Dev] MSW started — API calls are being intercepted.')
    } else {
        // Ensure any previously registered MSW service worker is unregistered
        // so it doesn't intercept real API calls in integration/production mode.
        if ('serviceWorker' in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations()
            for (const registration of registrations) {
                await registration.unregister()
            }
            console.info('[Integration] MSW service worker unregistered.')
        }
    }

}

prepare().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <App />
        </StrictMode>,
    )
})
