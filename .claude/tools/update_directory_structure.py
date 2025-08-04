#!/usr/bin/env python3
"""
目录结构生成脚本
生成项目的树状目录结构，支持文件简介管理
"""

import os
import json
import argparse
from pathlib import Path
from typing import Dict, List, Set, Tuple

class DirectoryTreeGenerator:
    def __init__(self, root_path: str = None):
        # 如果没有指定根路径，且脚本在 .claude/tools 目录中，则使用项目根目录
        if root_path is None:
            script_path = Path(__file__).resolve()
            if script_path.parent.name == 'tools' and script_path.parent.parent.name == '.claude':
                self.root_path = script_path.parent.parent.parent
            elif script_path.parent.name == '.claude':
                self.root_path = script_path.parent.parent
            else:
                self.root_path = Path(".").resolve()
        else:
            self.root_path = Path(root_path).resolve()
            
        # 配置文件放在 .claude 目录中
        self.config_file = self.root_path / ".claude" / "directory_descriptions.json"
        self.output_file = self.root_path / "docs" / "目录结构.md"
        
        # 默认忽略的文件和目录
        self.ignore_patterns = {
            'node_modules', '.git', '.next', 'logs', 'dist', 'build',
            '.DS_Store', '__pycache__', '.pytest_cache', '.mypy_cache',
            '*.pyc', '*.pyo', '*.log', '.vscode', '.idea'
        }
        
        # 加载现有配置
        self.config_data = self.load_config()
        self.descriptions = self.config_data.get('descriptions', {})
        self.custom_ignore = self.config_data.get('ignore', [])
        
    def load_config(self) -> Dict:
        """加载配置文件"""
        if self.config_file.exists():
            try:
                with open(self.config_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    # 兼容旧格式：如果直接是描述字典，转换为新格式
                    if isinstance(data, dict) and 'descriptions' not in data and 'ignore' not in data:
                        # 旧格式兼容
                        return {'descriptions': data, 'ignore': []}
                    return data
            except (json.JSONDecodeError, IOError):
                print(f"警告：无法读取配置文件 {self.config_file}")
        return {'descriptions': {}, 'ignore': []}
    
    def save_descriptions(self):
        """保存文件描述配置"""
        try:
            config_data = {
                'ignore': self.custom_ignore,
                'descriptions': self.descriptions
            }
            with open(self.config_file, 'w', encoding='utf-8') as f:
                json.dump(config_data, f, ensure_ascii=False, indent=2)
            print(f"配置已保存到 {self.config_file}")
        except IOError as e:
            print(f"错误：无法保存配置文件 - {e}")
    
    def should_ignore(self, path: Path) -> bool:
        """判断是否应该忽略某个文件或目录"""
        name = path.name
        relative_path = str(path.relative_to(self.root_path))
        
        # 1. 检查自定义 ignore 列表（优先级最高）
        for ignore_pattern in self.custom_ignore:
            # 完整路径匹配
            if relative_path == ignore_pattern:
                return True
            # 路径前缀匹配（用于忽略整个目录）
            if relative_path.startswith(ignore_pattern + '/') or relative_path.startswith(ignore_pattern + '\\'):
                return True
            # 通配符匹配
            if ignore_pattern.startswith('*') and name.endswith(ignore_pattern[1:]):
                return True
            if ignore_pattern.endswith('*') and name.startswith(ignore_pattern[:-1]):
                return True
        
        # 2. 检查默认忽略模式
        # 检查完整路径匹配
        if relative_path in self.ignore_patterns:
            return True
            
        # 检查文件名匹配
        if name in self.ignore_patterns:
            return True
            
        # 检查模式匹配（简单的通配符）
        for pattern in self.ignore_patterns:
            if pattern.startswith('*') and name.endswith(pattern[1:]):
                return True
            if pattern.endswith('*') and name.startswith(pattern[:-1]):
                return True
                
        return False
    
    def get_relative_path(self, path: Path) -> str:
        """获取相对于根目录的路径"""
        return str(path.relative_to(self.root_path))
    
    def collect_files(self) -> List[Tuple[Path, int]]:
        """收集所有文件和目录，返回(路径, 深度)的列表"""
        files = []
        
        def walk_directory(current_path: Path, depth: int):
            if self.should_ignore(current_path):
                return
                
            files.append((current_path, depth))
            
            if current_path.is_dir():
                try:
                    # 获取子项并排序（目录在前，文件在后）
                    children = list(current_path.iterdir())
                    children.sort(key=lambda x: (x.is_file(), x.name.lower()))
                    
                    for child in children:
                        if not self.should_ignore(child):
                            walk_directory(child, depth + 1)
                except PermissionError:
                    print(f"警告：无权限访问目录 {current_path}")
        
        # 从根目录开始，但不包含根目录本身
        try:
            children = list(self.root_path.iterdir())
            children.sort(key=lambda x: (x.is_file(), x.name.lower()))
            
            for child in children:
                if not self.should_ignore(child):
                    walk_directory(child, 0)
        except PermissionError:
            print(f"错误：无权限访问根目录 {self.root_path}")
            
        return files
    
    def generate_tree_line(self, path: Path, depth: int, is_last: bool, 
                          last_at_level: List[bool]) -> str:
        """生成单行的树状结构"""
        name = path.name
        if path.is_dir():
            name += "/"
            
        # 构建树状前缀
        prefix = ""
        for i in range(depth):
            if i == depth - 1:
                prefix += "└── " if is_last else "├── "
            else:
                prefix += "    " if last_at_level[i] else "│   "
        
        # 获取描述
        relative_path = self.get_relative_path(path)
        description = self.descriptions.get(relative_path, "")
        
        # 构建完整行，考虑对齐
        base_line = f"{prefix}{name}"
        if description:
            # 计算需要的空格数来对齐注释
            # 假设制表符宽度为 4，计算实际显示宽度
            display_width = len(prefix.replace('\t', '    ')) + len(name)
            padding_needed = max(50 - display_width, 2)  # 最少2个空格
            return f"{base_line}{' ' * padding_needed}# {description}"
        else:
            return base_line
    
    def generate_tree(self) -> Tuple[str, Set[str]]:
        """生成完整的目录树"""
        files = self.collect_files()
        if not files:
            return "项目目录为空或无可访问文件。", set()
        
        lines = []
        missing_descriptions = set()
        
        # 计算每一层的最后一个元素
        level_counts = {}  # {depth: count}
        level_current = {}  # {depth: current_index}
        
        # 预处理：统计每层的元素数量
        for path, depth in files:
            level_counts[depth] = level_counts.get(depth, 0) + 1
            level_current[depth] = 0
        
        # 重新统计，这次正确处理
        level_counts = {}
        for path, depth in files:
            if depth not in level_counts:
                level_counts[depth] = 0
            level_counts[depth] += 1
        
        # 为每个深度跟踪当前索引
        level_indices = {depth: 0 for depth in level_counts.keys()}
        last_at_level = [False] * 10  # 假设最多10层深度
        
        for path, depth in files:
            level_indices[depth] += 1
            is_last = level_indices[depth] == level_counts[depth]
            
            # 更新last_at_level
            if depth < len(last_at_level):
                last_at_level[depth] = is_last
            
            line = self.generate_tree_line(path, depth, is_last, last_at_level)
            lines.append(line)
            
            # 检查是否缺少描述
            relative_path = self.get_relative_path(path)
            if relative_path not in self.descriptions:
                missing_descriptions.add(relative_path)
        
        return "\n".join(lines), missing_descriptions
    
    def add_description(self, file_path: str, description: str):
        """添加文件描述"""
        # 标准化路径
        path = Path(file_path)
        if path.is_absolute():
            try:
                relative_path = str(path.relative_to(self.root_path))
            except ValueError:
                print(f"错误：路径 {file_path} 不在项目根目录下")
                return False
        else:
            relative_path = file_path
        
        self.descriptions[relative_path] = description
        print(f"已添加描述：{relative_path} -> {description}")
        return True
    
    
    def generate_and_save(self):
        """生成目录结构并保存到文件"""
        tree_content, missing = self.generate_tree()
        
        # 生成完整的 markdown 内容
        content = f"""# 项目目录结构

```
{tree_content}
```

## 文件说明

本文档由 `generate_structure.py` 脚本自动生成。

- 使用 `python generate_structure.py` 生成目录结构
- 使用 `python generate_structure.py --add <文件路径> "<描述>"` 添加文件描述
- 使用 `python generate_structure.py --missing` 查看缺少描述的文件
"""
        
        # 确保输出目录存在
        self.output_file.parent.mkdir(parents=True, exist_ok=True)
        
        # 保存文件
        try:
            with open(self.output_file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"目录结构已保存到：{self.output_file}")
        except IOError as e:
            print(f"错误：无法保存文件 - {e}")
            
        # 显示缺少描述的文件
        if missing:
            print(f"\n发现 {len(missing)} 个文件缺少描述：")
            for path in sorted(missing):
                print(f"  - {path}")
            print("\n建议使用以下命令添加描述：")
            for path in sorted(list(missing)[:3]):  # 只显示前3个作为示例
                print(f"  python generate_structure.py --add '{path}' '<描述>'")
            if len(missing) > 3:
                print(f"  ... 还有 {len(missing) - 3} 个文件")
    
    def show_missing_only(self):
        """仅显示缺少描述的文件"""
        _, missing = self.generate_tree()
        if missing:
            print(f"缺少描述的文件 ({len(missing)} 个)：")
            for path in sorted(missing):
                print(f"  {path}")
        else:
            print("所有文件都已有描述！")

# 模块接口函数
def update_directory_structure(root_path: str = None) -> bool:
    """
    更新目录结构文档的模块接口函数
    
    Args:
        root_path: 项目根目录路径，如果为None则自动检测
        
    Returns:
        bool: 成功返回True，失败返回False
    """
    try:
        generator = DirectoryTreeGenerator(root_path)
        generator.generate_and_save()
        generator.save_descriptions()
        return True
    except Exception as e:
        print(f"更新目录结构时发生错误: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(
        description="生成项目目录结构文档",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例用法：
  python generate_structure.py                              # 生成目录结构
  python generate_structure.py --add "src/app/page.tsx" "首页组件"  # 添加文件描述
  python generate_structure.py --missing                    # 查看缺少描述的文件
        """
    )
    
    parser.add_argument(
        '--root', '-r',
        default='.',
        help='项目根目录路径 (默认: 当前目录)'
    )
    
    parser.add_argument(
        '--add', '-a',
        nargs=2,
        metavar=('PATH', 'DESCRIPTION'),
        help='添加文件描述：路径 描述'
    )
    
    parser.add_argument(
        '--missing', '-m',
        action='store_true',
        help='仅显示缺少描述的文件'
    )
    
    args = parser.parse_args()
    
    # 创建生成器实例
    generator = DirectoryTreeGenerator(args.root)
    
    # 处理不同的命令
    if args.add:
        file_path, description = args.add
        if generator.add_description(file_path, description):
            generator.save_descriptions()
    elif args.missing:
        generator.show_missing_only()
    else:
        generator.generate_and_save()
        generator.save_descriptions()

if __name__ == "__main__":
    main()