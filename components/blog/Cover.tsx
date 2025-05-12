export function Cover({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption: string
}) {
  return (
    <figure>
      <img src={src} alt={alt} className="w-full rounded-xl" />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-zinc-500 dark:text-zinc-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
