// Минимальные типы Telegram Mini Apps (WebApp API) — только то, что используем.
// Источник: https://core.telegram.org/bots/webapps
export {}

declare global {
  interface TelegramInsets {
    top: number
    bottom: number
    left: number
    right: number
  }

  interface TelegramThemeParams {
    bg_color?: string
    text_color?: string
    hint_color?: string
    link_color?: string
    button_color?: string
    button_text_color?: string
    secondary_bg_color?: string
    header_bg_color?: string
    bottom_bar_bg_color?: string
    accent_text_color?: string
    section_bg_color?: string
    section_header_text_color?: string
    section_separator_color?: string
    subtitle_text_color?: string
    destructive_text_color?: string
  }

  /** Нативная кнопка «назад» в шапке Telegram. Bot API 6.1+ */
  interface TelegramBackButton {
    isVisible: boolean
    show(): void
    hide(): void
    onClick(handler: () => void): void
    offClick(handler: () => void): void
  }

  interface TelegramWebApp {
    initData: string
    initDataUnsafe: Record<string, unknown>
    version: string
    platform: string
    colorScheme: "light" | "dark"
    themeParams: TelegramThemeParams
    isExpanded: boolean
    viewportHeight: number
    viewportStableHeight: number
    /** Bot API 8.0+ */
    isFullscreen?: boolean
    /** Bot API 8.0+ */
    safeAreaInset?: TelegramInsets
    /** Bot API 8.0+ */
    contentSafeAreaInset?: TelegramInsets
    /** Bot API 6.1+ */
    BackButton?: TelegramBackButton
    isVersionAtLeast?(version: string): boolean
    /** Bot API 6.9+: просит у пользователя разрешение, чтобы бот мог писать ему сообщения */
    requestWriteAccess?(callback?: (allowed: boolean) => void): void
    ready(): void
    expand(): void
    close(): void
    /** Bot API 8.0+ */
    requestFullscreen?(): void
    /** Bot API 6.1+ */
    setHeaderColor?(color: string): void
    /** Bot API 6.1+ */
    setBackgroundColor?(color: string): void
    /** Bot API 7.10+ */
    setBottomBarColor?(color: string): void
    /** Bot API 7.7+ */
    disableVerticalSwipes?(): void
    onEvent(eventType: string, handler: () => void): void
    offEvent(eventType: string, handler: () => void): void
  }

  interface Window {
    Telegram?: { WebApp?: TelegramWebApp }
  }
}
