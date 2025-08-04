---
description: 根据修改的内容生成commit信息并提交
allowed-tools: Read,Write,Edit,Bash,Task
---

我需要根据项目中的修改内容，自动生成语义化的 commit 信息并提交到 Git 仓库。

严格按照以下顺序执行，不跳过任何步骤：

## 执行步骤

1. **预处理**：
   - 执行 `npm run format` 修复格式问题
   - 使用 Task 工具调用 describe-files subagent 更新文件结构表：
     ```
     Task(subagent_type="general-purpose", description="更新文件结构表", prompt="请调用 describe-files subagent 来更新项目的文件结构表...")
     ```

2. **分析修改状态**：
   并行执行以下命令：

   ```bash
   git status
   git diff
   git diff --staged
   ```

3. **了解项目 commit 风格**：

   ```bash
   git log --oneline -5
   ```

4. **生成语义化 commit 信息**：
   根据修改内容选择类型前缀：
   - `feat`: 新功能 | `fix`: 修复问题 | `refactor`: 重构代码
   - `perf`: 性能优化 | `style`: 代码格式调整 | `docs`: 文档更新
   - `test`: 测试相关 | `chore`: 构建/工具/依赖更新

   格式：`类型(作用域): 简洁的中文描述`
   忽略文件：`.claude/directory_descriptions.json` 和 `docs/目录结构.md`

5. **提交变更**：

   ```bash
   git add .
   ```

   创建 commit

6. **验证提交**：
   ```bash
   git status
   git log --oneline -1
   ```
