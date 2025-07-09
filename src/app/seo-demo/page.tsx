import { generateBlogSEOMetadata, generateStructuredData, BlogArticleData } from '@/lib/seo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

// 模拟博客文章数据
const articleData: BlogArticleData = {
  title: 'Next.js中使用JSON配置SEO的完整指南',
  description: '详细介绍如何在Next.js项目中通过JSON文件配置SEO元数据，包括结构化数据的实现方法和最佳实践。',
  image: '/images/nextjs-seo-guide.jpg',
  author: '张开发者',
  datePublished: '2024-01-15T10:00:00+08:00',
  dateModified: '2024-01-16T15:30:00+08:00',
  url: 'https://ai-code-template.com/blog/nextjs-seo-json-config',
  keywords: ['Next.js', 'SEO', 'JSON配置', '结构化数据', 'metadata'],
  category: '前端开发',
  wordCount: 2500,
}

export const metadata = generateBlogSEOMetadata(articleData)

export default function BlogSEODemoPage() {
  const structuredDataJson = generateStructuredData('article', articleData)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 结构化数据脚本 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataJson }}
      />

      <div className="space-y-8">
        {/* 页面标题 */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Next.js SEO配置演示页面
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            展示如何通过JSON文件配置SEO元数据和结构化数据
          </p>
        </header>

        <Separator />

        {/* 当前文章信息 */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📝 当前演示文章信息
                <Badge variant="secondary">演示数据</Badge>
              </CardTitle>
              <CardDescription>
                以下是当前页面使用的SEO配置数据
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">标题</h3>
                  <p className="text-gray-700">{articleData.title}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">作者</h3>
                  <p className="text-gray-700">{articleData.author}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">发布时间</h3>
                  <p className="text-gray-700">
                    {new Date(articleData.datePublished).toLocaleDateString('zh-CN')}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">字数统计</h3>
                  <p className="text-gray-700">{articleData.wordCount} 字</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">描述</h3>
                <p className="text-gray-700">{articleData.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">关键词</h3>
                <div className="flex flex-wrap gap-2">
                  {articleData.keywords?.map((keyword) => (
                    <Badge key={keyword} variant="outline">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* SEO实现说明 */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>🚀 SEO实现特性</CardTitle>
              <CardDescription>
                此页面实现的SEO功能列表
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h2 className="font-semibold text-green-700">✅ 基础SEO</h2>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 动态页面标题</li>
                    <li>• Meta描述</li>
                    <li>• 关键词标签</li>
                    <li>• 作者信息</li>
                    <li>• Canonical URL</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h2 className="font-semibold text-blue-700">🌐 Open Graph</h2>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• OG标题和描述</li>
                    <li>• 社交媒体图片</li>
                    <li>• 网站类型设置</li>
                    <li>• 多语言支持</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h2 className="font-semibold text-purple-700">🐦 Twitter Cards</h2>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Large image card</li>
                    <li>• 网站和创建者标识</li>
                    <li>• 自动图片优化</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h2 className="font-semibold text-orange-700">📊 结构化数据</h2>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• BlogPosting Schema</li>
                    <li>• Organization Schema</li>
                    <li>• WebSite Schema</li>
                    <li>• 搜索功能集成</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 配置文件展示 */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>⚙️ JSON配置文件结构</CardTitle>
              <CardDescription>
                查看SEO配置的JSON文件结构
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">文件位置</h3>
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                    src/config/seo.json
                  </code>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">使用方式</h3>
                  <pre className="text-sm bg-gray-100 p-3 rounded overflow-x-auto">
{`import { generateBlogSEOMetadata } from '@/lib/seo'

const articleData = {
  title: '文章标题',
  description: '文章描述',
  author: '作者名称',
  // ... 其他配置
}

export const metadata = generateBlogSEOMetadata(articleData)`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 结构化数据预览 */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>🏗️ 生成的结构化数据</CardTitle>
              <CardDescription>
                当前页面的JSON-LD结构化数据（已注入到页面head中）
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto max-h-96 text-gray-700">
                  {structuredDataJson}
                </pre>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>提示：</strong> 您可以使用 
                  <a 
                    href="https://search.google.com/test/rich-results" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline mx-1"
                  >
                    Google富媒体结果测试工具
                  </a>
                  来验证结构化数据的正确性。
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 最佳实践 */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>💡 SEO最佳实践</CardTitle>
              <CardDescription>
                实施SEO时的重要注意事项
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h2 className="font-semibold text-green-700">✅ 推荐做法</h2>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 保持标题在60字符以内</li>
                    <li>• 描述控制在160字符以内</li>
                    <li>• 使用语义化的HTML结构</li>
                    <li>• 确保图片有alt属性</li>
                    <li>• 使用canonical URL</li>
                    <li>• 实现适当的内部链接</li>
                    <li>• 使用正确的H1-H6标题层级</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h2 className="font-semibold text-red-700">❌ 避免做法</h2>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 不要关键词堆砌</li>
                    <li>• 避免重复的meta描述</li>
                    <li>• 不要使用误导性标题</li>
                    <li>• 避免隐藏文本内容</li>
                    <li>• 不要忽略移动端优化</li>
                    <li>• 避免缓慢的页面加载</li>
                    <li>• 不要跳过标题层级</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}