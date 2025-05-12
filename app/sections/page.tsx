'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight, Code, Layout, Package, Zap, Mail } from 'lucide-react'
import { useState } from 'react'

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) throw new Error('Failed to subscribe')
      
      setStatus('success')
      setMessage('Thanks for subscribing! We\'ll keep you updated.')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md">
      <div className="flex flex-col gap-4 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-50"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {status === 'loading' ? (
            'Subscribing...'
          ) : (
            <>
              Subscribe
              <Mail className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
      {message && (
        <p
          className={`mt-2 text-sm ${status === 'error' ? 'text-red-500' : 'text-zinc-600 dark:text-zinc-400'}`}
        >
          {message}
        </p>
      )}
    </form>
  )
}

export default function SectionsPage() {
  const scrollToForm = () => {
    const form = document.getElementById('newsletter-form')
    form?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h1 className="mb-6 text-4xl font-normal text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Stag Sections
        </h1>
        <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">
          A powerful WordPress plugin that brings Shadcn UI's beautiful components to your WordPress site. Create stunning, reusable blocks with ease.
        </p>
        <button
          onClick={scrollToForm}
          className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Sign up for updates
          <Mail className="h-4 w-4" />
        </button>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-16 space-y-8"
      >
        <div className="flex items-start gap-4">
          <div className="mt-1 rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
            <Layout className="h-5 w-5 text-zinc-900 dark:text-zinc-50" />
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium text-zinc-900 dark:text-zinc-50">Beautiful Components</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Access a library of beautifully designed components based on Shadcn UI, ready to use in your WordPress site.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1 rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
            <Package className="h-5 w-5 text-zinc-900 dark:text-zinc-50" />
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium text-zinc-900 dark:text-zinc-50">Reusable Blocks</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Create and save custom blocks that you can reuse across your site, saving time and maintaining consistency.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1 rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
            <Zap className="h-5 w-5 text-zinc-900 dark:text-zinc-50" />
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium text-zinc-900 dark:text-zinc-50">Lightning Fast</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Optimized for performance, ensuring your site loads quickly and provides a smooth user experience.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Newsletter Section */}
      <motion.div
        id="newsletter-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-16 rounded-lg border border-zinc-200 bg-zinc-50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900"
      >
        <h2 className="mb-4 text-xl font-medium text-zinc-900 dark:text-zinc-50">
          Be the first to know when we launch
        </h2>
        <p className="mb-6 text-zinc-600 dark:text-zinc-400">
          Sign up to get early access, development updates, and exclusive previews of new features.
        </p>
        <NewsletterForm />
      </motion.div>
    </div>
  )
} 