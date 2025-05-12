'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  return (
    <header className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link href="/" className="font-medium text-black dark:text-white">
          <Image src="/square-logo.svg" alt="Stag Graphics" width={32} height={32} />
        </Link>
        {pathname !== '/sections' && (
          <TextEffect
            as="p"
            preset="fade"
            per="char"
            className="text-black dark:text-white"
            delay={0.5}
          >
            Stag Graphics
          </TextEffect>
        )}
      </div>
    </header>
  )
}
