#!/usr/bin/env python3
"""
Claude Code on-post-tool-use hook - plays audio after tool execution and masks .env file content
"""

import json
import sys
import re
from audio_player import AudioPlayer


def main():
    # 读取事件数据（保持与原始钩子兼容）
    json_context = json.loads(sys.stdin.read())
    
    # 检查是否是 Read 工具读取 .env 文件
    tool_name = json_context.get("tool_name")
    tool_input = json_context.get("tool_input", {})
    tool_result = json_context.get("tool_result", {})
    
    print("on-post-tool-use:")
    print(json.dumps(json_context, indent=4, ensure_ascii=False))
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
    
    # 创建音频播放器并播放对应的音频
    player = AudioPlayer()
    player.play(hook_name="on_post_tool_use")

if __name__ == "__main__":
    main()