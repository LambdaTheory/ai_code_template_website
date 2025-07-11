# Next.js App Template

A complete Next.js application template with modern tools and best practices, including Tailwind CSS, ShadCN UI, ISR (Incremental Static Regeneration), and Vercel deployment configuration.

## 🚀 Features

- ⚡ **Next.js 15+** with App Router
- 🔷 **TypeScript** support
- 🎨 **Tailwind CSS** for styling
- 🎯 **ShadCN UI** component library
- 🔄 **ISR** (Incremental Static Regeneration) enabled
- 🌐 **Vercel** deployment ready
- 📱 **Responsive** design
- 🌙 **Dark mode** support

## 📋 Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun

## 🛠️ Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai_code_template_website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   
   Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Home page
│   └── isr-demo/           # ISR demonstration page
│       └── page.tsx
├── components/
│   └── ui/                 # ShadCN UI components
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
└── lib/
    └── utils.ts            # Utility functions
```

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
export const revalidate = 60;

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
