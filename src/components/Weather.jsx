import React from 'react'
import { FaSun, FaCloudRain, FaBolt } from 'react-icons/fa'
import { normalizeWeather, WEATHER_LABELS } from '../weather'

export default function Weather({ current }) {
  const icons = {
    sunny: <FaSun className="text-yellow-500 text-2xl" />,
    rainy: <FaCloudRain className="text-blue-500 text-2xl" />,
    stormy: <FaBolt className="text-purple-500 text-2xl" />
  }
  const key = normalizeWeather(current)

  return (
    <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm mb-4">
      <span className="text-lg font-semibold">Погода:</span>
      {icons[key]}
      <span className="capitalize">{WEATHER_LABELS[key]}</span>
    </div>
  )
}
