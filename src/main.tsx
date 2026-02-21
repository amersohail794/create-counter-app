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
    }
}

prepare().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <App />
        </StrictMode>,
    )
})
