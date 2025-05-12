'use client'
import React, { useState, useRef } from 'react'
import { Button } from './button'

type Props = {
  children: React.ReactNode
  className?: string
  html?: string
}

export function CodeBlock({ children, className = '', html }: Props) {
  // Inline code: just render <code>
  if (!className || !className.startsWith('language-')) {
    return <code className={className}>{children}</code>
  }

  const [copied, setCopied] = useState(false)
  const language = className.replace('language-', '') || 'text'
  const code = String(children).trim()

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    })
  }

  return (
    <div className="relative group/copy rounded-lg">
      <div className="sticky opacity-0 group-hover/copy:opacity-100 top-2 py-2 h-12 w-0 float-right">
        <div className="absolute right-0 h-8 px-2 items-center inline-flex">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Copy to clipboard"
            onClick={handleCopy}
          >
            <div className="relative flex items-center justify-center w-full h-full">
              {/* Copy icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="14" 
                fill="currentColor" 
                viewBox="0 0 256 256" 
                className={`absolute transition-all ${copied ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}
              >
                <path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm72,184H56V48H82.75A47.93,47.93,0,0,0,80,64v8a8,8,0,0,0,8,8h80a8,8,0,0,0,8-8V64a47.93,47.93,0,0,0-2.75-16H200Z"></path>
              </svg>
              {/* Check icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="14" 
                fill="currentColor" 
                viewBox="0 0 256 256" 
                className={`absolute transition-all ${copied ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
              >
                <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
            </div>
          </Button>
        </div>
      </div>
      <div className="text-zinc-600 dark:text-zinc-400 text-xs p-3.5 pb-0">{language}</div>
      
      {/* Use the pre-highlighted HTML from the server if available */}
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <pre className="code-block__code !my-0 !rounded-lg !text-sm !leading-relaxed" style={{ background: 'transparent', color: 'rgb(171, 178, 191)', textShadow: 'rgba(0, 0, 0, 0.3) 0px 1px', fontFamily: '"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace', direction: 'ltr', textAlign: 'left', whiteSpace: 'pre', wordSpacing: 'normal', wordBreak: 'normal', lineHeight: 1.5, tabSize: 2, hyphens: 'none', padding: '1em', margin: '0.5em 0px', overflow: 'auto', borderRadius: '0.3em' }}>
          <code className={className}>{children}</code>
        </pre>
      )}
    </div>
  )
}