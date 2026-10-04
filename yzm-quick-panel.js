// ============================================================================
// \u8bb0\u5fc6\u5feb\u6377\u9762\u677f\uff08\u67da\u6708\u8bb0\u5fc6\uff09\u2014 \u9152\u9986\u52a9\u624b\u811a\u672c\u7248 v1.0.0
// \u81ea\u52a8\u751f\u6210\uff0c\u8bf7\u52ff\u624b\u6539\u3002\u53ea\u4e3a\u300c\u67da\u6708\u306e\u8bb0\u5fc6\u300d\u63d0\u4f9b\u641c\u7d22/\u6279\u91cf\u663e\u9690/\u9884\u8bbe\u529f\u80fd\u3002
// ============================================================================
(function () {
  'use strict';
  if (window.YzmQuickPanel && window.YzmQuickPanel.__tavernScriptLoaded) return;
  window.YzmQuickPanel = window.YzmQuickPanel || {};
  window.YzmQuickPanel.__tavernScriptLoaded = true;

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
    // \u627e\u5230\u67da\u6708\u8bb0\u5fc6\u7684\u5168\u5c40\u5bf9\u8c61\u3002\u5b83\u53ef\u80fd\u53eb window.YuzukiMemory\u3002
    // --------------------------------------------------------------------------
    function getYuzuki() {
      return window.YuzukiMemory || null;
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

      // \u901a\u77e5\u67da\u6708\u81ea\u5df1\u7684\u754c\u9762\u5237\u65b0\uff08\u5982\u679c\u5b83\u5728\u76d1\u542c\uff09
      try {
        window.dispatchEvent(new CustomEvent('yzm-memory-state-updated', {
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
      const node = document.createElement(tag);
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
        node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
      });
      return node;
    }

    function toast(msg, type) {
      const t = el('div', { class: `yqm-toast ${type || ''}`, text: msg });
      document.body.appendChild(t);
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
      const ball = el('div', {
        class: 'yqm-ball',
        title: '\u8bb0\u5fc6\u5feb\u6377\u9762\u677f',
        onclick: togglePanel,
      }, [
        el('span', { class: 'yqm-ball-icon', html: '&#9776;' }),
      ]);
      document.body.appendChild(ball);
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
        document.addEventListener('mousemove', onMove, { passive: false });
        document.addEventListener('mouseup', onUp);
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onUp);
      }

      function onMove(e) {
        if (!dragging) return;
        const point = e.touches ? e.touches[0] : e;
        const dx = point.clientX - startX;
        const dy = point.clientY - startY;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved = true;
        const maxX = window.innerWidth - ball.offsetWidth;
        const maxY = window.innerHeight - ball.offsetHeight;
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
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onUp);
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

      document.body.appendChild(panel);
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
    // \u9b54\u6cd5\u68d2\u6269\u5c55\u83dc\u5355\u5165\u53e3\uff1a\u5f80 #extensionsMenu \u91cc\u8ffd\u52a0\u4e00\u4e2a\u83dc\u5355\u9879
    // --------------------------------------------------------------------------
    function registerWandMenuItem() {
      const menu = document.getElementById('extensionsMenu');
      if (!menu) {
        // \u83dc\u5355\u8fd8\u6ca1\u6e32\u67d3\uff0c\u7a0d\u540e\u91cd\u8bd5
        return false;
      }
      if (document.getElementById('yqm_wand_menu_item')) return true;

      // SillyTavern \u83dc\u5355\u9879\u6807\u51c6\u7ed3\u6784\uff1a
      // <div class="list-group-item flex-container flexGap5">
      //   <div class="fa-solid fa-... extensionsMenuExtensionButton"></div>
      //   <span>\u6807\u9898</span>
      // </div>
      const item = el('div', {
        id: 'yqm_wand_menu_item',
        class: 'list-group-item flex-container flexGap5',
        title: '\u6253\u5f00\u8bb0\u5fc6\u5feb\u6377\u9762\u677f',
      }, [
        el('div', { class: 'fa-solid fa-list-check extensionsMenuExtensionButton' }),
        el('span', { text: '\u8bb0\u5fc6\u5feb\u6377\u9762\u677f' }),
      ]);
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => {
        openPanel();
        // \u70b9\u5b8c\u6536\u8d77\u9b54\u6cd5\u68d2\u83dc\u5355
        try {
          if (typeof jQuery !== 'undefined') {
            jQuery('#extensionsMenu').hide();
            jQuery('#extensionsMenuButton').removeClass('rotated');
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
      if ((retries || 0) < 40) {
        setTimeout(() => ensureWandMenuItem((retries || 0) + 1), 500);
      } else {
        warn('\u9b54\u6cd5\u68d2\u83dc\u5355\u9879\u6ce8\u518c\u5931\u8d25\uff1a\u672a\u627e\u5230 #extensionsMenu');
      }
    }

    function boot() {
      // 1) \u6ce8\u518c\u9b54\u6cd5\u68d2\u83dc\u5355\u5165\u53e3\uff08\u4e3b\u5165\u53e3\uff09
      ensureWandMenuItem(0);
      // 2) \u60ac\u6d6e\u7403\uff08\u5907\u9009\uff0c\u9ed8\u8ba4\u5f00\uff09
      if (isBallEnabled()) createBall();
      info('\u521d\u59cb\u5316\u5b8c\u6210');
    }

    let info = (...a) => console.log('[YzmQuickPanel]', ...a);
    let warn = (...a) => console.warn('[YzmQuickPanel]', ...a);

    // \u7b49 DOM \u5c31\u7eea + \u7a0d\u7b49\u67da\u6708\u63d2\u4ef6\u521d\u59cb\u5316
    function waitAndBoot() {
      const tryBoot = () => {
        boot();
      };
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(tryBoot, 1200));
      } else {
        setTimeout(tryBoot, 1200);
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
