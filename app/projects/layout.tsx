import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'View my portfolio of projects and case studies',
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}
