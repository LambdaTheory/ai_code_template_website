import { Metadata } from 'next'
import seoConfig from '@/config/seo.json'

export interface SEOConfig {
  title?: string
  description?: string
  keywords?: string[]
  author?: string
  siteUrl?: string
  canonicalUrl?: string
  openGraph?: {
    type?: string
    siteName?: string
    locale?: string
    images?: Array<{
      url: string
      width: number
      height: number
      alt: string
    }>
  }
  twitter?: {
    card?: string
    site?: string
    creator?: string
  }
  structuredData?: Record<string, unknown>
}

export interface BlogArticleData {
  title: string
  description: string
  image?: string
  author: string
  datePublished: string
  dateModified?: string
  url: string
  keywords?: string[]
  category?: string
  wordCount?: number
}

// 生成基础 SEO metadata
export function generateSEOMetadata(config: SEOConfig = {}): Metadata {
  const defaults = seoConfig.defaults

  const mergedConfig = {
    ...defaults,
    ...config,
    openGraph: {
      ...defaults.openGraph,
      ...config.openGraph,
    },
    twitter: {
      ...defaults.twitter,
      ...config.twitter,
    },
  }

  return {
    title: mergedConfig.title,
    description: mergedConfig.description,
    keywords: mergedConfig.keywords,
    authors: mergedConfig.author ? [{ name: mergedConfig.author }] : undefined,
    alternates: {
      canonical: mergedConfig.canonicalUrl,
    },
    openGraph: {
      type: mergedConfig.openGraph?.type as 'website' | 'article',
      siteName: mergedConfig.openGraph?.siteName,
      locale: mergedConfig.openGraph?.locale,
      images: mergedConfig.openGraph?.images,
      title: mergedConfig.title,
      description: mergedConfig.description,
      url: mergedConfig.canonicalUrl,
    },
    twitter: {
      card: mergedConfig.twitter?.card as 'summary' | 'summary_large_image',
      site: mergedConfig.twitter?.site,
      creator: mergedConfig.twitter?.creator,
      title: mergedConfig.title,
      description: mergedConfig.description,
      images: mergedConfig.openGraph?.images?.[0]?.url,
    },
  }
}

// 生成博客文章的 SEO metadata
export function generateBlogSEOMetadata(
  articleData: BlogArticleData
): Metadata {
  return generateSEOMetadata({
    title: `${articleData.title} - ${seoConfig.blog.title}`,
    description: articleData.description,
    keywords: articleData.keywords || seoConfig.blog.keywords,
    author: articleData.author,
    canonicalUrl: articleData.url,
    openGraph: {
      ...seoConfig.blog.openGraph,
      type: 'article',
      images: articleData.image
        ? [
            {
              url: articleData.image,
              width: 1200,
              height: 630,
              alt: articleData.title,
            },
          ]
        : seoConfig.blog.openGraph.images,
    },
  })
}

// 生成结构化数据
export function generateStructuredData(
  type: 'website' | 'blog' | 'article',
  data?: BlogArticleData
): string {
  const structuredData = seoConfig.blog.structuredData

  switch (type) {
    case 'website':
      return JSON.stringify(structuredData.website, null, 2)

    case 'blog':
      return JSON.stringify(
        [
          structuredData.website,
          structuredData.organization,
          structuredData.blog,
        ],
        null,
        2
      )

    case 'article':
      if (!data) {
        throw new Error('Article data is required for article structured data')
      }

      const articleStructuredData = {
        ...structuredData.article,
        headline: data.title,
        description: data.description,
        image: data.image || structuredData.organization.logo.url,
        author: {
          '@type': 'Person',
          name: data.author,
        },
        datePublished: data.datePublished,
        dateModified: data.dateModified || data.datePublished,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url,
        },
        keywords: data.keywords?.join(', ') || '',
        articleSection: data.category || '技术文章',
        wordCount: data.wordCount,
      }

      return JSON.stringify(
        [
          structuredData.website,
          structuredData.organization,
          structuredData.blog,
          articleStructuredData,
        ],
        null,
        2
      )

    default:
      return JSON.stringify(structuredData.website, null, 2)
  }
}

// 获取配置
export function getSEOConfig() {
  return seoConfig
}

// 博客列表页面的 SEO
export function generateBlogListSEOMetadata(): Metadata {
  const blogConfig = seoConfig.blog

  return generateSEOMetadata({
    title: blogConfig.title,
    description: blogConfig.description,
    keywords: blogConfig.keywords,
    author: blogConfig.author,
    openGraph: blogConfig.openGraph,
    twitter: blogConfig.twitter,
  })
}
