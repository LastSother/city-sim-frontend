# Городской симулятор: фронтенд

Vite + React фронтенд для симуляции города: карта, чат с NPC, новости, погода и панель мэра. Бэкенд — репозиторий [`LastSother/city-sim-backend`](https://github.com/LastSother/city-sim-backend).

## Стек
- React 18, Vite 8
- Tailwind CSS 4 (через `@tailwindcss/postcss`, конфиг `tailwind.config.js` подключён директивой `@config`)
- react-zoom-pan-pinch, react-icons, react-toastify

## Локальный запуск
```bash
npm install
cp .env.example .env   # адрес бэкенда и (необязательно) токен WebSocket
npm run dev
```

Сборка: `npm run build`, предпросмотр сборки: `npm run preview`.

## Деплой на Vercel
- Фреймворк: Vite
- Переменные окружения: `VITE_BACKEND_URL=https://city-project-backend.onrender.com`, при необходимости `VITE_WS_TOKEN` (= `WS_TOKEN` бэкенда)
- Домен фронтенда нужно добавить в `CORS_ORIGINS` бэкенда

## Переменные окружения
- `VITE_BACKEND_URL` — адрес бэкенда (по умолчанию `http://localhost:8000`)
- `VITE_WS_TOKEN` — токен WebSocket, если на бэкенде задан `WS_TOKEN`. Попадает в собранный бандл, поэтому это не секрет

## Погода и панель мэра
- Бэкенд присылает погоду как `sunny` / `rainy` / `stormy` (русские `солнечно` / `дождь` / `буря` тоже понимаются); фон карты — зелёный / серый / красный.
- Игрок участвует в выборах под именем `Игрок`. Панель мэра показывается, когда бэкенд сообщает, что мэр — игрок (`GET /mayor` → `is_player`, либо поле `is_player` в событии выборов).
- Для издания законов в панели нужно ввести токен мэра (`ADMIN_TOKEN` бэкенда). Он хранится только в `sessionStorage` и не попадает в бандл.
