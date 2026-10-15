import React, { useEffect, useState, useRef } from 'react'
import MapView from './components/MapView'
import ChatWindow from './components/ChatWindow'
import NewsFeed from './components/NewsFeed'
import Weather from './components/Weather'
import MayorPanel from './components/MayorPanel'
import { toast } from 'react-toastify'
import { BACKEND, wsUrl } from './config'
import { normalizeWeather } from './weather'

export default function App() {
  const [npcs, setNpcs] = useState([])
  const [selected, setSelected] = useState(null)
  const [weather, setWeather] = useState('sunny')
  const [isMayor, setIsMayor] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const wsRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mapRes, weatherRes, mayorRes] = await Promise.all([
          fetch(BACKEND + '/map'),
          fetch(BACKEND + '/weather'),
          fetch(BACKEND + '/mayor').catch(() => null)
        ])
        if (!mapRes.ok || !weatherRes.ok) throw new Error('Ошибка загрузки данных')
        const mapData = await mapRes.json()
        const weatherData = await weatherRes.json()
        setNpcs(mapData)
        setWeather(normalizeWeather(weatherData.current))
        if (mayorRes && mayorRes.ok) {
          const mayor = await mayorRes.json()
          setIsMayor(Boolean(mayor.is_player))
        }
        setLoading(false)
      } catch (error) {
        console.error('Ошибка загрузки:', error)
        toast.error('Не удалось загрузить данные с сервера')
        setLoading(false)
      }
    }
    fetchData()

    // Бэкенд рассылает события по темам: map_update (перемещения NPC) и news (новости, погода, выборы)
    const mapWs = new WebSocket(wsUrl('map_update'))
    mapWs.onmessage = (evt) => {
      try {
        const m = JSON.parse(evt.data)
        if (m.type === 'map_update') {
          setNpcs(prev => prev.map(p => p.id === m.data.id ? { ...p, x: m.data.x, y: m.data.y, state: { ...p.state, location: m.data.location } } : p))
        }
      } catch (e) {
        console.error('WebSocket ошибка:', e)
      }
    }
    const newsWs = new WebSocket(wsUrl('news'))
    newsWs.onmessage = (evt) => {
      try {
        const m = JSON.parse(evt.data)
        if (m.type !== 'news') return
        toast.info(`${m.data.title}: ${m.data.content}`)
        if (m.data.weather) {
          setWeather(normalizeWeather(m.data.weather))
        } else if (m.data.title.includes('Погода')) {
          // Совместимость со старым форматом «Теперь rainy.»
          setWeather(normalizeWeather(m.data.content.split(' ')[1]))
        }
        if ('is_player' in m.data) setIsMayor(Boolean(m.data.is_player))
      } catch (e) {
        console.error('WebSocket ошибка:', e)
      }
    }
    wsRef.current = { mapWs, newsWs }
    return () => { mapWs.close(); newsWs.close() }
  }, [])

  if (loading) return <div className="text-center py-10">Загрузка...</div>

  return (
    <div className="min-h-screen bg-city-bg p-4">
      <Weather current={weather} />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <MapView npcs={npcs} onSelect={(npc) => { setSelected(npc); setIsChatOpen(true); }} weather={weather} />
        </div>
        <div className="w-full md:w-80 lg:w-96 flex flex-col gap-4">
          <NewsFeed backend={BACKEND} />
          {isMayor && <MayorPanel backend={BACKEND} />}
        </div>
      </div>
      {isChatOpen && selected && (
        <ChatWindow backend={BACKEND} npc={selected} onClose={() => setIsChatOpen(false)} />
      )}
    </div>
  )
}
