import React, { useState } from 'react'
import { toast } from 'react-toastify'

// Токен мэра (ADMIN_TOKEN бэкенда) вводится вручную и хранится только в sessionStorage,
// чтобы секрет не попадал в собранный бандл.
const TOKEN_KEY = 'cityAdminToken'

export default function MayorPanel({ backend }) {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '')

  const saveToken = (value) => {
    setToken(value)
    if (value) sessionStorage.setItem(TOKEN_KEY, value)
    else sessionStorage.removeItem(TOKEN_KEY)
  }

  const issueLaw = async (law) => {
    if (!token) {
      toast.error('Введите токен мэра')
      return
    }
    try {
      const res = await fetch(`${backend}/issue_law`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Token': token },
        body: JSON.stringify({ law })
      })
      if (res.status === 401) toast.error('Неверный токен мэра')
      else if (!res.ok) toast.error('Не удалось издать закон')
    } catch (e) {
      console.error('Ошибка закона:', e)
      toast.error('Не удалось издать закон')
    }
  }

  return (
    <div className="border border-gray-300 p-4 rounded-lg bg-white shadow-lg">
      <h3 className="font-bold text-lg mb-3">Панель мэра</h3>
      <input
        type="password"
        value={token}
        onChange={(e) => saveToken(e.target.value)}
        className="w-full border border-gray-200 p-2 rounded-lg mb-3 text-sm"
        placeholder="Токен мэра"
        autoComplete="off"
      />
      <div className="flex flex-wrap gap-2">
        <button onClick={() => issueLaw('повысить налоги')} className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-yellow-600">Повысить налоги</button>
        <button onClick={() => issueLaw('объявить праздник')} className="bg-pink-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-pink-600">Объявить праздник</button>
        <button onClick={() => issueLaw('запретить преступления')} className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600">Запретить преступления</button>
      </div>
    </div>
  )
}
