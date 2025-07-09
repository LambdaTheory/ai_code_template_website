import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl">Next.js App Template</CardTitle>
            <CardDescription>
              A complete Next.js application with Tailwind CSS, ShadCN UI, ISR, and Vercel deployment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">✨ Features Included:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Next.js 15+ with App Router</li>
                  <li>TypeScript support</li>
                  <li>Tailwind CSS styling</li>
                  <li>ShadCN UI components</li>
                  <li>ISR (Incremental Static Regeneration)</li>
                  <li>Vercel deployment ready</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">🚀 Quick Start:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Run <code className="bg-muted px-1 rounded">npm run dev</code></li>
                  <li>Visit ISR demo page</li>
                  <li>Deploy to Vercel</li>
                  <li>Customize components</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild>
                <Link href="/components">
                  组件展示
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/isr-demo">
                  静态页面演示
                </Link>
              </Button>
              <Button asChild>
                <Link href="/seo-demo">
                  SEO配置演示
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer">
                  部署到 Vercel
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer">
                  ShadCN UI 文档
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
