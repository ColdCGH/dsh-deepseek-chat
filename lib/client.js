window.__ModuleLoader__.load({ id: "@deepseek-ai/dsh-chat-entry", factory: (require) => {
var module = { exports: {} }; var exports = module.exports;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.tsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
var import_client = require("@deepseek-ai/dsh-client-runtime/client");
var import_jsx_runtime = require("react/jsx-runtime");
var CHAT_URL = "https://chat.deepseek.com/";
var SETTINGS_NAMESPACE = "dsh-chat-entry";
var SHOW_ENTRY_FIELD = "showEntry";
var ChatEntryPolicy = class {
  show = (0, import_client.createSnapshotStore)(true);
  host;
  /**
   * @param host - durable preference scope owned by this plugin; absent
   * compositions stay process-local (visible by default).
   */
  constructor(host) {
    this.host = host;
    if (host !== void 0) {
      host.subscribe(() => {
        this.adopt(host);
      });
      this.adopt(host);
    }
  }
  /** Change the preference; the live value publishes before the durable write. */
  setShow(next) {
    if (this.show.getSnapshot() === next) return;
    this.show.set(next);
    void this.host?.set(SHOW_ENTRY_FIELD, next);
  }
  /** Adopt the scope's accepted durable value without writing it back. */
  adopt(host) {
    const section = host.getSnapshot().value;
    if (section === void 0 || this.show.getSnapshot() === section.showEntry) return;
    this.show.set(section.showEntry);
  }
};
function openInDesktopWindow(e) {
  // Desktop-shell integration: when the launcher injected
  // window.__DSH_DESKTOP_API__, open the chat in its dedicated child
  // window instead of navigating the current webview. Without the bridge
  // (plain web / third-party shells) the anchor navigates as before.
  const api = window.__DSH_DESKTOP_API__;
  if (!api) return;
  e.preventDefault();
  fetch(api + "/window/chat", { method: "POST", keepalive: true }).catch(function () {
    window.location.href = CHAT_URL;
  });
}
// The sidebar New Session button is hard-coded by the harness (no injectable
// slot around it), so the entry button is mounted next to it via DOM: both
// buttons share the row 50/50. The harness repo stays untouched.
function findNewSessionButton() {
  const needles = ["new session", "new chat", "新对话", "新建会话", "新会话"];
  // Expanded: the real New Session button carries its label text, while the
  // wordmark (logo) button shares the same aria-label but renders no text —
  // match by text first so the logo is never wrapped.
  for (const b of document.querySelectorAll("button")) {
    const t = (b.textContent || "").trim();
    if (t && needles.some((n) => t === n || t.startsWith(n))) return b;
  }
  // Collapsed / fallback: aria-label match, skipping buttons whose svg is a
  // large wordmark (the real button only ever shows a 16-18px glyph).
  for (const b of document.querySelectorAll("button[aria-label]")) {
    const label = (b.getAttribute("aria-label") || "").toLowerCase();
    if (!needles.some((n) => label.includes(n.toLowerCase()))) continue;
    const svg = b.querySelector("svg");
    if (svg && svg.getBoundingClientRect().width > 32) continue; // wordmark
    return b;
  }
  return null;
}
const CHAT_ENTRY_ID = "dsh-chat-entry";
// Hover/active affordance matching the harness New Session button
// (.newSession:hover uses --dsw-alias-button-floating-hover); the railed
// icon form uses the lighter interactive fill, and the row keeps the 120ms
// background transition the harness controls use.
function ensureEntryStyles() {
  if (document.getElementById("dsh-chat-entry-styles")) return;
  const st = document.createElement("style");
  st.id = "dsh-chat-entry-styles";
  st.textContent = [
    "#" + CHAT_ENTRY_ID + " a { transition: background-color 120ms ease, border-color 120ms ease; }",
    "#" + CHAT_ENTRY_ID + " a:hover { background: var(--dsw-alias-button-floating-hover); }",
    "#" + CHAT_ENTRY_ID + "[data-rail=\"1\"] a:hover { background: var(--dsw-alias-interactive-bg-hover); }",
    "#" + CHAT_ENTRY_ID + " a:active { transform: scale(0.98); }"
  ].join("\n");
  document.head.appendChild(st);
}
function renderChatEntryButton(wide) {
  const host = document.getElementById(CHAT_ENTRY_ID);
  if (!host) return;
  host.replaceChildren();
  const a = document.createElement("a");
  a.href = CHAT_URL;
  a.title = "DeepSeek 网页对话";
  // Hover is done via JS because the base background is inline (an id/class
  // stylesheet rule cannot beat an inline background).
  const baseBg = wide ? "var(--dsw-alias-button-elevated-fill)" : "transparent";
  const hoverBg = wide ? "var(--dsw-alias-button-floating-hover)" : "var(--dsw-alias-interactive-bg-hover)";
  a.style.cssText = "flex:1;min-width:0;display:flex;align-items:center;justify-content:center;box-sizing:border-box;gap:6px;padding:0 8px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:" + baseBg + ";color:var(--dsw-alias-label-primary);cursor:pointer;font-family:inherit;font-size:14px;font-weight:500;line-height:22px;text-decoration:none;white-space:nowrap;overflow:hidden;transition:background-color 120ms ease,border-color 120ms ease";
  if (wide) {
    // Exact same 38px height as the harness New Session bar.
    a.style.height = "38px";
  } else {
    // Collapsed rail: square icon below the New Session icon.
    a.style.flex = "none";
    a.style.width = "36px";
    a.style.height = "36px";
    a.style.padding = "0";
    a.style.borderColor = "transparent";
    a.style.borderRadius = "8px";
  }
  a.addEventListener("mouseenter", () => { a.style.background = hoverBg; });
  a.addEventListener("mouseleave", () => { a.style.background = baseBg; });
  const icon = document.createElement("span");
  icon.setAttribute("aria-hidden", "true");
  icon.style.cssText = "flex:none;display:flex";
  // Message-bubble glyph matching the harness icon geometry: same size as
  // IconNewChatOutline16 (14px expanded / 18px rail) and a tightened viewBox
  // so the bubble occupies the full glyph box instead of floating small.
  const svgSize = wide ? 14 : 18;
  icon.innerHTML = '<svg width="' + svgSize + '" height="' + svgSize + '" viewBox="3 3 18 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-8 8H5l-3 2 1.5-4A8 8 0 1 1 21 12z"/><path d="M8.5 10h7M8.5 13.5h4.5"/></svg>';
  a.appendChild(icon);
  if (wide) {
    const label = document.createElement("span");
    label.textContent = "\u7F51\u9875\u5BF9\u8BDD"; // 网页对话
    a.appendChild(label);
  }
  a.addEventListener("click", openInDesktopWindow);
  host.appendChild(a);
}
function mountBelowEntry(wide) {
  const existing = document.getElementById(CHAT_ENTRY_ID);
  if (existing) {
    renderChatEntryButton(wide);
    return true;
  }
  const nb = findNewSessionButton();
  if (!nb || !nb.parentElement) return false;
  const host = document.createElement("div");
  host.id = CHAT_ENTRY_ID;
  host.setAttribute("data-rail", wide ? "" : "1");
  // Bottom margin keeps the entry clear of the workspaces list below. No
  // explicit width when expanded: stretch matches the New Session button
  // exactly (100% would ignore the host's own margins and run wider).
  host.style.cssText = "display:flex;box-sizing:border-box;flex:none;align-items:stretch;"
    + (wide ? "margin:0 2px 10px" : "margin:0 0 12px");
  ensureEntryStyles();
  // Width: fixed icon width when collapsed (New Session is a 36px rail item).
  if (!wide) {
    const w = nb.getBoundingClientRect().width;
    host.style.width = (w > 0 ? w : 36) + "px";
  }
  nb.parentElement.insertBefore(host, nb.nextSibling);
  renderChatEntryButton(wide);
  return true;
}
function unmountBelowEntry() {
  const host = document.getElementById(CHAT_ENTRY_ID);
  if (host) host.remove();
}
function ChatEntry({ wide, useShow }) {
  const show = useShow((value) => value);
  (0, import_react.useEffect)(() => {
    if (!show) return;
    let mounted = false;
    let obs = null;
    const stopWatching = () => {
      clearInterval(timer);
      if (obs) obs.disconnect();
    };
    const tryMount = () => {
      if (!mounted && mountBelowEntry(wide)) {
        mounted = true;
        stopWatching();
      }
    };
    const timer = setInterval(tryMount, 150);
    tryMount();
    obs = new MutationObserver(tryMount);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => {
      clearInterval(timer);
      if (obs) obs.disconnect();
      unmountBelowEntry();
    };
  }, [show, wide]);
  return null;
}
function ChatEntryToggle({ useShow, setShow }) {
  const show = useShow((value) => value);
  const toggle = () => {
    setShow?.(!show);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    padding: "12px 0",
    width: "100%",
    boxSizing: "border-box"
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { minWidth: 0 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: "20px",
        color: "var(--dsw-alias-label-primary)"
      }, children: "\u7F51\u9875\u5BF9\u8BDD\u5165\u53E3" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
        fontSize: 12,
        lineHeight: "18px",
        marginTop: 2,
        color: "var(--dsw-alias-label-secondary)"
      }, children: "\u5728\u4FA7\u8FB9\u680F\u5E95\u90E8\uFF08\u8BBE\u7F6E\u6309\u94AE\u4E0A\u65B9\uFF09\u663E\u793A chat.deepseek.com \u7684\u7F51\u9875\u5BF9\u8BDD\u5165\u53E3\u3002" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": show,
        "aria-label": "\u7F51\u9875\u5BF9\u8BDD\u5165\u53E3",
        onClick: toggle,
        style: {
          flex: "none",
          width: 38,
          height: 22,
          padding: 0,
          cursor: "pointer",
          position: "relative",
          borderRadius: 999,
          border: "1px solid var(--dsw-alias-border-l2)",
          background: show ? "var(--dsw-alias-button-info-fill)" : "var(--dsw-alias-bg-layer-2)",
          transition: "background-color 120ms ease"
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
          position: "absolute",
          top: 1,
          left: 1,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          transform: show ? "translateX(18px)" : "translateX(0)",
          transition: "transform 120ms ease"
        } })
      }
    )
  ] });
}
var inject = ["slots", "settingsScope"];
function apply(ctx) {
  const scope = ctx.settingsScope.bind({ namespace: SETTINGS_NAMESPACE });
  const policy = new ChatEntryPolicy(scope);
  ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register({
    name: "sidebar.footer.action",
    id: "chat-entry",
    inject: () => ({ hooks: { show: policy.show } })
  }, ChatEntry));
  ctx.slots.inject("settings.general.item", () => ctx.slots.register({
    name: "settings.general.item",
    id: "chat-entry-toggle",
    order: 30,
    inject: () => ({
      hooks: { show: policy.show },
      setShow: (next) => {
        policy.setShow(next);
      }
    })
  }, ChatEntryToggle));
}
return module.exports; } });
