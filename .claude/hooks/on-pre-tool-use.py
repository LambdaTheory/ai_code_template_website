#!/usr/bin/env python3
"""
Claude Code on-pre-tool-use hook - plays audio before tool execution
"""

import json
import sys
from audio_player import AudioPlayer
import logging
logging.basicConfig(level=logging.WARNING, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

def main():
    # 读取事件数据（保持与原始钩子兼容）
    json_context = json.loads(sys.stdin.read())
    print("on-pre-tool-use", json_context)
    
    # 创建音频播放器并播放对应的音频
    player = AudioPlayer()
    success = player.play(hook_name="on_pre_tool_use")

    command = json_context.get("tool_name") 
    path = json_context.get("tool_input", {}).get("file_path")

    if command in ["Edit", "MultiEdit", "Write"]:
        if path and any(p in path for p in ['.env', 'package-lock.json', '.git/']):
            logger.warning("You are editing a file that is in a special directory. This may be a security risk.")
            player.play(hook_name="cancel")
            sys.exit(2)

    if command == "Task":
        pass
    elif command == "Bash":
        pass
    elif command == "Glob":
        pass
    elif command == "Grep":
        pass
    elif command == "Read":
        pass
    elif command == "Edit":
        pass
    elif command == "MultiEdit":
        pass
    elif command == "Write":
        pass
    elif command == "WebFetch":
        pass
    elif command == "WebSearch":
        pass
    if not success:
        sys.exit(1)

if __name__ == "__main__":
    main()