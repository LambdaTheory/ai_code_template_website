import { MetadataRoute } from 'next'

// 站点基础URL，从环境变量获取或使用默认值
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// 静态页面配置
const staticPages = [
  {
    path: '/',
    priority: 1.0,
    changeFrequency: 'daily' as const,
  },
  {
    path: '/about',
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  },
  {
    path: '/contact',
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  },
  {
    path: '/isr-demo',
    priority: 0.6,
    changeFrequency: 'weekly' as const,
  },
]

// 生成静态页面的sitemap条目
export function generateSitemapPages(): MetadataRoute.Sitemap {
  return staticPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}

// 生成博客文章的sitemap条目
export async function generateBlogSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  // 这里可以从CMS、数据库或文件系统获取博客文章
  // 目前返回示例数据，你可以根据实际需求修改
  
  try {
    // 示例：如果你有博客文章数据，可以在这里获取
    // const posts = await getBlogPosts()
    
    // 目前返回空数组，因为模板中没有博客功能
    const blogPosts: Array<{
      slug: string
      lastModified: Date
      priority?: number
      changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
    }> = []
    
    return blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.lastModified,
      changeFrequency: post.changeFrequency || 'weekly',
      priority: post.priority || 0.6,
    }))
  } catch (error) {
    console.error('Error generating blog sitemap entries:', error)
    return []
  }
}

// 获取所有sitemap条目
export async function getAllSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const staticPages = generateSitemapPages()
  const blogPages = await generateBlogSitemapEntries()
  
  return [...staticPages, ...blogPages]
}
