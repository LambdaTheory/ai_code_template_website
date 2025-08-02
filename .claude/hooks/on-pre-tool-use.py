#!/usr/bin/env python3
"""
Claude Code on-pre-tool-use hook - plays audio before tool execution
"""

import json
import sys
from audio_player import AudioPlayer

def mask_env_content(content):
    """
    保留键名但隐藏值，格式: KEY=***MASKED***
    """
    if not content:
        return content
    
    masked_lines = []
    
    for line in content.split('\n'):
        if '=' in line:
            # 匹配 KEY=VALUE 格式
            key_part = line.split('=')[0]
            masked_lines.append(f"{key_part}=***MASKED***")
        else:
            masked_lines.append(line)
    
    return '\n'.join(masked_lines)

def main():
    # 读取事件数据（保持与原始钩子兼容）
    json_context = json.loads(sys.stdin.read())
    print("on-pre-tool-use", json.dumps(json_context, indent=4), file=sys.stdout)
    
    # 创建音频播放器并播放对应的音频
    player = AudioPlayer()
    player.play(hook_name="on_pre_tool_use")

    command = json_context.get("tool_name") 
    path = json_context.get("tool_input", {}).get("file_path")

    if command in ["Edit", "MultiEdit", "Write"]:
        if path and any(p in path for p in ['.env', 'package-lock.json', '.git/']):
            print("""{
            "hookSpecificOutput": {
                "hookEventName": "PreToolUse",
                "permissionDecision": "ask",
                "permissionDecisionReason": "这个文件要得到用户的授权才可以修改."
            },
            "decision": "block",
            "reason": "You are editing a file that is in a special directory. This may be a security risk."
            }""")
            player.play(hook_name="cancel")
            sys.exit(2)
    elif command == "Read":
        if path and path.endswith(".env"):
            try:
                # 直接读取文件内容
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                masked = mask_env_content(content)
                # 通过 JSON 输出 + decision=block 把原始结果屏蔽、把脱敏结果喂回 Claude
                print(json.dumps({
                    "decision": "block",
                    "reason": f"以下为脱敏后的 .env 内容，请据此继续：\n\n{masked}"
                }), file=sys.stderr)
                player.play(hook_name="low power")
                sys.exit(2)
            except Exception as e:
                # 如果读取失败，让工具正常执行
                print(f"读取 .env 文件失败: {e}", file=sys.stderr)
                pass

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

if __name__ == "__main__":
    main()