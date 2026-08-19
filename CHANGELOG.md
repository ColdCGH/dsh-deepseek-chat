# Changelog

## 0.2.6 (2026-08-19)

- **收起动画时序修正（用户实测要求）**：侧边栏收起时，其他图标随栏同步收缩到收起位；网页对话图标不再一起缩，而是**等侧边栏收缩完成后**，以「从右往左」的 rail-in 滑入动画出现在新对话图标下方
- 实现：`playEntryAnimation` 收起分支改为 `playRailInAfterCollapse`——收起瞬间先把入口临时隐藏（opacity 0，不随栏滑动），用 rAF 轮询「新对话」按钮宽度直到 3 帧稳定（即侧边栏收缩结束）再施放 `backwards` 填充的 rail-in 滑入；带 120 帧安全上限防永久隐藏；`cancelRailWait` 处理收起途中快速展开/展开途中的竞态。展开（wide）仍即时 wide-in 淡入

## 0.2.5 (2026-08-19)

- **回退 0.2.4 动画改动，恢复 0.2.3 已验证的收起/展开滑动动画**（侧边栏收起时 rail-in 滑入 + DOM 常驻不重建，用户实测效果好）
- 撤销 0.2.4 引入的回归根因：
  - `playEntryAnimation` 不再用 `requestAnimationFrame` 推迟一帧（改回同步 `void offsetWidth` 触发），消除「先闪一下再滑」的卡顿/闪烁
  - 动画填充改回 `backwards`（0.2.4 用 `forwards`，动画开始前元素停在可见态导致闪烁）
  - 移除 enter/exit 过渡类与 rail 滑动动画在宿主上的互相打架
  - `unmountBelowEntry` 改回立即移除（不再播 160ms exit 动画再删，避免 DOM 被破坏重建闪烁）
  - `ChatEntry` 恢复 `useEffect([show])` 单依赖（0.2.4 扩成 `[show,wide,cleanup]` 会让 rail 切换时重建监听）

## 0.2.1 (2026-08-17)

- **包名变更**：`@deepseek-ai/dsh-chat-entry` → **`@coldcgh/dsh-deepseek-chat`**（回归自有 scope）
- **依赖瘦身**：移除 `@deepseek-ai/cordis`、`@deepseek-ai/dsh-client-ui-primitives`、`@deepseek-ai/dsh-client-ui-slots`（均未实际引用，消除宿主共享包遮蔽警告），仅保留 `react` + `dsh-client-runtime`
- 侧边栏按钮：悬停动效（`--dsw-alias-button-floating-hover` + 120ms 过渡）、与新对话按钮等宽等高、图标大小对齐（14px/18px）、下方 10px 边距
- 挂载响应：`MutationObserver` 即时挂载（替代 400ms 轮询），折叠/展开切换无延迟

## 0.2.0 (2026-08-17)

- 桌面桥接：在 dsh-desktop 下点击按钮 → 启动器打开**独立聊天子窗口**（不再霸占主窗口）
- 纯 web 环境自动降级为当前 webview 内导航
- 独立仓库初始化（Gitee `coldcgh/dsh-chat-entry`，mit）

## 0.1.0-rc.6 (2026-08-17)

- 首批：侧边栏"网页对话"入口（sidebar.footer.action）+ 设置开关（内嵌 exe 分发阶段）

## 0.2.2 (2026-08-17)

- **Fix**: client.js 模块头 `__ModuleLoader__.load` 的 id 更新为 `@coldcgh/dsh-deepseek-chat`（修复包名变更后 harness 报 failed to import loader entry 的加载失败）


## 0.2.3 (2026-08-17)

- **Fix/提升**：侧边栏收起/展开动画对齐 harness——不销毁重建（DOM 常驻 + CSS 过渡），收起播放同款 rail-in 滑入动画（150ms translateX 49px），展开 wide-in 淡入；图标尺寸 14/18px 同步过渡

## 0.2.4 (2026-08-17)

- **动画优化**：
  - 使用 `requestAnimationFrame` 替代 `void offsetWidth` 触发动画，减少延迟
  - 添加 `will-change: transform, opacity` GPU 加速提示，提升流畅度
  - 优化 easing 函数为 `cubic-bezier(0.25, 0.1, 0.25, 1)`
  - Rail-in 动画 translateX 从 49px 调整为 30px（更自然的滑入距离）
- **平滑过渡**：
  - 新增 enter/exit CSS 过渡动画，按钮显示/消失不再突兀
  - 显示时淡入+下移（150ms），消失时淡出+上移（150ms）
- **稳定性**：
  - 使用 `useRef` 管理组件内部状态，避免快速切换时的竞态问题
  - 退出动画定时器可被新的挂载取消，防止 DOM 被意外移除
  - 轮询间隔从 150ms 缩短到 100ms，响应更快

