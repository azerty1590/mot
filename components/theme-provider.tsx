/**
 * ThemeProvider.tsx
 *
 * Fournit le thème clair/sombre à l'application via un système compatible Tailwind.
 *
 * ✅ Remplace `next-themes` par un équivalent basé sur `useEffect` + `localStorage`.
 * ✅ Ce composant peut être utilisé avec `class` strategy (ex: `class="dark"` sur `<html>`).
 */

import { useEffect, useState, ReactNode } from "react"

interface ThemeProviderProps {
  children: ReactNode
  attribute?: "class" | "data-theme"
  defaultTheme?: "light" | "dark"
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "light",
  enableSystem = true,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return defaultTheme
    const stored = localStorage.getItem("theme")
    if (stored) return stored
    if (enableSystem && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark"
    }
    return defaultTheme
  })

  useEffect(() => {
    const root = document.documentElement
    if (attribute === "class") {
      root.classList.remove("light", "dark")
      root.classList.add(theme)
    } else {
      root.setAttribute(attribute, theme)
    }
    localStorage.setItem("theme", theme)
  }, [theme, attribute])

  return <>{children}</>
}
