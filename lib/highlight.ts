import { createHighlighter } from 'shiki'

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null

export async function highlightCode(code: string, lang: string) {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({ 
      themes: ['min-light', 'min-dark'], 
      langs: [lang] 
    })
  }
  const highlighter = await highlighterPromise
  
  // Use dual themes for light/dark mode
  return highlighter.codeToHtml(code, { 
    lang, 
    themes: {
      light: 'min-light',
      dark: 'min-dark'
    }
  })
}