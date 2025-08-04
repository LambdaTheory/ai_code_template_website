---
description: 使用 Amazon Q 对代码进行智能审查
allowed-tools: Read,Bash,Task
---

# 代码审查命令 (Code Review)

基于项目的代码审查标准，使用 Amazon Q 容器对代码进行智能审查。

## 使用方法

```bash
# 审查当前工作区的所有变更（未提交的代码）
/code review

# 审查暂存区的变更（已 git add 但未提交）
/code review --staged

# 审查最近 N 个 commit
/code review --commits 1    # 审查最近 1 个 commit
/code review --commits 3    # 审查最近 3 个 commit
/code review --commits 5    # 审查最近 5 个 commit

# 审查未提交变更 + 最近 1 个 commit
/code review --all

# 审查指定文件
/code review src/app/page.tsx
/code review src/components/ui/button.tsx
```

## 执行步骤

### 1. 分析命令参数

根据用户输入的参数，确定审查范围：

- 无参数或默认：审查工作区变更
- `--staged`：审查暂存区变更
- `--commits N`：审查最近 N 个 commit
- `--all`：审查未提交变更 + 最近 1 个 commit
- 文件路径：审查指定文件

### 2. 获取待审查代码

使用对应的 git 命令获取代码变更：

**工作区变更**：

```bash
git diff
```

**暂存区变更**：

```bash
git diff --staged
```

**最近 N 个 commit**：

```bash
git diff HEAD~N..HEAD
```

**指定文件**：

```bash
cat 文件路径
```

### 3. 读取审查标准

读取 `docs/specs/code_review_standards.md` 文件内容，作为审查依据。

### 4. 构建审查提示词

将审查标准和代码变更组合成结构化提示词，重点关注：

- 类型安全问题
- 异步操作处理
- React 组件最佳实践
- 性能优化
- 安全漏洞
- 错误处理
- 代码结构
- 可访问性

### 5. 调用 Amazon Q

构建结构化的审查提示词，然后使用容器命令调用 Amazon Q：

```bash
# 构建审查提示词并调用 Amazon Q
echo '# 代码审查任务

## 审查标准
基于以下8个主要维度进行审查：
1. 类型安全问题 - 避免any类型，正确处理null/undefined
2. 异步操作处理 - Promise错误处理，避免串行执行
3. React组件问题 - useEffect依赖，state不可变性
4. 性能相关问题 - 避免不必要渲染，优化大量数据处理
5. 安全漏洞 - XSS防护，敏感信息保护
6. 错误处理不当 - 完善的异常处理和用户提示
7. 代码结构问题 - 组件职责单一，减少嵌套复杂度
8. 可访问性问题 - 语义化标签，键盘导航支持

## 待审查代码
[代码变更内容]

请提供具体的审查意见和改进建议。' | \
podman run -i --rm \
  -v $(pwd):/home/quser/workspace \
  -v /Users/kun/Downloads/q-accounts/E7PXRUEPGAVP:/home/quser/.local/share/amazon-q \
  ghcr.io/kun-g/q:latest \
  q chat
```

### 6. 格式化输出

将 Amazon Q 的审查结果格式化为结构化报告，包括：

- 问题分类和严重程度
- 具体代码位置和问题描述
- 修改建议和最佳实践引用

## 审查标准

基于 `docs/specs/code_review_standards.md` 中定义的8个主要审查维度：

1. **类型安全问题** - 避免 `any` 类型，正确处理 null/undefined
2. **异步操作处理** - Promise 错误处理，避免串行执行
3. **React 组件问题** - useEffect 依赖，state 不可变性
4. **性能相关问题** - 避免不必要渲染，优化大量数据处理
5. **安全漏洞** - XSS 防护，敏感信息保护
6. **错误处理不当** - 完善的异常处理和用户提示
7. **代码结构问题** - 组件职责单一，减少嵌套复杂度
8. **可访问性问题** - 语义化标签，键盘导航支持

## 注意事项

1. **容器要求**：需要安装 podman 并能访问 `ghcr.io/kun-g/q:latest` 镜像
2. **账户配置**：需要正确配置 Amazon Q 账户信息路径
3. **网络连接**：需要网络连接来访问 Amazon Q 服务
4. **数据量限制**：如果变更过多，建议分批审查或使用 `--commits` 限制范围

## 预期输出

审查完成后将显示结构化的报告，包括：

- 📁 审查范围和文件数量
- ⚠️ 按优先级分类的问题列表
- 💡 具体的修改建议和最佳实践引用
- ✅ 审查结果摘要
