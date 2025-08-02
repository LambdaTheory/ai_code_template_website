#!/usr/bin/env python3
"""
Claude Code on-post-tool-use hook - plays audio after tool execution, masks .env file content, and updates directory structure
"""

import json
import sys
import re
import os
import subprocess
from pathlib import Path
from audio_player import AudioPlayer


def update_directory_structure():
    """调用目录结构更新脚本"""
    try:
        # 获取脚本路径
        script_path = Path(__file__).parent.parent / "update_directory_structure.py"
        if script_path.exists():
            # 运行目录结构更新脚本
            result = subprocess.run([
                sys.executable, str(script_path)
            ], capture_output=True, text=True, cwd=script_path.parent.parent)
            
            if result.returncode == 0:
                print("目录结构已自动更新")
            else:
                print(f"目录结构更新失败: {result.stderr}")
        else:
            print(f"未找到目录结构脚本: {script_path}")
    except Exception as e:
        print(f"更新目录结构时发生错误: {e}")


def should_update_directory_structure(tool_name, tool_input, tool_result):
    """检查是否需要更新目录结构"""
    # 检查是否是文件操作工具
    file_operation_tools = {"Write", "Edit", "MultiEdit"}
    
    if tool_name in file_operation_tools:
        return True
    
    # 检查是否是删除文件的 Bash 命令
    if tool_name == "Bash":
        command = tool_input.get("command", "")
        # 检查是否是删除命令
        if any(cmd in command.lower() for cmd in ["rm ", "rmdir", "del ", "unlink"]):
            return True
    
    return False


def main():
    # 读取事件数据（保持与原始钩子兼容）
    json_context = json.loads(sys.stdin.read())
    
    # 检查是否是 Read 工具读取 .env 文件
    tool_name = json_context.get("tool_name")
    tool_input = json_context.get("tool_input", {})
    tool_result = json_context.get("tool_result", {})
    
    print("on-post-tool-use:")
    print(json.dumps(json_context, indent=4, ensure_ascii=False))
    
    # 检查是否需要更新目录结构
    if should_update_directory_structure(tool_name, tool_input, tool_result):
        print(f"检测到文件操作工具 {tool_name}，正在更新目录结构...")
        update_directory_structure()
    
    # 创建音频播放器并播放对应的音频
    player = AudioPlayer()
    player.play(hook_name="on_post_tool_use")

if __name__ == "__main__":
    main()