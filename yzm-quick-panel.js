// ============================================================================
// \u8bb0\u5fc6\u5feb\u6377\u9762\u677f \u2014 \u9152\u9986\u52a9\u624b\u811a\u672c\u7248 v0.2.0
// \u53ea\u4e3a\u300c\u67da\u6708\u306e\u8bb0\u5fc6\u300d\u63d0\u4f9b\uff1a\u641c\u7d22 / \u6279\u91cf\u52fe\u9009 / \u4e00\u952e\u663e\u9690 / \u9884\u8bbe\u9635\u5bb9\u3002
// \u81ea\u52a8\u751f\u6210\uff0c\u8bf7\u52ff\u624b\u6539\u3002
//
// \u9002\u914d\u8bf4\u660e\uff1a\u9152\u9986\u52a9\u624b\u811a\u672c\u8fd0\u884c\u5728\u9690\u85cf iframe \u4e2d\uff0c\u672c\u4ee3\u7801\u5df2\u7edf\u4e00\u4f7f\u7528
//          \u300c\u9875\u9762\u6587\u6863(window.parent.document)\u300d\u64cd\u4f5c\u4e3b\u9875\u9762\uff0c\u6b63\u5e38\u53ef\u663e\u793a\u3002
// ============================================================================
(function () {
  'use strict';
  if (window.YzmQuickPanel && window.YzmQuickPanel.__tavernScriptLoaded) {
    console.log('[YzmQuickPanel] \u811a\u672c\u5df2\u52a0\u8f7d\u8fc7\uff0c\u8df3\u8fc7\u91cd\u590d\u6267\u884c');
    return;
  }
  window.YzmQuickPanel = window.YzmQuickPanel || {};
  window.YzmQuickPanel.__tavernScriptLoaded = true;

  // ============================================================================
  // yzm-quick-panel / styles-inline.js
  // \u628a\u9762\u677f\u6837\u5f0f\u6ce8\u5165\u5230\u3010\u9152\u9986\u4e3b\u9875\u9762\u3011\u3002
  //
  // \u4e3a\u4ec0\u4e48\u9700\u8981\u5b83\uff1a
  //   \u9152\u9986\u52a9\u624b\u811a\u672c\u8fd0\u884c\u5728\u9690\u85cf iframe \u4e2d\uff0c\u4e14\u6ca1\u6709 manifest.json \u6765\u6302 css \u6587\u4ef6\uff0c
  //   \u56e0\u6b64\u5fc5\u987b\u7531 JS \u81ea\u5df1\u628a <style> \u63d2\u5230\u4e3b\u9875\u9762 <head>\u3002
  //   \u672c\u6587\u4ef6\u7531\u6784\u5efa\u811a\u672c\u7528\u771f\u5b9e\u7684 panel.css \u5185\u5bb9\u66ff\u6362 __PANEL_CSS__ \u5360\u4f4d\u7b26\u3002
  // ============================================================================
  (function () {
    'use strict';

    const NS = 'YzmQuickPanel';
    const STYLE_ID = 'yqm-panel-style';
    const CSS = "/* ==========================================================================\n   yzm-quick-panel / panel.css\n   \u60ac\u6d6e\u7403 + \u9762\u677f\u6837\u5f0f\u3002\u91c7\u7528\u6df1\u8272\u3001\u534a\u900f\u660e\u98ce\u683c\uff0c\u5c3d\u91cf\u8d34\u5408\u9152\u9986\u6697\u8272\u4e3b\u9898\u3002\n   ========================================================================== */\n\n:root {\n  --yqm-accent: #7c9cff;\n  --yqm-accent-2: #5b7cfa;\n  --yqm-bg: rgba(24, 27, 42, 0.97);\n  --yqm-bg-soft: rgba(38, 42, 62, 0.9);\n  --yqm-border: rgba(124, 156, 255, 0.28);\n  --yqm-text: #e8ebf5;\n  --yqm-text-dim: #9aa3bd;\n  --yqm-on: #3ecf8e;\n  --yqm-off: #6b7390;\n  --yqm-warn: #ff6b6b;\n}\n\n/* ---------- \u60ac\u6d6e\u7403 ---------- */\n.yqm-ball {\n  position: fixed;\n  right: 18px;\n  bottom: 120px;\n  width: 52px;\n  height: 52px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, var(--yqm-accent), var(--yqm-accent-2));\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: grab;\n  z-index: 99998;\n  box-shadow: 0 6px 20px rgba(80, 110, 220, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08) inset;\n  user-select: none;\n  touch-action: none;\n  transition: transform 0.15s ease, box-shadow 0.15s ease;\n}\n.yqm-ball:active { cursor: grabbing; }\n.yqm-ball:hover {\n  transform: scale(1.08);\n  box-shadow: 0 8px 26px rgba(80, 110, 220, 0.6);\n}\n.yqm-ball-icon { font-size: 22px; line-height: 1; }\n\n/* ---------- \u9762\u677f ---------- */\n.yqm-panel {\n  position: fixed;\n  right: 18px;\n  bottom: 184px;\n  width: 340px;\n  max-width: calc(100vw - 24px);\n  max-height: min(72vh, 640px);\n  background: var(--yqm-bg);\n  color: var(--yqm-text);\n  border: 1px solid var(--yqm-border);\n  border-radius: 14px;\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.55);\n  z-index: 99999;\n  display: none;\n  flex-direction: column;\n  overflow: hidden;\n  backdrop-filter: blur(8px);\n  font-size: 13px;\n}\n.yqm-panel.open {\n  display: flex;\n  animation: yqm-in 0.16s ease;\n}\n@keyframes yqm-in {\n  from { opacity: 0; transform: translateY(8px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.yqm-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 12px;\n  border-bottom: 1px solid var(--yqm-border);\n  background: linear-gradient(180deg, rgba(124,156,255,0.12), transparent);\n}\n.yqm-title { font-weight: 600; letter-spacing: 0.5px; }\n.yqm-close {\n  background: none;\n  border: none;\n  color: var(--yqm-text-dim);\n  font-size: 22px;\n  line-height: 1;\n  cursor: pointer;\n  padding: 0 4px;\n}\n.yqm-close:hover { color: var(--yqm-text); }\n\n.yqm-toolbar { padding: 10px 12px 6px; display: flex; flex-direction: column; gap: 8px; }\n.yqm-row { display: flex; align-items: center; gap: 8px; }\n.yqm-label { color: var(--yqm-text-dim); font-size: 12px; flex-shrink: 0; }\n.yqm-actions { flex-wrap: wrap; }\n\n.yqm-table-select, .yqm-preset-select, .yqm-search {\n  flex: 1;\n  min-width: 0;\n  background: var(--yqm-bg-soft);\n  color: var(--yqm-text);\n  border: 1px solid var(--yqm-border);\n  border-radius: 8px;\n  padding: 6px 8px;\n  font-size: 13px;\n  outline: none;\n}\n.yqm-search::placeholder { color: var(--yqm-text-dim); }\n.yqm-table-select:focus, .yqm-preset-select:focus, .yqm-search:focus {\n  border-color: var(--yqm-accent);\n}\n\n.yqm-btn {\n  background: var(--yqm-bg-soft);\n  color: var(--yqm-text);\n  border: 1px solid var(--yqm-border);\n  border-radius: 8px;\n  padding: 5px 10px;\n  font-size: 12px;\n  cursor: pointer;\n  transition: all 0.12s ease;\n}\n.yqm-btn:hover { border-color: var(--yqm-accent); color: #fff; }\n.yqm-btn.primary {\n  background: linear-gradient(135deg, var(--yqm-accent), var(--yqm-accent-2));\n  border-color: transparent;\n}\n.yqm-btn.primary:hover { filter: brightness(1.1); }\n.yqm-btn.warn { border-color: rgba(255,107,107,0.4); }\n.yqm-btn.warn:hover { border-color: var(--yqm-warn); color: #ffd5d5; }\n\n.yqm-count { margin-left: auto; color: var(--yqm-text-dim); font-size: 12px; white-space: nowrap; }\n\n/* ---------- \u5217\u8868 ---------- */\n.yqm-list-wrap {\n  flex: 1;\n  overflow-y: auto;\n  padding: 4px 8px 8px;\n  border-top: 1px solid rgba(124,156,255,0.12);\n  border-bottom: 1px solid rgba(124,156,255,0.12);\n  min-height: 120px;\n}\n.yqm-list-wrap::-webkit-scrollbar { width: 6px; }\n.yqm-list-wrap::-webkit-scrollbar-thumb {\n  background: rgba(124,156,255,0.35);\n  border-radius: 3px;\n}\n\n.yqm-item {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 7px 8px;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background 0.1s ease;\n  margin-bottom: 3px;\n}\n.yqm-item:hover { background: rgba(124,156,255,0.1); }\n.yqm-item.checked { background: rgba(124,156,255,0.16); }\n.yqm-check { width: 16px; height: 16px; accent-color: var(--yqm-accent); flex-shrink: 0; }\n.yqm-item-name {\n  flex: 1;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.yqm-item.is-hidden .yqm-item-name { color: var(--yqm-text-dim); text-decoration: line-through; }\n\n.yqm-badge {\n  font-size: 11px;\n  padding: 1px 7px;\n  border-radius: 10px;\n  flex-shrink: 0;\n}\n.yqm-badge.on { background: rgba(62,207,142,0.18); color: var(--yqm-on); }\n.yqm-badge.off { background: rgba(107,115,144,0.22); color: var(--yqm-off); }\n\n.yqm-empty {\n  padding: 24px 12px;\n  text-align: center;\n  color: var(--yqm-text-dim);\n  font-size: 13px;\n  line-height: 1.6;\n}\n\n/* ---------- \u5e95\u90e8\u9884\u8bbe\u533a ---------- */\n.yqm-footer {\n  padding: 8px 12px 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  background: rgba(124,156,255,0.05);\n}\n\n.yqm-ball-toggle {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  color: var(--yqm-text-dim);\n  cursor: pointer;\n  user-select: none;\n}\n.yqm-ball-toggle input { accent-color: var(--yqm-accent); }\n\n/* ---------- Toast ---------- */\n.yqm-toast {\n  position: fixed;\n  left: 50%;\n  bottom: 40px;\n  transform: translate(-50%, 12px);\n  background: rgba(20, 24, 40, 0.96);\n  color: #fff;\n  padding: 9px 16px;\n  border-radius: 10px;\n  border: 1px solid var(--yqm-border);\n  font-size: 13px;\n  z-index: 100000;\n  opacity: 0;\n  transition: all 0.25s ease;\n  pointer-events: none;\n  max-width: 80vw;\n  text-align: center;\n}\n.yqm-toast.show { opacity: 1; transform: translate(-50%, 0); }\n.yqm-toast.ok { border-color: rgba(62,207,142,0.5); }\n.yqm-toast.warn { border-color: rgba(255,107,107,0.5); }\n\n/* ---------- \u79fb\u52a8\u7aef\u9002\u914d ---------- */\n@media (max-width: 500px) {\n  .yqm-panel {\n    right: 8px;\n    left: 8px;\n    width: auto;\n    bottom: 160px;\n    max-height: 68vh;\n  }\n  .yqm-ball { right: 12px; bottom: 90px; }\n}\n";

    function pageDocument() {
      const cands = [window];
      try { if (window.parent && window.parent !== window) cands.push(window.parent); } catch (_e) { /* ignore */ }
      try { if (window.top && window.top !== window) cands.push(window.top); } catch (_e) { /* ignore */ }
      for (const w of cands) {
        try { if (w && w.document && w.document.head) return w.document; } catch (_e) { /* \u7ee7\u7eed */ }
      }
      try { return (window.parent || window).document || document; } catch (_e) { return document; }
    }

    function injectStyle() {
      const doc = pageDocument();
      if (doc.getElementById(STYLE_ID)) return true;

      const head = doc.head || doc.getElementsByTagName('head')[0];
      if (!head) return false;

      const style = doc.createElement('style');
      style.id = STYLE_ID;
      style.type = 'text/css';
      style.textContent = CSS;
      head.appendChild(style);
      return true;
    }

    window[NS] = window[NS] || {};
    window[NS].Styles = { inject: injectStyle, pageDocument };

    // \u5c3d\u65e9\u6ce8\u5165\uff1b\u82e5 head \u5c1a\u672a\u5c31\u7eea\u5219\u91cd\u8bd5
    if (!injectStyle()) {
      let tries = 0;
      const timer = setInterval(() => {
        if (injectStyle() || ++tries > 60) clearInterval(timer);
      }, 250);
    }
  })();


  // ============================================================================
  // yzm-quick-panel / bridge.js
  // \u4e0e\u300c\u67da\u6708\u306e\u8bb0\u5fc6\u300d(gaigai315/yuzuki-Memory) \u901a\u4fe1\u7684\u9002\u914d\u5c42\u3002
  //
  // \u8bbe\u8ba1\u539f\u5219\uff08\u5b89\u5168\u7b2c\u4e00\uff09\uff1a
  //   1. \u53ea\u8bfb\u53d6 state.tables / state.records\uff1b\u5199\u5165\u65f6\u53ea\u6539\u76ee\u6807\u8868\u6761\u76ee\u7684 hidden \u5b57\u6bb5\u3002
  //   2. \u7edd\u4e0d\u89e6\u78b0\u5411\u91cf\u76f8\u5173\u5b57\u6bb5\u3001\u7edd\u4e0d\u4fee\u6539\u8868\u7ed3\u6784\u3001\u7edd\u4e0d\u5220\u9664\u6761\u76ee\u3002
  //   3. \u4f18\u5148\u590d\u7528\u63d2\u4ef6\u539f\u751f Storage \u63a5\u53e3\uff1b\u62ff\u4e0d\u5230\u65f6\u624d\u9000\u56de localStorage \u76f4\u8bfb\u5199\u3002
  // ============================================================================
  (function () {
    'use strict';

    const NS = 'YzmQuickPanel';
    const LOG = '[YzmQuickPanel]';
    const STORAGE_PREFIX = 'yzm_memory_chat_state:';

    function warn(...args) { console.warn(LOG, ...args); }
    function info(...args) { console.log(LOG, ...args); }

    // --------------------------------------------------------------------------
    // \u3010\u5173\u952e\u3011\u89e3\u6790\u300c\u9875\u9762\u7a97\u53e3\u300d\u4e0e\u300c\u9875\u9762\u6587\u6863\u300d
    //
    // \u9152\u9986\u52a9\u624b\u811a\u672c\u8fd0\u884c\u5728\u9690\u85cf iframe \u4e2d\uff0c\u811a\u672c\u91cc\u7684 window \u662f iframe \u81ea\u5df1\u7684\u3002
    // \u67da\u6708\u8bb0\u5fc6\u7684\u5bf9\u8c61\uff08window.YuzukiMemory\uff09\u6302\u5728\u3010\u9152\u9986\u4e3b\u9875\u9762\u3011\u4e0a\uff0c
    // \u56e0\u6b64\u5fc5\u987b\u4ece\u7236\u7a97\u53e3\u53d6\u3002\u540c\u6e90\u65f6 window.parent \u53ef\u76f4\u63a5\u8bbf\u95ee\uff08\u9152\u9986\u52a9\u624b\u5141\u8bb8\uff09\u3002
    // --------------------------------------------------------------------------
    function pageWindow() {
      // \u9010\u5c42\u5c1d\u8bd5\uff1aself \u2192 parent \u2192 top\uff0c\u53d6\u80fd\u8bbf\u95ee document \u7684\u90a3\u4e2a
      const cands = [window];
      try { if (window.parent && window.parent !== window) cands.push(window.parent); } catch (_e) { /* ignore */ }
      try { if (window.top && window.top !== window) cands.push(window.top); } catch (_e) { /* ignore */ }
      for (const w of cands) {
        try { if (w && w.document) return w; } catch (_e) { /* \u7ee7\u7eed */ }
      }
      return window;
    }
    function pageDocument() {
      try {
        return pageWindow().document || document;
      } catch (_e) { return document; }
    }

    // \u5728\u4e3b\u9875\u9762\u7684 window \u6216 iframe \u81ea\u8eab window \u4e0a\u627e\u67da\u6708\u8bb0\u5fc6\u5bf9\u8c61\uff08\u4e24\u5904\u90fd\u8bd5\uff0c\u66f4\u7a33\uff09
    function findYuzukiOn(win) {
      try {
        if (!win) return null;
        return win.YuzukiMemory || (win.parent && win.parent !== win ? win.parent.YuzukiMemory : null) || null;
      } catch (_e) { return null; }
    }

    // --------------------------------------------------------------------------
    // \u627e\u5230\u67da\u6708\u8bb0\u5fc6\u7684\u5168\u5c40\u5bf9\u8c61\u3002\u5b83\u53ef\u80fd\u53eb window.YuzukiMemory\u3002
    // --------------------------------------------------------------------------
    function getYuzuki() {
      return findYuzukiOn(window) || findYuzukiOn(pageWindow()) || null;
    }

    function isYuzukiReady() {
      const y = getYuzuki();
      return !!(y && y.Storage && typeof y.Storage.loadState === 'function');
    }

    // --------------------------------------------------------------------------
    // \u6784\u9020\u4e00\u4e2a\u300c\u9ed8\u8ba4\u7a7a state\u300d\uff0c\u7528\u4e8e loadState \u7684\u515c\u5e95\u53c2\u6570\u3002
    // \u5c3d\u91cf\u4ece\u67da\u6708\u81ea\u5df1\u7684\u5b9e\u73b0\u62ff\uff0c\u62ff\u4e0d\u5230\u5c31\u624b\u6413\u4e00\u4e2a\u8db3\u591f\u7528\u7684\u6700\u5c0f\u7ed3\u6784\u3002
    // --------------------------------------------------------------------------
    function buildFallbackState() {
      const y = getYuzuki();
      // \u67da\u6708\u5185\u90e8 createDefaultState \u4e0d\u4e00\u5b9a\u5bfc\u51fa\uff1b\u8fd9\u91cc\u7ed9\u4e00\u4e2a\u6700\u5c0f\u5b89\u5168\u515c\u5e95\u3002
      // loadState \u4f1a\u7528 fallback \u8865\u9f50\u7f3a\u5931\u5b57\u6bb5\uff0c\u53ea\u8981\u4fdd\u8bc1 tables/records \u5b58\u5728\u5373\u53ef\u3002
      return {
        tables: [],
        records: {},
        activeTableId: '',
        activeRecordIds: {},
        settings: {},
        promptPresetId: '',
      };
    }

    // --------------------------------------------------------------------------
    // \u8bfb\u53d6\u5f53\u524d\u4f1a\u8bdd\u5b8c\u6574 state\u3002
    //   \u8def\u5f84 A\uff1a\u67da\u6708 Storage.loadState(fallback, sessionId)
    //   \u8def\u5f84 B\uff1a\u76f4\u63a5\u8bfb localStorage\uff08\u515c\u5e95\uff09
    // \u8fd4\u56de { state, sessionId, source } \u6216 null
    // --------------------------------------------------------------------------
    function readState() {
      const y = getYuzuki();
      if (y && y.Storage) {
        const Storage = y.Storage;
        try {
          const sessionId = typeof Storage.getCurrentSessionId === 'function'
            ? Storage.getCurrentSessionId()
            : null;
          const fallback = buildFallbackState();
          const state = Storage.loadState(fallback, sessionId);
          if (state && Array.isArray(state.tables)) {
            return { state, sessionId, source: 'storage' };
          }
        } catch (error) {
          warn('Storage.loadState \u8c03\u7528\u5931\u8d25\uff0c\u5c1d\u8bd5 localStorage \u515c\u5e95', error);
        }
      }
      // \u515c\u5e95\uff1a\u76f4\u63a5\u626b localStorage
      return readStateFromLocalStorage();
    }

    function readStateFromLocalStorage() {
      try {
        const keys = Object.keys(localStorage).filter((k) => k.startsWith(STORAGE_PREFIX));
        if (!keys.length) return null;
        // \u4f18\u5148\u53d6\u6700\u8fd1\u66f4\u65b0\u7684\u4e00\u4e2a
        let best = null;
        let bestTs = -1;
        keys.forEach((key) => {
          try {
            const parsed = JSON.parse(localStorage.getItem(key));
            const ts = Number(parsed?.updatedAt || parsed?.ts || 0);
            if (parsed && Array.isArray(parsed.tables) && ts >= bestTs) {
              best = parsed;
              bestTs = ts;
            }
          } catch (_e) { /* \u5ffd\u7565\u5355\u4e2a\u635f\u574f\u9879 */ }
        });
        if (!best) return null;
        return { state: best, sessionId: best.sessionId || null, source: 'localStorage' };
      } catch (error) {
        warn('localStorage \u515c\u5e95\u8bfb\u53d6\u5931\u8d25', error);
        return null;
      }
    }

    // --------------------------------------------------------------------------
    // \u5217\u51fa\u6240\u6709\u8868\u683c\uff08\u4f9b\u4e0b\u62c9\u9009\u62e9\uff09\u3002\u8fd4\u56de [{id, name, hidden, recordCount, isBuiltIn}]
    // --------------------------------------------------------------------------
    const BUILTIN_IDS = new Set([
      'plot_summary', 'character_profile', 'character_status',
      'item_tracking', 'world_setting', 'memory_summary',
    ]);

    function listTables() {
      const read = readState();
      if (!read) return [];
      const { state } = read;
      return (state.tables || []).map((t) => {
        const records = Array.isArray(state.records?.[t.id]) ? state.records[t.id] : [];
        return {
          id: String(t.id || ''),
          name: String(t.name || t.id || '\u672a\u547d\u540d'),
          hidden: t.hidden === true,
          recordCount: records.length,
          isBuiltIn: BUILTIN_IDS.has(String(t.id || '')),
        };
      }).filter((t) => t.id);
    }

    // --------------------------------------------------------------------------
    // \u731c\u4e00\u4e2a\u9ed8\u8ba4\u76ee\u6807\u8868\uff1a\u4f18\u5148\u300c\u975e\u5185\u7f6e + \u6761\u76ee\u6700\u591a\u300d\u7684\u81ea\u5b9a\u4e49\u8868\u3002
    // --------------------------------------------------------------------------
    function guessDefaultTableId(tables) {
      const list = Array.isArray(tables) ? tables : listTables();
      if (!list.length) return '';
      const custom = list.filter((t) => !t.isBuiltIn && t.recordCount > 0);
      const pool = custom.length ? custom : list.filter((t) => t.recordCount > 0);
      if (!pool.length) return list[0].id;
      pool.sort((a, b) => b.recordCount - a.recordCount);
      return pool[0].id;
    }

    // --------------------------------------------------------------------------
    // \u8bfb\u53d6\u67d0\u5f20\u8868\u7684\u6240\u6709\u6761\u76ee\uff0c\u62bd\u53d6\u4e3b\u540d\u79f0\uff08\u7b2c\u4e00\u5217\u503c\uff09\u7528\u4e8e\u5c55\u793a\u3002
    // \u8fd4\u56de [{id, name, hidden, values}]
    // --------------------------------------------------------------------------
    function getRecords(tableId) {
      const read = readState();
      if (!read) return { records: [], table: null };
      const { state } = read;
      const table = (state.tables || []).find((t) => String(t.id) === String(tableId));
      if (!table) return { records: [], table: null };
      const raw = Array.isArray(state.records?.[tableId]) ? state.records[tableId] : [];
      // \u4e3b\u540d\u79f0\u53d6\u7b2c\u4e00\u5217\u3002columns[0] \u53ef\u80fd\u662f "#\u89d2\u8272\u540d" \u8fd9\u79cd\u5e26\u4fee\u9970\u7b26\u7684\u5f62\u5f0f\uff0c\u9700\u8981\u6e05\u6d17\u3002
      const columns = Array.isArray(table.columns) ? table.columns : [];
      const primary = cleanColumnName(columns[0]) || '\u89d2\u8272\u540d';
      const records = raw.map((r, index) => {
        const values = r && typeof r.values === 'object' ? r.values : {};
        const name = String(values[primary] ?? values[columns[0]] ?? '').trim()
          || `\u6761\u76ee ${index + 1}`;
        return {
          id: String(r?.id || `__idx_${index}`),
          name,
          hidden: r?.hidden === true,
          values,
        };
      });
      return {
        records,
        table: { id: table.id, name: table.name, columns },
        primaryColumn: primary,
      };
    }

    function cleanColumnName(column) {
      return String(column || '').trim().replace(/^[#*]+/, '').trim();
    }

    // --------------------------------------------------------------------------
    // \u6279\u91cf\u8bbe\u7f6e\u67d0\u5f20\u8868\u5185\u6307\u5b9a\u6761\u76ee id \u7684 hidden \u503c\u3002
    //   tableId: \u76ee\u6807\u8868
    //   recordIds: \u8981\u4fee\u6539\u7684\u6761\u76ee id \u6570\u7ec4
    //   hidden: true=\u9690\u85cf / false=\u663e\u793a
    // \u8fd4\u56de { ok, changed, error }
    // --------------------------------------------------------------------------
    function setRecordsHidden(tableId, recordIds, hidden) {
      const y = getYuzuki();
      const targetIds = new Set((recordIds || []).map(String));
      if (!targetIds.size) return { ok: true, changed: 0 };

      const read = readState();
      if (!read || !read.state) return { ok: false, changed: 0, error: '\u65e0\u6cd5\u8bfb\u53d6\u8bb0\u5fc6\u6570\u636e' };

      const state = read.state;
      const sessionId = read.sessionId;
      const records = Array.isArray(state.records?.[tableId]) ? state.records[tableId] : null;
      if (!records) return { ok: false, changed: 0, error: `\u672a\u627e\u5230\u8868\u683c\uff1a${tableId}` };

      let changed = 0;
      records.forEach((r) => {
        if (!r || !targetIds.has(String(r.id))) return;
        const next = hidden === true;
        if (r.hidden !== next) {
          r.hidden = next;
          changed += 1;
        }
      });

      if (!changed) return { ok: true, changed: 0 };

      const saved = writeState(state, sessionId);
      if (!saved) return { ok: false, changed: 0, error: '\u4fdd\u5b58\u5931\u8d25\uff08\u5f53\u524d\u4f1a\u8bdd\u53ef\u80fd\u672a\u5c31\u7eea\uff09' };

      // \u901a\u77e5\u67da\u6708\u81ea\u5df1\u7684\u754c\u9762\u5237\u65b0\uff08\u5982\u679c\u5b83\u5728\u76d1\u542c\uff09\u2014\u2014 \u5fc5\u987b\u6d3e\u53d1\u5230\u3010\u4e3b\u9875\u9762\u3011
      try {
        const target = pageWindow();
        target.dispatchEvent(new CustomEvent('yzm-memory-state-updated', {
          detail: { source: 'quick-panel', tableId, hidden, count: changed },
        }));
      } catch (_e) { /* \u5ffd\u7565 */ }

      return { ok: true, changed };
    }

    // --------------------------------------------------------------------------
    // \u5199\u56de state\u3002\u4f18\u5148\u7528\u67da\u6708 Storage.saveState\uff1b\u5931\u8d25\u5219\u9000\u56de localStorage\u3002
    // --------------------------------------------------------------------------
    function writeState(state, sessionId) {
      const y = getYuzuki();
      if (y && y.Storage && typeof y.Storage.saveState === 'function') {
        try {
          const fallback = buildFallbackState();
          const result = y.Storage.saveState(state, fallback, sessionId, {
            force: true,
            saveOrigin: 'quick-panel',
            immediate: true,
          });
          if (result) return true;
        } catch (error) {
          warn('Storage.saveState \u5931\u8d25\uff0c\u5c1d\u8bd5 localStorage \u76f4\u5199', error);
        }
      }
      // \u515c\u5e95\uff1a\u76f4\u63a5\u5199 localStorage\uff08\u4ec5\u5728\u80fd\u5b9a\u4f4d\u5230\u552f\u4e00 key \u65f6\uff09
      return writeStateToLocalStorage(state, sessionId);
    }

    function writeStateToLocalStorage(state, sessionId) {
      try {
        let key = null;
        if (sessionId) key = STORAGE_PREFIX + sessionId;
        // \u82e5\u8be5 key \u4e0d\u5b58\u5728\uff0c\u627e\u5df2\u6709 key \u4e2d\u6700\u8fd1\u66f4\u65b0\u7684\u90a3\u4e2a
        if (!key || !localStorage.getItem(key)) {
          const keys = Object.keys(localStorage).filter((k) => k.startsWith(STORAGE_PREFIX));
          if (keys.length === 1) {
            key = keys[0];
          } else if (keys.length > 1) {
            let best = null;
            let bestTs = -1;
            keys.forEach((k) => {
              try {
                const ts = Number(JSON.parse(localStorage.getItem(k))?.updatedAt || 0);
                if (ts >= bestTs) { best = k; bestTs = ts; }
              } catch (_e) { /* ignore */ }
            });
            key = best;
          }
        }
        if (!key) return false;
        const payload = Object.assign({}, state, { updatedAt: Date.now(), ts: Date.now() });
        localStorage.setItem(key, JSON.stringify(payload));
        return true;
      } catch (error) {
        warn('localStorage \u76f4\u5199\u5931\u8d25', error);
        return false;
      }
    }

    window[NS] = window[NS] || {};
    window[NS].Bridge = {
      isYuzukiReady,
      readState,
      listTables,
      getRecords,
      setRecordsHidden,
      guessDefaultTableId,
      cleanColumnName,
      getYuzuki,
    };
  })();


  // ============================================================================
  // yzm-quick-panel / presets.js
  // \u300c\u9884\u8bbe\u9635\u5bb9\u300d\u7ba1\u7406\uff1a\u628a\u4e00\u7ec4\u89d2\u8272\u6761\u76ee\u4fdd\u5b58\u4e3a\u547d\u540d\u9884\u8bbe\uff0c\u4e00\u952e\u5207\u6362\u3002
  //
  // \u9884\u8bbe\u6570\u636e\u7ed3\u6784\uff08\u5b58 localStorage\uff0c\u72ec\u7acb\u4e8e\u67da\u6708\u63d2\u4ef6\u7684\u8bb0\u5fc6\u6570\u636e\uff09\uff1a
  //   {
  //     "\u9ad8\u6f6e\u7ae0": { tableId: "xxx", recordIds: ["id1","id2"], updatedAt: 169... },
  //     "\u65e5\u5e38\u7ae0": { tableId: "xxx", recordIds: [...], updatedAt: ... }
  //   }
  //
  // \u5173\u952e\uff1a\u9884\u8bbe\u53ea\u5b58\u300c\u8981\u663e\u793a\u54ea\u4e9b\u6761\u76ee\u300d\uff0c\u4e0d\u5b58\u6570\u636e\u672c\u8eab\u3002\u5207\u6362\u65f6\uff1a
  //   - \u9884\u8bbe\u5185\u7684\u6761\u76ee \u2192 hidden = false\uff08\u663e\u793a\uff09
  //   - \u9884\u8bbe\u5916\u7684\u6761\u76ee \u2192 hidden = true\uff08\u9690\u85cf\uff09
  // \u8fd9\u6837\u4e00\u952e\u5c31\u80fd\u628a\u4e0a\u4e0b\u6587\u7cbe\u786e\u63a7\u5236\u6210\u9884\u8bbe\u6307\u5b9a\u7684\u90a3\u6279\u89d2\u8272\u3002
  // ============================================================================
  (function () {
    'use strict';

    const NS = 'YzmQuickPanel';
    const STORAGE_KEY = 'yzm_quick_panel_presets_v1';

    function loadAll() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return {};
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === 'object' ? parsed : {};
      } catch (_e) {
        return {};
      }
    }

    function saveAll(map) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(map || {}));
        return true;
      } catch (_e) {
        return false;
      }
    }

    function listPresets(tableId) {
      const all = loadAll();
      return Object.entries(all)
        .filter(([, v]) => !tableId || String(v.tableId) === String(tableId))
        .map(([name, v]) => ({
          name,
          tableId: String(v.tableId || ''),
          recordIds: Array.isArray(v.recordIds) ? v.recordIds.map(String) : [],
          updatedAt: Number(v.updatedAt || 0),
        }))
        .sort((a, b) => b.updatedAt - a.updatedAt);
    }

    function savePreset(name, tableId, recordIds) {
      const clean = String(name || '').trim();
      if (!clean) return { ok: false, error: '\u9884\u8bbe\u540d\u4e0d\u80fd\u4e3a\u7a7a' };
      const all = loadAll();
      all[clean] = {
        tableId: String(tableId || ''),
        recordIds: Array.from(new Set((recordIds || []).map(String))),
        updatedAt: Date.now(),
      };
      return saveAll(all) ? { ok: true } : { ok: false, error: '\u4fdd\u5b58\u5931\u8d25' };
    }

    function deletePreset(name) {
      const all = loadAll();
      if (!(name in all)) return { ok: false, error: '\u9884\u8bbe\u4e0d\u5b58\u5728' };
      delete all[name];
      return saveAll(all) ? { ok: true } : { ok: false, error: '\u5220\u9664\u5931\u8d25' };
    }

    function getPreset(name) {
      const all = loadAll();
      return all[name] || null;
    }

    window[NS] = window[NS] || {};
    window[NS].Presets = {
      listPresets,
      savePreset,
      deletePreset,
      getPreset,
      _loadAll: loadAll,
      _saveAll: saveAll,
    };
  })();


  // ============================================================================
  // yzm-quick-panel / panel.js
  // \u60ac\u6d6e\u7403 + \u5feb\u6377\u9762\u677f UI\u3002
  // ============================================================================
  (function () {
    'use strict';

    const NS = 'YzmQuickPanel';
    const Bridge = () => window[NS]?.Bridge;
    const Presets = () => window[NS]?.Presets;

    // --------------------------------------------------------------------------
    // \u3010\u5173\u952e\u3011\u9875\u9762\u6587\u6863\u4e0e\u7a97\u53e3\u89e3\u6790
    //
    // \u9152\u9986\u52a9\u624b\u811a\u672c\u662f\u5728\u4e00\u4e2a\u3010\u9690\u85cf iframe\u3011\u91cc\u6267\u884c\u7684\uff08Iframe.vue: v-show="false"\uff09\u3002
    // \u56e0\u6b64\u811a\u672c\u91cc\u7684 `document` \u6307\u5411 iframe \u81ea\u5df1\u7684\u7a7a\u6587\u6863\uff0c\u800c\u4e0d\u662f\u9152\u9986\u4e3b\u9875\u9762\u3002
    // \u76f4\u63a5\u5728 iframe \u91cc\u64cd\u4f5c document\uff0c\u83dc\u5355\u9879\u548c\u60ac\u6d6e\u7403\u90fd\u4f1a\u88ab\u52a0\u5230\u90a3\u4e2a\u770b\u4e0d\u89c1\u7684
    // iframe \u4e2d\uff0c\u4e3b\u9875\u9762\u4e0a\u6beb\u65e0\u52a8\u9759 \u2014\u2014 \u8fd9\u6b63\u662f\u201c\u5f00\u5173\u4eae\u7740\u5374\u6ca1\u53cd\u5e94\u201d\u7684\u539f\u56e0\u3002
    //
    // \u9152\u9986\u52a9\u624b\u5141\u8bb8\u540c\u6e90\u8bbf\u95ee\u7236\u9875\u9762\uff08\u5176\u81ea\u5e26 API \u4e5f\u7528 window.parent.document\uff09\uff0c
    // \u5e76\u4e14\u5df2\u628a\u4e3b\u9875\u9762\u7684 jQuery \u6302\u5230 window.$ \u4e0a\u3002\u6240\u4ee5\u8fd9\u91cc\u7edf\u4e00\u53d6\u201c\u9875\u9762\u6587\u6863\u201d\uff1a
    //   - \u5728\u9152\u9986\u52a9\u624b iframe \u4e2d \u2192 window.parent.document
    //   - \u4f5c\u4e3a\u666e\u901a\u6269\u5c55/\u76f4\u63a5\u8fd0\u884c\u65f6 \u2192 document
    // --------------------------------------------------------------------------
    // \u9010\u5c42\u5411\u4e0a\u627e\u300c\u771f\u6b63\u5e26\u6709\u9152\u9986\u9875\u9762\u7684\u6587\u6863\u300d\u3002
    // \u5173\u952e\uff1a\u4e0d\u80fd\u53ea\u770b window.parent \u4e00\u5c42\uff0c\u4e5f\u4e0d\u80fd\u56e0\u4e3a\u8bbf\u95ee\u629b\u5f02\u5e38\u5c31\u76f4\u63a5\u56de\u9000\u5230\u81ea\u5df1\u7684\u7a7a\u6587\u6863\u3002
    // \u5224\u5b9a\u6807\u51c6\uff1a\u8be5\u6587\u6863\u91cc\u80fd\u67e5\u5230\u9152\u9986\u7684\u5173\u952e\u8282\u70b9\uff08#extensionsMenu / #chat / body \u6709\u5185\u5bb9\uff09\u3002
    function probePageDoc() {
      const candidates = [];
      // 1) \u81ea\u8eab
      candidates.push({ win: window, label: 'self' });
      // 2) \u76f4\u63a5\u7236\u7a97\u53e3
      try { if (window.parent && window.parent !== window) candidates.push({ win: window.parent, label: 'parent' }); } catch (_e) { /* ignore */ }
      // 3) top\uff08\u8de8\u591a\u5c42 iframe\uff09
      try { if (window.top && window.top !== window) candidates.push({ win: window.top, label: 'top' }); } catch (_e) { /* ignore */ }

      let best = null;
      const log = [];
      for (const c of candidates) {
        let doc = null;
        try { doc = c.win.document; } catch (e) { log.push(`${c.label}: \u8bbf\u95ee document \u629b\u5f02\u5e38`); continue; }
        if (!doc) { log.push(`${c.label}: document \u4e3a\u7a7a`); continue; }
        let hasMenu = false, hasChat = false, bodyKids = -1;
        try { hasMenu = !!doc.getElementById('extensionsMenu'); } catch (_e) { /* ignore */ }
        try { hasChat = !!doc.getElementById('chat'); } catch (_e) { /* ignore */ }
        try { bodyKids = doc.body ? doc.body.children.length : -1; } catch (_e) { /* ignore */ }
        log.push(`${c.label}: menu=${hasMenu} chat=${hasChat} bodyKids=${bodyKids}`);
        // \u4f18\u5148\uff1a\u6709 extensionsMenu \u7684
        if (hasMenu) { best = { doc, win: c.win }; break; }
        // \u5176\u6b21\uff1a\u6709 #chat \u7684
        if (hasChat && !best) best = { doc, win: c.win };
        // \u518d\u6b21\uff1abody \u6709\u5b50\u5143\u7d20\u7684\uff08\u4e0d\u662f\u7a7a iframe\uff09
        if (bodyKids > 0 && !best) best = { doc, win: c.win };
      }
      if (!best) {
        // \u6700\u540e\u515c\u5e95\uff1awindow.parent || window
        try {
          const w = window.parent || window;
          best = { doc: w.document || document, win: w };
        } catch (_e) {
          best = { doc: document, win: window };
        }
      }
      return { ...best, probeLog: log };
    }

    let PAGE_DOC = document;
    let PAGE_WIN = window;
    let PROBE_LOG = [];

    function resolvePageDoc() {
      const r = probePageDoc();
      PROBE_LOG = r.probeLog;
      return r.doc;
    }

    // \u7531\u5916\u90e8\uff08\u5408\u5e76\u811a\u672c/\u6269\u5c55\u5165\u53e3\uff09\u5728 DOM \u5c31\u7eea\u540e\u53ef\u518d\u6b21\u5237\u65b0
    function refreshPageRefs() {
      try {
        const r = probePageDoc();
        PROBE_LOG = r.probeLog;
        PAGE_DOC = r.doc;
        PAGE_WIN = r.win;
      } catch (_e) {
        PAGE_DOC = document;
        PAGE_WIN = window;
      }
    }
    refreshPageRefs();

    const LS_KEY_SELECTED_TABLE = 'yzm_quick_panel_selected_table';
    const LS_KEY_POS = 'yzm_quick_panel_ball_pos';

    // \u8fd0\u884c\u65f6\u72b6\u6001
    const ui = {
      ball: null,
      panel: null,
      open: false,
      selectedTableId: '',
      searchText: '',
      records: [],          // \u5f53\u524d\u8868\u6240\u6709\u6761\u76ee [{id,name,hidden}]
      checked: new Set(),   // \u52fe\u9009\u7684\u6761\u76ee id
      selectedPreset: '',
      lastRenderedSource: '',
    };

    // --------------------------------------------------------------------------
    // \u5de5\u5177
    // --------------------------------------------------------------------------
    function el(tag, attrs, children) {
      refreshPageRefs();
      const node = PAGE_DOC.createElement(tag);
      if (attrs) {
        Object.entries(attrs).forEach(([k, v]) => {
          if (k === 'class') node.className = v;
          else if (k === 'text') node.textContent = v;
          else if (k === 'html') node.innerHTML = v;
          else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
          else if (v !== undefined && v !== null) node.setAttribute(k, v);
        });
      }
      (children || []).forEach((c) => {
        if (c === null || c === undefined) return;
        node.appendChild(typeof c === 'string' ? PAGE_DOC.createTextNode(c) : c);
      });
      return node;
    }

    function toast(msg, type) {
      const t = el('div', { class: `yqm-toast ${type || ''}`, text: msg });
      PAGE_DOC.body.appendChild(t);
      setTimeout(() => t.classList.add('show'), 10);
      setTimeout(() => {
        t.classList.remove('show');
        setTimeout(() => t.remove(), 300);
      }, 1800);
    }

    // --------------------------------------------------------------------------
    // \u60ac\u6d6e\u7403
    // --------------------------------------------------------------------------
    function createBall() {
      if (ui.ball) return;
      // \u5e42\u7b49\u4fdd\u62a4\uff1a\u9875\u9762\u91cc\u53ef\u80fd\u5df2\u5b58\u5728\u7403\uff08\u811a\u672c\u88ab\u91cd\u590d\u6ce8\u5165\u7b49\u60c5\u51b5\uff09
      try {
        const exist = PAGE_DOC.querySelector('.yqm-ball');
        if (exist) { ui.ball = exist; return; }
      } catch (_e) { /* \u5ffd\u7565 */ }

      const ball = el('div', {
        class: 'yqm-ball',
        title: '\u8bb0\u5fc6\u5feb\u6377\u9762\u677f',
        onclick: togglePanel,
      }, [
        el('span', { class: 'yqm-ball-icon', html: '&#9776;' }),
      ]);
      const host = PAGE_DOC.body || PAGE_DOC.documentElement;
      if (!host) throw new Error('\u627e\u4e0d\u5230\u53ef\u6302\u8f7d\u7684\u9875\u9762\u8282\u70b9\uff08body \u4e0d\u5b58\u5728\uff09');
      host.appendChild(ball);
      ui.ball = ball;

      // \u6062\u590d\u4f4d\u7f6e + \u652f\u6301\u62d6\u52a8
      restoreBallPos(ball);
      makeDraggable(ball);
    }

    function restoreBallPos(ball) {
      try {
        const raw = localStorage.getItem(LS_KEY_POS);
        if (!raw) return;
        const pos = JSON.parse(raw);
        if (typeof pos.x === 'number' && typeof pos.y === 'number') {
          ball.style.left = pos.x + 'px';
          ball.style.top = pos.y + 'px';
          ball.style.right = 'auto';
          ball.style.bottom = 'auto';
        }
      } catch (_e) { /* ignore */ }
    }

    function makeDraggable(ball) {
      let dragging = false;
      let moved = false;
      let startX = 0, startY = 0, originLeft = 0, originTop = 0;

      function onDown(e) {
        dragging = true;
        moved = false;
        const point = e.touches ? e.touches[0] : e;
        const rect = ball.getBoundingClientRect();
        startX = point.clientX;
        startY = point.clientY;
        originLeft = rect.left;
        originTop = rect.top;
        ball.style.transition = 'none';
        refreshPageRefs();
        PAGE_DOC.addEventListener('mousemove', onMove, { passive: false });
        PAGE_DOC.addEventListener('mouseup', onUp);
        PAGE_DOC.addEventListener('touchmove', onMove, { passive: false });
        PAGE_DOC.addEventListener('touchend', onUp);
      }

      function onMove(e) {
        if (!dragging) return;
        const point = e.touches ? e.touches[0] : e;
        const dx = point.clientX - startX;
        const dy = point.clientY - startY;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved = true;
        const maxX = PAGE_WIN.innerWidth - ball.offsetWidth;
        const maxY = PAGE_WIN.innerHeight - ball.offsetHeight;
        const left = Math.min(Math.max(0, originLeft + dx), maxX);
        const top = Math.min(Math.max(0, originTop + dy), maxY);
        ball.style.left = left + 'px';
        ball.style.top = top + 'px';
        ball.style.right = 'auto';
        ball.style.bottom = 'auto';
        if (e.cancelable) e.preventDefault();
      }

      function onUp() {
        dragging = false;
        ball.style.transition = '';
        PAGE_DOC.removeEventListener('mousemove', onMove);
        PAGE_DOC.removeEventListener('mouseup', onUp);
        PAGE_DOC.removeEventListener('touchmove', onMove);
        PAGE_DOC.removeEventListener('touchend', onUp);
        if (moved) {
          try {
            const rect = ball.getBoundingClientRect();
            localStorage.setItem(LS_KEY_POS, JSON.stringify({ x: rect.left, y: rect.top }));
          } catch (_e) { /* ignore */ }
        }
      }

      ball.addEventListener('mousedown', onDown);
      ball.addEventListener('touchstart', onDown, { passive: true });

      // \u963b\u6b62\u62d6\u52a8\u540e\u8bef\u89e6\u70b9\u51fb
      ball.addEventListener('click', (e) => {
        if (moved) { e.stopPropagation(); e.preventDefault(); }
      });
    }

    // --------------------------------------------------------------------------
    // \u9762\u677f\u5f00\u5173
    // --------------------------------------------------------------------------
    function togglePanel() {
      if (ui.open) closePanel();
      else openPanel();
    }

    function openPanel() {
      if (!ui.panel) ui.panel = buildPanel();
      ui.open = true;
      ui.panel.classList.add('open');
      refresh();
    }

    function closePanel() {
      ui.open = false;
      if (ui.panel) ui.panel.classList.remove('open');
      // \u5173\u95ed\u641c\u7d22\u6846\u7126\u70b9
      ui.searchText = '';
    }

    // --------------------------------------------------------------------------
    // \u6784\u5efa\u9762\u677f
    // --------------------------------------------------------------------------
    function buildPanel() {
      const tableSelect = el('select', { class: 'yqm-table-select', onchange: onTableChange });
      const searchInput = el('input', {
        class: 'yqm-search',
        type: 'search',
        placeholder: '\u641c\u7d22\u89d2\u8272\u540d\u2026',
        oninput: onSearchInput,
      });
      const list = el('div', { class: 'yqm-list' });
      const countLabel = el('span', { class: 'yqm-count' });
      const presetSelect = el('select', { class: 'yqm-preset-select', onchange: onPresetChange });

      const panel = el('div', { class: 'yqm-panel' }, [
        el('div', { class: 'yqm-header' }, [
          el('span', { class: 'yqm-title', text: '\u8bb0\u5fc6\u5feb\u6377\u9762\u677f' }),
          el('button', { class: 'yqm-close', html: '&times;', onclick: closePanel, title: '\u5173\u95ed' }),
        ]),
        el('div', { class: 'yqm-toolbar' }, [
          el('div', { class: 'yqm-row' }, [
            el('span', { class: 'yqm-label', text: '\u8868\u683c' }),
            tableSelect,
          ]),
          el('div', { class: 'yqm-row' }, [
            searchInput,
          ]),
          el('div', { class: 'yqm-row yqm-actions' }, [
            el('button', { class: 'yqm-btn', text: '\u5168\u9009', onclick: selectAll }),
            el('button', { class: 'yqm-btn', text: '\u5168\u4e0d\u9009', onclick: clearAll }),
            el('button', { class: 'yqm-btn', text: '\u53cd\u9009', onclick: invertSelection }),
            el('button', { class: 'yqm-btn', text: '\u53ea\u770b\u5df2\u9690\u85cf', onclick: filterHiddenOnly }),
            el('button', { class: 'yqm-btn', text: '\u53ea\u770b\u5df2\u663e\u793a', onclick: filterShownOnly }),
          ]),
          el('div', { class: 'yqm-row yqm-actions' }, [
            el('button', { class: 'yqm-btn primary', text: '\u663e\u793a\u9009\u4e2d', onclick: () => applyHidden(false) }),
            el('button', { class: 'yqm-btn warn', text: '\u9690\u85cf\u9009\u4e2d', onclick: () => applyHidden(true) }),
            countLabel,
          ]),
        ]),
        el('div', { class: 'yqm-list-wrap' }, [list]),
        el('div', { class: 'yqm-footer' }, [
          el('div', { class: 'yqm-row' }, [
            el('span', { class: 'yqm-label', text: '\u9884\u8bbe' }),
            presetSelect,
          ]),
          el('div', { class: 'yqm-row yqm-actions' }, [
            el('button', { class: 'yqm-btn', text: '\u4fdd\u5b58\u4e3a\u9884\u8bbe', onclick: saveAsPreset }),
            el('button', { class: 'yqm-btn primary', text: '\u5e94\u7528\u9884\u8bbe', onclick: applyPreset }),
            el('button', { class: 'yqm-btn warn', text: '\u5220\u9664\u9884\u8bbe', onclick: removePreset }),
          ]),
          el('div', { class: 'yqm-row' }, [
            el('label', { class: 'yqm-ball-toggle' }, [
              el('input', {
                type: 'checkbox',
                ...(isBallEnabled() ? { checked: 'checked' } : {}),
                onchange: (e) => {
                  setBallEnabled(e.target.checked);
                  toast(e.target.checked ? '\u5df2\u5f00\u542f\u60ac\u6d6e\u7403' : '\u5df2\u5173\u95ed\u60ac\u6d6e\u7403\uff08\u53ef\u4ece\u9b54\u6cd5\u68d2\u83dc\u5355\u6253\u5f00\u9762\u677f\uff09');
                },
              }),
              el('span', { text: '\u663e\u793a\u60ac\u6d6e\u7403' }),
            ]),
          ]),
        ]),
      ]);

      // \u7f13\u5b58\u5f15\u7528
      ui.$tableSelect = tableSelect;
      ui.$searchInput = searchInput;
      ui.$list = list;
      ui.$count = countLabel;
      ui.$presetSelect = presetSelect;

      PAGE_DOC.body.appendChild(panel);
      return panel;
    }

    // --------------------------------------------------------------------------
    // \u5237\u65b0\uff1a\u52a0\u8f7d\u8868\u683c\u5217\u8868 \u2192 \u6761\u76ee \u2192 \u6e32\u67d3
    // --------------------------------------------------------------------------
    function refresh() {
      const B = Bridge();
      if (!B || !B.isYuzukiReady()) {
        renderNotReady();
        return;
      }

      const tables = B.listTables();
      if (!tables.length) {
        ui.$tableSelect.innerHTML = '';
        ui.$list.innerHTML = '<div class="yqm-empty">\u672a\u627e\u5230\u4efb\u4f55\u8868\u683c\u3002\u8bf7\u786e\u8ba4\u67da\u6708\u8bb0\u5fc6\u63d2\u4ef6\u5df2\u542f\u7528\u5e76\u5df2\u6709\u6570\u636e\u3002</div>';
        return;
      }

      // \u9009\u4e2d\u8868\uff1a\u4f18\u5148\u7528\u5df2\u9009\uff0c\u5176\u6b21 localStorage\uff0c\u5176\u6b21\u81ea\u52a8\u731c
      if (!ui.selectedTableId || !tables.some((t) => t.id === ui.selectedTableId)) {
        let saved = '';
        try { saved = localStorage.getItem(LS_KEY_SELECTED_TABLE) || ''; } catch (_e) { /* ignore */ }
        if (saved && tables.some((t) => t.id === saved)) ui.selectedTableId = saved;
        else ui.selectedTableId = B.guessDefaultTableId(tables);
      }

      // \u6e32\u67d3\u8868\u4e0b\u62c9
      ui.$tableSelect.innerHTML = '';
      tables.forEach((t) => {
        const opt = el('option', {
          value: t.id,
          text: `${t.name}\uff08${t.recordCount} \u9879${t.isBuiltIn ? '\u00b7\u5185\u7f6e' : ''}\uff09`,
        });
        if (t.id === ui.selectedTableId) opt.selected = true;
        ui.$tableSelect.appendChild(opt);
      });

      loadRecords();
      renderPresets();
    }

    function loadRecords() {
      const B = Bridge();
      const data = B.getRecords(ui.selectedTableId);
      ui.records = data.records || [];
      // \u52fe\u9009\u96c6\u4e0e\u65b0\u6570\u636e\u6c42\u4ea4\uff0c\u907f\u514d\u6b8b\u7559\u5931\u6548 id
      const validIds = new Set(ui.records.map((r) => r.id));
      ui.checked = new Set(Array.from(ui.checked).filter((id) => validIds.has(id)));
      renderList();
    }

    function renderNotReady() {
      if (!ui.$list) return;
      ui.$list.innerHTML = '<div class="yqm-empty">\u672a\u68c0\u6d4b\u5230\u300c\u67da\u6708\u306e\u8bb0\u5fc6\u300d\u63d2\u4ef6\u3002<br>\u8bf7\u5148\u542f\u7528\u67da\u6708\u8bb0\u5fc6\uff0c\u518d\u4f7f\u7528\u672c\u9762\u677f\u3002</div>';
      ui.$count.textContent = '';
    }

    // --------------------------------------------------------------------------
    // \u6e32\u67d3\u6761\u76ee\u5217\u8868
    // --------------------------------------------------------------------------
    function renderList() {
      const list = ui.$list;
      if (!list) return;
      const keyword = ui.searchText.trim().toLowerCase();
      const filtered = ui.records.filter((r) => {
        if (!keyword) return true;
        return r.name.toLowerCase().includes(keyword);
      });

      list.innerHTML = '';
      if (!filtered.length) {
        list.appendChild(el('div', { class: 'yqm-empty', text: ui.records.length ? '\u6ca1\u6709\u5339\u914d\u7684\u6761\u76ee' : '\u8fd9\u5f20\u8868\u8fd8\u6ca1\u6709\u6761\u76ee' }));
        updateCount();
        return;
      }

      filtered.forEach((r) => {
        const isChecked = ui.checked.has(r.id);
        const row = el('label', { class: `yqm-item${isChecked ? ' checked' : ''}${r.hidden ? ' is-hidden' : ''}` }, [
          el('input', {
            type: 'checkbox',
            class: 'yqm-check',
            ...(isChecked ? { checked: 'checked' } : {}),
            onchange: (e) => {
              if (e.target.checked) ui.checked.add(r.id);
              else ui.checked.delete(r.id);
              row.classList.toggle('checked', e.target.checked);
              updateCount();
            },
          }),
          el('span', { class: 'yqm-item-name', text: r.name }),
          el('span', {
            class: `yqm-badge ${r.hidden ? 'off' : 'on'}`,
            text: r.hidden ? '\u9690\u85cf' : '\u663e\u793a',
          }),
        ]);
        list.appendChild(row);
      });
      updateCount();
    }

    function updateCount() {
      if (!ui.$count) return;
      ui.$count.textContent = `\u5df2\u9009 ${ui.checked.size} / \u5171 ${ui.records.length}`;
    }

    // --------------------------------------------------------------------------
    // \u4ea4\u4e92\u56de\u8c03
    // --------------------------------------------------------------------------
    function onTableChange(e) {
      ui.selectedTableId = e.target.value;
      ui.checked.clear();
      try { localStorage.setItem(LS_KEY_SELECTED_TABLE, ui.selectedTableId); } catch (_e) { /* ignore */ }
      loadRecords();
      renderPresets();
    }

    function onSearchInput(e) {
      ui.searchText = e.target.value || '';
      renderList();
    }

    function selectAll() {
      const keyword = ui.searchText.trim().toLowerCase();
      ui.records.forEach((r) => {
        if (!keyword || r.name.toLowerCase().includes(keyword)) ui.checked.add(r.id);
      });
      renderList();
    }

    function clearAll() {
      ui.checked.clear();
      renderList();
    }

    function invertSelection() {
      const keyword = ui.searchText.trim().toLowerCase();
      ui.records.forEach((r) => {
        if (keyword && !r.name.toLowerCase().includes(keyword)) return;
        if (ui.checked.has(r.id)) ui.checked.delete(r.id);
        else ui.checked.add(r.id);
      });
      renderList();
    }

    function filterHiddenOnly() {
      // \u628a\u300c\u5f53\u524d\u9690\u85cf\u5728\u5217\u8868\u4e2d\u51fa\u73b0\u7684\u6761\u76ee\u300d\u5168\u90e8\u52fe\u9009
      ui.checked.clear();
      ui.records.filter((r) => r.hidden).forEach((r) => ui.checked.add(r.id));
      renderList();
      toast(`\u5df2\u52fe\u9009 ${ui.checked.size} \u4e2a\u9690\u85cf\u6761\u76ee`);
    }

    function filterShownOnly() {
      ui.checked.clear();
      ui.records.filter((r) => !r.hidden).forEach((r) => ui.checked.add(r.id));
      renderList();
      toast(`\u5df2\u52fe\u9009 ${ui.checked.size} \u4e2a\u663e\u793a\u4e2d\u7684\u6761\u76ee`);
    }

    function applyHidden(hidden) {
      if (!ui.checked.size) {
        toast('\u8bf7\u5148\u52fe\u9009\u6761\u76ee', 'warn');
        return;
      }
      const B = Bridge();
      const ids = Array.from(ui.checked);
      const res = B.setRecordsHidden(ui.selectedTableId, ids, hidden);
      if (!res.ok) {
        toast('\u64cd\u4f5c\u5931\u8d25\uff1a' + (res.error || '\u672a\u77e5\u9519\u8bef'), 'warn');
        return;
      }
      toast(`${hidden ? '\u9690\u85cf' : '\u663e\u793a'}\u4e86 ${res.changed} \u4e2a\u6761\u76ee`, 'ok');
      loadRecords();
    }

    // --------------------------------------------------------------------------
    // \u9884\u8bbe
    // --------------------------------------------------------------------------
    function renderPresets() {
      if (!ui.$presetSelect) return;
      const list = Presets().listPresets(ui.selectedTableId);
      const sel = ui.$presetSelect;
      sel.innerHTML = '';
      sel.appendChild(el('option', { value: '', text: list.length ? '\u2014 \u9009\u62e9\u9884\u8bbe \u2014' : '\u2014 \u6682\u65e0\u9884\u8bbe \u2014' }));
      list.forEach((p) => {
        const opt = el('option', { value: p.name, text: `${p.name}\uff08${p.recordIds.length}\uff09` });
        if (p.name === ui.selectedPreset) opt.selected = true;
        sel.appendChild(opt);
      });
    }

    function onPresetChange(e) {
      ui.selectedPreset = e.target.value || '';
      // \u9009\u4e2d\u9884\u8bbe\u65f6\uff0c\u81ea\u52a8\u628a\u9884\u8bbe\u5185\u7684\u6761\u76ee\u52fe\u4e0a\uff0c\u65b9\u4fbf\u9884\u89c8
      if (!ui.selectedPreset) return;
      const p = Presets().getPreset(ui.selectedPreset);
      if (!p) return;
      if (String(p.tableId) !== String(ui.selectedTableId)) {
        // \u9884\u8bbe\u5c5e\u4e8e\u522b\u7684\u8868\uff0c\u5c1d\u8bd5\u5207\u8fc7\u53bb
        ui.selectedTableId = p.tableId;
        try { localStorage.setItem(LS_KEY_SELECTED_TABLE, ui.selectedTableId); } catch (_e) { /* ignore */ }
        refresh();
      }
      ui.checked = new Set(p.recordIds.map(String));
      renderList();
    }

    function saveAsPreset() {
      if (!ui.checked.size) {
        toast('\u8bf7\u5148\u52fe\u9009\u8981\u4fdd\u5b58\u7684\u89d2\u8272', 'warn');
        return;
      }
      const name = window.prompt('\u9884\u8bbe\u540d\u79f0\uff08\u4f8b\u5982\uff1a\u9ad8\u6f6e\u7ae0 / \u65e5\u5e38\u7ae0 / \u5168\u5458\uff09', '');
      if (!name || !name.trim()) return;
      const res = Presets().savePreset(name.trim(), ui.selectedTableId, Array.from(ui.checked));
      if (res.ok) {
        toast(`\u5df2\u4fdd\u5b58\u9884\u8bbe\u300c${name.trim()}\u300d`, 'ok');
        ui.selectedPreset = name.trim();
        renderPresets();
      } else {
        toast('\u4fdd\u5b58\u5931\u8d25\uff1a' + (res.error || ''), 'warn');
      }
    }

    function applyPreset() {
      if (!ui.selectedPreset) {
        toast('\u8bf7\u5148\u5728\u4e0b\u62c9\u6846\u9009\u62e9\u4e00\u4e2a\u9884\u8bbe', 'warn');
        return;
      }
      const p = Presets().getPreset(ui.selectedPreset);
      if (!p) { toast('\u9884\u8bbe\u4e0d\u5b58\u5728', 'warn'); return; }
      const B = Bridge();
      const target = String(p.tableId) === String(ui.selectedTableId) ? ui.selectedTableId : p.tableId;
      const data = B.getRecords(target);
      const inPreset = new Set(p.recordIds.map(String));
      const toShow = [];
      const toHide = [];
      data.records.forEach((r) => {
        if (inPreset.has(r.id)) { if (r.hidden) toShow.push(r.id); }
        else if (!r.hidden) toHide.push(r.id);
      });
      let changed = 0;
      if (toShow.length) changed += (B.setRecordsHidden(target, toShow, false).changed || 0);
      if (toHide.length) changed += (B.setRecordsHidden(target, toHide, true).changed || 0);
      toast(`\u5df2\u5e94\u7528\u9884\u8bbe\u300c${ui.selectedPreset}\u300d\uff1a\u8c03\u6574 ${changed} \u9879`, 'ok');
      if (target !== ui.selectedTableId) ui.selectedTableId = target;
      loadRecords();
    }

    function removePreset() {
      if (!ui.selectedPreset) { toast('\u8bf7\u5148\u9009\u62e9\u9884\u8bbe', 'warn'); return; }
      if (!window.confirm(`\u786e\u5b9a\u5220\u9664\u9884\u8bbe\u300c${ui.selectedPreset}\u300d\u5417\uff1f`)) return;
      Presets().deletePreset(ui.selectedPreset);
      ui.selectedPreset = '';
      renderPresets();
      toast('\u9884\u8bbe\u5df2\u5220\u9664');
    }

    // --------------------------------------------------------------------------
    // \u542f\u52a8
    // --------------------------------------------------------------------------

    // \u662f\u5426\u663e\u793a\u60ac\u6d6e\u7403\uff08\u53ef\u5728\u9b54\u6cd5\u68d2\u83dc\u5355\u91cc\u5207\u6362\uff09\uff0c\u9ed8\u8ba4\u5f00
    const LS_KEY_BALL_ENABLED = 'yzm_quick_panel_ball_enabled';
    function isBallEnabled() {
      try {
        const v = localStorage.getItem(LS_KEY_BALL_ENABLED);
        return v === null ? true : v === '1';
      } catch (_e) { return true; }
    }
    function setBallEnabled(on) {
      try { localStorage.setItem(LS_KEY_BALL_ENABLED, on ? '1' : '0'); } catch (_e) { /* ignore */ }
      if (on) { createBall(); }
      else if (ui.ball) { ui.ball.remove(); ui.ball = null; }
    }

    // --------------------------------------------------------------------------
    // \u67e5\u627e\u9b54\u6cd5\u68d2\u6269\u5c55\u83dc\u5355\u5bb9\u5668\u3002
    // \u4e0d\u540c SillyTavern \u7248\u672c / \u7f8e\u5316\u53ef\u80fd\u7528\u4e0d\u540c id \u6216 class\uff0c\u6545\u505a\u591a\u8def\u63a2\u6d4b\uff1a
    //   1) #extensionsMenu           \uff08\u5b98\u65b9\u6807\u51c6\uff09
    //   2) #extensions_menu / #extensions-menu
    //   3) .extensionsMenu / #extensionsMenuButton \u7684\u7236\u5bb9\u5668
    //   4) \u542b .extensionsMenuExtensionButton \u7684\u5217\u8868\u5bb9\u5668
    // --------------------------------------------------------------------------
    function findExtensionsMenu() {
      const ids = ['extensionsMenu', 'extensions_menu', 'extensions-menu', 'extensionsMenuDropdown'];
      for (const id of ids) {
        const node = PAGE_DOC.getElementById(id);
        if (node) return node;
      }
      const sels = ['.extensionsMenu', '#extensionsMenuButton + .dropdown-menu',
        '.dropdown-menu.extensionsMenu', '[data-extensions-menu]'];
      for (const s of sels) {
        try {
          const node = PAGE_DOC.querySelector(s);
          if (node) return node;
        } catch (_e) { /* \u5ffd\u7565\u975e\u6cd5\u9009\u62e9\u5668 */ }
      }
      // \u515c\u5e95\uff1a\u627e\u7b2c\u4e00\u4e2a\u5305\u542b extensionsMenuExtensionButton \u5b50\u5143\u7d20\u7684\u5bb9\u5668
      try {
        const btn = PAGE_DOC.querySelector('.extensionsMenuExtensionButton');
        if (btn) {
          let p = btn.parentElement;
          while (p && p !== PAGE_DOC.body) {
            if (p.children.length >= 1 && /list|menu|dropdown/i.test(p.className || '')) return p;
            p = p.parentElement;
          }
          if (btn.parentElement) return btn.parentElement.parentElement || btn.parentElement;
        }
      } catch (_e) { /* \u5ffd\u7565 */ }
      return null;
    }

    // --------------------------------------------------------------------------
    // \u9b54\u6cd5\u68d2\u6269\u5c55\u83dc\u5355\u5165\u53e3\uff1a\u5f80\u6269\u5c55\u83dc\u5355\u91cc\u8ffd\u52a0\u4e00\u4e2a\u83dc\u5355\u9879
    // --------------------------------------------------------------------------
    function registerWandMenuItem() {
      refreshPageRefs();
      const menu = findExtensionsMenu();
      if (!menu) {
        // \u83dc\u5355\u8fd8\u6ca1\u6e32\u67d3\uff0c\u7a0d\u540e\u91cd\u8bd5
        return false;
      }
      if (PAGE_DOC.getElementById('yqm_wand_menu_item')) return true;

      // SillyTavern \u83dc\u5355\u9879\u6807\u51c6\u7ed3\u6784\uff1a
      // <div class="list-group-item flex-container flexGap5">
      //   <div class="fa-solid fa-... extensionsMenuExtensionButton"></div>
      //   <span>\u6807\u9898</span>
      // </div>
      const item = el('div', {
        id: 'yqm_wand_menu_item',
        class: 'list-group-item flex-container flexGap5 interactable',
        title: '\u6253\u5f00\u8bb0\u5fc6\u5feb\u6377\u9762\u677f',
        tabindex: '0',
        role: 'listitem',
      }, [
        el('div', { class: 'fa-fw fa-solid fa-list-check extensionsMenuExtensionButton' }),
        el('span', { text: '\u8bb0\u5fc6\u5feb\u6377\u9762\u677f' }),
      ]);
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => {
        openPanel();
        // \u70b9\u5b8c\u6536\u8d77\u9b54\u6cd5\u68d2\u83dc\u5355\uff08\u7528\u4e3b\u9875\u9762\u81ea\u5df1\u7684 jQuery\uff0c\u907f\u514d\u62ff\u5230 iframe \u91cc\u7684\uff09
        try {
          const jq = PAGE_WIN.jQuery || PAGE_WIN.$ || (typeof jQuery !== 'undefined' ? jQuery : null);
          if (jq) {
            jq(menu).hide();
            jq(PAGE_DOC.getElementById('extensionsMenuButton')).removeClass('rotated');
          }
        } catch (_e) { /* ignore */ }
      });
      menu.appendChild(item);
      return true;
    }

    // \u53cd\u590d\u5c1d\u8bd5\u6ce8\u518c\u83dc\u5355\u9879\uff0c\u76f4\u5230\u6210\u529f\uff08\u83dc\u5355\u53ef\u80fd\u5728\u63d2\u4ef6\u52a0\u8f7d\u540e\u624d\u6e32\u67d3\uff09
    function ensureWandMenuItem(retries) {
      if (registerWandMenuItem()) {
        info('\u9b54\u6cd5\u68d2\u83dc\u5355\u9879\u5df2\u6ce8\u518c');
        return;
      }
      // \u6700\u591a\u91cd\u8bd5 60 \u6b21 \u00d7 500ms = 30 \u79d2\uff0c\u517c\u5bb9\u6162\u901f\u52a0\u8f7d
      if ((retries || 0) < 60) {
        setTimeout(() => ensureWandMenuItem((retries || 0) + 1), 500);
      } else {
        warn('\u9b54\u6cd5\u68d2\u83dc\u5355\u9879\u6ce8\u518c\u5931\u8d25\uff1a30 \u79d2\u5185\u672a\u627e\u5230\u6269\u5c55\u83dc\u5355\u5bb9\u5668');
        // \u8bca\u65ad\uff1a\u628a\u9875\u9762\u4e0a\u53ef\u80fd\u662f\u83dc\u5355\u5bb9\u5668\u7684\u5143\u7d20\u5217\u51fa\u6765\uff0c\u4fbf\u4e8e\u5bf9\u75c7\u4fee\u590d
        try {
          const cands = [];
          PAGE_DOC.querySelectorAll('[id*="xtension"], [class*="xtension"], .dropdown-menu, [class*="menu"]').forEach((n) => {
            if (cands.length < 25) {
              cands.push('<' + n.tagName.toLowerCase() +
                (n.id ? '#' + n.id : '') +
                (n.className ? '.' + String(n.className).split(/\s+/).slice(0, 3).join('.') : '') + '>');
            }
          });
          warn('\u8bca\u65ad \u00b7 \u9875\u9762\u53ef\u80fd\u7684\u83dc\u5355\u5bb9\u5668\uff1a', cands.join('  '));
          warn('\u8bca\u65ad \u00b7 body \u662f\u5426\u5b58\u5728:', !!PAGE_DOC.body, '| body \u76f4\u63a5\u5b50\u5143\u7d20\u6570:', PAGE_DOC.body ? PAGE_DOC.body.children.length : -1);
        } catch (e) { warn('\u8bca\u65ad\u5931\u8d25\uff1a', e); }
      }
    }

    function boot() {
      refreshPageRefs();
      info('boot \u5f00\u59cb',
        '| \u8fd0\u884c\u73af\u5883:', (window.parent && window.parent !== window) ? 'iframe(\u9152\u9986\u52a9\u624b)' : '\u4e3b\u9875\u9762(\u6269\u5c55)',
        '| \u9875\u9762\u6587\u6863\u53ef\u8fbe:', !!PAGE_DOC,
        '| URL:', (() => { try { return PAGE_DOC.location.href; } catch (_e) { return 'N/A'; } })());
      info('\u6587\u6863\u63a2\u6d4b\u660e\u7ec6:', PROBE_LOG.join(' || '));
      info('\u83dc\u5355\u5bb9\u5668:', (() => { const m = findExtensionsMenu(); return m ? ('<' + m.tagName.toLowerCase() + (m.id ? '#' + m.id : '') + '>') : '\u672a\u627e\u5230'; })(),
        '| #chat \u5b58\u5728:', !!(() => { try { return PAGE_DOC.getElementById('chat'); } catch (_e) { return false; } })());

      // 1) \u60ac\u6d6e\u7403\u4f18\u5148\u521b\u5efa \u2014\u2014 \u4e0d\u4f9d\u8d56\u4efb\u4f55\u524d\u7f6e\u6761\u4ef6\uff0c\u88c5\u4e0a\u5c31\u80fd\u770b\u5230\uff0c\u4fbf\u4e8e\u5224\u65ad\u662f\u5426\u6210\u529f
      if (isBallEnabled()) {
        try {
          createBall();
          // \u6821\u9a8c\u662f\u5426\u771f\u7684\u8fdb\u4e86\u4e3b\u9875\u9762 DOM
          info('\u60ac\u6d6e\u7403\u5df2\u521b\u5efa | \u5df2\u6302\u5230\u9875\u9762 DOM:', !!(ui.ball && ui.ball.parentNode), '| body \u53ef\u8fbe:', !!PAGE_DOC.body);
        } catch (e) { warn('\u60ac\u6d6e\u7403\u521b\u5efa\u5931\u8d25\uff1a', e); }
      } else {
        info('\u60ac\u6d6e\u7403\u5f00\u5173\u4e3a\u5173\u95ed\u72b6\u6001\uff08\u53ef\u5728\u9762\u677f\u5e95\u90e8\u91cd\u65b0\u5f00\u542f\uff09');
      }

      // 2) \u6ce8\u518c\u9b54\u6cd5\u68d2\u83dc\u5355\u5165\u53e3\uff08\u4e3b\u5165\u53e3\uff0c\u53ef\u80fd\u665a\u4e8e\u811a\u672c\u6e32\u67d3\uff0c\u6545\u5e26\u91cd\u8bd5\uff09
      ensureWandMenuItem(0);

      info('\u521d\u59cb\u5316\u5b8c\u6210');
    }

    let info = (...a) => console.log('[YzmQuickPanel]', ...a);
    let warn = (...a) => console.warn('[YzmQuickPanel]', ...a);

    // \u7b49\u9875\u9762 DOM \u5c31\u7eea + \u7a0d\u7b49\u67da\u6708\u63d2\u4ef6\u521d\u59cb\u5316
    // \u3010\u5173\u952e\u3011\u60ac\u6d6e\u7403\u4e0d\u7b49 \u2014\u2014 \u5c3d\u5feb\u521b\u5efa\uff0c\u4e0d\u4f9d\u8d56\u83dc\u5355\u5bb9\u5668\u662f\u5426\u5b58\u5728
    function waitAndBoot() {
      let doc;
      try { doc = resolvePageDoc(); } catch (_e) { doc = document; }

      // \u60ac\u6d6e\u7403\uff1aDOM \u4e00\u5c31\u7eea\u5c31\u7acb\u523b\u521b\u5efa\uff08\u4e0d\u7b49\u83dc\u5355\u3001\u4e0d\u7b49\u67da\u6708\uff09
      const bootBallNow = () => {
        if (!isBallEnabled()) return;
        try { if (!ui.ball) { createBall(); info('\u60ac\u6d6e\u7403\u5df2\u521b\u5efa'); } }
        catch (e) { warn('\u60ac\u6d6e\u7403\u521b\u5efa\u5931\u8d25\uff1a', e); }
      };

      // \u5b8c\u6574 boot\uff08\u542b\u83dc\u5355\u6ce8\u518c\uff09\uff1a\u7a0d\u7b49\uff0c\u7ed9\u9152\u9986/\u67da\u6708\u7559\u521d\u59cb\u5316\u65f6\u95f4
      const bootFull = () => setTimeout(() => boot(), 800);

      if (doc && doc.readyState === 'loading') {
        doc.addEventListener('DOMContentLoaded', () => {
          setTimeout(bootBallNow, 100);
          bootFull();
        });
      } else {
        setTimeout(bootBallNow, 100);
        bootFull();
      }
    }

    window[NS] = window[NS] || {};
    window[NS].Panel = {
      boot,
      openPanel,
      closePanel,
      refresh,
      setBallEnabled,
      isBallEnabled,
      _ui: ui,
    };

    waitAndBoot();
  })();

})();
