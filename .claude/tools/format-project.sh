#!/bin/bash

# 项目格式化脚本
# 自动检测项目类型并执行相应的格式化命令

set -e  # 遇到错误时退出

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 输出函数
info() {
    echo -e "${GREEN}ℹ️  $1${NC}"
}

warn() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

# 检查命令是否存在
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# 检查文件是否存在
file_exists() {
    [[ -f "$1" ]]
}

# 检查 package.json 中是否有指定脚本
has_npm_script() {
    local script_name="$1"
    if file_exists "package.json"; then
        # 使用 node 来解析 JSON，避免依赖 jq
        node -e "
            const pkg = JSON.parse(require('fs').readFileSync('package.json', 'utf8'));
            const hasScript = pkg.scripts && pkg.scripts['$script_name'];
            process.exit(hasScript ? 0 : 1);
        " 2>/dev/null
    else
        return 1
    fi
}

# Node.js 项目格式化
format_nodejs() {
    info "检测到 Node.js 项目"
    
    if has_npm_script "format"; then
        info "执行 npm run format"
        npm run format
        return 0
    elif has_npm_script "prettier"; then
        info "执行 npm run prettier"
        npm run prettier
        return 0
    elif command_exists "prettier"; then
        info "使用全局 Prettier 格式化"
        prettier --write .
        return 0
    else
        warn "未找到格式化命令，跳过 Node.js 格式化"
        return 1
    fi
}

# Rust 项目格式化
format_rust() {
    info "检测到 Rust 项目"
    
    if command_exists "cargo"; then
        info "执行 cargo fmt"
        cargo fmt
        return 0
    else
        warn "未安装 cargo，跳过 Rust 格式化"
        return 1
    fi
}

# Python 项目格式化
format_python() {
    info "检测到 Python 项目"
    
    if command_exists "ruff"; then
        info "使用 ruff 格式化"
        ruff format . 2>/dev/null || ruff check --fix . 2>/dev/null || true
        return 0
    elif command_exists "black"; then
        info "使用 black 格式化"
        black . 2>/dev/null || true
        return 0
    elif command_exists "autopep8"; then
        info "使用 autopep8 格式化"
        find . -name "*.py" -exec autopep8 --in-place {} \; 2>/dev/null || true
        return 0
    else
        warn "未找到 Python 格式化工具，跳过 Python 格式化"
        return 1
    fi
}

# Go 项目格式化
format_go() {
    info "检测到 Go 项目"
    
    if command_exists "go"; then
        info "执行 go fmt"
        go fmt ./...
        return 0
    else
        warn "未安装 go，跳过 Go 格式化"
        return 1
    fi
}

# 主函数
main() {
    info "开始项目格式化..."
    
    local formatted=false
    
    # 检测并格式化不同类型的项目
    if file_exists "package.json"; then
        if format_nodejs; then
            formatted=true
        fi
    fi
    
    if file_exists "Cargo.toml"; then
        if format_rust; then
            formatted=true
        fi
    fi
    
    if file_exists "pyproject.toml" || file_exists "requirements.txt" || file_exists "setup.py"; then
        if format_python; then
            formatted=true
        fi
    fi
    
    if file_exists "go.mod" || find . -maxdepth 2 -name "*.go" -type f | head -1 | grep -q .; then
        if format_go; then
            formatted=true
        fi
    fi
    
    # 如果没有检测到任何项目类型，尝试通用格式化
    if ! $formatted; then
        warn "未检测到支持的项目类型"
        
        # 尝试常见的格式化工具
        if command_exists "prettier"; then
            info "尝试使用 Prettier 格式化"
            prettier --write . 2>/dev/null && formatted=true
        fi
    fi
    
    if $formatted; then
        info "项目格式化完成"
    else
        warn "跳过格式化步骤"
    fi
}

# 执行主函数
main "$@"