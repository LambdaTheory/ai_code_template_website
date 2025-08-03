---
description: 使用四个不同的AI模型并行进行代码审查，并综合分析结果
allowed-tools: Read,Write,Edit,Bash,Task
---

我需要使用四个AI模型并行进行代码审查并综合分析结果。

1. 备份现有审查文件（如果存在）：
   - review.codex.md、review.gemini.md、review.claude.md、review.q.md

2. 并行执行四个审查任务：
   - 使用 `codex exec -- full-auto` 进行代码审查，结果保存到 review.codex.md
   - 使用 `gemini -- yolo` 进行代码审查，结果保存到 review.gemini.md  
   - 使用 Claude 进行代码审查，结果保存到 review.claude.md
   - 使用 `q chat` 进行代码审查，结果保存到 review.q.md

3. 等待所有审查完成后，读取四个结果文件并进行综合分析

4. 输出最需要关注的重点问题和优先级排序的改进建议