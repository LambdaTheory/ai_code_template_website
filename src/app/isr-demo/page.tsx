import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

// This page uses SSG (Static Site Generation) - never expires, only updates on rebuild
export const revalidate = false // Never revalidate - only update on rebuild

// Sample data fetching function
async function getTimeData() {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100))

  return {
    generatedAt: new Date().toISOString(),
    message: '此页面在构建时静态生成！',
    randomNumber: Math.floor(Math.random() * 1000),
  }
}

export default async function ISRDemo() {
  const data = await getTimeData()

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>静态页面演示</CardTitle>
            <CardDescription>
              此页面使用静态站点生成（SSG），永不过期，只有在重新构建时才会更新
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">生成的数据：</h3>
              <p>
                <strong>生成时间：</strong> {data.generatedAt}
              </p>
              <p>
                <strong>消息：</strong> 此页面在构建时静态生成！
              </p>
              <p>
                <strong>随机数：</strong> {data.randomNumber}
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">SSG 配置：</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>永不重新验证（revalidate = false）</li>
                <li>构建时静态生成</li>
                <li>只有重新构建时才会更新</li>
                <li>永久缓存，性能最佳</li>
              </ul>
            </div>

            <div className="flex gap-2">
              <Button asChild>
                <Link href="/">返回首页</Link>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="/isr-demo"
                  className="inline-flex items-center justify-center"
                >
                  刷新页面
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
