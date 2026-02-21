import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    // Load env vars for the current mode so we can read VITE_ORCHESTRA_TARGET
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [react(), tailwindcss()],

        resolve: {
            alias: {
                // Enables: import { apiClient } from '@/services/apiClient'
                '@': path.resolve(__dirname, './src'),
            },
        },

        server: {
            proxy: mode === 'integration'
                ? {
                    // All /api/* calls are proxied to the real Orchestra server.
                    // The real SSOcookie in your browser is forwarded automatically.
                    '/api': {
                        target: env.VITE_ORCHESTRA_TARGET,
                        changeOrigin: true,
                        secure: false, // set to true if Orchestra uses a valid HTTPS cert
                        // Uncomment + adjust if Orchestra API lives under a sub-path e.g. /rest/api:
                        // rewrite: (path) => path.replace(/^\/api/, '/rest/api'),
                        configure: (proxy) => {
                            proxy.on('error', (err) => {
                                console.error('[proxy] Error:', err.message)
                            })
                            proxy.on('proxyReq', (_proxyReq, req) => {
                                console.info(`[proxy] ${req.method} ${req.url}`)
                            })
                        },
                    },
                }
                : undefined, // No proxy in mock (development) or production mode
        },
    }
})
