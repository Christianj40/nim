import { createClient } from 'contentful'
import type { EntryFieldTypes } from 'contentful'

// Define the content type for Contentful
interface BlogPostSkeleton {
  contentTypeId: 'blogPost'
  fields: {
    title: EntryFieldTypes.Text
    slug: EntryFieldTypes.Text
    description: EntryFieldTypes.Text
    content: EntryFieldTypes.Text
    coverImage: EntryFieldTypes.AssetLink
    publishedDate: EntryFieldTypes.Date
  }
}

// Define the content type for Projects
interface ProjectSkeleton {
  contentTypeId: 'project'
  fields: {
    title: EntryFieldTypes.Text
    slug: EntryFieldTypes.Text
    description: EntryFieldTypes.Text
    content: EntryFieldTypes.Text
    coverImage: EntryFieldTypes.AssetLink
    technologies: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
    projectUrl: EntryFieldTypes.Text
    githubUrl: EntryFieldTypes.Text
    completionDate: EntryFieldTypes.Date
  }
}

// Create a Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
})

// Transform Contentful blog post to our app's format
export function transformContentfulBlogPost(post: any) {
  return {
    title: post.fields.title,
    description: post.fields.description,
    link: `/blog/${post.fields.slug}`,
    uid: post.sys.id,
    coverImage: post.fields.coverImage?.fields?.file?.url || '',
    coverAlt: post.fields.coverImage?.fields?.title || '',
    coverCaption: post.fields.coverImage?.fields?.description || '',
    content: post.fields.content,
    publishedDate: post.fields.publishedDate,
  }
}

// Transform Contentful project to our app's format
export function transformContentfulProject(project: any) {
  // Safely extract fields with fallbacks
  const fields = project?.fields || {}
  const coverImage = fields.coverImage?.fields?.file?.url

  return {
    title: fields.title || 'Untitled Project',
    description: fields.description || '',
    link: `/projects/${fields.slug}`,
    uid: project.sys?.id || '',
    coverImage: coverImage ? `https:${coverImage}` : '',
    coverAlt: fields.coverImage?.fields?.title || '',
    coverCaption: fields.coverImage?.fields?.description || '',
    content: fields.content || '',
    technologies: fields.technologies || [],
    projectUrl: fields.projectUrl || '',
    githubUrl: fields.githubUrl || '',
    completionDate: fields.completionDate || null,
    gallery: fields.gallery || [],
  }
}

// Get all blog posts
export async function getAllBlogPosts() {
  try {
    const response = await client.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      order: ['-fields.publishedDate'],
    })

    return response.items.map(transformContentfulBlogPost)
  } catch (error) {
    console.error('Error fetching blog posts from Contentful:', error)
    return []
  }
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug: string) {
  try {
    const response = await client.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    })

    if (response.items.length === 0) {
      return null
    }

    return transformContentfulBlogPost(response.items[0])
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error)
    return null
  }
}

// Get all projects
export async function getAllProjects() {
  try {
    const response = await client.getEntries<ProjectSkeleton>({
      content_type: 'project',
      order: ['-fields.completionDate'],
    })

    return response.items.map(transformContentfulProject)
  } catch (error) {
    console.error('Error fetching projects from Contentful:', error)
    return []
  }
}

// Get a single project by slug
export async function getProjectBySlug(slug: string) {
  try {
    const response = await client.getEntries<ProjectSkeleton>({
      content_type: 'project',
      'fields.slug': slug,
      limit: 1,
    })

    if (response.items.length === 0) {
      return null
    }

    return transformContentfulProject(response.items[0])
  } catch (error) {
    console.error(`Error fetching project with slug ${slug}:`, error)
    return null
  }
}
