import { useSyncExternalStore } from "react"

// Общее состояние полноэкранных панелей (меню и выбор языка) для шапки и таббара.
export type Panel = "menu" | "language"

// Языки утверждены: английский, испанский, португальский. Флаги по умолчанию (en: 🇬🇧), можно сменить.
export const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt-BR", label: "Português", flag: "🇧🇷" },
] as const
export type LanguageCode = (typeof LANGUAGES)[number]["code"]

type State = { panel: Panel | null; language: LanguageCode }
let state: State = { panel: null, language: "pt-BR" }
const listeners = new Set<() => void>()

function update(next: Partial<State>) {
  state = { ...state, ...next }
  listeners.forEach((fn) => fn())
}

export const panelStore = {
  open: (panel: Panel) => update({ panel }),
  close: () => {
    if (state.panel !== null) update({ panel: null })
  },
  toggle: (panel: Panel) => update({ panel: state.panel === panel ? null : panel }),
  setLanguage: (language: LanguageCode) => update({ language }),
  subscribe(fn: () => void) {
    listeners.add(fn)
    return () => {
      listeners.delete(fn)
    }
  },
}

export const usePanel = () =>
  useSyncExternalStore(panelStore.subscribe, () => state.panel, () => null)
export const useLanguage = () =>
  useSyncExternalStore(panelStore.subscribe, () => state.language, () => "pt-BR" as LanguageCode)
