---
description: 维护和补全目录结构中缺少描述的文件
allowed-tools: Read,Write,Edit,Bash
---

我需要维护项目的目录结构文档，请帮我补全缺少描述的文件。

请按以下步骤执行：

1. 首先运行脚本查看缺少描述的文件：

   ```bash
   python3 .claude/tools/update_directory_structure.py --missing
   ```

2. 对于每个缺少描述的文件：
   - 分析文件内容和用途
   - 为文件添加简洁准确的中文描述
   - 使用脚本添加描述：
     ```bash
     python3 .claude/tools/update_directory_structure.py --add "文件路径" "文件描述"
     ```

3. 完成后重新生成目录结构文档：
   ```bash
   python3 .claude/tools/update_directory_structure.py
   ```

请重点关注以下类型的文件：

- 源代码文件（.js, .ts, .tsx, .py 等）
- 配置文件（package.json, tsconfig.json 等）
- 重要的 Markdown 文档
- 组件和页面文件

对于每个文件，请提供：

- 功能说明（这个文件是做什么的）
- 用途描述（在项目中的作用）
- 如果是组件或页面，说明其业务功能
