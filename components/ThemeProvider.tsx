"use client"

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react"
import { Moon, Sun } from "lucide-react"

type Theme = "light" | "dark"
interface ThemeCtx { theme: Theme; toggleTheme: () => void }
const ThemeContext = createContext<ThemeCtx>({ theme: "light", toggleTheme: () => {} })
const CHANGED = "md-theme-changed"
let override: Theme | null = null

function getTheme(): Theme {
  if (override) return override
  try {
    const stored = localStorage.getItem("theme")
    if (stored === "light" || stored === "dark") return stored
  } catch { /* Storage can be disabled. The current tab still supports toggling. */ }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}
function serverTheme(): Theme { return "light" }
function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)")
  const onStorage = (event: StorageEvent) => {
    if (event.key === "theme" || event.key === null) { override = null; onChange() }
  }
  window.addEventListener("storage", onStorage)
  window.addEventListener(CHANGED, onChange)
  media.addEventListener("change", onChange)
  return () => {
    window.removeEventListener("storage", onStorage)
    window.removeEventListener(CHANGED, onChange)
    media.removeEventListener("change", onChange)
  }
}
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getTheme, serverTheme)
  useEffect(() => { document.documentElement.classList.toggle("dark", theme === "dark") }, [theme])
  const toggleTheme = useCallback(() => {
    override = getTheme() === "light" ? "dark" : "light"
    try { localStorage.setItem("theme", override) } catch { /* Optional persistence. */ }
    window.dispatchEvent(new Event(CHANGED))
  }, [])
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
export function useTheme() { return useContext(ThemeContext) }
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return <button onClick={toggleTheme} className="size-8 flex items-center justify-center text-ink/50 hover:text-ink transition-colors" aria-label="Toggle theme">
    {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
  </button>
}
