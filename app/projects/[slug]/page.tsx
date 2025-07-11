import { MDXRemote } from 'next-mdx-remote/rsc'
import { getProjectBySlug } from '@/lib/contentful'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ExternalLinkIcon, GithubIcon } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

// Define the components that can be used in MDX
const components = {}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const slug = params.slug
  const project = await getProjectBySlug(slug)

  if (!project) {
    return notFound()
  }

  const formattedDate = project.completionDate
    ? new Date(project.completionDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
      })
    : null

  return (
    <>
      {/* Gallery or Cover Image */}
      {(project.gallery?.length > 0 || project.coverImage) && (
        <div className="mb-8">
          {project.gallery?.length > 0 ? (
            <Carousel className="w-full">
              <CarouselContent>
                {project.gallery.map((image: any, index: number) => (
                  <CarouselItem key={index}>
                    <div className="aspect-[4/3] w-full sm:aspect-[16/9]">
                      <img
                        src={
                          image.fields.file.url
                            ? `https:${image.fields.file.url}`
                            : '/placeholder.svg'
                        }
                        alt={image.fields.title || ''}
                        className="h-full w-full rounded-sm object-cover"
                      />
                      {image.fields.description && (
                        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                          {image.fields.description}
                        </p>
                      )}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          ) : (
            <div className="aspect-[4/3] w-full sm:aspect-[16/9]">
              <img
                src={project.coverImage || '/placeholder.svg'}
                alt={project.coverAlt || ''}
                className="h-full w-full rounded-sm object-cover"
              />
              {project.coverCaption && (
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  {project.coverCaption}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Title and Links in the same row */}
      <div className="mb-3 flex flex-wrap items-start justify-between gap-4">
        <h1 className="text-3xl font-normal text-zinc-900 dark:text-zinc-50">
          {project.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4">
          {project.projectUrl && (
            <Link
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              <ExternalLinkIcon className="h-3.5 w-3.5" />
              <span>View Project</span>
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>Source</span>
            </Link>
          )}
        </div>
      </div>

      {formattedDate && (
        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Completed:
            </span>
            <span className="text-xs text-zinc-600 dark:text-zinc-400">
              {formattedDate}
            </span>
          </div>
        </div>
      )}

      {project.technologies && project.technologies.length > 0 && (
        <div
          className={
            project.projectType &&
            (Array.isArray(project.projectType)
              ? project.projectType.length > 0
              : !!project.projectType)
              ? 'mb-1'
              : 'mb-8'
          }
        >
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Technologies:
            </span>
            {project.technologies.map((tech: string, index: number) => (
              <span
                key={index}
                className="text-xs text-zinc-600 dark:text-zinc-400"
              >
                {tech}
                {index < project.technologies.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      {project.projectType && (
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Project Type:
            </span>
            {Array.isArray(project.projectType) ? (
              project.projectType.map((tech: string, index: number) => (
                <span
                  key={index}
                  className="text-xs text-zinc-600 dark:text-zinc-400"
                >
                  {tech}
                  {index < project.projectType.length - 1 ? ',' : ''}
                </span>
              ))
            ) : (
              <span className="text-xs text-zinc-600 dark:text-zinc-400">
                {project.projectType}
              </span>
            )}
          </div>
        </div>
      )}

      <p className="mb-10 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
        {project.description}
      </p>

      <div className="prose prose-sm dark:prose-invert prose-headings:font-normal prose-headings:text-zinc-900 dark:prose-headings:text-zinc-50 prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-a:text-zinc-900 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-zinc-50 prose-img:rounded-sm prose-hr:border-zinc-200 dark:prose-hr:border-zinc-800 max-w-none">
        <MDXRemote source={project.content} components={components} />
      </div>

      {/* Contact Section */}
      <div className="mt-16 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <h2 className="text-xl font-normal text-zinc-900 dark:text-zinc-50">
          Interested in working together?
        </h2>
        <p className="mt-4 text-base text-zinc-700 dark:text-zinc-300">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision.
        </p>
        <div className="mt-6">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </>
  )
}
