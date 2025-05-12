'use client'
import { TextLoop } from '@/components/ui/text-loop'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleThemeChange = () => {
    // Cycle through themes: light -> dark -> system -> light
    const themeOrder = ['light', 'dark']
    const currentIndex = themeOrder.indexOf(theme ?? 'dark')
    const nextIndex = (currentIndex + 1) % themeOrder.length
    setTheme(themeOrder[nextIndex])
  }

  return (
    <button
      onClick={handleThemeChange}
      className="h-8 cursor-pointer rounded-lg px-4 py-0.5 transition-colors duration-200 hover:bg-zinc-200 md:h-5 md:px-2 dark:hover:bg-zinc-800"
      aria-label="Toggle theme"
      type="button"
    >
      <div className="h-2 w-2 rounded-full bg-zinc-900/80 dark:bg-zinc-100" />
    </button>
  )
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-100 px-0 py-4 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <a href="https://github.com/ibelick/Stag Graphics" target="_blank">
          <TextLoop className="text-xs text-zinc-500">
            <span>© 2024 Stag Graphics.</span>
            <span>Built with Motion-Primitives.</span>
          </TextLoop>
        </a>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <a href="https://stagsections.com">Stag Sections</a>
          |
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  )
}
