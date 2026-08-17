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
function ChatEntry({ wide, useShow }) {
  const show = useShow((value) => value);
  const [hovered, setHovered] = (0, import_react.useState)(false);
  if (!show) return null;
  const trigger = {
    flex: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    border: "1px solid var(--dsw-alias-border-l2)",
    borderRadius: 12,
    background: hovered ? "var(--dsw-alias-button-floating-hover)" : "var(--dsw-alias-button-elevated-fill)",
    color: "var(--dsw-alias-label-primary)",
    cursor: "pointer",
    overflow: "hidden",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "22px",
    textDecoration: "none",
    whiteSpace: "nowrap"
  };
  if (wide) {
    trigger.flex = 1;
    trigger.minWidth = 0;
    trigger.gap = 6;
    trigger.height = 38;
    trigger.padding = "8px 14px";
  } else {
    trigger.width = 36;
    trigger.height = 36;
    trigger.padding = 0;
    trigger.margin = "0 0 12px";
    trigger.borderColor = "transparent";
    trigger.background = hovered ? "var(--dsw-alias-interactive-bg-hover)" : "transparent";
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "a",
    {
      href: CHAT_URL,
      title: "DeepSeek \u7F51\u9875\u5BF9\u8BDD",
      style: trigger,
      onClick: openInDesktopWindow,
      onMouseEnter: () => {
        setHovered(true);
      },
      onMouseLeave: () => {
        setHovered(false);
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconNewChatOutline16, { size: wide ? 14 : 18 }),
        wide && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u7F51\u9875\u5BF9\u8BDD" })
      ]
    }
  );
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
