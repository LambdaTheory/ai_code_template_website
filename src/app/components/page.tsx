'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import {
  AlertCircle,
  CheckCircle,
  Info,
  Heart,
  Star,
  Settings,
  User,
} from 'lucide-react'

export default function ComponentsPage() {
  const [progress, setProgress] = useState(65)
  const [isChecked, setIsChecked] = useState(false)
  const [isToggled, setIsToggled] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl">ShadCN UI 组件展示</CardTitle>
            <CardDescription>
              这里展示了项目中可用的 ShadCN UI 组件及其使用方法
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button asChild>
                <Link href="/">返回首页</Link>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://ui.shadcn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  官方文档
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Components Showcase */}
        <Tabs defaultValue="buttons" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="buttons">按钮 & 输入</TabsTrigger>
            <TabsTrigger value="display">展示组件</TabsTrigger>
            <TabsTrigger value="feedback">反馈组件</TabsTrigger>
            <TabsTrigger value="usage">使用文档</TabsTrigger>
          </TabsList>

          {/* Buttons & Input Tab */}
          <TabsContent value="buttons" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Buttons */}
              <Card>
                <CardHeader>
                  <CardTitle>按钮组件</CardTitle>
                  <CardDescription>不同样式和大小的按钮</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">按钮样式：</p>
                    <div className="flex flex-wrap gap-2">
                      <Button>默认</Button>
                      <Button variant="secondary">次要</Button>
                      <Button variant="outline">轮廓</Button>
                      <Button variant="ghost">幽灵</Button>
                      <Button variant="destructive">危险</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">按钮大小：</p>
                    <div className="flex flex-wrap gap-2 items-center">
                      <Button size="sm">小</Button>
                      <Button size="default">默认</Button>
                      <Button size="lg">大</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">带图标：</p>
                    <div className="flex flex-wrap gap-2">
                      <Button>
                        <Heart className="mr-2 h-4 w-4" />
                        喜欢
                      </Button>
                      <Button variant="outline">
                        <Star className="mr-2 h-4 w-4" />
                        收藏
                      </Button>
                      <Button variant="ghost">
                        <Settings className="mr-2 h-4 w-4" />
                        设置
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Input Components */}
              <Card>
                <CardHeader>
                  <CardTitle>输入组件</CardTitle>
                  <CardDescription>各种输入表单元素</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">文本输入：</label>
                    <Input placeholder="请输入内容..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">文本域：</label>
                    <Textarea placeholder="请输入多行内容..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">选择器：</label>
                    <Select
                      value={selectedValue}
                      onValueChange={setSelectedValue}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择一个选项" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">选项 1</SelectItem>
                        <SelectItem value="option2">选项 2</SelectItem>
                        <SelectItem value="option3">选项 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="checkbox"
                        checked={isChecked}
                        onCheckedChange={checked =>
                          setIsChecked(checked === true)
                        }
                      />
                      <label htmlFor="checkbox" className="text-sm font-medium">
                        复选框
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="switch"
                        checked={isToggled}
                        onCheckedChange={setIsToggled}
                      />
                      <label htmlFor="switch" className="text-sm font-medium">
                        开关
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Display Components Tab */}
          <TabsContent value="display" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Avatar & Badge */}
              <Card>
                <CardHeader>
                  <CardTitle>头像 & 徽章</CardTitle>
                  <CardDescription>用户头像和状态徽章</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">头像：</p>
                    <div className="flex gap-2">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback>用户</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">徽章：</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge>默认</Badge>
                      <Badge variant="secondary">次要</Badge>
                      <Badge variant="outline">轮廓</Badge>
                      <Badge variant="destructive">危险</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>进度条</CardTitle>
                  <CardDescription>显示任务进度</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">当前进度</span>
                      <span className="text-sm text-muted-foreground">
                        {progress}%
                      </span>
                    </div>
                    <Progress value={progress} className="w-full" />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => setProgress(Math.max(0, progress - 10))}
                      disabled={progress === 0}
                    >
                      -10
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setProgress(Math.min(100, progress + 10))}
                      disabled={progress === 100}
                    >
                      +10
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Feedback Components Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>警告组件</CardTitle>
                <CardDescription>不同类型的警告和提示信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>信息</AlertTitle>
                  <AlertDescription>
                    这是一个一般信息提示，用于告知用户相关信息。
                  </AlertDescription>
                </Alert>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>成功</AlertTitle>
                  <AlertDescription>
                    操作已成功完成！您的更改已保存。
                  </AlertDescription>
                </Alert>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>警告</AlertTitle>
                  <AlertDescription>
                    请注意，这个操作可能会影响系统性能。
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Usage Documentation Tab */}
          <TabsContent value="usage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>使用文档</CardTitle>
                <CardDescription>
                  如何在项目中使用 ShadCN UI 组件
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">安装新组件</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <code className="text-sm">
                      npx shadcn@latest add [组件名]
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    例如：<code>npx shadcn@latest add dialog</code>
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">基本使用</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm">
                      {`import { Button } from "@/components/ui/button";

export default function MyComponent() {
  return (
    <Button onClick={() => alert('Hello!')}>
      点击我
    </Button>
  );
}`}
                    </pre>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">已安装的组件</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      'Button',
                      'Card',
                      'Input',
                      'Textarea',
                      'Select',
                      'Checkbox',
                      'Switch',
                      'Badge',
                      'Alert',
                      'Tabs',
                      'Separator',
                      'Avatar',
                      'Progress',
                    ].map(component => (
                      <Badge key={component} variant="outline">
                        {component}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">推荐的其他组件</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="font-medium">表单组件：</p>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary">Form</Badge>
                        <Badge variant="secondary">Label</Badge>
                        <Badge variant="secondary">RadioGroup</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium">布局组件：</p>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary">Dialog</Badge>
                        <Badge variant="secondary">Sheet</Badge>
                        <Badge variant="secondary">Popover</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium">数据展示：</p>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary">Table</Badge>
                        <Badge variant="secondary">DataTable</Badge>
                        <Badge variant="secondary">Calendar</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium">反馈组件：</p>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary">Toast</Badge>
                        <Badge variant="secondary">Skeleton</Badge>
                        <Badge variant="secondary">Tooltip</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
