#!/bin/bash
# 使用 Amazon Q 对代码进行智能审查

set -e  # 遇到错误立即退出

# 默认配置
DEFAULT_Q_ACCOUNT_PATH="${HOME}/.local/share/amazon-q"
DEFAULT_Q_IMAGE="ghcr.io/kun-g/q:latest"
DEFAULT_REVIEW_STANDARDS_FILE="docs/specs/code_review_standards.md"

# 加载配置文件
load_config() {
    local config_file="${HOME}/.code-review-config"
    
    # 设置默认值
    Q_ACCOUNT_PATH="$DEFAULT_Q_ACCOUNT_PATH"
    Q_IMAGE="$DEFAULT_Q_IMAGE"
    REVIEW_STANDARDS_FILE="$DEFAULT_REVIEW_STANDARDS_FILE"
    
    # 如果存在配置文件，则加载
    if [[ -f "$config_file" ]]; then
        # 安全地读取配置，避免代码注入
        while IFS='=' read -r key value; do
            # 跳过注释和空行
            [[ "$key" =~ ^[[:space:]]*# ]] && continue
            [[ -z "$key" ]] && continue
            
            # 移除引号
            value="${value%\"}"
            value="${value#\"}"
            value="${value%\'}"
            value="${value#\'}"
            
            case "$key" in
                Q_ACCOUNT_PATH)
                    Q_ACCOUNT_PATH="$value"
                    ;;
                Q_IMAGE)
                    Q_IMAGE="$value"
                    ;;
                REVIEW_STANDARDS_FILE)
                    REVIEW_STANDARDS_FILE="$value"
                    ;;
            esac
        done < "$config_file"
    fi
}

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 帮助信息
show_help() {
    echo -e "${BLUE}代码审查脚本 - 使用 Amazon Q 对 Git Commits 进行代码审查${NC}"
    echo ""
    echo "用法:"
    echo "  $0 [选项]"
    echo ""
    echo "选项:"
    echo "  -h, --help       显示帮助信息"
    echo "  -c, --commits N  审查最近 N 个 commit (默认: 1)"
    echo "  --account PATH   指定 Amazon Q 账户路径"
    echo ""
    echo "示例:"
    echo "  $0                           # 审查最近 1 个 commit"
    echo "  $0 --commits 3               # 审查最近 3 个 commit"
    echo ""
}

# 错误处理函数
error_exit() {
    echo -e "${RED}错误: $1${NC}" >&2
    exit 1
}

# 成功输出函数
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# 警告输出函数
warn() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# 检查前置条件
check_prerequisites() {
    # 检查 podman
    if ! command -v podman &> /dev/null; then
        error_exit "未找到 podman 命令，请先安装 podman"
    fi

    # 检查 git 仓库
    if ! git rev-parse --git-dir &> /dev/null; then
        error_exit "当前目录不是 Git 仓库"
    fi

    # 检查审查标准文件
    if [[ ! -f "$REVIEW_STANDARDS_FILE" ]]; then
        warn "审查标准文件不存在: $REVIEW_STANDARDS_FILE"
        warn "将使用默认审查标准"
    fi

    # 检查 Amazon Q 账户路径
    if [[ ! -d "$Q_ACCOUNT_PATH" ]]; then
        error_exit "Amazon Q 账户路径不存在: $Q_ACCOUNT_PATH"
    fi
}


# 获取代码变更
get_code_changes() {
    local changes=""
    
    # 审查最近的 commits
    if ! git rev-parse HEAD~$((COMMIT_COUNT-1)) &>/dev/null; then
        error_exit "仓库中没有足够的 commit 历史"
    fi
    changes=$(git diff HEAD~$COMMIT_COUNT..HEAD)
    if [[ -z "$changes" ]]; then
        warn "最近 $COMMIT_COUNT 个 commit 没有变更"
        return 1
    fi
    echo "# 最近 $COMMIT_COUNT 个 commit 的变更"$'\n```diff\n'"$changes"$'\n```'
}

