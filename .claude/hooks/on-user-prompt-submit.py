#!/usr/bin/env python3
"""
Claude Code on-user-prompt-submit hook - plays audio when user submits a prompt
"""

import sys
from audio_player import AudioPlayer

def main():
    # 读取事件数据（保持与原始钩子兼容）
    context = sys.stdin.read()
    print(context)
    print("on-user-prompt-submit")
    
    # 创建音频播放器并播放对应的音频
    player = AudioPlayer()
    success = player.play(hook_name="on_user_prompt_submit")
    
    if not success:
        sys.exit(1)

if __name__ == "__main__":
    main()