'use client'
import { motion } from 'motion/react'
import { Spotlight } from '@/components/ui/spotlight'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllProjects } from '../../lib/contentful'
import { Terminal } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
// Types
type Project = {
  title: string
  description: string
  link: string
  uid: string
  technologies: string[]
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
          This page is currently in progress, and all projects are under development. Please note that some projects may not yet be accessible or may have incomplete information.
          </AlertDescription>
        </Alert>
        
        <h3 className="mb-3 text-lg font-medium">Projects</h3>
        <div className="flex flex-col space-y-0">
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
              {projects.length === 0 ? (
                <div className="flex h-40 items-center justify-center">
                  <p className="text-zinc-500 dark:text-zinc-400">
                    No projects found
                  </p>
                </div>
              ) : (
                projects.map((project) => (
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
        </div>
      </motion.section>
    </motion.main>
  )
}
