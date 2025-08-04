---
argument-hint: [镜像名称] [版本标签]
description: 创建GitHub Actions工作流，构建Docker镜像并推送到GHCR，包含健康检查
allowed-tools: Read,Write,Edit,Bash,Task,Glob
---

我需要为镜像 $ARGUMENTS 创建完整的 Docker CI/CD 工作流，推送到 GitHub Container Registry。

1. 检查项目类型，确定合适的 Dockerfile 模板

2. 创建 Dockerfile（如果不存在）：
   - 基于项目类型的多阶段构建
   - 包含健康检查配置
   - 优化镜像大小和安全性

3. 创建 GitHub Actions 工作流文件 `.github/workflows/docker-build.yml`：
   - 使用 $ARGUMENTS 中的镜像名称和版本标签
   - 配置 GHCR 认证和推送
   - 设置多平台构建支持
   - 配置缓存策略

4. 创建 .dockerignore 文件（如果需要）

5. 在应用中添加健康检查端点（如果需要）
