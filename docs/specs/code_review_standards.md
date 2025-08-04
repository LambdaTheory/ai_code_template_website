# 代码审查标准

## 1. 类型安全问题

#### 常见错误

- 使用 `any` 类型逃避类型检查
- 忽略可能为 `null` 或 `undefined` 的值
- 类型断言过于宽泛或不安全
- 缺少必要的类型守卫

#### 正确做法

```typescript
// 错误：使用 any
const data: any = fetchData()

// 正确：明确类型
interface UserData {
  id: number
  name: string
  email?: string
}
const data: UserData = fetchData()

// 错误：直接访问可能为空的属性
user.profile.avatar

// 正确：使用可选链和空值合并
user?.profile?.avatar ?? defaultAvatar
```

## 2. 异步操作处理

#### 常见错误

- 忘记处理 Promise 拒绝
- 在循环中使用 `await` 导致串行执行
- 缺少加载状态和错误状态处理
- 竞态条件未考虑

#### 正确做法

```typescript
// 错误：串行处理
for (const item of items) {
  await processItem(item)
}

// 正确：并行处理
await Promise.all(items.map(processItem))

// 错误：缺少错误处理
const data = await fetchData()

// 正确：完整的错误处理
try {
  const data = await fetchData()
  // 处理数据
} catch (error) {
  console.error('获取数据失败:', error)
  // 错误处理逻辑
}
```

## 3. React 组件常见问题

#### 常见错误

- 在 useEffect 中缺少依赖项
- 直接修改 state 对象
- 在渲染期间进行副作用操作
- key 属性使用不当

#### 正确做法

```tsx
// 错误：缺少依赖项
useEffect(() => {
  fetchData(userId)
}, [])

// 正确：包含所有依赖
useEffect(() => {
  fetchData(userId)
}, [userId])

// 错误：直接修改 state
const handleUpdate = () => {
  user.name = newName
  setUser(user)
}

// 正确：创建新对象
const handleUpdate = () => {
  setUser({ ...user, name: newName })
}
```

## 4. 性能相关问题

#### 常见错误

- 不必要的重新渲染
- 大量数据未做虚拟化
- 图片未优化或缺少懒加载
- Bundle 体积过大未做代码分割

#### 正确做法

```tsx
// 错误：每次渲染都创建新对象
<Component style={{ margin: 10 }} />

// 正确：提取到组件外部或使用 useMemo
const componentStyle = { margin: 10 }
<Component style={componentStyle} />

// 使用 React.memo 避免不必要渲染
const ExpensiveComponent = React.memo(({ data }) => {
  // 组件逻辑
})
```

## 5. 安全漏洞

#### 常见错误

- XSS 攻击：直接渲染用户输入
- 敏感信息泄露：在客户端代码中硬编码密钥
- CSRF 攻击：缺少防护措施
- 输入验证不充分

#### 正确做法

```tsx
// 错误：直接渲染用户输入
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// 正确：转义后渲染
<div>{userInput}</div>

// 错误：客户端硬编码密钥
const API_KEY = 'sk-1234567890abcdef'

// 正确：使用环境变量，服务端处理
const API_URL = process.env.NEXT_PUBLIC_API_URL
```

## 6. 错误处理不当

#### 常见错误

- 吞掉错误不处理
- 错误信息不够详细
- 缺少用户友好的错误提示
- 错误边界使用不当

#### 正确做法

```tsx
// 错误：静默处理错误
try {
  await riskyOperation()
} catch {}

// 正确：合适的错误处理
try {
  await riskyOperation()
} catch (error) {
  logger.error('操作失败', { error, context })
  showToast('操作失败，请稍后重试')
}
```

## 7. 代码结构问题

#### 常见错误

- 组件过于庞大，职责不清
- 深度嵌套的条件判断
- 重复代码未提取
- 硬编码的配置值

#### 正确做法

```typescript
// 错误：复杂的嵌套逻辑
if (user) {
  if (user.isActive) {
    if (user.hasPermission) {
      // 执行操作
    }
  }
}

// 正确：早期返回
if (!user?.isActive || !user.hasPermission) {
  return
}
// 执行操作
```

## 8. 可访问性问题

#### 常见错误

- 缺少语义化 HTML 标签
- 键盘导航支持不足
- 颜色对比度不够
- 缺少 ARIA 标签

#### 正确做法

```tsx
// 错误：div 作为按钮
<div onClick={handleClick}>点击</div>

// 正确：使用语义化标签
<button onClick={handleClick}>点击</button>

// 添加必要的 ARIA 属性
<button
  onClick={handleClick}
  aria-label="关闭对话框"
  aria-describedby="dialog-description"
>
  ×
</button>
```

## 代码审查清单

#### 功能性

- [ ] 功能是否按预期工作
- [ ] 边界情况是否处理
- [ ] 错误处理是否完善
- [ ] 测试覆盖是否充分

#### 代码质量

- [ ] 代码是否易读易维护
- [ ] 是否遵循项目编码规范
- [ ] 是否有重复代码需要重构
- [ ] 变量和函数命名是否清晰

#### 性能

- [ ] 是否有性能瓶颈
- [ ] 内存泄漏风险
- [ ] 渲染性能是否优化
- [ ] 网络请求是否合理

#### 安全性

- [ ] 输入验证是否充分
- [ ] 敏感信息是否保护
- [ ] 权限控制是否正确
- [ ] XSS/CSRF 防护是否到位

#### 可维护性

- [ ] 组件职责是否单一
- [ ] 依赖关系是否合理
- [ ] 配置是否可扩展
- [ ] 文档是否完善
