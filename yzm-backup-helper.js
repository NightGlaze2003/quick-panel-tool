// ============================================================================
// \u5907\u4efd\u52a9\u624b \u2014 \u9152\u9986\u52a9\u624b\u811a\u672c\u7248 v1.0
// \u89e3\u51b3\u300c\u624b\u673a\u4e0a\u70b9 SillyTavern \u7684\u300e\u4e0b\u8f7d\u5907\u4efd\u300f\u6ca1\u53cd\u5e94 / \u4e0b\u8f7d\u5931\u8d25\u300d\u3002
//
// \u539f\u7406\uff1aST \u539f\u751f\u5b9e\u73b0\u662f fetch \u2192 \u6574\u4e2a ZIP \u585e\u8fdb\u5185\u5b58\uff08blob\uff09\u2192 a.click()\uff0c
//      \u6587\u4ef6\u5927\u4e86\u624b\u673a\u5185\u5b58\u625b\u4e0d\u4f4f\uff0c\u8fde\u4fdd\u5b58\u6846\u90fd\u5f39\u4e0d\u51fa\u6765\u3002
//      \u672c\u811a\u672c\u6539\u6210\u300c\u8fb9\u6536\u8fb9\u5199\u76d8\u300d\uff1a
//        \u2460 \u652f\u6301 File System Access API \u7684\u6d4f\u89c8\u5668 \u2192 \u76f4\u63a5\u6d41\u5f0f\u5199\u5165\u4f60\u9009\u7684\u6587\u4ef6\uff08\u5185\u5b58\u6052\u5b9a\uff09
//        \u2461 \u4e0d\u652f\u6301\u7684\uff08\u5982 iOS\u3001\u8001\u5b89\u5353\uff09\u2192 \u81ea\u52a8\u5206\u5377\u4e0b\u8f7d\uff08\u6bcf\u5377 20MB\uff0c\u9010\u4e2a\u4fdd\u5b58\uff09
//      \u53e6\u5916\u5168\u7a0b\u663e\u793a\u8fdb\u5ea6/\u901f\u5ea6\uff0c\u53ef\u53d6\u6d88\uff0c\u5931\u8d25\u53ef\u91cd\u8bd5\u3002
//
// \u5b89\u5168\u6027\uff1a\u53ea\u8c03\u7528 ST \u81ea\u5e26\u7684 POST /api/users/backup\uff08\u53ea\u8bfb\u3001\u670d\u52a1\u7aef\u53ea\u6253\u5305\u4e0d\u6539\u6570\u636e\uff09\uff0c
//        \u4e0d\u89e6\u78b0\u300c\u91cd\u7f6e\u8bbe\u7f6e / \u91cd\u7f6e\u4e00\u5207\u300d\uff0c\u4e0d\u5199\u670d\u52a1\u5668\u6587\u4ef6\u3002
// \u81ea\u52a8\u751f\u6210\uff0c\u8bf7\u52ff\u624b\u6539\u3002
// ============================================================================
(function () {
  'use strict';
  if (window.YzmBackupHelper && window.YzmBackupHelper.__loaded) {
    console.log('[YzmBackupHelper] \u811a\u672c\u5df2\u52a0\u8f7d\u8fc7\uff0c\u8df3\u8fc7\u91cd\u590d\u6267\u884c');
    return;
  }
  window.YzmBackupHelper = window.YzmBackupHelper || {};
  window.YzmBackupHelper.__loaded = true;
  window.__YZB_CSS__ = "/* ============================================================================\n   \u5907\u4efd\u52a9\u624b UI\uff08.yzb-*\uff09\n   \u72ec\u7acb\u4e8e\u8bb0\u5fc6\u5feb\u6377\u9762\u677f\uff0c\u6240\u4ee5\u914d\u8272\u4e0d\u8ddf\u4e3b\u9898\u8d70\uff1a\u7528\u4e2d\u6027\u6df1\u8272\u5361\u7247 + \u81ea\u9002\u5e94\u6d45\u8272\u6587\u5b57\uff0c\n   \u4fdd\u8bc1\u5728\u4efb\u4f55\u9152\u9986\u4e3b\u9898\u4e0b\u90fd\u770b\u5f97\u6e05\u3002\n   ============================================================================ */\n/* \u3010\u5173\u952e\u5751\u3011SillyTavern \u4f1a\u7ed9 <html> \u52a0 transform\uff08\u54ea\u6015\u503c\u662f\u5355\u4f4d\u77e9\u9635\uff09\uff0c\n   \u8fd9\u4f1a\u8ba9 position:fixed \u76f8\u5bf9 <html> \u800c\u4e0d\u662f\u89c6\u53e3\u5b9a\u4f4d \u2014\u2014 \u5b9e\u6d4b\u4f1a\u5bfc\u81f4\u6d6e\u5c42\u9ad8\u5ea6\u53d8\u6210 0\u3001\n   \u5361\u7247\u88ab\u9876\u5230\u5c4f\u5e55\u5916\uff08y \u4e3a\u8d1f\uff09\u3002\u6240\u4ee5\u8fd9\u91cc\u4e00\u5f8b\u7528 dvh \u660e\u786e\u6491\u6ee1\uff0c\u5e76\u8ba9\u5361\u7247\u7528 margin:auto \u5c45\u4e2d\u3002\n   \uff08\u4e0e\u300c\u8bb0\u5fc6\u5feb\u6377\u9762\u677f\u300d\u91cc\u540c\u4e00\u4e2a\u5751\uff0c\u89c1\u624b\u518c\u300c\u57515\u300d\uff09 */\n.yzb-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 100vh;\n  height: 100dvh;\n  box-sizing: border-box;\n  z-index: 100000;\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  padding: 12px;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  background: rgba(0, 0, 0, 0.55);\n  backdrop-filter: blur(2px);\n}\n.yzb-card {\n  margin: auto;\n  width: 420px;\n  max-width: calc(100vw - 24px);\n  max-height: calc(100dvh - 24px);\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  background: #23222b;\n  color: #eceaf3;\n  border: 1px solid rgba(255, 255, 255, 0.14);\n  border-radius: 14px;\n  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.45);\n  font-size: 13px;\n}\n.yzb-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 14px 16px 8px;\n  flex-shrink: 0;\n}\n.yzb-title { font-size: 15px; font-weight: 600; }\n.yzb-close {\n  background: transparent;\n  border: none;\n  color: #b9b5c8;\n  font-size: 20px;\n  line-height: 1;\n  cursor: pointer;\n  padding: 2px 6px;\n  border-radius: 6px;\n}\n.yzb-close:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }\n.yzb-body {\n  padding: 4px 16px 16px;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.yzb-sub { font-size: 12px; color: #b9b5c8; margin-top: 6px; line-height: 1.5; word-break: break-all; }\n.yzb-hint {\n  font-size: 12px;\n  color: #a9a4bb;\n  line-height: 1.6;\n  margin: 10px 0 2px;\n}\n.yzb-row { display: flex; align-items: center; gap: 8px; margin-top: 12px; flex-wrap: wrap; }\n.yzb-label { width: 62px; flex-shrink: 0; font-size: 12px; color: #a9a4bb; }\n.yzb-chips { display: flex; gap: 6px; flex-wrap: wrap; }\n.yzb-chip {\n  padding: 5px 11px;\n  border-radius: 999px;\n  border: 1px solid rgba(255, 255, 255, 0.18);\n  color: #ddd9ea;\n  font-size: 12px;\n  cursor: pointer;\n  user-select: none;\n  background: rgba(255, 255, 255, 0.04);\n}\n.yzb-chip:hover { border-color: #8ea2ff; color: #fff; }\n.yzb-chip.on { background: #6f7bff; border-color: #6f7bff; color: #fff; }\n.yzb-input {\n  flex: 1;\n  min-width: 0;\n  background: rgba(255, 255, 255, 0.06);\n  border: 1px solid rgba(255, 255, 255, 0.16);\n  border-radius: 8px;\n  color: #eceaf3;\n  padding: 7px 9px;\n  font-size: 12px;\n  outline: none;\n}\n.yzb-input:focus { border-color: #6f7bff; }\n.yzb-bar {\n  height: 6px;\n  margin-top: 12px;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.12);\n  overflow: hidden;\n  position: relative;\n}\n.yzb-bar-inner {\n  height: 100%;\n  width: 40%;\n  border-radius: 999px;\n  background: linear-gradient(90deg, #6f7bff, #9d7bff);\n  position: relative;\n}\n/* \u4e0d\u77e5\u9053\u603b\u5927\u5c0f\uff08\u6d41\u5f0f ZIP\uff09\u65f6\u7528\u300c\u6765\u56de\u8dd1\u300d\u7684\u8fdb\u5ea6\u6761\u8868\u793a\u5728\u52a8 */\n.yzb-bar:not(.determinate) .yzb-bar-inner { animation: yzb-indeterminate 1.5s ease-in-out infinite; }\n.yzb-bar.done .yzb-bar-inner { width: 100% !important; animation: none; background: #4ec97f; }\n@keyframes yzb-indeterminate {\n  0%   { left: -40%; width: 40%; }\n  50%  { left: 30%;  width: 55%; }\n  100% { left: 100%; width: 40%; }\n}\n.yzb-stat { margin-top: 8px; font-size: 12px; color: #cfcbe0; font-variant-numeric: tabular-nums; }\n.yzb-footer {\n  display: flex;\n  gap: 8px;\n  justify-content: flex-end;\n  margin-top: 16px;\n  flex-wrap: wrap;\n}\n.yzb-btn {\n  padding: 7px 15px;\n  border-radius: 9px;\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  background: transparent;\n  color: #eceaf3;\n  font-size: 13px;\n  cursor: pointer;\n}\n.yzb-btn:hover { border-color: #8ea2ff; color: #fff; }\n.yzb-btn.primary { background: #6f7bff; border-color: #6f7bff; color: #fff; }\n.yzb-btn.primary:hover { filter: brightness(1.1); }\n.yzb-btn:disabled { opacity: 0.55; cursor: default; }\n\n/* \u81ea\u7ed8 toast\uff08\u9152\u9986\u6ca1\u6709 toastr \u65f6\u515c\u5e95\uff09 */\n.yzb-toast {\n  position: fixed;\n  left: 50%;\n  bottom: 92px;\n  transform: translateX(-50%) translateY(12px);\n  background: #2b2a34;\n  color: #f0eef7;\n  border: 1px solid rgba(255, 255, 255, 0.16);\n  padding: 9px 14px;\n  border-radius: 10px;\n  font-size: 13px;\n  z-index: 100001;\n  opacity: 0;\n  transition: opacity 0.2s ease, transform 0.2s ease;\n  max-width: calc(100vw - 32px);\n  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.4);\n}\n.yzb-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }\n.yzb-toast.error { border-color: rgba(255, 120, 120, 0.6); }\n.yzb-toast.warn { border-color: rgba(255, 200, 100, 0.6); }\n\n/* \u624b\u673a\u7aef\uff1a\u5361\u7247\u8d34\u5e95\uff0c\u6309\u94ae\u66f4\u597d\u70b9 */\n@media (max-width: 480px) {\n  .yzb-overlay { padding: 0; }\n  .yzb-card {\n    width: 100%;\n    margin: auto auto 0;\n    max-height: calc(100dvh - 24px);\n    border-radius: 16px 16px 0 0;\n  }\n  .yzb-footer { justify-content: stretch; }\n  .yzb-footer .yzb-btn { flex: 1; text-align: center; }\n}\n";
  // ==========================================================================
  // \u57fa\u7840\u73af\u5883
  //   \u9152\u9986\u52a9\u624b\u628a\u811a\u672c\u8dd1\u5728\u9690\u85cf iframe \u91cc\uff0c\u771f\u6b63\u8981\u64cd\u4f5c\u7684\u662f\u300c\u4e3b\u9875\u9762\u300d\uff1a
  //   \u6240\u4ee5 fetch / DOM / FSA \u4e00\u5f8b\u8d70 window.parent\u3002
  // ==========================================================================
  var PAGE_WIN = (window.parent && window.parent !== window) ? window.parent : window;
  var PAGE_DOC = null;
  function refreshDoc() {
    try { PAGE_DOC = PAGE_WIN.document; } catch (_e) { PAGE_DOC = document; }
    return PAGE_DOC;
  }
  refreshDoc();

  var LS = {
    mode: 'yzm_backup_mode',        // 'auto' | 'fsa' | 'chunk'
    chunk: 'yzm_backup_chunk_mb',   // \u5206\u5377\u5927\u5c0f\uff08MB\uff09
    handle: 'yzm_backup_handle',    // \u7528\u6237 handle\uff08\u591a\u8d26\u6237\u65f6\u624d\u9700\u8981\u6539\uff09
  };
  function lsGet(k, d) { try { var v = PAGE_WIN.localStorage.getItem(k); return v === null ? d : v; } catch (_e) { return d; } }
  function lsSet(k, v) { try { PAGE_WIN.localStorage.setItem(k, v); } catch (_e) { /* ignore */ } }

  function el(tag, attrs, children) {
    refreshDoc();
    var node = PAGE_DOC.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (k === 'class') node.className = v;
        else if (k === 'text') node.textContent = v;
        else if (k === 'html') node.innerHTML = v;
        else if (k.indexOf('on') === 0 && typeof v === 'function') node.addEventListener(k.slice(2), v);
        else if (v !== undefined && v !== null) node.setAttribute(k, v);
      });
    }
    (children || []).forEach(function (c) {
      if (c === null || c === undefined) return;
      node.appendChild(typeof c === 'string' ? PAGE_DOC.createTextNode(c) : c);
    });
    return node;
  }

  function notify(msg, type) {
    // \u4f18\u5148\u7528\u9152\u9986\u81ea\u5df1\u7684 toastr\uff0c\u98ce\u683c\u7edf\u4e00\uff1b\u6ca1\u6709\u5c31\u9000\u56de\u81ea\u7ed8
    try {
      if (PAGE_WIN.toastr) {
        var fn = type === 'error' ? 'error' : (type === 'warn' ? 'warning' : 'info');
        PAGE_WIN.toastr[fn](msg, '\u5907\u4efd\u52a9\u624b', { timeOut: type === 'error' ? 8000 : 4000 });
        return;
      }
    } catch (_e) { /* \u843d\u5230\u81ea\u7ed8 */ }
    try {
      var t = el('div', { class: 'yzb-toast' + (type ? ' ' + type : ''), text: msg });
      PAGE_DOC.body.appendChild(t);
      setTimeout(function () { t.classList.add('show'); }, 10);
      setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 300); }, 3600);
    } catch (_e) { console.log('[YzmBackupHelper]', msg); }
  }

  function fmtBytes(n) {
    if (!n && n !== 0) return '-';
    if (n < 1024) return n + ' B';
    if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB';
    if (n < 1024 * 1024 * 1024) return (n / 1024 / 1024).toFixed(1) + ' MB';
    return (n / 1024 / 1024 / 1024).toFixed(2) + ' GB';
  }

  function injectCss() {
    try {
      refreshDoc();
      var id = 'yzb-style';
      if (PAGE_DOC.getElementById(id)) return;
      var style = PAGE_DOC.createElement('style');
      style.id = id;
      style.textContent = window.__YZB_CSS__ || '';
      (PAGE_DOC.head || PAGE_DOC.documentElement).appendChild(style);
    } catch (_e) { /* ignore */ }
  }

  // ==========================================================================
  // \u4e0e ST \u4ea4\u4e92
  // ==========================================================================
  function getCsrfToken() {
    return PAGE_WIN.fetch('/csrf-token', { credentials: 'same-origin' })
      .then(function (r) { return r.json(); })
      .then(function (d) { return d.token; });
  }

  function userHandle() {
    // \u591a\u8d26\u6237\u65f6\u53ef\u4ee5\u4ece ST \u7684\u4e0a\u4e0b\u6587\u91cc\u62ff\u5230\u5f53\u524d\u7528\u6237\uff1b\u62ff\u4e0d\u5230\u5c31\u7528\u624b\u586b\u7684/\u9ed8\u8ba4
    try {
      var ctx = PAGE_WIN.SillyTavern && PAGE_WIN.SillyTavern.getContext && PAGE_WIN.SillyTavern.getContext();
      var h = ctx && ctx.accountStorage && ctx.accountStorage.getCurrentUserHandle && ctx.accountStorage.getCurrentUserHandle();
      if (h) return h;
    } catch (_e) { /* ignore */ }
    return lsGet(LS.handle, 'default-user') || 'default-user';
  }

  function parseFilename(disposition) {
    var fallback = 'backup-' + new Date().toISOString().slice(0, 10) + '.zip';
    if (!disposition) return fallback;
    var m = /filename\*?=(?:UTF-8'')?"?([^";]+)"?/i.exec(disposition);
    if (!m || !m[1]) return fallback;
    try { return decodeURIComponent(m[1]); } catch (_e) { return m[1]; }
  }

  function fsaSupported() {
    try { return typeof PAGE_WIN.showSaveFilePicker === 'function'; } catch (_e) { return false; }
  }
  // ==========================================================================
  // \u4e0b\u8f7d\u5f15\u64ce
  // ==========================================================================
  var state = { busy: false, controller: null, cancelling: false };

  function modeSetting() {
    var m = lsGet(LS.mode, 'auto');
    return (m === 'fsa' || m === 'chunk') ? m : 'auto';
  }
  function chunkMB() {
    var n = parseInt(lsGet(LS.chunk, '20'), 10);
    return (n >= 2 && n <= 500) ? n : 20;
  }

  function sleep(ms) {
    return new Promise(function (r) { setTimeout(r, ms); });
  }

  function triggerDownload(blob, filename) {
    var url = PAGE_WIN.URL.createObjectURL(blob);
    var a = el('a', { href: url, download: filename });
    a.style.display = 'none';
    PAGE_DOC.body.appendChild(a);
    a.click();
    setTimeout(function () {
      try { a.remove(); } catch (_e) { /* ignore */ }
      try { PAGE_WIN.URL.revokeObjectURL(url); } catch (_e) { /* ignore */ }
    }, 60000);
  }

  function requestBackup(signal) {
    return getCsrfToken().then(function (token) {
      return PAGE_WIN.fetch('/api/users/backup', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
        body: JSON.stringify({ handle: userHandle() }),
        signal: signal,
      });
    }).then(function (resp) {
      if (!resp.ok) {
        return resp.json().catch(function () { return {}; }).then(function (d) {
          throw new Error(d.error || ('HTTP ' + resp.status));
        });
      }
      if (!resp.body || typeof resp.body.getReader !== 'function') {
        throw new Error('\u5f53\u524d\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u6d41\u5f0f\u8bfb\u53d6\uff08\u65e0\u6cd5\u8fb9\u6536\u8fb9\u5199\uff09');
      }
      return resp;
    });
  }

  // \u2460 \u6d41\u5f0f\u5199\u76d8\uff1a\u6570\u636e\u76f4\u63a5\u843d\u76d8\uff0c\u5185\u5b58\u6052\u5b9a
  function streamToFile(resp, filename, ui) {
    var opts = {
      suggestedName: filename,
      types: [{ description: 'ZIP \u538b\u7f29\u5305', accept: { 'application/zip': ['.zip'] } }],
    };
    return PAGE_WIN.showSaveFilePicker(opts).then(function (handle) {
      return handle.createWritable().then(function (writable) {
        var reader = resp.body.getReader();
        function pump() {
          return reader.read().then(function (r) {
            if (r.done) return writable.close();
            return writable.write(r.value).then(function () {
              ui.add(r.value.length);
              return pump();
            });
          });
        }
        return pump();
      });
    });
  }

  // \u2461 \u5206\u5377\u4e0b\u8f7d\uff1a\u6bcf\u7d2f\u79ef chunkMB \u5c31\u5b58\u6210\u4e00\u4e2a\u5c0f\u6587\u4ef6\uff08\u5c0f\u6587\u4ef6\u624b\u673a\u6d4f\u89c8\u5668\u90fd\u80fd\u6b63\u5e38\u4fdd\u5b58\uff09
  function chunkedDownload(resp, filename, ui) {
    var limit = chunkMB() * 1024 * 1024;
    var base = filename.replace(/\.zip$/i, '');
    var reader = resp.body.getReader();
    var buf = [];
    var buffered = 0;
    var index = 1;
    var total = 0;
    ui.setStatus('\u51c6\u5907\u5206\u5377\u4e0b\u8f7d\uff08\u6bcf\u5377 ' + chunkMB() + ' MB\uff09\u2026');

    function flush() {
      var blob = new PAGE_WIN.Blob(buf, { type: 'application/zip' });
      var name = base + '.part' + String(index).padStart(2, '0');
      triggerDownload(blob, name);
      ui.part(index, buffered);
      index++;
      buf = [];
      buffered = 0;
      // \u7ed9\u6d4f\u89c8\u5668\u7559\u51fa\u300c\u4fdd\u5b58\u4e0a\u4e00\u5377\u300d\u7684\u65f6\u95f4\uff0c\u4e0d\u7136\u8fde\u7740\u5f39\u4f1a\u88ab\u62e6
      return sleep(1100);
    }

    function pump() {
      return reader.read().then(function (r) {
        if (r.done) {
          if (buffered > 0) return flush().then(function () { return finish(); });
          return finish();
        }
        buf.push(r.value);
        buffered += r.value.length;
        total += r.value.length;
        ui.add(r.value.length);
        if (buffered >= limit) return flush().then(pump);
        return pump();
      });
    }

    function finish() {
      var manifest = [
        'SillyTavern \u5907\u4efd\u5206\u5377\u8bf4\u660e',
        '',
        '\u539f\u59cb\u6587\u4ef6\u540d\uff1a' + filename,
        '\u5206\u5377\u6570\u91cf\uff1a' + (index - 1),
        '\u603b\u5927\u5c0f\uff1a' + fmtBytes(total),
        '\u5206\u5377\u5927\u5c0f\uff1a\u6bcf\u5377\u7ea6 ' + chunkMB() + ' MB',
        '',
        '\u3010\u600e\u4e48\u8fd8\u539f\u6210\u4e00\u4e2a\u6587\u4ef6\u3011',
        '\u65b9\u5f0f\u4e00\uff08\u63a8\u8350\uff09\uff1a\u628a\u672c\u6587\u4ef6\u548c\u6240\u6709 .partXX \u653e\u5728\u540c\u4e00\u4e2a\u6587\u4ef6\u5939\uff0c\u7136\u540e\u5728\u7535\u8111\u4e0a\u6267\u884c\uff1a',
        '  Windows\uff08PowerShell\uff09\uff1a',
        '    cmd /c copy /b "' + base + '.part01" + "' + base + '.part02" + ... "' + filename + '"',
        '  macOS / Linux\uff1a',
        '    cat ' + base + '.part* > ' + filename,
        '',
        '\u65b9\u5f0f\u4e8c\uff1a\u56de\u5230\u9152\u9986\u52a9\u624b\uff0c\u6253\u5f00\u300c\u5907\u4efd\u52a9\u624b\u300d\u2192\u300c\u5408\u5e76\u5206\u5377\u300d\uff0c',
        '       \u6309\u987a\u5e8f\u9009\u4e2d\u6240\u6709 part \u6587\u4ef6\uff0c\u811a\u672c\u4f1a\u8fb9\u8bfb\u8fb9\u5199\u5408\u6210\u4e00\u4e2a\u5b8c\u6574 zip\uff08\u5185\u5b58\u5360\u7528\u5f88\u4f4e\uff09\u3002',
      ].join('\n');
      triggerDownload(new PAGE_WIN.Blob([manifest], { type: 'text/plain;charset=utf-8' }), base + '.\u8bf4\u660e.txt');
      return Promise.resolve(total);
    }

    return pump();
  }

  // ==========================================================================
  // \u8fdb\u5ea6\u6d6e\u5c42
  // ==========================================================================
  function openProgress(filename) {
    refreshDoc();
    var overlay = el('div', { class: 'yzb-overlay' });
    var card = el('div', { class: 'yzb-card' });
    var title = el('div', { class: 'yzb-title', text: '\u6b63\u5728\u5907\u4efd\u2026' });
    var nameLine = el('div', { class: 'yzb-sub', text: filename || '' });
    var statusLine = el('div', { class: 'yzb-sub', text: '\u6b63\u5728\u8bf7\u6c42\u670d\u52a1\u7aef\u6253\u5305\u2026' });
    var bar = el('div', { class: 'yzb-bar' }, [el('div', { class: 'yzb-bar-inner' })]);
    var statLine = el('div', { class: 'yzb-stat', text: '\u5df2\u63a5\u6536 0 B' });
    var btnCancel = el('button', { class: 'yzb-btn', text: '\u53d6\u6d88', onclick: function () { cancel(); } });
    var footer = el('div', { class: 'yzb-footer' }, [btnCancel]);

    card.appendChild(title);
    card.appendChild(nameLine);
    card.appendChild(statusLine);
    card.appendChild(bar);
    card.appendChild(statLine);
    card.appendChild(footer);
    overlay.appendChild(card);
    PAGE_DOC.body.appendChild(overlay);

    var started = Date.now();
    var bytes = 0;
    var lastT = started;
    var lastB = 0;
    var speed = 0;
    var timer = setInterval(function () {
      var now = Date.now();
      var dt = (now - lastT) / 1000;
      if (dt >= 0.4) {
        var inst = (bytes - lastB) / dt;
        speed = speed ? (speed * 0.6 + inst * 0.4) : inst;
        lastT = now;
        lastB = bytes;
      }
      var el2 = ((now - started) / 1000).toFixed(0);
      statLine.textContent = '\u5df2\u63a5\u6536 ' + fmtBytes(bytes) + ' \u00b7 ' + fmtBytes(speed) + '/s \u00b7 \u5df2\u7528 ' + el2 + 's';
    }, 250);

    function cancel() {
      state.cancelling = true;
      btnCancel.disabled = true;
      btnCancel.textContent = '\u6b63\u5728\u53d6\u6d88\u2026';
      try { if (state.controller) state.controller.abort(); } catch (_e) { /* ignore */ }
    }

    return {
      add: function (n) { bytes += n; },
      setStatus: function (t) { statusLine.textContent = t; },
      setTitle: function (t) { title.textContent = t; },
      part: function (i, size) {
        statusLine.textContent = '\u7b2c ' + i + ' \u5377\u5df2\u5f00\u59cb\u4fdd\u5b58\uff08' + fmtBytes(size) + '\uff09\u2026 \u82e5\u6d4f\u89c8\u5668\u6ca1\u5f39\u4fdd\u5b58\u6846\uff0c\u8bf7\u68c0\u67e5"\u5df2\u62e6\u622a\u7684\u4e0b\u8f7d"';
      },
      finish: function (msg) {
        clearInterval(timer);
        title.textContent = '\u5907\u4efd\u5b8c\u6210';
        statusLine.textContent = msg || ('\u5171 ' + fmtBytes(bytes));
        statLine.textContent = '';
        bar.classList.add('done');
        btnCancel.textContent = '\u5173\u95ed';
        btnCancel.disabled = false;
        btnCancel.onclick = function () { overlay.remove(); };
      },
      fail: function (msg) {
        clearInterval(timer);
        title.textContent = '\u5907\u4efd\u5931\u8d25';
        statusLine.textContent = msg;
        statLine.textContent = '\u4f60\u7684\u6570\u636e\u6ca1\u6709\u4efb\u4f55\u53d8\u5316\uff0c\u53ef\u4ee5\u653e\u5fc3\u91cd\u8bd5\u3002';
        btnCancel.textContent = '\u5173\u95ed';
        btnCancel.disabled = false;
        btnCancel.onclick = function () { overlay.remove(); };
      },
      close: function () { clearInterval(timer); try { overlay.remove(); } catch (_e) { /* ignore */ } },
    };
  }

  // ==========================================================================
  // \u4e3b\u6d41\u7a0b
  // ==========================================================================
  function runBackup() {
    refreshDoc();
    if (state.busy) { notify('\u5df2\u6709\u5907\u4efd\u4efb\u52a1\u5728\u8fdb\u884c\u4e2d\uff0c\u8bf7\u7a0d\u5019', 'warn'); return; }
    state.busy = true;
    state.cancelling = false;
    state.controller = new AbortController();

    var ui = openProgress('');
    var mode = modeSetting();
    if (mode === 'auto') mode = fsaSupported() ? 'fsa' : 'chunk';
    ui.setStatus(mode === 'fsa' ? '\u7b49\u5f85\u9009\u62e9\u4fdd\u5b58\u4f4d\u7f6e\u2026' : '\u6b63\u5728\u8bf7\u6c42\u670d\u52a1\u7aef\u6253\u5305\u2026');

    requestBackup(state.controller.signal)
      .then(function (resp) {
        var filename = parseFilename(resp.headers.get('content-disposition'));
        try { ui.setStatus(mode === 'fsa' ? '\u6b63\u5728\u5199\u5165\u6587\u4ef6\uff08\u53ef\u770b\u7cfb\u7edf\u8fdb\u5ea6\uff09\u2026' : '\u6b63\u5728\u63a5\u6536\u6570\u636e\u2026'); } catch (_e) { /* ignore */ }
        if (mode === 'fsa') {
          return streamToFile(resp, filename, ui).then(function () {
            return { filename: filename, bytes: null, mode: 'fsa' };
          }).catch(function (err) {
            if (err && err.name === 'AbortError') throw err;              // \u7528\u6237\u81ea\u5df1\u53d6\u6d88\u4e86\u9009\u6587\u4ef6
            if (state.cancelling) throw err;
            // FSA \u88ab\u6d4f\u89c8\u5668\u62d2\u7edd / \u51fa\u9519 \u2192 \u81ea\u52a8\u964d\u7ea7\u5206\u5377\uff08\u91cd\u65b0\u53d1\u4e00\u6b21\u8bf7\u6c42\uff09
            notify('\u6d41\u5f0f\u5199\u76d8\u4e0d\u53ef\u7528\uff08' + (err && err.message || err) + '\uff09\uff0c\u81ea\u52a8\u6539\u6210\u5206\u5377\u4e0b\u8f7d', 'warn');
            ui.setStatus('\u6539\u7528\u5206\u5377\u4e0b\u8f7d\u2026');
            try { state.controller.abort(); } catch (_e) { /* ignore */ }
            state.controller = new AbortController();
            return requestBackup(state.controller.signal).then(function (r2) {
              var fn2 = parseFilename(r2.headers.get('content-disposition'));
              return chunkedDownload(r2, fn2, ui).then(function (total) {
                return { filename: fn2, bytes: total, mode: 'chunk' };
              });
            });
          });
        }
        return chunkedDownload(resp, filename, ui).then(function (total) {
          return { filename: filename, bytes: total, mode: 'chunk' };
        });
      })
      .then(function (res) {
        if (state.cancelling) { ui.close(); notify('\u5df2\u53d6\u6d88\u5907\u4efd'); state.busy = false; return; }
        if (res.mode === 'fsa') {
          ui.finish('\u5df2\u4fdd\u5b58\uff1a' + res.filename + '\uff08\u7531\u7cfb\u7edf\u4e0b\u8f7d/\u6587\u4ef6\u9009\u62e9\u5668\u5199\u5165\uff09');
          notify('\u5907\u4efd\u5b8c\u6210\uff1a' + res.filename);
        } else {
          ui.finish('\u5206\u5377\u5df2\u5168\u90e8\u4fdd\u5b58\uff0c\u5171 ' + fmtBytes(res.bytes) + '\uff08\u8bb0\u5f97\u4fdd\u7559 .\u8bf4\u660e.txt\uff09');
          notify('\u5206\u5377\u4e0b\u8f7d\u5b8c\u6210\uff0c\u5171 ' + fmtBytes(res.bytes));
        }
        state.busy = false;
      })
      .catch(function (err) {
        state.busy = false;
        if (state.cancelling || (err && err.name === 'AbortError')) {
          ui.fail('\u5df2\u53d6\u6d88\uff08\u670d\u52a1\u7aef\u53ef\u80fd\u4ecd\u5728\u6253\u5305\uff0c\u7a0d\u540e\u4f1a\u81ea\u52a8\u7ed3\u675f\uff09');
          return;
        }
        console.error('[YzmBackupHelper] \u5907\u4efd\u5931\u8d25', err);
        ui.fail(String((err && err.message) || err));
        notify('\u5907\u4efd\u5931\u8d25\uff1a' + ((err && err.message) || err), 'error');
      });
  }
  // ==========================================================================
  // \u8bbe\u7f6e / \u5408\u5e76 \u9762\u677f
  // ==========================================================================
  function openPanel() {
    refreshDoc();
    try { PAGE_DOC.querySelectorAll('.yzb-overlay').forEach(function (n) {
      if (!n.classList.contains('yzb-progress')) n.remove();
    }); } catch (_e) { /* ignore */ }

    var overlay = el('div', { class: 'yzb-overlay' });
    var card = el('div', { class: 'yzb-card' });
    var body = el('div', { class: 'yzb-body' });

    function close() { try { overlay.remove(); } catch (_e) { /* ignore */ } }
    var onKey = function (e) { if (e && e.key === 'Escape') close(); };
    try { PAGE_DOC.addEventListener('keydown', onKey); } catch (_e) { /* ignore */ }

    var fsaOK = fsaSupported();

    var chip = function (text, on, onclick) {
      return el('span', { class: 'yzb-chip' + (on ? ' on' : ''), text: text, onclick: onclick });
    };
    var row = function (label, chips) {
      return el('div', { class: 'yzb-row' }, [
        el('span', { class: 'yzb-label', text: label }),
        el('div', { class: 'yzb-chips' }, chips),
      ]);
    };
    var hint = function (t) { return el('div', { class: 'yzb-hint', text: t }); };

    function render() {
      body.innerHTML = '';
      body.appendChild(hint(fsaOK
        ? '\u2705 \u672c\u6d4f\u89c8\u5668\u652f\u6301\u300c\u6d41\u5f0f\u5199\u76d8\u300d\uff1a\u5907\u4efd\u4f1a\u8fb9\u6536\u8fb9\u5199\u8fdb\u4f60\u9009\u7684\u6587\u4ef6\uff0c\u5185\u5b58\u5360\u7528\u6052\u5b9a\uff0c\u9002\u5408\u5927\u6587\u4ef6\u3002'
        : '\u26a0\ufe0f \u672c\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u300c\u6d41\u5f0f\u5199\u76d8\u300d\uff08iOS Safari \u4e0e\u8001\u7248\u672c\u5b89\u5353\u5e38\u89c1\uff09\uff1a\u5c06\u4f7f\u7528\u300c\u5206\u5377\u4e0b\u8f7d\u300d\uff0c\u6bcf\u5377\u5355\u72ec\u4fdd\u5b58\uff0c\u9700\u8981\u4e8b\u540e\u5408\u5e76\u3002'));

      body.appendChild(row('\u4e0b\u8f7d\u65b9\u5f0f', [
        chip('\u81ea\u52a8\uff08\u63a8\u8350\uff09', modeSetting() === 'auto', function () { lsSet(LS.mode, 'auto'); render(); }),
        chip('\u6d41\u5f0f\u5199\u76d8', modeSetting() === 'fsa', function () { lsSet(LS.mode, 'fsa'); render(); }),
        chip('\u5206\u5377\u4e0b\u8f7d', modeSetting() === 'chunk', function () { lsSet(LS.mode, 'chunk'); render(); }),
      ]));

      if (modeSetting() !== 'fsa') {
        body.appendChild(row('\u5206\u5377\u5927\u5c0f', [20, 50, 100].map(function (n) {
          return chip(n + ' MB', chunkMB() === n, function () { lsSet(LS.chunk, String(n)); render(); });
        })));
        body.appendChild(hint('\u5206\u5377\u4e0b\u8f7d\u4f1a\u5728\u6bcf\u4e2a\u5206\u5377\u4e4b\u95f4\u7559 1.1 \u79d2\uff0c\u907f\u514d\u6d4f\u89c8\u5668\u628a\u8fde\u7eed\u4e0b\u8f7d\u62e6\u6389\u3002\u82e5\u6ca1\u5f39\u4fdd\u5b58\u6846\uff0c\u8bf7\u770b\u6d4f\u89c8\u5668\u5730\u5740\u680f\u53f3\u4fa7\u7684\u300c\u5df2\u62e6\u622a\u4e0b\u8f7d\u300d\u3002'));
      }

      var handleInput = el('input', { class: 'yzb-input', type: 'text', value: lsGet(LS.handle, 'default-user') });
      handleInput.addEventListener('change', function () { lsSet(LS.handle, String(handleInput.value || 'default-user').trim()); });
      body.appendChild(el('div', { class: 'yzb-row' }, [
        el('span', { class: 'yzb-label', text: '\u8d26\u53f7' }),
        handleInput,
      ]));
      body.appendChild(hint('\u5355\u8d26\u6237\u9152\u9986\u4fdd\u6301 default-user \u5373\u53ef\uff1b\u5f00\u4e86\u591a\u8d26\u6237\u65f6\u586b\u4f60\u8981\u5907\u4efd\u7684\u90a3\u4e2a\u7528\u6237\u540d\u3002'));

      body.appendChild(el('div', { class: 'yzb-footer' }, [
        el('button', { class: 'yzb-btn', text: '\u5408\u5e76\u5206\u5377', onclick: function () { close(); openMerge(); } }),
        el('button', {
          class: 'yzb-btn primary', text: '\u5f00\u59cb\u5907\u4efd',
          onclick: function () { close(); runBackup(); },
        }),
      ]));
    }

    card.appendChild(el('div', { class: 'yzb-head' }, [
      el('span', { class: 'yzb-title', text: '\u5907\u4efd\u52a9\u624b' }),
      el('button', { class: 'yzb-close', html: '&times;', onclick: close }),
    ]));
    card.appendChild(body);
    overlay.appendChild(card);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    PAGE_DOC.body.appendChild(overlay);
    render();
  }

  // \u5408\u5e76\u5206\u5377\uff1a\u6309\u987a\u5e8f\u8bfb\u53d6 part \u6587\u4ef6\uff0c\u8fb9\u8bfb\u8fb9\u5199 \u2192 \u5408\u6210\u4e00\u4e2a zip\uff08\u5185\u5b58\u5360\u7528\u5f88\u4f4e\uff09
  function openMerge() {
    refreshDoc();
    var overlay = el('div', { class: 'yzb-overlay' });
    var card = el('div', { class: 'yzb-card' });
    var fileInput = el('input', { type: 'file', multiple: 'multiple', class: 'yzb-input' });
    var status = el('div', { class: 'yzb-sub', text: '\u6309\u987a\u5e8f\u9009\u4e2d\u6240\u6709 .partXX \u6587\u4ef6\uff08\u53ef\u591a\u9009\uff09' });
    var btn = el('button', {
      class: 'yzb-btn primary', text: '\u5f00\u59cb\u5408\u5e76',
      onclick: function () { doMerge(); },
    });
    var bar = el('div', { class: 'yzb-bar' }, [el('div', { class: 'yzb-bar-inner' })]);

    function close() { try { overlay.remove(); } catch (_e) { /* ignore */ } }

    async function doMerge() {
      var files = Array.prototype.slice.call(fileInput.files || []);
      if (!files.length) { status.textContent = '\u8bf7\u5148\u9009\u62e9\u5206\u5377\u6587\u4ef6'; return; }
      files.sort(function (a, b) { return a.name.localeCompare(b.name); });
      if (!fsaSupported()) {
        status.textContent = '\u672c\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u6d41\u5f0f\u5199\u76d8\uff0c\u65e0\u6cd5\u5728\u624b\u673a\u4e0a\u5408\u5e76\u3002\u8bf7\u5728\u7535\u8111\u4e0a\uff1acat \u5907\u4efd.part* > \u5907\u4efd.zip';
        return;
      }
      var total = files.reduce(function (s, f) { return s + f.size; }, 0);
      var done = 0;
      try {
        var handle = await PAGE_WIN.showSaveFilePicker({
          suggestedName: (files[0].name.split('.part')[0] || 'merged') + '.zip',
          types: [{ description: 'ZIP \u538b\u7f29\u5305', accept: { 'application/zip': ['.zip'] } }],
        });
        var w = await handle.createWritable();
        for (var i = 0; i < files.length; i++) {
          var f = files[i];
          var off = 0;
          var step = 4 * 1024 * 1024;
          while (off < f.size) {
            var slice = f.slice(off, Math.min(off + step, f.size));
            var buf = await slice.arrayBuffer();
            await w.write(new Uint8Array(buf));
            off += buf.byteLength;
            done += buf.byteLength;
            status.textContent = '\u5408\u5e76\u4e2d\u2026 ' + (i + 1) + '/' + files.length + ' \u00b7 ' + fmtBytes(done) + ' / ' + fmtBytes(total);
            bar.querySelector('.yzb-bar-inner').style.width = Math.round(done / total * 100) + '%';
            bar.classList.add('determinate');
          }
        }
        await w.close();
        status.textContent = '\u5408\u5e76\u5b8c\u6210 \u2705 \u5171 ' + fmtBytes(total) + '\uff0c\u6587\u4ef6\u5df2\u4fdd\u5b58\u4e3a zip';
      } catch (err) {
        if (err && err.name === 'AbortError') { status.textContent = '\u5df2\u53d6\u6d88\uff08\u672a\u9009\u62e9\u4fdd\u5b58\u4f4d\u7f6e\uff09'; return; }
        status.textContent = '\u5408\u5e76\u5931\u8d25\uff1a' + ((err && err.message) || err);
      }
    }

    card.appendChild(el('div', { class: 'yzb-head' }, [
      el('span', { class: 'yzb-title', text: '\u5408\u5e76\u5206\u5377' }),
      el('button', { class: 'yzb-close', html: '&times;', onclick: close }),
    ]));
    card.appendChild(el('div', { class: 'yzb-body' }, [
      el('div', { class: 'yzb-hint', text: '\u628a\u5206\u5377\u4e0b\u8f7d\u5f97\u5230\u7684 .part01 / .part02 \u2026 \u5168\u90e8\u9009\u4e2d\uff0c\u6309\u6587\u4ef6\u540d\u987a\u5e8f\u62fc\u56de\u4e00\u4e2a\u5b8c\u6574 zip\u3002' }),
      fileInput,
      status,
      bar,
      el('div', { class: 'yzb-footer' }, [btn]),
    ]));
    overlay.appendChild(card);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    PAGE_DOC.body.appendChild(overlay);
  }

  // ==========================================================================
  // \u63a5\u7ba1 ST \u7684\u300c\u4e0b\u8f7d\u5907\u4efd\u300d\u6309\u94ae + \u5728\u6211\u4eec\u81ea\u5df1\u7684\u5165\u53e3\u91cc\u4e5f\u80fd\u6253\u5f00
  // ==========================================================================
  function hookStBackupButton() {
    try {
      PAGE_DOC.addEventListener('click', function (e) {
        var t = e.target;
        var hit = t && t.closest ? t.closest('.userBackupButton') : null;
        if (!hit) return;
        // \u62e6\u4f4f ST \u539f\u751f\u5b9e\u73b0\uff08\u5b83\u4f1a fetch \u2192 blob \u2192 a.click()\uff0c\u5927\u6587\u4ef6\u5728\u624b\u673a\u4e0a\u5fc5\u70b8\uff09
        e.preventDefault();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        e.stopPropagation();
        runBackup();
      }, true);
    } catch (_e) { /* ignore */ }
  }

  function injectHelperButton() {
    try {
      refreshDoc();
      var orig = PAGE_DOC.querySelector('.userBackupButton');
      if (!orig || PAGE_DOC.querySelector('.yzb-open')) return;
      var btn = el('div', {
        class: 'menu_button menu_button_icon yzb-open',
        title: '\u5907\u4efd\u52a9\u624b\uff1a\u6d41\u5f0f\u5199\u76d8 / \u5206\u5377\u4e0b\u8f7d / \u8fdb\u5ea6\u663e\u793a / \u5206\u5377\u5408\u5e76',
        onclick: function () { openPanel(); },
      }, [
        el('i', { class: 'fa-fw fa-solid fa-cloud-arrow-down' }),
        el('span', { text: '\u5907\u4efd\u52a9\u624b' }),
      ]);
      orig.parentNode.insertBefore(btn, orig.nextSibling);
    } catch (_e) { /* ignore */ }
  }

  function watchForProfilePanel() {
    try {
      injectHelperButton();
      var obs = new PAGE_WIN.MutationObserver(function () {
        if (!PAGE_DOC.querySelector('.yzb-open')) injectHelperButton();
      });
      obs.observe(PAGE_DOC.body, { childList: true, subtree: true });
    } catch (_e) { /* ignore */ }
  }

  // ==========================================================================
  // \u542f\u52a8
  // ==========================================================================
  function boot() {
    refreshDoc();
    injectCss();
    hookStBackupButton();
    watchForProfilePanel();
    console.log('[YzmBackupHelper] \u5907\u4efd\u52a9\u624b\u5df2\u52a0\u8f7d\uff08' + (fsaSupported() ? '\u652f\u6301\u6d41\u5f0f\u5199\u76d8' : '\u5c06\u4f7f\u7528\u5206\u5377\u4e0b\u8f7d') + '\uff09');
    try { window.YzmBackupHelper.api = { open: openPanel, run: runBackup, merge: openMerge }; } catch (_e) { /* ignore */ }
  }

  if (PAGE_DOC && PAGE_DOC.readyState === 'loading') {
    PAGE_DOC.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  // ST \u662f\u5355\u9875\u5e94\u7528\uff1a\u5207\u6362\u9875\u9762\u65f6\u4e5f\u53ef\u80fd\u91cd\u65b0\u6e32\u67d3\uff0c\u515c\u5e95\u518d\u63d2\u4e00\u6b21
  setTimeout(injectHelperButton, 2500);
  setTimeout(injectHelperButton, 8000);
  document.addEventListener('DOMContentLoaded', function () { setTimeout(boot, 800); });
})();
