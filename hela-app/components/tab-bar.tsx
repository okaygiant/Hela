"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { LANGUAGES, panelStore, useLanguage, usePanel, type Panel } from "@/components/menu-store"
import { PRESS } from "@/components/press"

// Таббар из Figma (498:2354). Переключение: активная плашка плавно меняет ширину и заливку,
// иконка слегка увеличивается. Анимацию в макете не рисовали, параметры согласуем отдельно.
//
// Меню: идея из rit3zh/expo-linear-like-bottom-tabs. Пилюля вытягивается на весь экран,
// вкладки гаснут, пункты выезжают по очереди (stagger). Тайминги оттуда: 300 мс,
// сдвиг пунктов 0,05 прогресса на пункт. Макета меню нет, пункты ниже временные.
const TABS = [
  { label: "Work", icon: "/helabet/icons/tab-work.webp", w: 160, h: 141 },
  { label: "Bet", icon: "/helabet/icons/tab-bet.webp", w: 160, h: 157 },
  { label: "Play", icon: "/helabet/icons/tab-play.webp", w: 160, h: 160 },
]

// ЗАГЛУШКИ: состав меню не утверждён.
const MENU_ITEMS = ["Profile", "Leaderboard", "Settings", "Support"]
const ROWS = 5 // пункты (до 4) + кнопка закрытия: нужна для задержки появления кнопки

// Жест: тянем пилюлю вверх, меню следует за пальцем. Числа в px.
const DRAG_RANGE = 320 // сколько px пальца = полное раскрытие
const DRAG_THRESHOLD = 8 // меньше этого считаем касанием, а не жестом
const MENU_MAX = 384 // = max-h-96
const TABS_MAX = 64 // = max-h-16
const MARGIN_CLOSED = 20 // = mb-5
const RADIUS_PILL = 37 // половина высоты закрытой пилюли
const clamp = (v: number) => Math.min(1, Math.max(0, v))

