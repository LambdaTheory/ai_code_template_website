#!/usr/bin/env python3
"""
Claude Code on-session-start hook - plays audio when session starts
"""

import json
import sys
from audio_player import AudioPlayer

def main():
    # 读取事件数据（保持与原始钩子兼容）
    json_context = json.loads(sys.stdin.read())
    print("on-session-start", json_context)
    
    # 创建音频播放器并播放对应的音频
    player = AudioPlayer()
    success = player.play(hook_name="on_session_start")
    
    if not success:
        sys.exit(1)

if __name__ == "__main__":
    main()