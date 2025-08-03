# Copier 模板使用说明

这个项目已经被配置为 Copier 模板，可以用来快速创建新的 Next.js 项目。

## 使用方法

### 1. 安装 Copier

```bash
pip install copier
```

### 2. 从本模板创建新项目

```bash
# 从本地路径创建
copier copy . /path/to/new/project

# 从 Git 仓库创建（当推送到 Git 后）
copier copy https://github.com/yourusername/your-template-repo.git /path/to/new/project
```

### 3. 回答配置问题

模板会询问以下问题：

- **项目名称**: 用于 package.json 和目录名
- **项目显示名称**: 用于页面显示的中文名称  
- **项目描述**: 项目的简短描述
- **作者信息**: 姓名和邮箱
- **网站配置**: URL、标题、描述等
- **可选功能**: 是否包含 Claude Code 配置等

### 4. 生成的项目结构

生成的项目将包含：
- ✅ Next.js 15+ 配置
- ✅ TypeScript 支持
- ✅ Tailwind CSS + ShadCN UI
- ✅ SEO 优化配置
- ✅ 自定义的项目信息
- ⚙️ 可选的 Claude Code 配置

## 更新现有项目

如果模板有更新，可以更新现有项目：

```bash
cd /path/to/existing/project
copier update
```

## 模板开发

### 已模板化的文件

以下文件已经支持 Jinja2 模板变量：
- `package.json.jinja` - 项目基础信息
- `README.md.jinja` - 项目说明文档  
- `src/config/seo.json.jinja` - SEO 配置

### 变量说明

主要模板变量：
- `{{ project_name }}` - 项目名称（英文）
- `{{ project_display_name }}` - 项目显示名称（中文）
- `{{ author_name }}` - 作者姓名
- `{{ website_url }}` - 网站域名
- `{{ include_claude_config }}` - 是否包含 Claude 配置

## 注意事项

1. **不要手动修改 `.claude` 目录结构** - 这会破坏 Claude Code 的钩子脚本
2. **模板变量使用 Jinja2 语法** - 确保语法正确
3. **答案文件自动生成** - 用于跟踪用户选择和后续更新