#!/usr/bin/env python3
"""
Claude Code on-post-tool-use hook - plays audio after tool execution and masks .env file content
"""

import json
import sys
import re
from audio_player import AudioPlayer

def mask_env_content(content):
    """
    Mask sensitive values in .env file content
    保留键名但隐藏值，格式: KEY=***MASKED***
    """
    if not content:
        return content
    
    lines = content.split('\n')
    masked_lines = []
    
    for line in lines:
        # 跳过注释行和空行
        if line.strip().startswith('#') or not line.strip():
            masked_lines.append(line)
            continue
            
        # 匹配 KEY=VALUE 格式
        if '=' in line:
            key_part = line.split('=')[0]
            masked_lines.append(f"{key_part}=***MASKED***")
        else:
            masked_lines.append(line)
    
    return '\n'.join(masked_lines)

def main():
    # 读取事件数据（保持与原始钩子兼容）
    json_context = json.loads(sys.stdin.read())
    
    # 检查是否是 Read 工具读取 .env 文件
    tool_name = json_context.get("tool_name")
    tool_input = json_context.get("tool_input", {})
    tool_result = json_context.get("tool_result", {})
    
    if (tool_name == "Read" and 
        tool_input.get("file_path") and 
        ".env" in tool_input["file_path"]):
        
        # 获取原始输出内容
        original_output = tool_result.get("output", "")
        
        # 对内容进行 mask 处理
        masked_output = mask_env_content(original_output)
        
        # 修改工具结果
        modified_result = tool_result.copy()
        modified_result["output"] = masked_output
        
        # 输出修改后的结果
        modified_context = json_context.copy()
        modified_context["tool_result"] = modified_result
        
        print("on-post-tool-use", modified_context)
    else:
        print("on-post-tool-use", json_context)
    
    # 创建音频播放器并播放对应的音频
    player = AudioPlayer()
    player.play(hook_name="on_post_tool_use")

if __name__ == "__main__":
    main()