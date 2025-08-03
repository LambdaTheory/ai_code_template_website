---
description: 根据修改的内容生成commit信息并提交
allowed-tools: Read,Write,Edit,Bash
---

我需要根据项目中的修改内容，自动生成合适的 commit 信息并提交到 Git 仓库。

请按以下步骤执行：

1. 分析当前的修改状态：
   ```bash
   git status
   git diff
   git diff --staged
   ```

2. 检查最近的 commit 历史以了解项目的 commit 风格：
   ```bash
   git log --oneline -5
   ```

3. 根据修改内容生成合适的 commit 信息：
   - 分析代码变更的性质（新功能、修复、重构等）
   - 使用简洁清晰的中文描述
   - 遵循项目现有的 commit 消息风格
   - 突出变更的核心内容和影响

4. 添加所有相关文件到暂存区：
   ```bash
   git add .
   ```

5. 创建 commit：
   ```bash
   git commit -m "生成的commit消息"
   ```

6. 确认提交成功：
   ```bash
   git status
   git log --oneline -1
   ```

## Commit 信息生成规则

- **新功能**：新增/添加 [功能描述]
- **修复**：修复 [问题描述]
- **重构**：重构 [模块/功能名称]
- **更新**：更新 [配置/文档/依赖]
- **优化**：优化 [性能/体验/代码]
- **删除**：删除 [废弃的功能/文件]

## 使用示例

```
/commit
```

命令会自动：
1. 检查所有未提交的修改
2. 分析变更内容和范围
3. 生成符合项目风格的 commit 信息
4. 执行 git add 和 git commit 操作
5. 显示提交结果