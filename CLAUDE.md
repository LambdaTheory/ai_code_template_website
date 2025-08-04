# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Next.js 15+ 的现代 Web 应用模板，项目集成了 TypeScript、Tailwind CSS 和 ShadCN UI 组件库，采用 App Router 架构，支持 ISR（增量静态再生成）和 SEO 优化。

## 常用命令

### 开发命令

- `npm run dev` - 启动开发服务器（使用 Turbopack）
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行 ESLint 检查

### ShadCN UI 组件管理

- `npx shadcn@latest add <component-name>` - 添加新的 UI 组件

## 项目架构

目录结构： @docs/目录结构.md

### 核心技术栈

- **Next.js 15+** with App Router
- **TypeScript** 类型系统
- **Tailwind CSS** 样式框架
- **ShadCN UI** 组件库（New York 风格）
- **Radix UI** 底层组件库
- **Lucide React** 图标库

### 关键配置

- **ShadCN UI**: 配置在 `components.json`，使用 "new-york" 风格
- **路径别名**: `@/` 指向 `src/` 目录
- **字体**: 使用 Geist Sans 和 Geist Mono
- **ESLint**: 继承 Next.js 和 TypeScript 推荐配置

### ISR 配置

- 在页面组件中导出 `revalidate` 常量控制重新验证间隔
- `revalidate: false` - 永不重新验证（纯静态）
- `revalidate: 60` - 60秒后重新验证
- ISR 演示页面位于 `/isr-demo`

### SEO 功能

- 自动生成 sitemap.xml 和 robots.txt
- SEO 配置存储在 `src/config/seo.json`
- 提供 SEO 工具函数用于元数据生成

### UI 组件使用

- 所有 UI 组件都在 `src/components/ui/` 中
- 使用 `cn()` 函数（来自 `@/lib/utils`）合并 Tailwind 类名
- 组件支持 className 属性覆盖默认样式

### 开发注意事项

- 项目使用 Turbopack 加速开发构建
- 所有页面组件都应该是异步函数以支持服务端渲染
- 使用 TypeScript 严格模式，确保类型安全
- 遵循 Next.js App Router 的文件路由约定
