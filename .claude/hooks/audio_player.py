#!/usr/bin/env python3
"""
Audio player utility for Claude Code hooks
提供跨平台音频播放功能和配置管理
"""

import subprocess
import platform
import json
import logging
from typing import Optional, Dict, Any
from pathlib import Path

# 配置日志
logging.basicConfig(level=logging.WARNING, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

class AudioPlayer:
    """跨平台音频播放器"""
    
    def __init__(self, config_path: Optional[str] = None):
        """
        初始化音频播放器
        
        Args:
            config_path: 配置文件路径，默认为项目根目录的 .claude/audio-config.json
        """
        self.script_dir = Path(__file__).parent
        self.project_root = self.script_dir.parent.parent
        
        # 加载配置
        if config_path is None:
            config_path = self.script_dir / "audio-config.json"
        
        self.config = self._load_config(config_path)
        self.system = platform.system().lower()
    
    def _load_config(self, config_path: Path) -> Dict[str, Any]:
        """加载音频配置文件"""
        try:
            if config_path.exists():
                with open(config_path, 'r', encoding='utf-8') as f:
                    return json.load(f)
        except (json.JSONDecodeError, IOError) as e:
            logger.warning(f"无法加载配置文件 {config_path}: {e}")
        
        # 默认配置
        return {
            "audio_files": {
                "on_stop": "voice/girl/new construction options.wav",
                "on_user_prompt_submit": "voice/girl/building.wav"
            },
            "volume": 0.8,
            "enabled": True
        }
    
    def _get_audio_path(self, hook_name: str) -> Optional[Path]:
        """根据钩子名称获取音频文件路径"""
        if not self.config.get("enabled", True):
            return None
            
        relative_path = self.config.get("audio_files", {}).get(hook_name)
        if not relative_path:
            logger.warning(f"未找到钩子 {hook_name} 的音频配置")
            return None
        
        audio_path = self.project_root / relative_path
        if not audio_path.exists():
            logger.error(f"音频文件不存在: {audio_path}")
            return None
        
        return audio_path
    
    def _play_on_macos(self, file_path: Path) -> bool:
        """在 macOS 上播放音频"""
        try:
            volume = self.config.get("volume", 0.8)
            subprocess.run([
                'afplay', str(file_path), '-v', str(volume)
            ], check=True, capture_output=True)
            return True
        except (subprocess.CalledProcessError, FileNotFoundError) as e:
            logger.error(f"macOS 音频播放失败: {e}")
            return False
    
    def _play_on_windows(self, file_path: Path) -> bool:
        """在 Windows 上播放音频"""
        # PowerShell 方法
        try:
            volume = int(self.config.get("volume", 0.8) * 100)
            ps_command = (
                f'Add-Type -AssemblyName presentationCore; '
                f'$mediaPlayer = New-Object system.windows.media.mediaplayer; '
                f'$mediaPlayer.Volume = {volume/100}; '
                f'$mediaPlayer.open("{file_path}"); '
                f'$mediaPlayer.Play(); '
                f'Start-Sleep 3'
            )
            subprocess.run([
                'powershell', '-Command', ps_command
            ], check=True, capture_output=True)
            return True
        except (subprocess.CalledProcessError, FileNotFoundError):
            pass
        
        # 备选方案
        fallback_commands = [
            ['start', '/min', 'wmplayer', str(file_path)],
            ['rundll32', 'winmm.dll,mciSendStringA', f'play "{file_path}" wait', '0', '0']
        ]
        
        for cmd in fallback_commands:
            try:
                subprocess.run(cmd, shell=True, check=True, capture_output=True)
                return True
            except subprocess.CalledProcessError:
                continue
        
        logger.error("Windows 上没有找到可用的音频播放器")
        return False
    
    def _play_on_linux(self, file_path: Path) -> bool:
        """在 Linux 上播放音频"""
        audio_players = [
            (['paplay', str(file_path)], False),
            (['aplay', str(file_path)], False),
            (['mpg123', str(file_path)], False),
            (['ffplay', '-nodisp', '-autoexit', str(file_path)], False),
            (['cvlc', '--play-and-exit', str(file_path)], False)
        ]
        
        for cmd, shell in audio_players:
            try:
                subprocess.run(cmd, shell=shell, check=True, capture_output=True)
                return True
            except (subprocess.CalledProcessError, FileNotFoundError):
                continue
        
        logger.error("Linux 上没有找到可用的音频播放器")
        return False
    
    def play(self, file_path: Optional[Path] = None, hook_name: Optional[str] = None) -> bool:
        """
        播放音频文件
        
        Args:
            file_path: 直接指定音频文件路径
            hook_name: 钩子名称，用于从配置中查找音频文件
            
        Returns:
            bool: 播放是否成功
        """
        if file_path is None and hook_name is None:
            logger.error("必须指定 file_path 或 hook_name")
            return False
        
        # 优先使用 file_path，否则从配置中获取
        target_path = file_path or self._get_audio_path(hook_name)
        if not target_path:
            return False
        
        logger.info(f"播放音频: {target_path}")
        
        if self.system == 'darwin':
            return self._play_on_macos(target_path)
        elif self.system == 'windows':
            return self._play_on_windows(target_path)
        elif self.system == 'linux':
            return self._play_on_linux(target_path)
        else:
            logger.error(f"不支持的操作系统: {self.system}")
            return False

def create_default_config():
    """创建默认配置文件"""
    script_dir = Path(__file__).parent
    config_path = script_dir / "audio-config.json"
    
    if config_path.exists():
        return
    
    default_config = {
        "enabled": True,
        "volume": 0.8,
        "audio_files": {
            "on_stop": "voice/girl/new construction options.wav",
            "on_user_prompt_submit": "voice/girl/building.wav"
        }
    }
    
    try:
        with open(config_path, 'w', encoding='utf-8') as f:
            json.dump(default_config, f, indent=2, ensure_ascii=False)
        print(f"已创建默认配置文件: {config_path}")
    except IOError as e:
        logger.error(f"无法创建配置文件: {e}")

if __name__ == "__main__":
    # 如果直接运行此脚本，创建默认配置文件
    create_default_config()