# 构建审查提示词
build_review_prompt() {
    local code_changes="$1"
    local review_standards=""
    
    # 读取审查标准
    if [[ -f "$REVIEW_STANDARDS_FILE" ]]; then
        review_standards=$(cat "$REVIEW_STANDARDS_FILE")
    else
        review_standards="请基于以下标准进行代码审查：
1. 类型安全问题 - 避免any类型，正确处理null/undefined
2. 异步操作处理 - Promise错误处理，避免串行执行  
3. React组件问题 - useEffect依赖，state不可变性
4. 性能相关问题 - 避免不必要渲染，优化大量数据处理
5. 安全漏洞 - XSS防护，敏感信息保护
6. 错误处理不当 - 完善的异常处理和用户提示
7. 代码结构问题 - 组件职责单一，减少嵌套复杂度
8. 可访问性问题 - 语义化标签，键盘导航支持"
    fi
    
    cat << EOF
# 🔍 代码审查任务

你是一个专业的代码审查专家，请对提供的代码进行全面审查。

## 📋 审查标准

$review_standards

## 📝 待审查代码

$code_changes

## 📊 审查要求

请提供结构化的审查报告，包括：

1. **📁 审查范围** - 说明审查的文件和变更范围
2. **⚠️ 问题分析** - 按优先级分类发现的问题：
   - 🔴 高优先级：安全漏洞、类型错误、严重性能问题
   - 🟡 中优先级：代码质量、最佳实践违反
   - 🔵 低优先级：风格问题、优化建议
3. **💡 改进建议** - 提供具体的修改方案和代码示例
4. **✅ 审查摘要** - 总体评价和关键建议

请使用中文进行审查，并保持专业和建设性的语调。
EOF
}

# 调用 Amazon Q 进行审查
run_amazon_q_review() {
    local prompt="$1"
    local temp_file
    local exit_code
    
    # 创建安全的临时文件
    temp_file=$(mktemp -t code-review.XXXXXX) || error_exit "无法创建临时文件"
    
    # 确保清理临时文件
    trap "rm -f '$temp_file'" EXIT
    
    # 将提示词写入临时文件，避免命令行注入
    printf '%s' "$prompt" > "$temp_file" || error_exit "无法写入临时文件"
    
    # 验证容器镜像名称（基本安全检查）
    if [[ ! "$Q_IMAGE" =~ ^[a-zA-Z0-9._/-]+:[a-zA-Z0-9._-]+$ ]] && [[ ! "$Q_IMAGE" =~ ^[a-zA-Z0-9._/-]+$ ]]; then
        error_exit "无效的容器镜像名称: $Q_IMAGE"
    fi
    
    # 使用临时文件作为输入，提高安全性
    if podman run -i --rm \
        -v "$(pwd):/home/quser/workspace:ro" \
        -v "$Q_ACCOUNT_PATH:/home/quser/.local/share/amazon-q:ro" \
        "$Q_IMAGE" \
        q chat --no-interactive --trust-all-tools < "$temp_file"; then
        exit_code=0
    else
        exit_code=$?
        case $exit_code in
            1)
                error_exit "Amazon Q 命令执行失败"
                ;;
            125)
                error_exit "容器运行失败，请检查 podman 安装和镜像可用性"
                ;;
            126)
                error_exit "容器命令无法执行"
                ;;
            127)
                error_exit "找不到 q 命令，请检查容器镜像"
                ;;
            *)
                error_exit "Amazon Q 审查失败（退出码: $exit_code），请检查容器配置和网络连接"
                ;;
        esac
    fi
    
    return $exit_code
}

# 主函数
main() {
    # 解析命令行参数
    COMMIT_COUNT=1
    OVERRIDE_ACCOUNT_PATH=""
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -c|--commits)
                COMMIT_COUNT="$2"
                if ! [[ "$COMMIT_COUNT" =~ ^[0-9]+$ ]] || [[ "$COMMIT_COUNT" -lt 1 ]]; then
                    error_exit "commit 数量必须是正整数"
                fi
                shift 2
                ;;
            --account)
                OVERRIDE_ACCOUNT_PATH="$2"
                shift 2
                ;;
            -*)
                error_exit "未知选项: $1"
                ;;
            *)
                error_exit "不支持的参数: $1"
                ;;
        esac
    done
    
    # 加载配置
    load_config
    
    # 命令行参数覆盖配置文件
    if [[ -n "$OVERRIDE_ACCOUNT_PATH" ]]; then
        Q_ACCOUNT_PATH="$OVERRIDE_ACCOUNT_PATH"
    fi
    
    # 检查前置条件
    check_prerequisites
    
    # 获取代码变更
    local code_changes
    code_changes=$(get_code_changes)
    
    # 构建审查提示词
    local review_prompt
    review_prompt=$(build_review_prompt "$code_changes")
    
    # 执行审查
    echo ""
    
    if run_amazon_q_review "$review_prompt"; then
        echo ""
        success "代码审查完成！"
    else
        error_exit "代码审查失败"
    fi
}

# 脚本入口点
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi