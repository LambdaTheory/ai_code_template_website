---
description: 快速创建新的自定义 slash command
allowed-tools: Read,Write,Edit,Bash
---

我需要创建一个新的 slash command，请帮我生成相应的配置文件。

请按以下步骤执行：

1. 首先询问新命令的基本信息：
   - 命令名称（必需）
   - 命令描述（必需）
   - 参数提示（可选）
   - 需要的工具权限（默认：Read,Write,Edit,Bash）

2. 根据提供的信息创建命令文件：
   - 在 `.claude/commands/` 目录下创建 `[命令名称].md` 文件
   - 生成标准的 frontmatter 配置
   - 包含基础的命令结构模板

3. 生成的命令文件应包含：
   ```markdown
   ---
   argument-hint: [参数提示]
   description: [命令描述]
   allowed-tools: [工具权限列表]
   ---
   
   我需要[达到什么目标]
   
   [命令详细说明]
   
   请按以下步骤执行：
   
   1. [步骤1描述]
   
   2. [步骤2描述]
   
   ## 使用示例
   
   [提供具体的使用示例]
   ```

4. 创建完成后验证：
   - 检查文件是否正确生成
   - 确认 frontmatter 格式正确
   - 提供使用指南

请重点关注以下几点：
- 命令名称应使用 kebab-case 格式（如：format-code）
- 描述应简洁明确，说明命令的主要功能
- 参数提示应清楚表明必需和可选参数
- 工具权限应根据命令实际需求配置