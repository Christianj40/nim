import { MDXRemote } from 'next-mdx-remote/rsc'
import { Cover } from '@/components/blog/Cover'
import { CodeBlock } from '@/components/ui/codeblock'
import { getBlogPostBySlug } from '@/lib/contentful'
import { notFound } from 'next/navigation'
import { highlightCode } from '@/lib/highlight'

// Server component wrapper for code blocks
async function CodeBlockServer(props: { children: string; className?: string }) {
  const { children, className = '' } = props
  
  if (!className || !className.startsWith('language-')) {
    return <code className={className}>{children}</code>
  }
  
  const language = className.replace('language-', '') || 'text'
  const code = String(children).trim()
  
  // Highlight the code on the server
  const html = await highlightCode(code, language)
  
  // Pass the highlighted HTML and other props to the client component
  return <CodeBlock html={html} className={className}>{children}</CodeBlock>
}

// Define the components that can be used in MDX
const components = {
  Cover,
  code: CodeBlockServer,
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  // This is a server component that can directly access params
  const slug = params.slug

  // Pre-fetch the blog post on the server
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return notFound()
  }

  return (
    <article className="prose prose-gray dark:prose-invert prose-code:before:content-none prose-code:after:content-none">
      
      {post.coverImage && (
        <Cover
          src={post.coverImage}
          alt={post.coverAlt}
          caption={post.coverCaption}
        />
      )}
      <h1>{post.title}</h1>
      <p className="text-zinc-500 dark:text-zinc-400">{post.description}</p>
      <hr />
      <MDXRemote source={post.content} components={components} />
    </article>
  )
}
