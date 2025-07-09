import { MetadataRoute } from 'next'
import { generateSitemapPages, generateBlogSitemapEntries } from '@/lib/sitemap'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 获取静态页面
  const staticPages = generateSitemapPages()
  
  // 获取博客文章页面
  const blogPages = await generateBlogSitemapEntries()

  // 合并所有页面
  const allPages = [...staticPages, ...blogPages]

  return allPages.map((page) => ({
    url: page.url,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}