export function TabBar() {
  const [active, setActive] = useState(0)
  const [selected, setSelected] = useState(0)
  const panel = usePanel()
  const open = panel !== null
  const language = useLanguage()
  const lastPanel = useRef<Panel>("menu")
  if (panel) lastPanel.current = panel // пока меню закрывается, продолжаем показывать его содержимое
  const current = lastPanel.current
  const items =
    current === "language"
      ? LANGUAGES.map((l) => ({ id: l.code, label: `${l.flag}  ${l.label}`, selected: l.code === language }))
      : MENU_ITEMS.map((label, i) => ({ id: label, label, selected: i === selected }))
  const [drag, setDrag] = useState<number | null>(null) // прогресс 0..1 во время жеста
  const gesture = useRef({ startY: 0, startT: 0, lastY: 0, lastT: 0, active: false, moved: false })

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") panelStore.close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const progress = (dy: number) => clamp((open ? 1 : 0) - dy / DRAG_RANGE)

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const now = e.timeStamp
    gesture.current = { startY: e.clientY, startT: now, lastY: e.clientY, lastT: now, active: true, moved: false }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const g = gesture.current
    if (!g.active) return
    const dy = e.clientY - g.startY
    if (!g.moved) {
      if (Math.abs(dy) < DRAG_THRESHOLD) return
      g.moved = true
      e.currentTarget.setPointerCapture(e.pointerId)
    }
    g.lastY = e.clientY
    g.lastT = e.timeStamp
    setDrag(progress(dy))
  }

  const finishDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const g = gesture.current
    if (!g.active) return
    g.active = false
    if (!g.moved) return
    const dy = e.clientY - g.startY
    const dt = Math.max(1, e.timeStamp - g.lastT)
    const velocity = (e.clientY - g.lastY) / dt // px/мс, минус = вверх
    const p = progress(dy)
    const shouldOpen = velocity < -0.5 ? true : velocity > 0.5 ? false : p > 0.4
    if (shouldOpen) panelStore.open(panel ?? "menu")
    else panelStore.close()
    setDrag(null)
  }

  // После жеста не даём сработать клику по кнопке под пальцем
  const onClickCapture = (e: React.MouseEvent) => {
    if (gesture.current.moved) {
      e.stopPropagation()
      e.preventDefault()
      gesture.current.moved = false
    }
  }

  const dragging = drag !== null
  const p = drag ?? 0
  // nav растягивается на весь экран при открытии и остаётся таким, пока не доиграет закрытие (300 мс),
  // иначе проценты min-height схлопнутся мгновенно
  const wantFull = open || dragging
  const [navFull, setNavFull] = useState(false)
  useEffect(() => {
    if (wantFull) {
      setNavFull(true)
      return
    }
    const t = setTimeout(() => setNavFull(false), 350)
    return () => clearTimeout(t)
  }, [wantFull])
  const expanded = wantFull || navFull
  const itemProgress = (i: number) => clamp((p - 0.15 - i * 0.1) / 0.5)
  const rowStyle = (i: number): React.CSSProperties =>
    dragging
      ? {
          opacity: itemProgress(i),
          transform: `translateY(${(1 - itemProgress(i)) * 32}px) scale(${0.95 + 0.05 * itemProgress(i)})`,
        }
      : { transitionDelay: open ? `${100 + i * 50}ms` : "0ms" }
  const rowClass = `motion-reduce:transition-none ${
    dragging ? "transition-none" : "transition-all duration-300 ease-out"
  } ${open ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-95 opacity-0"}`

  return (
    <nav
      aria-label="Main"
      className={`fixed inset-x-0 bottom-0 z-10 flex items-end justify-center pb-safe-bottom ${expanded ? "top-0" : ""}`}
    >
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-20 bg-scrim-bottom backdrop-blur-glass-md mask-t-from-40%" />
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onClickCapture={onClickCapture}
        style={
          dragging
            ? {
                borderRadius: `${RADIUS_PILL * (1 - p)}px`,
                minHeight: `${p * 100}%`,
                minWidth: `${p * 100}%`,
                marginBottom: `${(1 - p) * MARGIN_CLOSED}px`,
              }
            : undefined
        }
        className={`relative flex w-fit touch-none flex-col overflow-hidden border p-1 backdrop-blur-glass-sm motion-reduce:transition-none ${
          dragging ? "transition-none" : "transition-all duration-300 ease-out"
        } ${
          open
            ? "mb-0 min-h-full min-w-full rounded-none border-transparent bg-surface-hero pt-safe-top"
            : "mb-5 min-h-0 min-w-0 rounded-full border-line-default bg-surface-tabbar"
        }`}
      >
        {/* Пункты меню: по центру экрана; в закрытом виде ширину пилюли задают вкладки */}
        <ul
          id="main-menu"
          inert={!open}
          style={dragging ? { maxHeight: `${p * MENU_MAX}px` } : undefined}
          className={`my-auto flex w-0 min-w-full flex-col gap-2 overflow-hidden motion-reduce:transition-none ${
            dragging ? "transition-none" : "transition-all duration-300 ease-out"
          } ${open ? "max-h-96" : "max-h-0"}`}
        >
          {items.map((item, i) => (
            <li key={item.id} style={rowStyle(i)} className={rowClass}>
              <button
                type="button"
                aria-current={item.selected ? "true" : undefined}
                onClick={() => {
                  if (current === "language") panelStore.setLanguage(item.id as (typeof LANGUAGES)[number]["code"])
                  else setSelected(i)
                  panelStore.close()
                }}
                className={`${PRESS} flex h-14 w-full items-center justify-center rounded-full px-4 text-24 font-bold ${
                  item.selected ? "bg-surface-tab-active text-fg-primary" : "bg-transparent text-fg-secondary"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Закрыть: шапка с кнопкой меню закрыта развёрнутым меню */}
        <div
          inert={!open}
          style={rowStyle(ROWS - 1)}
          className={`${rowClass} ${open ? "mb-5 max-h-16" : "mb-0 max-h-0"} overflow-hidden`}
        >
          <button
            type="button"
            onClick={() => panelStore.close()}
            className={`${PRESS} flex h-button w-full items-center justify-center rounded-full bg-surface-glass shadow-glass-button text-17 font-medium text-fg-primary`}
          >
            Close
          </button>
        </div>

        {/* Вкладки: гаснут и сворачиваются, когда открыто меню */}
        <div
          inert={open}
          style={
            dragging
              ? { maxHeight: `${(1 - p) * TABS_MAX}px`, opacity: clamp(1 - p * 2.5), transform: `scale(${1 - 0.1 * p})` }
              : undefined
          }
          className={`flex items-center gap-2 motion-reduce:transition-none ${
            dragging ? "transition-none" : "transition-all duration-300 ease-out"
          } ${open ? "max-h-0 scale-90 opacity-0" : "max-h-16 scale-100 opacity-100"}`}
        >
          {TABS.map((tab, i) => {
            const isActive = i === active
            return (
              <button
                key={tab.label}
                type="button"
                aria-current={isActive ? "page" : undefined}
                onClick={() => setActive(i)}
                className={`${PRESS} flex h-16 shrink-0 flex-col items-center justify-center gap-1 rounded-full px-1.5 py-2.5 text-12 font-semibold text-fg-primary motion-reduce:transition-none ${
                  isActive ? "w-21 bg-surface-tab-active" : "w-19 bg-transparent"
                }`}
              >
                <Image
                  src={tab.icon}
                  alt=""
                  width={tab.w}
                  height={tab.h}
                  sizes="32px"
                  className={`h-6 w-auto transition-transform duration-200 ease-out motion-reduce:transition-none ${isActive ? "scale-110" : "scale-100"}`}
                />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
