---
description: 根据修改的内容生成commit信息并提交
allowed-tools: Read,Write,Edit,Bash
---

我需要根据项目中的修改内容，自动生成语义化的 commit 信息并提交到 Git 仓库。

0. 执行 !`npm run format` 修复格式问题。
   0.5 通过 Agent describe-files 来更新文件结构表。

1. 分析当前修改状态：使用 git status、git diff 和 git diff --staged

2. 检查最近的 commit 历史了解项目的 commit 风格：git log --oneline -5

3. 根据修改内容生成语义化 commit 信息：
   - 分析代码变更的性质，选择合适的类型前缀：
     - feat: 新功能
     - fix: 修复问题
     - refactor: 重构代码
     - perf: 性能优化
     - style: 代码格式调整
     - docs: 文档更新
     - test: 测试相关
     - chore: 构建/工具/依赖更新
   - 使用格式：`类型(作用域): 简洁的中文描述`
   - 如果有重大变更，添加标记：`feat!: 描述`
   - 无视 .claude/directory_descriptions.json 和 docs/目录结构.md 的变动

4. 添加所有相关文件到暂存区：git add .

5. 创建 commit 并包含规范的尾部信息

6. 确认提交成功：git status 和 git log --oneline -1
