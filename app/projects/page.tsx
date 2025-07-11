'use client'
import { motion, AnimatePresence } from 'motion/react'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllProjects } from '../../lib/contentful'
import { Terminal } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
// Types
type Project = {
  title: string
  description: string
  link: string
  uid: string
  technologies: string[]
  projectType?: string
  coverImage?: string
}

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedTech, setSelectedTech] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)

  // Extract unique technologies and their counts
  const techCounts = projects.reduce<Record<string, number>>((acc, project) => {
    project.technologies?.forEach((tech) => {
      acc[tech] = (acc[tech] || 0) + 1
    })
    return acc
  }, {})
  const techList = Object.entries(techCounts).sort((a, b) => b[1] - a[1])

  // Extract unique project types and their counts
  const typeCounts = projects.reduce<Record<string, number>>((acc, project) => {
    if (project.projectType) {
      acc[project.projectType] = (acc[project.projectType] || 0) + 1
    }
    return acc
  }, {})
  const typeList = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])

  // Filter projects by selected technology and project type
  const filteredProjects = projects.filter((p) => {
    const techMatch = selectedTech
      ? p.technologies.includes(selectedTech)
      : true
    const typeMatch = selectedType ? p.projectType === selectedType : true
    return techMatch && typeMatch
  })

  function FilterChips() {
    return (
      <AnimatePresence initial={false}>
        {filterOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.18 }}
            style={{ transformOrigin: 'top' }}
            className="mb-3 overflow-hidden"
          >
            <div className="flex flex-col gap-2 rounded-lg bg-zinc-100 p-2 dark:bg-zinc-900">
              {/* Technology Section */}
              <div className="mb-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Technology
              </div>
              <div className="flex flex-wrap gap-2">
                {techList.length === 0 ? (
                  <span className="text-xs text-zinc-500">No technologies</span>
                ) : (
                  techList.map(([tech, count]) => (
                    <button
                      key={tech}
                      className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition focus:ring-2 focus:ring-zinc-400 focus:outline-none dark:focus:ring-zinc-600 ${
                        selectedTech === tech
                          ? 'border-zinc-800 bg-zinc-800 text-white dark:border-zinc-200 dark:bg-zinc-200 dark:text-zinc-900'
                          : 'border-zinc-200 bg-zinc-200 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300'
                      }`}
                      onClick={() =>
                        setSelectedTech(selectedTech === tech ? null : tech)
                      }
                    >
                      {tech}
                      <span className="ml-1 rounded bg-zinc-300 px-1 text-[10px] text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
                        {count}
                      </span>
                    </button>
                  ))
                )}
              </div>
              {/* Project Type Section */}
              <div className="mt-2 mb-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Project Type
              </div>
              <div className="flex flex-wrap gap-2">
                {typeList.length === 0 ? (
                  <span className="text-xs text-zinc-500">
                    No project types
                  </span>
                ) : (
                  typeList.map(([type, count]) => (
                    <button
                      key={type}
                      className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition focus:ring-2 focus:ring-zinc-400 focus:outline-none dark:focus:ring-zinc-600 ${
                        selectedType === type
                          ? 'border-zinc-800 bg-zinc-800 text-white dark:border-zinc-200 dark:bg-zinc-200 dark:text-zinc-900'
                          : 'border-zinc-200 bg-zinc-200 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300'
                      }`}
                      onClick={() =>
                        setSelectedType(selectedType === type ? null : type)
                      }
                    >
                      {type}
                      <span className="ml-1 rounded bg-zinc-300 px-1 text-[10px] text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
                        {count}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
            {(selectedTech || selectedType) && (
              <button
                className="mt-3 w-full rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                onClick={() => {
                  setSelectedTech(null)
                  setSelectedType(null)
                }}
              >
                Clear filter
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true)
        const projectsList = await getAllProjects()
        setProjects(projectsList)
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <motion.main
      className="space-y-24"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <Alert className="mb-10">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            This page is currently in progress, and all projects are under
            development. Please note that some projects may not yet be
            accessible or may have incomplete information.
          </AlertDescription>
        </Alert>
        <div className="flex w-full items-center justify-between">
          <h3 className="mb-3 text-lg font-medium">Projects</h3>
          <Button
            variant="ghost"
            onClick={() => setFilterOpen((v) => !v)}
            className="mb-2"
          >
            Filter by
          </Button>
        </div>
        <FilterChips />
        <motion.div
          key={selectedTech || selectedType || 'all'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18 }}
          className="flex flex-col space-y-0"
        >
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <p className="text-zinc-500 dark:text-zinc-400">
                Loading projects...
              </p>
            </div>
          ) : (
            <AnimatedBackground
              enableHover
              className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
              transition={{
                type: 'spring',
                bounce: 0,
                duration: 0.2,
              }}
            >
              {filteredProjects.length === 0 ? (
                <div className="flex h-40 items-center justify-center">
                  <p className="text-zinc-500 dark:text-zinc-400">
                    No projects found
                  </p>
                </div>
              ) : (
                filteredProjects.map((project) => (
                  <Link
                    key={project.uid}
                    className="-mx-3 rounded-xl px-3 py-4 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
                    href={project.link}
                    data-id={project.uid}
                  >
                    <div className="flex flex-col space-y-2">
                      <h4 className="text-lg font-medium dark:text-zinc-100">
                        {project.title}
                      </h4>
                      <p className="text-zinc-500 dark:text-zinc-400">
                        {project.description}
                      </p>
                      {project.technologies &&
                        project.technologies.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-2">
                            {project.technologies
                              .slice(0, 5)
                              .map((tech, index) => (
                                <span
                                  key={index}
                                  className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                                >
                                  {tech}
                                </span>
                              ))}
                            {project.technologies.length > 5 && (
                              <span className="px-1 py-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                                +{project.technologies.length - 5} more
                              </span>
                            )}
                          </div>
                        )}
                    </div>
                  </Link>
                ))
              )}
            </AnimatedBackground>
          )}
        </motion.div>
      </motion.section>
    </motion.main>
  )
}
