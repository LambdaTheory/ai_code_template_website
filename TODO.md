# 立足 UserPromptSubmit，把「一句话触发」扩展成高质量提示、上下文或工具调用脚本。
- 固定模板
@daily_report
读取 ~/reports/daily/{{today}}.md 内容注入
例行日报、周报

- 上下文检索
?todo
扫描当前仓库 TODO: 注释并格式化为 Markdown 清单
代码任务梳理

- 代码片段
js!debounce
插入团队库中的标准防抖函数实现
减少搜索/粘贴

- 数据查询
sql#top_users(30d)
生成并执行 SQL→返回结果表
快速洞察

- Issue/PR 路由
/jira 123
拉取 Jira‑123 摘要 + 子任务列表
跨工具整合

- 命令速记
!ls src
“列出 src 目录下文件并按类型分组”
语义化

- 翻译/润色
>en 请润色以下段落
自动加 “请用流畅英语改写：…” 前缀
多语协作

- 通知触发
#alert 部署完成
调用 Webhook 向 Slack 发送通知
DevOps

# 再搞一个基于Ant Design的后台模版仓库
优点：Ant Design的组件库比较丰富
缺点：体积巨大

# 参考资料
- https://docs.anthropic.com/en/docs/claude-code/hooks
- https://docs.anthropic.com/en/docs/claude-code/common-workflows#use-extended-thinking
- https://docs.anthropic.com/en/docs/claude-code/sub-agents