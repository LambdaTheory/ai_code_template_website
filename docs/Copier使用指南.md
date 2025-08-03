# Copier 模板使用指南

## 简介

本项目是一个基于 Copier 的 Next.js 项目模板，提供了现代化的 Web 应用开发脚手架。通过 Copier 工具，您可以快速创建配置完整的 Next.js 项目，包含 TypeScript、Tailwind CSS、ShadCN UI 等现代化技术栈。

## 环境要求

- Python 3.8+
- Node.js 18+
- npm 或 yarn

## 安装 Copier

### 方式一：使用 pip 安装

```bash
pip install copier
```

### 方式二：使用 pipx 安装（推荐）

```bash
pipx install copier
```

### 方式三：使用 uv tool 安装

```bash
uv tool install copier
```

## 使用模板创建新项目

### 从本地模板创建

```bash
# 在模板目录外运行
copier copy /path/to/template-directory /path/to/new-project

# 例如：
copier copy . ../my-new-project
```

### 从 Git 仓库创建

```bash
# 从远程仓库创建
copier copy https://github.com/username/ai-code-template-website.git my-new-project

# 指定分支或标签
copier copy https://github.com/username/ai-code-template-website.git@main my-new-project
```

## 配置参数说明

在创建项目时，Copier 会提示您输入以下配置参数：

### 基础项目信息

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `project_name` | 字符串 | `my-nextjs-app` | 项目名称（英文，用于包名和目录名） |
| `project_display_name` | 字符串 | `我的 Next.js 应用` | 项目显示名称（中文，用于页面显示） |
| `project_description` | 字符串 | `基于 Next.js 15+ 的现代 Web 应用模板` | 项目描述 |
| `project_version` | 字符串 | `0.1.0` | 项目版本 |

### 作者信息

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `author_name` | 字符串 | `Your Name` | 作者姓名 |
| `author_email` | 字符串 | `your.email@example.com` | 作者邮箱（需包含@符号） |
| `github_username` | 字符串 | `yourusername` | GitHub 用户名 |
| `repository_url` | 字符串 | 自动生成 | GitHub 仓库URL |

### 网站配置

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `website_url` | 字符串 | `example.com` | 网站域名（不包含 https://） |
| `website_title` | 字符串 | 继承项目显示名称 | 网站标题 |
| `website_description` | 字符串 | 继承项目描述 | 网站描述（用于SEO） |
| `twitter_handle` | 字符串 | 空 | Twitter用户名（可选，不包含@） |

## 创建项目示例

```bash
# 交互式创建项目
copier copy . ../my-blog

# 示例交互过程：
# 项目名称 (英文, 用于包名和目录名) [my-nextjs-app]: my-blog
# 项目显示名称 (中文, 用于页面显示) [我的 Next.js 应用]: 我的博客网站
# 项目描述 [基于 Next.js 15+ 的现代 Web 应用模板]: 个人技术博客，分享编程经验
# 项目版本 [0.1.0]: 1.0.0
# 作者姓名 [Your Name]: 张三
# 作者邮箱 [your.email@example.com]: zhangsan@example.com
# 网站URL (不包含 https://) [example.com]: myblog.com
# 网站标题 [我的博客网站]: 
# 网站描述 (用于SEO) [个人技术博客，分享编程经验]: 
# Twitter用户名 (可选, 不包含@) []: zhangsan_dev
# GitHub用户名 [yourusername]: zhangsan
# GitHub仓库URL (可选) [https://github.com/zhangsan/my-blog]: 
```

## 非交互式创建

您也可以通过数据文件或命令行参数跳过交互式输入：

### 使用数据文件

创建 `copier-answers.yml` 文件：

```yaml
project_name: "my-blog"
project_display_name: "我的博客网站"
project_description: "个人技术博客，分享编程经验"
author_name: "张三"
author_email: "zhangsan@example.com"
website_url: "myblog.com"
github_username: "zhangsan"
```

然后运行：

```bash
copier copy --data-file copier-answers.yml . ../my-blog
```

### 使用命令行参数

