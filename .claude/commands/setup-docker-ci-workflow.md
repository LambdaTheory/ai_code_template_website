---
argument-hint: [镜像名称] [版本标签]
description: 创建GitHub Actions工作流，构建Docker镜像并推送到GHCR，包含健康检查
allowed-tools: Read,Write,Edit,Bash,Task,Glob
---

我需要创建一个完整的 GitHub Actions 工作流，用于构建 Docker 镜像并推送到 GitHub Container Registry (GHCR)，包含健康检查功能。

请按以下步骤执行：

1. **创建 Dockerfile**（如果不存在）：
   - 基于 Node.js 的多阶段构建
   - 包含健康检查配置
   - 优化镜像大小和安全性

2. **创建 GitHub Actions 工作流**：
   - 在 `.github/workflows/` 目录创建 `docker-build.yml`
   - 配置触发条件（push、tag、PR等）
   - 设置 GHCR 认证和权限

3. **配置 Docker 构建步骤**：
   - 使用 Docker Buildx 进行多平台构建
   - 配置缓存策略提升构建速度
   - 设置镜像标签和元数据

4. **实现健康检查**：
   - 在 Dockerfile 中定义 HEALTHCHECK
   - 创建健康检查端点
   - 配置检查间隔和超时

5. **配置安全和最佳实践**：
   - 使用非 root 用户运行
   - 扫描镜像漏洞
   - 设置适当的标签和文档

## 使用示例

```bash
# 创建基础 Docker 构建工作流
/docker-ghcr my-app latest

# 指定特定版本标签
/docker-ghcr my-webapp v1.2.3

# 使用项目名称作为镜像名
/docker-ghcr $(basename $(pwd)) $(git describe --tags)
```

## 生成的文件

1. **Dockerfile** - 多阶段构建配置
2. **.github/workflows/docker-build.yml** - GitHub Actions 工作流
3. **.dockerignore** - Docker 忽略文件（如果需要）
4. **健康检查** - 应用健康状态检查

## 特性

- ✅ 多平台构建支持 (linux/amd64, linux/arm64)
- ✅ 镜像缓存优化
- ✅ 自动版本标签
- ✅ 健康检查配置
- ✅ 安全扫描
- ✅ GHCR 自动推送