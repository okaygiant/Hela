"use client"

import { useEffect, useState } from "react"

const pad = (n: number) => String(n).padStart(2, "0")

/** 75 → «01:15», 3725 → «01:02:05». Часы показываем, только если они есть. */
function format(total: number) {
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`
}

/**
 * Обратный отсчёт до начала смены. Считает по часам (дедлайн), а не по числу тиков,
 * поэтому не отстаёт, если вкладка была в фоне. Дойдя до нуля, останавливается на 00:00
 * (что показывать после нуля, в макете не нарисовано).
 * TODO: когда появится бэкенд, брать время начала смены с сервера.
 */
export function ShiftCountdown({ seconds }: { seconds: number }) {
  const [left, setLeft] = useState(seconds)

  useEffect(() => {
    const end = Date.now() + seconds * 1000
    const id = setInterval(() => {
      const s = Math.max(0, Math.ceil((end - Date.now()) / 1000))
      setLeft(s)
      if (s === 0) clearInterval(id)
    }, 250)
    return () => clearInterval(id)
  }, [seconds])

  return (
    <time dateTime={`PT${left}S`} className="text-64 font-bold text-fg-primary tabular-nums">
      {format(left)}
    </time>
  )
}
