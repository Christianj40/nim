'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  children: string
  language?: string
  className?: string
}

export function CodeBlock({ children, language, className }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className={cn('group relative', className)}>
      <div className="flex items-center justify-between rounded-t-lg border border-zinc-200 bg-zinc-50 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-zinc-200 dark:hover:bg-zinc-800"
          onClick={copyToClipboard}
        >
          {isCopied ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
      <pre className="overflow-x-auto rounded-b-lg border border-t-0 border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <code className="text-sm text-zinc-900 dark:text-zinc-50">{children}</code>
      </pre>
    </div>
  )
} 