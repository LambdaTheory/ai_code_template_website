#!/usr/bin/env python3
"""
.env 文件合规阅读钩子
参考提供的代码实现，通过 decision=block 阻止原始结果并返回脱敏内容
"""

import json
import sys
import re
import os

def main():
    # 读取事件数据
    data = json.load(sys.stdin)
    
    # 仅处理 Read 工具
    if data.get("tool_name") != "Read":
        sys.exit(0)
    
    # 检查是否读取 .env 文件
    path = data.get("tool_input", {}).get("file_path", "")
    if not path.endswith(".env"):
        sys.exit(0)
    
    # 获取原始文件内容
    raw = data.get("tool_response", {}).get("content", "")
    
    # 简单脱敏：只保留 key，value 整体替换为 **MASKED**
    masked_lines = []
    for line in raw.splitlines():
        # 保留空行和注释行
        if not line or line.strip().startswith("#"):
            masked_lines.append(line)
            continue
        
        # 处理 KEY=VALUE 格式
        key, _, _ = line.partition("=")
        masked_lines.append(f"{key}=**MASKED**")
    
    masked = "\n".join(masked_lines)
    
    # 通过 JSON 输出 + decision=block 把原始结果屏蔽、把脱敏结果喂回 Claude
    print(json.dumps({
        "decision": "block",
        "reason": f"以下为脱敏后的 .env 内容，请据此继续：\n\n{masked}"
    }))

if __name__ == "__main__":
    main()