# Городской симулятор: фронтенд

Vite + React фронтенд для симуляции города: карта, чат с NPC, новости, погода и панель мэра. Бэкенд — репозиторий `LastSother/backend`.

## Стек
- React 18, Vite 4
- Tailwind CSS
- react-zoom-pan-pinch, react-icons, react-toastify

## Локальный запуск
```bash
npm install
# создайте .env с адресом бэкенда:
# VITE_BACKEND_URL=http://localhost:8000
npm run dev
```

Сборка: `npm run build`, предпросмотр сборки: `npm run preview`.

## Деплой на Vercel
- Фреймворк: Vite
- Переменная окружения: `VITE_BACKEND_URL=https://city-project-backend.onrender.com`
