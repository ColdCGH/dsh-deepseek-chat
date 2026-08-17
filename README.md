# dsh-chat-entry

DeepSeek Harness 网页对话入口插件：在 web UI 侧边栏底部（设置按钮上方）显示一个"网页对话"按钮，点击打开 [chat.deepseek.com](https://chat.deepseek.com/)。

## 特性

- **桌面独立窗口**：在 [dsh-desktop](https://gitee.com/coldcgh/dsh-desktop)（Wails v3 启动器）下运行时，点击按钮通过本地桥接 API 让启动器打开**独立的聊天子窗口**——主窗口（harness 页面）不再被导航霸占，可同时使用
- **Web 环境降级**：纯浏览器 / 第三方桌面壳（无 `window.__DSH_DESKTOP_API__` 桥接）时自动降级为原行为（当前 webview 内跳转），插件功能永不失效
- **持久化开关**：设置页可开关入口（`dsh-chat-entry.showEntry`，默认开）

## 安装

```bash
# 方式一：从 npm 安装
dsh plugin --profile web add @deepseek-ai/dsh-chat-entry

# 方式二：本地包安装（开发测试）
npm pack
dsh plugin --profile web add ./deepseek-ai-dsh-chat-entry-0.2.0.tgz
```

重启 harness 后侧边栏底部出现"网页对话"按钮。

## 桌面桥接协议（可选）

启动器在 harness 页面注入：

```js
window.__DSH_DESKTOP_API__ = "http://127.0.0.1:<port>/<token>"
```

插件按钮点击时：

```js
fetch(window.__DSH_DESKTOP_API__ + "/window/chat", { method: "POST" })
```

- 桥接不存在 → 直接导航（降级）
- 桥接失败（如启动器已退出）→ 回退导航

token 为每实例随机生成，仅本机 loopback 可用。

## 结构

```
lib/index.js     server 端：settings 注册（showEntry 开关）
lib/client.js    client 端：侧边栏按钮 + 桥接/降级逻辑（编译产物）
cordis.patch.yml bundle patch：加入 web roster
```

> 说明：当前仓库分发编译产物；源文件（tsx）与构建脚本在后续版本补齐（tsdown 构建）。

## License

MIT