```bash
copier copy \
  --data project_name=my-blog \
  --data project_display_name="我的博客网站" \
  --data author_name="张三" \
  --data author_email="zhangsan@example.com" \
  . ../my-blog
```

## 生成的项目结构

创建完成后，新项目将包含：

### 核心功能
- ✅ **Next.js 15+** - 最新版本的 React 框架
- ✅ **TypeScript** - 完整的类型系统支持
- ✅ **Tailwind CSS** - 原子化 CSS 框架
- ✅ **ShadCN UI** - 高质量的 UI 组件库
- ✅ **SEO 优化** - 自动生成 sitemap 和 robots.txt
- ✅ **ISR 支持** - 增量静态再生成配置

### 开发工具
- ✅ **ESLint** - 代码质量检查
- ✅ **Prettier** - 代码格式化（如果配置）
- ✅ **Turbopack** - 快速构建工具

### 可选功能
- ⚙️ **Claude Code 配置** - AI 开发助手配置
- ⚙️ **Docker 配置** - 容器化部署（如果选择）

## 项目初始化

创建项目后，进入项目目录并安装依赖：

```bash
cd my-blog
npm install
```

启动开发服务器：

```bash
npm run dev
```

访问 http://localhost:3000 查看项目。

## 更新现有项目

当模板有新版本时，您可以更新现有项目：

```bash
cd /path/to/existing/project
copier update
```

Copier 会智能处理文件冲突，您可以选择：
- 保留当前版本
- 使用新版本
- 手动合并更改

## 模板文件说明

### 模板化文件

以下文件使用 Jinja2 模板语法，会根据用户输入自动生成：

| 文件 | 说明 |
|------|------|
| `package.json.jinja` | 项目配置和依赖 |
| `README.md.jinja` | 项目说明文档 |
| `src/config/seo.json.jinja` | SEO 配置 |

### 条件包含文件

某些文件只在特定条件下包含：

| 条件 | 包含的文件/目录 |
|------|----------------|
| 总是包含 | 核心 Next.js 文件、组件、配置 |
| 特定配置 | 可选的功能模块 |

### 跳过的文件

以下文件在目标目录已存在时会被跳过：

- `.env.local` - 本地环境变量
- `worklog.md` - 工作日志
- `TODO.md` - 待办事项
- `docs/` - 文档目录

## 自定义模板

### 添加新的配置问题

编辑 `copier.yml` 文件：

```yaml
new_feature:
  type: bool
  help: "是否启用新功能？"
  default: false
```

### 添加条件文件

使用 Jinja2 条件语法：

```jinja
{% if new_feature %}
# 新功能相关的文件内容
{% endif %}
```

### 添加自定义任务

在 `copier.yml` 的 `_tasks` 部分添加：

```yaml
_tasks:
  - command: "npm install"
    description: "安装依赖包"
  - command: "npm run build"
    description: "构建项目"
    when: "{{ build_on_create }}"
```

## 常见问题

### Q: 如何修改默认值？
A: 编辑 `copier.yml` 文件中相应问题的 `default` 字段。

### Q: 如何添加新的模板变量？
A: 在 `copier.yml` 中添加新问题，然后在模板文件中使用 `{{ variable_name }}` 语法。

### Q: 更新时如何处理冲突？
A: Copier 会提示您选择处理方式，建议先备份重要修改。

### Q: 如何验证用户输入？
A: 在 `copier.yml` 中使用 `validator` 字段添加验证规则。

## 最佳实践

1. **版本管理**：为模板打标签，便于用户选择特定版本
2. **文档维护**：及时更新模板文档和示例
3. **向后兼容**：谨慎修改已有变量名，考虑迁移策略
4. **测试验证**：定期测试模板生成的项目是否正常工作
5. **用户反馈**：收集用户使用反馈，持续改进模板

## 相关链接

- [Copier 官方文档](https://copier.readthedocs.io/)
- [Jinja2 模板语法](https://jinja.palletsprojects.com/)
- [Next.js 官方文档](https://nextjs.org/docs)
- [ShadCN UI 组件库](https://ui.shadcn.com/)