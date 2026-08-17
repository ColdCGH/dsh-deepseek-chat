# Changelog

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

