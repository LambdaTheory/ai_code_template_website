---
description: 创建新的 slash command 文件
allowed-tools: Read,Write,Edit,Glob,Grep
---

我需要创建一个新的 slash command 文件。

1. 询问命令的基本信息：
   - 命令名称（kebab-case格式）
   - 命令描述
   - 是否需要参数（如果需要，询问参数格式）
   - 需要的工具权限

2. 检查 .claude/commands/ 目录，确保命令名称不重复

3. 创建命令文件：
   - 文件路径：`.claude/commands/[命令名称].md`
   - frontmatter 包含：description, argument-hint（如有参数）, allowed-tools
   - 内容使用 `$ARGUMENTS` 引用用户输入的参数（如有参数）
   - 专注于告诉AI做什么，不包含用户使用说明

4. 验证文件创建成功并确认配置正确

重要注意事项：

- 如果命令需要参数，必须在内容中使用 `$ARGUMENTS` 变量
- 命令内容应该是给AI的指令，不是给用户的文档
- 保持简洁明确，专注于任务执行
