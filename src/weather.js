// Бэкенд присылает sunny | rainy | stormy; русские значения оставлены как синонимы.
const ALIASES = {
  sunny: 'sunny', 'солнечно': 'sunny',
  rainy: 'rainy', rain: 'rainy', 'дождь': 'rainy',
  stormy: 'stormy', storm: 'stormy', 'буря': 'stormy',
}

export const WEATHER_LABELS = { sunny: 'солнечно', rainy: 'дождь', stormy: 'буря' }

export function normalizeWeather(value) {
  const key = String(value || '').toLowerCase().replace(/[^a-zа-яё]/g, '')
  return ALIASES[key] || 'sunny'
}
