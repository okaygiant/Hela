/** Telegram Mini App (WebApp) — доступ к SDK. Работает только в браузере. */

export function getTelegramWebApp(): TelegramWebApp | null {
  if (typeof window === "undefined") return null
  return window.Telegram?.WebApp ?? null
}

/** true, если приложение реально открыто внутри Telegram (а не в обычном браузере). */
export function isInsideTelegram(): boolean {
  const tg = getTelegramWebApp()
  return Boolean(tg && tg.initData)
}
