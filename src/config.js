// Адрес бэкенда и токен WebSocket берутся из переменных окружения Vite.
export const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

// Необязательный токен WebSocket (WS_TOKEN на бэкенде). Он попадает в бандл, поэтому не является секретом.
const WS_TOKEN = import.meta.env.VITE_WS_TOKEN || ''

export function wsUrl(topic) {
  const base = BACKEND.replace(/^http/, 'ws')
  const query = WS_TOKEN ? `?token=${encodeURIComponent(WS_TOKEN)}` : ''
  return `${base}/ws/${topic}${query}`
}
