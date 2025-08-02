---
description: 使用四个不同的AI模型（Codex、Gemini、Claude、Amazon Q）并行进行代码审查，并综合分析结果
allowed-tools: Read,Write,Edit,Bash,Task
---

# Review ProMax - 多AI代码审查

这个命令将使用四个不同的AI模型并行进行代码审查，并综合分析结果。

## 执行步骤

### 1. 备份现有审查文件
首先备份并清空之前的审查结果文件：
- review.codex.md
- review.gemini.md  
- review.claude.md
- review.q.md

如果文件不存在则跳过备份步骤。

### 2. 并行执行四个AI审查任务

#### Task 1: Codex 审查
使用 OpenAI Codex 进行代码审查：
```bash
codex exec -- full-auto "review我的代码变更,输出markdown格式,并且将结果保存到 review.codex.md文件中"
```

#### Task 2: Gemini 审查  
使用 Google Gemini 进行代码审查：
```bash
gemini -- yolo "review我的代码变更,输出markdown格式,并且将结果保存到 review.gemini.md文件中"
```

#### Task 3: Claude 审查
Claude 自身进行代码审查，结果保存到 review.claude.md

#### Task 4: Amazon Q 审查
使用 Amazon Q 进行代码审查：
!`q chat "review我的代码变更,输出markdown格式,并且将结果保存到 review.q.md文件中"`

### 3. 综合分析
等四个subagent全部完成后，综合分析四个文件的内容：
- review.codex.md
- review.gemini.md
- review.claude.md
- review.q.md

输出本次代码审查中最需要关注的几个重点问题。

## 使用方法

直接运行此命令，系统将自动执行所有步骤并提供综合分析结果。

## 输出结果

最终会得到：
1. 四个独立的AI审查报告（Codex、Gemini、Claude、Amazon Q）
2. 综合分析报告，突出最关键的改进点
3. 优先级排序的问题清单