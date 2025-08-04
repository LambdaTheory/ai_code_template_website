# AI 代码模板网站

AI友好的，基于 Next.js 15+ 的应用模板。

## 🚀 Features

- ⚡ **Next.js 15+** with App Router
- 🔷 **TypeScript** support
- 🎨 **Tailwind CSS** for styling
- 🎯 **ShadCN UI** component library
- 🔄 **ISR** (Incremental Static Regeneration) enabled
- 🌐 **Vercel** deployment ready
- 📱 **Responsive** design
- 🌙 **Dark mode** support
- 🤖 **Claude Code 增强支持**
  - 🔔 **智能语音提醒** - 任务完成、会话状态变化音效反馈
  - 📁 **自动化目录维护** - 智能更新项目目录结构文档
  - ⚡ **自定义命令集**
    - `/commit` - 智能分析代码变更并生成规范的提交信息
    - `/brainstorm` - AI 头脑风暴辅助
    - `/review-promax` - 四模型并行代码审查
    - `/describe-files` - 自动维护文件描述
    - `/weather` - 天气查询功能
  - 🎯 **专业 AI 代理**
    - **代码审查专家** - 专业的代码质量分析
    - **调试专家** - 错误诊断和修复建议
  - 🎣 **智能钩子系统** - 8 种事件钩子，全面监控开发流程

## 📋 Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun

## 🛠️ Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/LambdaTheory/ai-code-template-website
   cd ai-code-template-website
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**

   Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

[参考](docs/目录结构.md)

## 🎨 ShadCN UI Components

This template includes pre-configured ShadCN UI components:

- **Button** - Customizable button component
- **Card** - Card layout component
- More components can be added using: `npx shadcn@latest add <component-name>`

## 🔄 ISR (Incremental Static Regeneration)

The template includes ISR configuration:

- **Example page**: `/isr-demo` - Demonstrates ISR with 60-second revalidation
- **Configuration**: Set `revalidate` export in page components
- **Benefits**: Static generation with periodic updates

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy automatically

3. **Manual deployment**
   ```bash
   npm run build
   vercel deploy
   ```

### Other Platforms

The application can be deployed to any platform supporting Next.js:

- Netlify
- AWS
- Google Cloud
- Railway
- Render

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Tailwind CSS

Configuration in `tailwind.config.js` and `src/app/globals.css`

### ShadCN UI

Configuration in `components.json`

### Next.js

Configuration in `next.config.ts` with ISR and caching optimizations

### Vercel

Configuration in `vercel.json` for deployment settings

## 🎯 Usage Examples

### Adding ISR to a Page

```typescript
// Set revalidation time (in seconds)
export const revalidate = 60

export default async function MyPage() {
  // Your page content
}
```

### Using ShadCN Components

```typescript
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [ShadCN UI Documentation](https://ui.shadcn.com)
- [Vercel Documentation](https://vercel.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using Next.js, Tailwind CSS, and ShadCN UI
