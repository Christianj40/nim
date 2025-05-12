type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
  archived?: boolean
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Motion Primitives Pro',
    description:
      'Advanced components and templates to craft beautiful websites.',
    link: 'https://pro.motion-primitives.com/',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0',
    id: 'project1',
  },
  {
    name: 'Motion Primitives',
    description: 'UI kit to make beautiful, animated interfaces.',
    link: 'https://motion-primitives.com/',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'project2',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Player Coach Connection',
    title: 'Full-Stack Developer',
    start: '2021',
    end: 'Present',
    link: 'https://playercoachconnection.com',
    id: 'work1',
  },
  {
    company: 'ABCO Inc',
    title: 'Full-Stack Developer | Graphic Designer',
    start: '2021',
    end: 'Present',
    link: 'https://abcoinc.com',
    id: 'work2',
  },
  {
    company: 'Meraki Talent Agency',
    title: 'Wordpress Developer',
    start: '2014',
    end: '2020',
    link: 'https://merakitalentagency.com',
    id: 'work3',
  },
  {
    company: 'Med-Lift',
    title: 'Wordpress Developer',
    start: '2016',
    end: '2018',
    link: 'https://med-lift.com',
    id: 'work4',
    archived: true,
  },
  {
    company: 'Southern Belle Originals',
    title: 'Graphic Designer',
    start: '2014',
    end: '2016',
    link: 'https://southernbelleoriginals.com',
    id: 'work5',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Exploring the Intersection of Design, AI, and Design Engineering',
    description: 'How AI is changing the way we design',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
  },
  {
    title: 'Why I left my job to start my own company',
    description:
      'A deep dive into my decision to leave my job and start my own company',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-2',
  },
  {
    title: 'What I learned from my first year of freelancing',
    description:
      'A look back at my first year of freelancing and what I learned',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-3',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'BlueSky',
    link: 'https://bsky.app/profile/staggraphics.com',
  },
  {
    label: 'Facebook',
    link: 'https://www.facebook.com/staggraphics/',
  },
  {
    label: 'Twitter',
    link: 'https://twitter.com/staggraphics',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/company/staggraphics',
  },
  {
    label: 'Instagram',
    link: 'https://www.instagram.com/staggraphics',
  },
  {
    label: 'TikTok',
    link: 'https://www.tiktok.com/@staggraphics',
  },
]

export const EMAIL = 'christian@staggraphics.com'
