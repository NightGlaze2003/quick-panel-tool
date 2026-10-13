// ============================================================================
// \u8bb0\u5fc6\u5feb\u6377\u9762\u677f \u2014 \u9152\u9986\u52a9\u624b\u811a\u672c\u7248 v1.7
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
    const CSS = "/* ==========================================================================\n   yzm-quick-panel / panel.css\n   \u60ac\u6d6e\u7403 + \u9762\u677f\u6837\u5f0f\u3002\n\n   \u914d\u8272\u3010\u5b8c\u5168\u7531\u63d2\u4ef6\u81ea\u5df1\u638c\u7ba1\u3011\uff0c\u4e0d\u8ddf\u968f\u9152\u9986\u4e3b\u9898 \u2014\u2014\n   \u539f\u56e0\uff1a\u9152\u9986\u6ca1\u6709\u300c\u767d\u5929/\u9ed1\u591c\u300d\u5f00\u5173\uff0c\u5b83\u7684\u4e3b\u9898\u662f\u4e00\u6574\u5957 JSON \u6587\u4ef6\uff0c\n   \u4e14\u6ca1\u6709\u5b57\u6bb5\u6807\u660e\u660e\u6697\uff08\u53ea\u80fd\u9760\u989c\u8272\u672c\u8eab\u4f53\u73b0\uff09\uff0c\u8ddf\u968f\u5bb9\u6613\u51fa\u82b1\u8138\u3002\n   ========================================================================== */\n\n/* ---------- \u914d\u8272\uff08\u4e3b\u9898\u53d8\u91cf\uff09 ----------\n   \u5207\u6362\u65b9\u5f0f\uff1a\u7ed9 <body> \u52a0 data-yqm-theme=\"<id>\"\uff1b\u6ca1\u6709\u8be5\u5c5e\u6027 = \u9ed8\u8ba4\u914d\u8272\u3002\n   \u65b0\u589e\u4e00\u5957\u914d\u8272\uff1a\u7167\u6284\u4e0b\u9762\u4efb\u610f\u4e00\u6bb5\uff0c\u6539 id \u4e0e\u989c\u8272\u5373\u53ef\uff0c\u5176\u5b83\u4ee3\u7801\u4e0d\u7528\u52a8\u3002 */\n:root,\nbody[data-yqm-theme=\"youyue\"] {\n  /* \u67da\u6708 \u00b7 \u6708\u5149\u767d\uff08\u9ed8\u8ba4\uff09\uff1a\u591c\u8272\u7d2b\u6253\u5e95\uff0c\u6708\u767d\u505a\u300c\u4eae\u8d77\u6765\u300d\u7684\u989c\u8272 */\n  --yqm-bg: rgba(30, 27, 46, 0.97);                /* \u9762\u677f\u5e95\u8272 */\n  --yqm-bg-soft: rgba(48, 43, 70, 0.9);            /* \u8f93\u5165\u6846 / \u6309\u94ae\u5e95\u8272 */\n  --yqm-border: rgba(167, 139, 250, 0.28);         /* \u4e3b\u8fb9\u6846 */\n  --yqm-border-soft: rgba(167, 139, 250, 0.12);    /* \u5206\u9694\u7ebf / \u6de1\u80cc\u666f */\n  --yqm-hover: rgba(196, 167, 255, 0.1);           /* \u60ac\u505c\u5e95\u8272 */\n  --yqm-text: #ece9f5;                             /* \u6b63\u6587 */\n  --yqm-text-dim: #9a93b8;                         /* \u6b21\u8981\u6587\u5b57 */\n  --yqm-accent: #c4a7ff;                           /* \u4e3b\u8272 */\n  --yqm-accent-2: #8a63f0;                         /* \u4e3b\u8272\u6e10\u53d8\u6df1\u7aef */\n  --yqm-accent-soft: rgba(196, 167, 255, 0.18);    /* \u9009\u4e2d\u5e95\u8272 */\n  --yqm-accent-soft-2: rgba(196, 167, 255, 0.32);  /* \u9009\u4e2d\u8fb9\u6846 / \u6eda\u52a8\u6761 */\n  --yqm-accent-glow: rgba(140, 100, 240, 0.45);    /* \u60ac\u6d6e\u7403\u5149\u6655 */\n  --yqm-on: #eef2ff;                               /* \u300c\u5df2\u663e\u793a\u300d\uff08\u6708\u5149\u767d\uff09 */\n  --yqm-on-soft: rgba(238, 242, 255, 0.16);\n  --yqm-off: #7a7390;                              /* \u300c\u5df2\u9690\u85cf\u300d */\n  --yqm-off-soft: rgba(122, 115, 144, 0.25);\n  --yqm-warn: #ff8b8b;                             /* \u5220\u9664 / \u8b66\u544a */\n  --yqm-warn-soft: rgba(255, 139, 139, 0.4);\n  --yqm-btn-label: #1e1733;                        /* \u4eae\u7d2b\u5e95\u4e0a\u5fc5\u987b\u7528\u6df1\u8272\u5b57 */\n}\n\n/* \u67da\u6708 \u00b7 \u871c\u6843\u7c89\uff1a\u4e3b\u8c03\u540c\u300c\u6708\u5149\u767d\u300d\uff0c\u53ea\u662f\u7d2b\u5f80\u7c89\u7d2b\u504f\u4e00\u70b9\uff0c\n   \u300c\u4eae\u8d77\u6765\u300d\u7684\u989c\u8272\u7531\u6708\u767d\u6362\u6210\u871c\u6843\u7c89 */\nbody[data-yqm-theme=\"youyue-pink\"] {\n  --yqm-bg: rgba(36, 26, 44, 0.97);\n  --yqm-bg-soft: rgba(56, 40, 66, 0.9);\n  --yqm-border: rgba(233, 167, 216, 0.3);\n  --yqm-border-soft: rgba(233, 167, 216, 0.13);\n  --yqm-hover: rgba(233, 167, 216, 0.1);\n  --yqm-text: #f3e9f2;\n  --yqm-text-dim: #ab93ab;\n  --yqm-accent: #e0a9ec;\n  --yqm-accent-2: #b56fd8;\n  --yqm-accent-soft: rgba(224, 169, 236, 0.2);\n  --yqm-accent-soft-2: rgba(224, 169, 236, 0.34);\n  --yqm-accent-glow: rgba(178, 100, 210, 0.45);\n  --yqm-on: #ff9fbe;\n  --yqm-on-soft: rgba(255, 159, 190, 0.18);\n  --yqm-off: #8b7a8d;\n  --yqm-off-soft: rgba(139, 122, 141, 0.25);\n  --yqm-warn: #ff8b8b;\n  --yqm-warn-soft: rgba(255, 139, 139, 0.4);\n  --yqm-btn-label: #2a1730;                        /* \u4eae\u7c89\u7d2b\u5e95\u540c\u7406 */\n}\n\n/* \u591c\u84dd\uff1av1.1 \u53ca\u4ee5\u524d\u7684\u9ed8\u8ba4\u89c2\u611f\uff0c\u4fdd\u7559\u4e0b\u6765\u968f\u65f6\u80fd\u5207\u56de\u53bb */\nbody[data-yqm-theme=\"night\"] {\n  --yqm-bg: rgba(24, 27, 42, 0.97);\n  --yqm-bg-soft: rgba(38, 42, 62, 0.9);\n  --yqm-border: rgba(124, 156, 255, 0.28);\n  --yqm-border-soft: rgba(124, 156, 255, 0.12);\n  --yqm-hover: rgba(124, 156, 255, 0.1);\n  --yqm-text: #e8ebf5;\n  --yqm-text-dim: #9aa3bd;\n  --yqm-accent: #7c9cff;\n  --yqm-accent-2: #5b7cfa;\n  --yqm-accent-soft: rgba(124, 156, 255, 0.18);\n  --yqm-accent-soft-2: rgba(124, 156, 255, 0.32);\n  --yqm-accent-glow: rgba(80, 110, 220, 0.45);\n  --yqm-on: #3ecf8e;\n  --yqm-on-soft: rgba(62, 207, 142, 0.18);\n  --yqm-off: #6b7390;\n  --yqm-off-soft: rgba(107, 115, 144, 0.22);\n  --yqm-warn: #ff6b6b;\n  --yqm-warn-soft: rgba(255, 107, 107, 0.45);\n  --yqm-btn-label: #0d1330;                        /* \u4eae\u84dd\u5e95\u540c\u7406 */\n}\n\n/* \u9ed1\u91d1 \u00b7 \u9999\u69df\uff1a\u6696\u9999\u69df\u91d1\uff0c\u964d\u4e86\u9971\u548c\u504f\u6c89\uff0c\u5927\u9762\u79ef\u4ecd\u662f\u9ed1 \u2014\u2014 \u65e5\u5e38\u4e3b\u529b */\nbody[data-yqm-theme=\"gold-champagne\"] {\n  --yqm-bg: rgba(23, 22, 26, 0.97);\n  --yqm-bg-soft: rgba(38, 36, 42, 0.9);\n  --yqm-border: rgba(212, 175, 106, 0.3);\n  --yqm-border-soft: rgba(212, 175, 106, 0.13);\n  --yqm-hover: rgba(212, 175, 106, 0.1);\n  --yqm-text: #ece7dd;\n  --yqm-text-dim: #9b958a;\n  --yqm-accent: #d4af6a;\n  --yqm-accent-2: #a8802f;\n  --yqm-accent-soft: rgba(212, 175, 106, 0.2);\n  --yqm-accent-soft-2: rgba(212, 175, 106, 0.34);\n  --yqm-accent-glow: rgba(180, 140, 60, 0.45);\n  --yqm-on: #f2dfae;\n  --yqm-on-soft: rgba(242, 223, 174, 0.16);\n  --yqm-off: #6e6862;\n  --yqm-off-soft: rgba(110, 104, 98, 0.25);\n  --yqm-warn: #e08a72;\n  --yqm-warn-soft: rgba(224, 138, 114, 0.4);\n  --yqm-btn-label: #241d0c;   /* \u4eae\u91d1\u5e95\u4e0a\u5fc5\u987b\u7528\u6df1\u8272\u5b57\uff0c\u5426\u5219\u7cca\u6210\u4e00\u7247 */\n}\n\n/* \u9ed1\u91d1 \u00b7 \u938f\u91d1\uff1a\u4eae\u91d1\u9ad8\u9971\u548c\uff0c\u4e00\u773c\u5c31\"\u8d35\"\uff0c\u9002\u5408\u5076\u5c14\u534e\u4e3d\u4e00\u4e0b */\nbody[data-yqm-theme=\"gold-bright\"] {\n  --yqm-bg: rgba(20, 19, 16, 0.97);\n  --yqm-bg-soft: rgba(42, 38, 24, 0.9);\n  --yqm-border: rgba(255, 205, 60, 0.32);\n  --yqm-border-soft: rgba(255, 205, 60, 0.13);\n  --yqm-hover: rgba(255, 205, 60, 0.1);\n  --yqm-text: #f5efe0;\n  --yqm-text-dim: #a89d80;\n  --yqm-accent: #f5c542;\n  --yqm-accent-2: #d99f1a;\n  --yqm-accent-soft: rgba(255, 205, 60, 0.2);\n  --yqm-accent-soft-2: rgba(255, 205, 60, 0.32);\n  --yqm-accent-glow: rgba(230, 175, 30, 0.5);\n  --yqm-on: #ffd95e;\n  --yqm-on-soft: rgba(255, 217, 94, 0.16);\n  --yqm-off: #756b52;\n  --yqm-off-soft: rgba(117, 107, 82, 0.25);\n  --yqm-warn: #e08a72;\n  --yqm-warn-soft: rgba(224, 138, 114, 0.4);\n  --yqm-btn-label: #241c00;\n}\n\n/* \u9ed1\u94f6\uff1a\u8ddf\u9ed1\u91d1\u540c\u4e00\u4e2a\u67b6\u5b50\uff0c\u628a\u91d1\u6362\u6210\u94f6\u7070 \u2014\u2014 \u51b7\u9759\u3001\u673a\u68b0 */\nbody[data-yqm-theme=\"silver\"] {\n  --yqm-bg: rgba(22, 23, 26, 0.97);\n  --yqm-bg-soft: rgba(36, 38, 43, 0.9);\n  --yqm-border: rgba(190, 198, 210, 0.28);\n  --yqm-border-soft: rgba(190, 198, 210, 0.12);\n  --yqm-hover: rgba(190, 198, 210, 0.1);\n  --yqm-text: #e9ecf2;\n  --yqm-text-dim: #969ba6;\n  --yqm-accent: #c3cad6;\n  --yqm-accent-2: #8e97a6;\n  --yqm-accent-soft: rgba(190, 198, 210, 0.18);\n  --yqm-accent-soft-2: rgba(190, 198, 210, 0.3);\n  --yqm-accent-glow: rgba(150, 165, 185, 0.4);\n  --yqm-on: #eef3fc;\n  --yqm-on-soft: rgba(238, 243, 252, 0.16);\n  --yqm-off: #6c7079;\n  --yqm-off-soft: rgba(108, 112, 121, 0.25);\n  --yqm-warn: #e08a72;\n  --yqm-warn-soft: rgba(224, 138, 114, 0.4);\n  --yqm-btn-label: #1b1d21;\n}\n\n/* \u77f3\u58a8\u7070\uff1a\u4e2d\u6df1\u7070\u5e95\uff08\u4e0d\u662f\u7eaf\u9ed1\uff09\uff0c\u767d\u8272\u53ea\u7528\u6765\u70b9\u4eae \u2014\u2014 \u6bd4\u9ed1\u94f6\u67d4\u548c */\nbody[data-yqm-theme=\"graphite\"] {\n  --yqm-bg: rgba(52, 55, 61, 0.97);\n  --yqm-bg-soft: rgba(65, 69, 76, 0.9);\n  --yqm-border: rgba(255, 255, 255, 0.16);\n  --yqm-border-soft: rgba(255, 255, 255, 0.08);\n  --yqm-hover: rgba(255, 255, 255, 0.08);\n  --yqm-text: #e9ecf1;\n  --yqm-text-dim: #9ca2ad;\n  --yqm-accent: #d6dae1;\n  --yqm-accent-2: #aab0ba;\n  --yqm-accent-soft: rgba(214, 218, 225, 0.18);\n  --yqm-accent-soft-2: rgba(214, 218, 225, 0.3);\n  --yqm-accent-glow: rgba(160, 170, 185, 0.4);\n  --yqm-on: #ffffff;\n  --yqm-on-soft: rgba(255, 255, 255, 0.16);\n  --yqm-off: #787f8a;\n  --yqm-off-soft: rgba(120, 127, 138, 0.25);\n  --yqm-warn: #e8907c;\n  --yqm-warn-soft: rgba(232, 144, 124, 0.4);\n  --yqm-btn-label: #2a2d32;\n}\n\n/* \u96fe\u767d\uff1a\u552f\u4e00\u7684\u4eae\u8272\u4e3b\u9898\u3002\u6d45\u7070\u5e95 + \u7eaf\u767d\u90e8\u4ef6\uff0c\u767d\u5929/\u5f3a\u5149\u4e0b\u770b\u7740\u4e0d\u7d2f */\nbody[data-yqm-theme=\"mist\"] {\n  --yqm-bg: rgba(241, 242, 245, 0.995);\n  --yqm-bg-soft: #ffffff;\n  --yqm-border: #e4e7ed;\n  --yqm-border-soft: #eceef3;\n  --yqm-hover: rgba(40, 50, 70, 0.06);\n  --yqm-text: #23262c;\n  --yqm-text-dim: #6b7280;\n  --yqm-accent: #b3bcc7;\n  --yqm-accent-2: #8d97a4;\n  --yqm-accent-soft: rgba(179, 188, 199, 0.2);\n  --yqm-accent-soft-2: rgba(179, 188, 199, 0.35);\n  --yqm-accent-glow: rgba(179, 188, 199, 0.35);\n  --yqm-on: #808c9b;\n  --yqm-on-soft: rgba(164, 174, 185, 0.18);\n  --yqm-off: #b8bdc4;\n  --yqm-off-soft: rgba(184, 189, 196, 0.25);\n  --yqm-warn: #c0392b;\n  --yqm-warn-soft: rgba(192, 57, 43, 0.3);\n  --yqm-btn-label: #2e343e;                        /* \u6d45\u7070\u84dd\u6309\u94ae\u914d\u6df1\u5b57 */\n}\n\n/* \u5976\u9ec4\u6708\u767d\uff1a\u53ea\u7528\u4e24\u4e2a\u989c\u8272 \u2014\u2014 \u6708\u767d #fbfaf7 + \u5ae9\u9ec4 #ffe98f\uff0c\u5176\u4f59\u7686\u4e3a\u540c\u8272\u6df1\u6d45 */\nbody[data-yqm-theme=\"cream\"] {\n  --yqm-bg: rgba(251, 250, 247, 0.995);\n  --yqm-bg-soft: #ffffff;\n  --yqm-border: #e8e6df;\n  --yqm-border-soft: #f0eee7;\n  --yqm-hover: rgba(120, 110, 70, 0.05);\n  --yqm-text: #3a352a;\n  --yqm-text-dim: #8a8270;\n  --yqm-accent: #ffe98f;                            /* \u5ae9\u9ec4 */\n  --yqm-accent-2: #f0d155;                          /* \u5ae9\u9ec4\u52a0\u6df1\uff08\u540c\u8272\u76f8\uff09 */\n  --yqm-accent-soft: rgba(255, 233, 143, 0.3);\n  --yqm-accent-soft-2: rgba(255, 233, 143, 0.5);\n  --yqm-accent-glow: rgba(255, 233, 143, 0.45);\n  --yqm-on: #f0d155;\n  --yqm-on-soft: rgba(240, 209, 85, 0.25);\n  --yqm-off: #ded9c8;\n  --yqm-off-soft: rgba(222, 217, 200, 0.3);\n  --yqm-warn: #c0392b;\n  --yqm-warn-soft: rgba(192, 57, 43, 0.3);\n  --yqm-btn-label: #4a4020;                         /* \u5ae9\u9ec4\u6309\u94ae\u914d\u6df1\u5b57 */\n}\n/* \u5976\u9ec4\u6708\u767d\u4e13\u5c5e\uff1a\u5ae9\u9ec4\u5728\u6708\u767d\u5e95\u4e0a\u5bf9\u6bd4\u5ea6\u5929\u7136\u504f\u4f4e\uff08\u5ae9\u9ec4\u65e0\u6cd5\u540c\u65f6\u9ad8\u5bf9\u6bd4\uff09\uff0c\n   \u6539\u7528\u300c\u52a0\u5927\u5706\u70b9\u300d\u4fdd\u8bc1\u53ef\u89c1\u6027\u2014\u2014\u4e0d\u5f15\u5165\u7b2c\u4e09\u8272 */\nbody[data-yqm-theme=\"cream\"] .yqm-dot {\n  width: 9px;\n  height: 9px;\n}\n\n/* \u6d45\u84dd\u767d\uff1a\u67d4\u548c\u7684\u4eae\u8272\u84dd\uff0c\u50cf\u6674\u5929\u7684\u7a7a\u6c14\u3002\u8ddf\u96fe\u767d\u540c\u65cf\u4f46\u66f4\"\u84dd\" */\nbody[data-yqm-theme=\"blue-mist\"] {\n  --yqm-bg: rgba(238, 244, 250, 0.995);\n  --yqm-bg-soft: #ffffff;\n  --yqm-border: rgba(70, 110, 160, 0.22);\n  --yqm-border-soft: rgba(70, 110, 160, 0.1);\n  --yqm-hover: rgba(70, 110, 160, 0.07);\n  --yqm-text: #25313d;\n  --yqm-text-dim: #5f7286;\n  --yqm-accent: #4e7fb8;\n  --yqm-accent-2: #35608e;\n  --yqm-accent-soft: rgba(78, 127, 184, 0.16);\n  --yqm-accent-soft-2: rgba(78, 127, 184, 0.28);\n  --yqm-accent-glow: rgba(78, 127, 184, 0.35);\n  --yqm-on: #35608e;\n  --yqm-on-soft: rgba(53, 96, 142, 0.15);\n  --yqm-off: #9dabb9;\n  --yqm-off-soft: rgba(157, 171, 185, 0.3);\n  --yqm-warn: #c0553f;\n  --yqm-warn-soft: rgba(192, 85, 63, 0.3);\n  --yqm-btn-label: #ffffff;                        /* \u540c\u4e0a */\n}\n\n/* \u5b54\u96c0\u84dd \u00b7 \u82cd\u9752\uff1a\u504f\u7eff\u7684\u6df1\u9752\u6253\u5e95\uff0c\u82cd\u9752\u505a\u70b9\u4eae \u2014\u2014 \u51b7\u3001\u5e72\u51c0\u3001\u6709\u74f7\u5668\u611f */\nbody[data-yqm-theme=\"peacock\"] {\n  --yqm-bg: rgba(16, 51, 63, 0.97);\n  --yqm-bg-soft: rgba(23, 65, 79, 0.9);\n  --yqm-border: rgba(122, 178, 194, 0.3);\n  --yqm-border-soft: rgba(122, 178, 194, 0.13);\n  --yqm-hover: rgba(122, 178, 194, 0.1);\n  --yqm-text: #e2eef2;\n  --yqm-text-dim: #8faab4;\n  --yqm-accent: #58b5d0;\n  --yqm-accent-2: #3f9ab8;   /* \u4e0e accent \u6536\u5728\u540c\u4e00\u660e\u5ea6\u533a\u95f4\uff0c\u5b57\u8272\u624d\u80fd\u7edf\u4e00 */\n  --yqm-accent-soft: rgba(79, 168, 196, 0.2);\n  --yqm-accent-soft-2: rgba(79, 168, 196, 0.32);\n  --yqm-accent-glow: rgba(60, 150, 180, 0.45);\n  --yqm-on: #9fc9d6;\n  --yqm-on-soft: rgba(159, 201, 214, 0.16);\n  --yqm-off: #647b85;\n  --yqm-off-soft: rgba(100, 123, 133, 0.25);\n  --yqm-warn: #e08a72;\n  --yqm-warn-soft: rgba(224, 138, 114, 0.4);\n  --yqm-btn-label: #06222c;\n}\n\n/* \u666e\u9c81\u58eb\u84dd \u00b7 \u91d1\uff1a\u53c8\u6df1\u53c8\u6c89\u7684\u84dd\u914d\u91d1\uff0c\u7ecf\u5178\u8d35\u65cf\u642d\u6cd5 */\nbody[data-yqm-theme=\"prussian\"] {\n  --yqm-bg: rgba(4, 38, 58, 0.97);\n  --yqm-bg-soft: rgba(11, 53, 80, 0.9);\n  --yqm-border: rgba(212, 175, 106, 0.3);\n  --yqm-border-soft: rgba(212, 175, 106, 0.13);\n  --yqm-hover: rgba(212, 175, 106, 0.1);\n  --yqm-text: #e8eef4;\n  --yqm-text-dim: #8fa3b5;\n  --yqm-accent: #d4af6a;\n  --yqm-accent-2: #a8802f;\n  --yqm-accent-soft: rgba(212, 175, 106, 0.2);\n  --yqm-accent-soft-2: rgba(212, 175, 106, 0.34);\n  --yqm-accent-glow: rgba(180, 140, 60, 0.45);\n  --yqm-on: #f2dfae;\n  --yqm-on-soft: rgba(242, 223, 174, 0.16);\n  --yqm-off: #5f7186;\n  --yqm-off-soft: rgba(95, 113, 134, 0.25);\n  --yqm-warn: #e08a72;\n  --yqm-warn-soft: rgba(224, 138, 114, 0.4);\n  --yqm-btn-label: #16233a;\n}\n\n/* \u6c34\u84dd \u00b7 \u94f6\u767d\uff1a\u6bd4\u5b54\u96c0\u84dd\u66f4\u84dd\u66f4\u4eae\uff0c\u50cf\u70ed\u5e26\u6d77\u7684\u6c34\u8272 */\nbody[data-yqm-theme=\"aqua\"] {\n  --yqm-bg: rgba(13, 40, 54, 0.97);\n  --yqm-bg-soft: rgba(20, 57, 75, 0.9);\n  --yqm-border: rgba(150, 210, 230, 0.3);\n  --yqm-border-soft: rgba(150, 210, 230, 0.13);\n  --yqm-hover: rgba(150, 210, 230, 0.1);\n  --yqm-text: #e6f2f7;\n  --yqm-text-dim: #93aebc;\n  --yqm-accent: #4fc8e8;\n  --yqm-accent-2: #3195b4;   /* \u4e0e accent \u6536\u5728\u540c\u4e00\u660e\u5ea6\u533a\u95f4 */\n  --yqm-accent-soft: rgba(79, 200, 232, 0.2);\n  --yqm-accent-soft-2: rgba(79, 200, 232, 0.32);\n  --yqm-accent-glow: rgba(60, 175, 210, 0.45);\n  --yqm-on: #dceaf2;\n  --yqm-on-soft: rgba(220, 234, 242, 0.16);\n  --yqm-off: #6b8494;\n  --yqm-off-soft: rgba(107, 132, 148, 0.25);\n  --yqm-warn: #e08a72;\n  --yqm-warn-soft: rgba(224, 138, 114, 0.4);\n  --yqm-btn-label: #06222c;\n}\n\n/* \u5ae9\u82bd\u7eff\uff1a\u6d45\u5ae9\u7eff\u5e95 + \u767d\u90e8\u4ef6\uff0c\u6bd4\u96fe\u767d\u591a\u4e00\u5c42\"\u6625\u5929\u7684\u7eff\" */\nbody[data-yqm-theme=\"sprout\"] {\n  --yqm-bg: rgba(237, 245, 236, 0.995);\n  --yqm-bg-soft: #ffffff;\n  --yqm-border: rgba(80, 130, 90, 0.22);\n  --yqm-border-soft: rgba(80, 130, 90, 0.1);\n  --yqm-hover: rgba(80, 130, 90, 0.07);\n  --yqm-text: #26332a;\n  --yqm-text-dim: #5f7266;\n  --yqm-accent: #43884f;\n  --yqm-accent-2: #2f6b3f;\n  --yqm-accent-soft: rgba(67, 136, 79, 0.16);\n  --yqm-accent-soft-2: rgba(67, 136, 79, 0.28);\n  --yqm-accent-glow: rgba(67, 136, 79, 0.35);\n  --yqm-on: #2f6b3f;\n  --yqm-on-soft: rgba(47, 107, 63, 0.15);\n  --yqm-off: #9daf9f;\n  --yqm-off-soft: rgba(157, 175, 159, 0.3);\n  --yqm-warn: #c0553f;\n  --yqm-warn-soft: rgba(192, 85, 63, 0.3);\n  --yqm-btn-label: #ffffff;\n}\n\n/* \u9752\u7fe0\u6b32\u6ef4\uff1a\u6697\u7eff\u6253\u5e95\uff0c\u5ae9\u53f6\u7eff\uff08\u5e26\u9ec4\uff09\u505a\u70b9\u4eae \u2014\u2014 \u7eff\u53ea\u8d1f\u8d23\"\u53d1\u4eae\"\uff0c\u4e0d\u4f1a\u571f */\nbody[data-yqm-theme=\"verdant\"] {\n  --yqm-bg: rgba(15, 42, 28, 0.97);\n  --yqm-bg-soft: rgba(22, 58, 40, 0.9);\n  --yqm-border: rgba(120, 220, 150, 0.28);\n  --yqm-border-soft: rgba(120, 220, 150, 0.12);\n  --yqm-hover: rgba(120, 220, 150, 0.1);\n  --yqm-text: #e4f2e8;\n  --yqm-text-dim: #8fb39c;\n  --yqm-accent: #5fd97f;\n  --yqm-accent-2: #31965a;\n  --yqm-accent-soft: rgba(95, 217, 127, 0.2);\n  --yqm-accent-soft-2: rgba(95, 217, 127, 0.32);\n  --yqm-accent-glow: rgba(70, 190, 105, 0.45);\n  --yqm-on: #a7f3c0;\n  --yqm-on-soft: rgba(167, 243, 192, 0.16);\n  --yqm-off: #5f7d6b;\n  --yqm-off-soft: rgba(95, 125, 107, 0.25);\n  --yqm-warn: #e0a072;\n  --yqm-warn-soft: rgba(224, 160, 114, 0.4);\n  --yqm-btn-label: #05240f;\n}\n\n/* \u96e8\u96fe\u7eff\uff1a\u4e2d\u7070\u7eff\u5e95\uff08\u4e0d\u662f\u6df1\u7eff\uff09\uff0c\u7eff\u91cc\u63ba\u7070 \u2014\u2014 \u6700\u67d4\u548c\u7684\u4e00\u5957 */\nbody[data-yqm-theme=\"moss\"] {\n  --yqm-bg: rgba(42, 54, 48, 0.99);\n  --yqm-bg-soft: rgba(54, 68, 61, 0.93);\n  --yqm-border: rgba(180, 200, 185, 0.2);\n  --yqm-border-soft: rgba(180, 200, 185, 0.1);\n  --yqm-hover: rgba(180, 200, 185, 0.09);\n  --yqm-text: #e6ece7;\n  --yqm-text-dim: #9dab9f;\n  --yqm-accent: #a8c4af;\n  --yqm-accent-2: #869e8d;\n  --yqm-accent-soft: rgba(168, 196, 175, 0.2);\n  --yqm-accent-soft-2: rgba(168, 196, 175, 0.32);\n  --yqm-accent-glow: rgba(140, 170, 150, 0.4);\n  --yqm-on: #dceade;\n  --yqm-on-soft: rgba(220, 234, 222, 0.16);\n  --yqm-off: #79877c;\n  --yqm-off-soft: rgba(121, 135, 124, 0.25);\n  --yqm-warn: #e0927c;\n  --yqm-warn-soft: rgba(224, 146, 124, 0.4);\n  --yqm-btn-label: #1f2a24;\n}\n\n/* \u68ee\u6797\u53e4\u6728\uff1a\u6781\u6df1\u58a8\u7eff\u6253\u5e95\uff0c\u4e3b\u89d2\u662f\"\u8001\u6728\u7684\u8910\"\u800c\u4e0d\u662f\u7eff */\nbody[data-yqm-theme=\"ancient\"] {\n  --yqm-bg: rgba(23, 37, 28, 0.97);\n  --yqm-bg-soft: rgba(34, 52, 40, 0.9);\n  --yqm-border: rgba(190, 160, 110, 0.26);\n  --yqm-border-soft: rgba(190, 160, 110, 0.12);\n  --yqm-hover: rgba(190, 160, 110, 0.1);\n  --yqm-text: #e8e6dc;\n  --yqm-text-dim: #9a9a86;\n  --yqm-accent: #7a5a3c;                            /* \u6811\u76ae\u6df1\u68d5 */\n  --yqm-accent-2: #5a4230;\n  --yqm-accent-soft: rgba(122, 90, 60, 0.28);\n  --yqm-accent-soft-2: rgba(122, 90, 60, 0.42);\n  --yqm-accent-glow: rgba(122, 90, 60, 0.5);\n  --yqm-on: #a8825a;\n  --yqm-on-soft: rgba(168, 130, 90, 0.18);\n  --yqm-off: #6a7263;\n  --yqm-off-soft: rgba(106, 114, 99, 0.25);\n  --yqm-warn: #d98a70;\n  --yqm-warn-soft: rgba(217, 138, 112, 0.4);\n  --yqm-btn-label: #f2e8d5;                         /* \u6811\u76ae\u6df1\u68d5\u6309\u94ae\u914d\u6d45\u5b57 */\n}\n\n/* \u9152\u7ea2 \u00b7 \u91d1\uff1a\u6df1\u9152\u7ea2\u6253\u5e95 + \u91d1\u70b9\u4eae\uff0c\u6bd4\u9ed1\u91d1\u6696\u3001\u6bd4\u666e\u9c81\u58eb\u84dd\u70ed */\nbody[data-yqm-theme=\"crimson-gold\"] {\n  --yqm-bg: rgba(42, 14, 20, 0.97);\n  --yqm-bg-soft: rgba(61, 21, 32, 0.9);\n  --yqm-border: rgba(212, 175, 106, 0.3);\n  --yqm-border-soft: rgba(212, 175, 106, 0.13);\n  --yqm-hover: rgba(212, 175, 106, 0.1);\n  --yqm-text: #f0e4e6;\n  --yqm-text-dim: #a88d93;\n  --yqm-accent: #d4af6a;\n  --yqm-accent-2: #a8802f;\n  --yqm-accent-soft: rgba(212, 175, 106, 0.2);\n  --yqm-accent-soft-2: rgba(212, 175, 106, 0.34);\n  --yqm-accent-glow: rgba(180, 140, 60, 0.45);\n  --yqm-on: #f2dfae;\n  --yqm-on-soft: rgba(242, 223, 174, 0.16);\n  --yqm-off: #7a5c64;\n  --yqm-off-soft: rgba(122, 92, 100, 0.25);\n  --yqm-warn: #e08a72;\n  --yqm-warn-soft: rgba(224, 138, 114, 0.4);\n  --yqm-btn-label: #241d0c;\n}\n\n/* \u52c3\u826e\u7b2c\u7ea2\uff1a\u5e95\u8272\u5c31\u662f\u6807\u51c6\u52c3\u826e\u7b2c\u7ea2\uff08\u4e0d\u518d\u538b\u5230\u8fd1\u9ed1\uff09+ \u4eae\u91d1\u3002\u7ea2\u662f\u4e3b\u89d2 */\nbody[data-yqm-theme=\"crimson-classic\"] {\n  --yqm-bg: rgba(107, 31, 42, 0.995);\n  --yqm-bg-soft: rgba(127, 41, 52, 0.95);\n  --yqm-border: rgba(233, 198, 126, 0.34);\n  --yqm-border-soft: rgba(233, 198, 126, 0.14);\n  --yqm-hover: rgba(233, 198, 126, 0.1);\n  --yqm-text: #f9f0f2;\n  --yqm-text-dim: #d3b0b6;\n  --yqm-accent: #e9c67e;\n  --yqm-accent-2: #c19a45;\n  --yqm-accent-soft: rgba(233, 198, 126, 0.22);\n  --yqm-accent-soft-2: rgba(233, 198, 126, 0.34);\n  --yqm-accent-glow: rgba(200, 160, 80, 0.5);\n  --yqm-on: #f7e8c0;\n  --yqm-on-soft: rgba(247, 232, 192, 0.18);\n  --yqm-off: #b0888f;\n  --yqm-off-soft: rgba(176, 136, 143, 0.3);\n  --yqm-warn: #ffb59a;   /* \u7ea2\u5e95\u4e0a\u4e0d\u80fd\u7528\u7ea2\u505a\u8b66\u544a\uff0c\u5f97\u7528\u6d45\u6a59\u624d\u770b\u5f97\u89c1 */\n  --yqm-warn-soft: rgba(255, 181, 154, 0.35);\n  --yqm-btn-label: #2a1206;\n}\n\n/* \u7ea2\u9ed1\uff1a\u8fd1\u9ed1\u5e95 + \u80ed\u8102\u7ea2\u70b9\u4eae\u3002\u7ea2\u53ea\u51fa\u73b0\u5728\u6309\u94ae\u548c\u5706\u70b9\u4e0a\uff0c\u5229\u843d\u4e0d\u5435 */\nbody[data-yqm-theme=\"crimson-black\"] {\n  --yqm-bg: rgba(26, 13, 17, 0.97);\n  --yqm-bg-soft: rgba(42, 20, 25, 0.9);\n  --yqm-border: rgba(214, 90, 90, 0.28);\n  --yqm-border-soft: rgba(214, 90, 90, 0.12);\n  --yqm-hover: rgba(214, 90, 90, 0.1);\n  --yqm-text: #ece2e4;\n  --yqm-text-dim: #9b8388;\n  --yqm-accent: #c8505a;\n  --yqm-accent-2: #a83a45;   /* \u6536\u7a84\u660e\u5ea6\uff1a\u4e24\u7aef\u90fd\u80fd\u538b\u4f4f\u767d\u5b57 */\n  --yqm-accent-soft: rgba(200, 80, 90, 0.2);\n  --yqm-accent-soft-2: rgba(200, 80, 90, 0.34);\n  --yqm-accent-glow: rgba(180, 60, 70, 0.45);\n  --yqm-on: #f08a92;\n  --yqm-on-soft: rgba(240, 138, 146, 0.16);\n  --yqm-off: #6e5257;\n  --yqm-off-soft: rgba(110, 82, 87, 0.25);\n  --yqm-warn: #e0a072;\n  --yqm-warn-soft: rgba(224, 160, 114, 0.4);\n  --yqm-btn-label: #ffffff;                        /* \u5fc5\u987b\u663e\u5f0f\u5199\u56de\uff0c\u5426\u5219\u7ee7\u627f :root \u7684\u6df1\u8272\u5b57 */\n}\n\n/* \u6df1\u7d2b\u7f57\u5170\uff1a\u6bd4\u67da\u6708\u66f4\u6d53\u66f4\u6b63\u7684\u6b63\u7d2b\uff0c\u70b9\u4eae\u8272\u4e5f\u7528\u7d2b\u3001\u4e0d\u63ba\u767d */\nbody[data-yqm-theme=\"violet\"] {\n  --yqm-bg: rgba(24, 14, 46, 0.97);\n  --yqm-bg-soft: rgba(36, 21, 69, 0.9);\n  --yqm-border: rgba(160, 130, 220, 0.3);\n  --yqm-border-soft: rgba(160, 130, 220, 0.13);\n  --yqm-hover: rgba(160, 130, 220, 0.1);\n  --yqm-text: #ece6f7;\n  --yqm-text-dim: #9d90b8;\n  --yqm-accent: #a97fe0;\n  --yqm-accent-2: #8a5ecb;   /* \u6536\u7a84\u660e\u5ea6\uff1a\u6df1\u5b57\u4e24\u7aef\u90fd\u538b\u5f97\u4f4f */\n  --yqm-accent-soft: rgba(169, 127, 224, 0.22);\n  --yqm-accent-soft-2: rgba(169, 127, 224, 0.36);\n  --yqm-accent-glow: rgba(130, 80, 220, 0.45);\n  --yqm-on: #c9a6ff;\n  --yqm-on-soft: rgba(201, 166, 255, 0.17);\n  --yqm-off: #6b5f85;\n  --yqm-off-soft: rgba(107, 95, 133, 0.25);\n  --yqm-warn: #e08a72;\n  --yqm-warn-soft: rgba(224, 138, 114, 0.4);\n  --yqm-btn-label: #150c26;\n}\n\n/* ---------- \u60ac\u6d6e\u7403\u5c3a\u5bf8 ----------\n   \u4e09\u6863\uff0c\u72ec\u7acb\u4e8e\u914d\u8272\uff08\u4ee5\u540e\u72d7\u5b50\u9020\u578b\u4e5f\u5171\u7528\u8fd9\u4e2a\u5c3a\u5bf8\uff09\u3002\n   \u6302 <body data-yqm-ball-size=\"...\">\uff0c\u6ca1\u6709\u8be5\u5c5e\u6027 = \u5927\uff08\u9ed8\u8ba4\uff09\u3002\n   \u4f4d\u7f6e\u4e00\u5f8b\u5199\u6210 calc(\u89c6\u53e3\u9ad8 \u2212 \u7403\u5c3a\u5bf8 \u2212 \u504f\u79fb)\uff0c\u8fd9\u6837\u6539\u5c3a\u5bf8\u65f6\n   \u300c\u7403\u5e95\u8fb9\u79bb\u5c4f\u5e55\u5e95\u7684\u8ddd\u79bb\u300d\u4fdd\u6301\u4e0d\u53d8\uff0c\u7403\u4e0d\u4f1a\u56e0\u4e3a\u53d8\u5c0f\u800c\u5f80\u4e0b\u6f02\u3002 */\n:root { --yqm-ball-size: 52px; }\nbody[data-yqm-ball-size=\"normal\"] { --yqm-ball-size: 44px; }\nbody[data-yqm-ball-size=\"small\"] { --yqm-ball-size: 36px; }\n\n/* ---------- \u60ac\u6d6e\u7403 ---------- */\n/* \u6ce8\u610f\uff1aSillyTavern \u7ed9 <html> \u52a0\u4e86 transform:translateZ(0)\uff0c\u4f1a\u8ba9 position:fixed\n   \u76f8\u5bf9 html\uff08\u9ad8\u5ea6\u22480\uff09\u5b9a\u4f4d\uff0c\u5bfc\u81f4 bottom \u5931\u6548\uff08\u7403\u8dd1\u51fa\u5c4f\u5e55\uff09\u3002\n   \u56e0\u6b64\u5782\u76f4\u65b9\u5411\u6539\u7528 top + \u89c6\u53e3\u5355\u4f4d\u5b9a\u4f4d\uff08DeepSeek \u7eff\u7403\u540c\u6b3e\u505a\u6cd5\uff09\u3002 */\n.yqm-ball {\n  position: fixed;\n  right: 18px;\n  top: calc(100vh - var(--yqm-ball-size) - 120px);\n  top: calc(100dvh - var(--yqm-ball-size) - 120px);\n  width: var(--yqm-ball-size);\n  height: var(--yqm-ball-size);\n  border-radius: 50%;\n  background: linear-gradient(135deg, var(--yqm-accent), var(--yqm-accent-2));\n  color: var(--yqm-btn-label, #fff);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: grab;\n  z-index: 99998;\n  box-shadow: 0 6px 20px var(--yqm-accent-glow), 0 0 0 1px rgba(255, 255, 255, 0.08) inset;\n  user-select: none;\n  touch-action: none;\n  transition: transform 0.15s ease, box-shadow 0.15s ease;\n}\n.yqm-ball:active { cursor: grabbing; }\n.yqm-ball:hover {\n  transform: scale(1.08);\n  box-shadow: 0 8px 26px var(--yqm-accent-soft-2), 0 0 0 1px rgba(255, 255, 255, 0.12) inset;\n}\n.yqm-ball-icon { font-size: calc(var(--yqm-ball-size) * 0.42); line-height: 1; }\n\n/* ---------- \u9762\u677f ---------- */\n/* \u3010\u57515\u3011\u540c\u60ac\u6d6e\u7403\uff1a<html> \u5e26 transform \u4f1a\u6539\u53d8 fixed \u7684\u5b9a\u4f4d\u4e0a\u4e0b\u6587\uff0c\n   \u6240\u4ee5\u5782\u76f4\u65b9\u5411\u4e00\u5f8b\u7528 dvh\uff08\u52a8\u6001\u89c6\u53e3\u9ad8\u5ea6\uff09\u8868\u8fbe\uff0c\u4e0d\u7528 top:50% \u8fd9\u79cd\u76f8\u5bf9 html \u7684\u7b97\u6cd5\u3002 */\n.yqm-panel {\n  position: fixed;\n  top: 50vh;\n  top: 50dvh;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 340px;\n  max-width: calc(100vw - 24px);\n  max-height: min(72vh, 640px);\n  max-height: min(72dvh, 640px);\n  background: var(--yqm-bg);\n  color: var(--yqm-text);\n  border: 1px solid var(--yqm-border);\n  border-radius: 14px;\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.55);\n  z-index: 99999;\n  display: none;\n  flex-direction: column;\n  overflow: hidden;\n  backdrop-filter: blur(8px);\n  font-size: 13px;\n}\n.yqm-panel.open {\n  display: flex;\n  animation: yqm-in 0.16s ease;\n}\n@keyframes yqm-in {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n.yqm-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 12px;\n  border-bottom: 1px solid var(--yqm-border);\n  background: linear-gradient(180deg, var(--yqm-border-soft), transparent);\n  flex-shrink: 0;   /* \u6807\u9898\u680f\uff08\u542b\u5173\u95ed\u6309\u94ae\uff09\u6c38\u4e0d\u88ab\u538b\u6241 */\n}\n.yqm-title { font-weight: 600; letter-spacing: 0.5px; }\n\n/* \u6807\u9898\u680f\u53f3\u4fa7\u7684\u5c0f\u6309\u94ae\uff08\u914d\u8272\u5165\u53e3\uff09\uff0c\u4e0e\u5173\u95ed\u6309\u94ae\u5e76\u6392 */\n.yqm-header-right { display: flex; align-items: center; gap: 2px; }\n.yqm-theme-btn {\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0 4px;\n  display: flex;\n  align-items: center;\n  line-height: 1;\n}\n.yqm-theme-btn .yqm-theme-swatch {\n  width: 15px;\n  height: 15px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, var(--yqm-accent), var(--yqm-accent-2));\n  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.25) inset;\n  transition: transform 0.12s ease;\n}\n.yqm-theme-btn:hover .yqm-theme-swatch { transform: scale(1.15); }\n.yqm-close {\n  background: none;\n  border: none;\n  color: var(--yqm-text-dim);\n  font-size: 22px;\n  line-height: 1;\n  cursor: pointer;\n  padding: 0 4px;\n}\n.yqm-close:hover { color: var(--yqm-text); }\n\n.yqm-toolbar { padding: 10px 12px 6px; display: flex; flex-direction: column; gap: 8px; flex-shrink: 0; }\n.yqm-row { display: flex; align-items: center; gap: 8px; }\n.yqm-label { color: var(--yqm-text-dim); font-size: 12px; flex-shrink: 0; }\n.yqm-actions { flex-wrap: wrap; }\n\n.yqm-table-select, .yqm-preset-select, .yqm-search {\n  flex: 1;\n  min-width: 0;\n  background: var(--yqm-bg-soft);\n  color: var(--yqm-text);\n  border: 1px solid var(--yqm-border);\n  border-radius: 8px;\n  padding: 6px 8px;\n  font-size: 13px;\n  outline: none;\n}\n.yqm-search::placeholder { color: var(--yqm-text-dim); }\n.yqm-table-select:focus, .yqm-preset-select:focus, .yqm-search:focus {\n  border-color: var(--yqm-accent);\n}\n\n.yqm-btn {\n  background: var(--yqm-bg-soft);\n  color: var(--yqm-text);\n  border: 1px solid var(--yqm-border);\n  border-radius: 8px;\n  padding: 5px 10px;\n  font-size: 12px;\n  cursor: pointer;\n  transition: all 0.12s ease;\n}\n.yqm-btn:hover { border-color: var(--yqm-accent); color: var(--yqm-accent); }\n.yqm-btn.active {\n  border-color: var(--yqm-accent);\n  color: var(--yqm-accent);\n  background: var(--yqm-accent-soft);\n  box-shadow: 0 0 0 1px var(--yqm-accent-soft-2) inset;\n}\n/* \u9884\u8bbe\u533a\uff1a\u7a84\u6309\u94ae + \u9ed8\u8ba4\u6536\u8d77\u7684\u300c\u22ef\u300d\u66f4\u591a\u884c */\n.yqm-btn-narrow { padding: 5px 8px; }\n.yqm-more-row { display: none; }\n\n/* ---------- \u6392\u5e8f\u6a21\u5f0f\u6d6e\u5c42 ---------- */\n/* \u3010\u57515\u3011inset:0 \u662f\u76f8\u5bf9 <html> \u8ba1\u7b97\u7684\uff0c\u800c ST \u7ed9 <html> \u52a0\u4e86 transform\uff0c\n   \u4f7f html \u9ad8\u5ea6 \u2260 \u53ef\u89c6\u9ad8\u5ea6 \u2014\u2014 \u6d6e\u5c42\u4f1a\u6574\u4f53\u504f\u79fb\u3001\u5185\u5bb9\u88ab\u9876\u51fa\u5c4f\u5e55\u3002\n   \u56e0\u6b64\u8fd9\u91cc\u663e\u5f0f\u7528 dvh \u5b9a\u4f4d\uff0c\u5e76\u7528 overflow-y:auto \u515c\u5e95\uff1a\n   \u5361\u7247 max-height \u6c38\u8fdc\u5c0f\u4e8e\u6d6e\u5c42\u9ad8\u5ea6\uff0c\u8d85\u9ad8\u65f6\u6d6e\u5c42\u53ef\u6eda\u52a8\uff0c\u9876\u90e8\u7edd\u4e0d\u4f1a\u88ab\u88c1\u3002 */\n.yqm-sort-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 100vh;\n  height: 100dvh;\n  box-sizing: border-box;\n  padding: 12px;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 100001;\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.yqm-sort-card {\n  width: 340px;\n  max-width: calc(100vw - 24px);\n  max-height: calc(100vh - 24px);\n  max-height: calc(100dvh - 24px);\n  margin: auto; /* \u7a7a\u95f4\u8db3\u591f\u65f6\u5782\u76f4\u5c45\u4e2d\uff1b\u5185\u5bb9\u8d85\u9ad8\u65f6\u81ea\u52a8\u5f52\u96f6\u5e76\u53ef\u6eda\u52a8 */\n  background: var(--yqm-bg);\n  color: var(--yqm-text);\n  border: 1px solid var(--yqm-border);\n  border-radius: 14px;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.55);\n}\n.yqm-sort-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 12px;\n  border-bottom: 1px solid var(--yqm-border);\n}\n.yqm-sort-body {\n  flex: 1;\n  min-height: 0;   /* flex \u5b50\u9879\u5fc5\u987b\u80fd\u6536\u7f29\uff0c\u5426\u5219\u5185\u5bb9\u6491\u7834\u5361\u7247\u3001\u6eda\u52a8\u6761\u5931\u6548 */\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  padding: 8px 10px 12px;\n}\n.yqm-sort-body::-webkit-scrollbar { width: 6px; }\n.yqm-sort-body::-webkit-scrollbar-thumb {\n  background: var(--yqm-accent-soft-2);\n  border-radius: 3px;\n}\n.yqm-sort-group {\n  font-size: 11px;\n  color: var(--yqm-text-dim);\n  padding: 8px 4px 4px;\n  letter-spacing: 0.5px;\n}\n.yqm-sort-item {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 8px;\n  border-radius: 8px;\n  background: var(--yqm-bg-soft);\n  margin-bottom: 3px;\n  touch-action: none;\n}\n.yqm-sort-item.dragging {\n  opacity: 0.75;\n  outline: 1px dashed var(--yqm-accent);\n}\n.yqm-sort-handle {\n  cursor: grab;\n  color: var(--yqm-text-dim);\n  padding: 0 2px;\n  font-size: 14px;\n}\n.yqm-sort-name {\n  flex: 1;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 13px;\n}\n\n/* ---------- \u901a\u7528\u5f39\u7a97\uff08\u53d6\u4ee3 window.prompt\uff09 ---------- */\n/* \u5b9a\u4f4d\u7b56\u7565\u4e0e\u6392\u5e8f\u6d6e\u5c42\u4e00\u81f4\uff1a<html> \u5e26 transform\uff0c\u6545\u5782\u76f4\u5c3a\u5bf8\u4e00\u5f8b\u7528 dvh\uff0c\n   \u5e76\u7528 overflow-y:auto + \u5361\u7247 margin:auto \u4fdd\u8bc1\u300c\u8d85\u9ad8\u65f6\u9876\u90e8\u4f9d\u7136\u53ef\u8fbe\u300d\u3002 */\n.yqm-dialog-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 100vh;\n  height: 100dvh;\n  box-sizing: border-box;\n  padding: 12px;\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 100002;\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.yqm-dialog {\n  width: 340px;\n  max-width: calc(100vw - 24px);\n  max-height: calc(100vh - 24px);\n  max-height: calc(100dvh - 24px);\n  margin: auto;\n  background: var(--yqm-bg);\n  color: var(--yqm-text);\n  border: 1px solid var(--yqm-border);\n  border-radius: 14px;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.55);\n}\n.yqm-dialog-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  padding: 10px 12px;\n  border-bottom: 1px solid var(--yqm-border);\n  background: linear-gradient(180deg, var(--yqm-border-soft), transparent);\n  flex-shrink: 0;\n}\n.yqm-dialog-title { font-weight: 600; font-size: 13px; letter-spacing: 0.3px; }\n.yqm-dialog-body {\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  padding: 12px 12px 4px;\n}\n.yqm-field { margin-bottom: 12px; }\n.yqm-field-label { font-size: 12px; color: var(--yqm-text-dim); margin-bottom: 6px; }\n.yqm-dialog-input {\n  width: 100%;\n  box-sizing: border-box;\n  background: var(--yqm-bg-soft);\n  color: var(--yqm-text);\n  border: 1px solid var(--yqm-border);\n  border-radius: 8px;\n  padding: 7px 9px;\n  font-size: 13px;\n  outline: none;\n}\n.yqm-dialog-input:focus { border-color: var(--yqm-accent); }\n.yqm-dialog-input::placeholder { color: var(--yqm-text-dim); }\n\n/* \u6807\u7b7e\u5899\uff1a\u5206\u7ec4\u591a\u4e86\u4e5f\u4e0d\u4f1a\u628a\u5f39\u7a97\u6491\u9ad8\uff08\u9650\u9ad8\u6eda\u52a8\uff09\uff0c\u4e00\u773c\u80fd\u770b\u5230\u5168\u90e8\u7ec4\u540d */\n.yqm-chips {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 5px;\n  margin-top: 7px;\n  max-height: 120px;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.yqm-chips::-webkit-scrollbar { width: 6px; }\n.yqm-chips::-webkit-scrollbar-thumb {\n  background: var(--yqm-accent-soft-2);\n  border-radius: 3px;\n}\n.yqm-chip {\n  font-size: 12px;\n  padding: 4px 10px;\n  border-radius: 12px;\n  background: var(--yqm-border-soft);\n  border: 1px solid var(--yqm-border);\n  color: var(--yqm-text);\n  cursor: pointer;\n  white-space: nowrap;\n  user-select: none;\n  transition: background 0.1s ease, border-color 0.1s ease, color 0.1s ease;\n}\n.yqm-chip:hover { border-color: var(--yqm-accent); color: var(--yqm-accent); }\n.yqm-chip.on {\n  background: var(--yqm-accent-soft-2);\n  border-color: var(--yqm-accent);\n  color: var(--yqm-accent);\n  box-shadow: 0 0 0 1px var(--yqm-accent) inset;\n}\n.yqm-chip.blank { border-style: dashed; color: var(--yqm-text-dim); }\n.yqm-chip.blank.on { color: #fff; }\n.yqm-chip-empty {\n  font-size: 11px;\n  color: var(--yqm-text-dim);\n  padding: 4px 2px;\n  line-height: 1.5;\n}\n.yqm-field-hint { font-size: 11px; color: var(--yqm-text-dim); margin-top: 6px; line-height: 1.5; }\n.yqm-dialog-footer {\n  display: flex;\n  gap: 8px;\n  justify-content: flex-end;\n  padding: 10px 12px 12px;\n  flex-shrink: 0;\n  border-top: 1px solid var(--yqm-border-soft);\n}\n\n/* ---------- \u914d\u8272\u9009\u62e9\u5668 ---------- */\n/* \u8272\u5757\u7528 --sw-a / --sw-b \u5185\u8054\u53d8\u91cf\uff0c\u8fd9\u6837\u5217\u8868\u91cc\u6bcf\u4e00\u9879\u90fd\u80fd\u5c55\u793a\u5b83\u81ea\u5df1\u7684\u989c\u8272\uff0c\n   \u800c\u4e0d\u662f\u5f53\u524d\u751f\u6548\u4e3b\u9898\u7684\u989c\u8272\u3002 */\n.yqm-theme-swatch {\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  flex-shrink: 0;\n  background: linear-gradient(135deg, var(--sw-a, var(--yqm-accent)), var(--sw-b, var(--yqm-accent-2)));\n  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.22) inset;\n  transition: transform 0.12s ease;\n}\n.yqm-theme-swatches { display: flex; align-items: center; flex-shrink: 0; }\n.yqm-theme-dot2 {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  margin-left: -5px;\n  border: 1px solid var(--yqm-bg);   /* \u7528\u5e95\u8272\u63cf\u8fb9\u628a\u4e24\u4e2a\u5706\"\u6316\u5f00\"\uff0c\u540c\u7c7b\u8272\u4e0b\u4e0d\u4f1a\u7cca\u6210\u4e00\u5768 */\n}\n/* \u6807\u9898\u680f\u90a3\u4e2a\u5165\u53e3\u6309\u94ae\u91cc\u7684\u7b2c\u4e8c\u4e2a\u5706\u70b9\uff0c\u7528\u5f53\u524d\u4e3b\u9898\u300c\u4eae\u8d77\u6765\u300d\u7684\u989c\u8272 */\n.yqm-theme-btn .yqm-theme-dot2 { background: var(--yqm-on); }\n.yqm-theme-btn:hover .yqm-theme-swatch { transform: scale(1.15); }\n.yqm-theme-list {\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  padding: 8px 10px 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n}\n.yqm-theme-item {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 9px 10px;\n  border-radius: 9px;\n  cursor: pointer;\n  border: 1px solid transparent;\n  transition: background 0.1s ease, border-color 0.1s ease;\n}\n.yqm-theme-item:hover { background: var(--yqm-hover); }\n/* \u5206\u7ec4\u5c0f\u6807\u9898\uff08\u67da\u6708 / \u91d1\u5c5e / \u7d20\u51c0\uff09 */\n.yqm-theme-group {\n  font-size: 11px;\n  color: var(--yqm-text-dim);\n  padding: 9px 6px 4px;\n  letter-spacing: 0.5px;\n}\n.yqm-theme-list .yqm-theme-group:first-child { padding-top: 2px; }\n.yqm-theme-item.on {\n  background: var(--yqm-accent-soft);\n  border-color: var(--yqm-accent);\n}\n.yqm-theme-name { flex: 1; min-width: 0; font-size: 13px; }\n.yqm-theme-check {\n  color: var(--yqm-accent);\n  font-size: 14px;\n  line-height: 1;\n  opacity: 0;\n  flex-shrink: 0;\n}\n.yqm-theme-item.on .yqm-theme-check { opacity: 1; }\n.yqm-btn.primary {\n  background: linear-gradient(135deg, var(--yqm-accent), var(--yqm-accent-2));\n  border-color: transparent;\n  color: var(--yqm-btn-label, #fff);\n}\n.yqm-btn.primary:hover { filter: brightness(1.1); }\n.yqm-btn.warn { border-color: var(--yqm-warn-soft); }\n.yqm-btn.warn:hover { border-color: var(--yqm-warn); color: #ffd5d5; }\n\n.yqm-count { margin-left: auto; color: var(--yqm-text-dim); font-size: 12px; white-space: nowrap; }\n\n/* ---------- \u5217\u8868 ---------- */\n.yqm-list-wrap {\n  flex: 1;\n  overflow-y: auto;\n  padding: 4px 8px 8px;\n  border-top: 1px solid var(--yqm-border-soft);\n  border-bottom: 1px solid var(--yqm-border-soft);\n  min-height: 120px;\n}\n.yqm-list-wrap::-webkit-scrollbar { width: 6px; }\n.yqm-list-wrap::-webkit-scrollbar-thumb {\n  background: var(--yqm-accent-soft-2);\n  border-radius: 3px;\n}\n\n.yqm-item {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 7px 8px;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background 0.1s ease;\n  margin-bottom: 3px;\n}\n.yqm-item:hover { background: var(--yqm-hover); }\n.yqm-item.checked { background: var(--yqm-accent-soft); }\n.yqm-check { width: 16px; height: 16px; accent-color: var(--yqm-accent); flex-shrink: 0; }\n\n/* \u72b6\u6001\u5706\u70b9\uff1a\u5b9e\u5fc3\u4eae\u8272\uff1d\u5df2\u663e\u793a\uff0c\u7a7a\u5fc3\u7070\u5708\uff1d\u5df2\u9690\u85cf\u3002\n   \u6bd4\u53ea\u770b\u6709\u6ca1\u6709\u5220\u9664\u7ebf\u66f4\u5feb\uff0c\u626b\u4e00\u773c\u5c31\u80fd\u5206\u6e05\u3002 */\n.yqm-dot {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  flex-shrink: 0;\n  background: transparent;\n  border: 1.5px solid var(--yqm-off);\n  transition: background 0.12s ease, border-color 0.12s ease, box-shadow 0.12s ease;\n}\n.yqm-item:not(.is-hidden) .yqm-dot {\n  background: var(--yqm-on);\n  border-color: var(--yqm-on-ring, var(--yqm-on));   /* \u6709\u73af\u8272\u5c31\u7528\u73af\u8272\uff08\u6d45\u8272\u70b9+\u6df1\u73af\uff09\uff0c\u5426\u5219\u540c\u8272 */\n  box-shadow: 0 0 6px var(--yqm-on-soft);\n}\n.yqm-item-name {\n  flex: 1;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.yqm-item.is-hidden .yqm-item-name { color: var(--yqm-text-dim); text-decoration: line-through; }\n\n.yqm-badge {\n  font-size: 11px;\n  padding: 1px 7px;\n  border-radius: 10px;\n  flex-shrink: 0;\n}\n.yqm-badge.on { background: var(--yqm-on-soft); color: var(--yqm-on); }\n.yqm-badge.off { background: var(--yqm-off-soft); color: var(--yqm-off); }\n\n.yqm-empty {\n  padding: 24px 12px;\n  text-align: center;\n  color: var(--yqm-text-dim);\n  font-size: 13px;\n  line-height: 1.6;\n}\n\n/* ---------- \u5e95\u90e8\u9884\u8bbe\u533a ---------- */\n.yqm-footer {\n  padding: 8px 12px 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  background: var(--yqm-border-soft);\n  flex-shrink: 0;   /* \u5e95\u90e8\u6309\u94ae\u533a\uff08\u542b\u6240\u6709\u64cd\u4f5c\uff09\u6c38\u4e0d\u88ab\u538b\u51fa\u53ef\u89c6\u533a */\n}\n\n.yqm-ball-toggle {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  color: var(--yqm-text-dim);\n  cursor: pointer;\n  user-select: none;\n}\n.yqm-ball-toggle input { accent-color: var(--yqm-accent); }\n\n/* ---------- Toast ---------- */\n.yqm-toast {\n  position: fixed;\n  left: 50%;\n  top: calc(100vh - 110px);\n  top: calc(100dvh - 110px);\n  transform: translate(-50%, 12px);\n  background: var(--yqm-bg);\n  color: var(--yqm-text);\n  padding: 9px 16px;\n  border-radius: 10px;\n  border: 1px solid var(--yqm-border);\n  font-size: 13px;\n  z-index: 100000;\n  opacity: 0;\n  transition: all 0.25s ease;\n  pointer-events: none;\n  max-width: 80vw;\n  text-align: center;\n}\n.yqm-toast.show { opacity: 1; transform: translate(-50%, 0); }\n.yqm-toast.ok { border-color: var(--yqm-on); }\n.yqm-toast.warn { border-color: var(--yqm-warn); }\n\n/* ---------- \u79fb\u52a8\u7aef\u9002\u914d ---------- */\n@media (max-width: 500px) {\n  .yqm-panel {\n    left: 8px;\n    right: 8px;\n    width: auto;\n    top: 6vh;\n    top: 6dvh;\n    transform: none;\n    max-height: 86vh;\n    max-height: 86dvh;\n  }\n  .yqm-list-wrap { min-height: 80px; }\n  .yqm-ball {\n    right: 12px;\n    top: calc(100vh - var(--yqm-ball-size) - 90px);\n    top: calc(100dvh - var(--yqm-ball-size) - 90px);\n  }\n\n  /* \u6392\u5e8f\u6d6e\u5c42\uff1a\u624b\u673a\u7aef\u56db\u5468\u7559 8px\uff0c\u5361\u7247\u4e0d\u8d85\u51fa\u53ef\u89c6\u533a */\n  .yqm-sort-overlay { padding: 8px; }\n  .yqm-sort-card {\n    max-height: calc(100vh - 16px);\n    max-height: calc(100dvh - 16px);\n  }\n  /* \u89e6\u5c4f\u4e0a\u6ca1\u6709 hover\uff0c\u6761\u76ee\u9ad8\u5ea6\u7565\u5fae\u52a0\u5927\uff0c\u65b9\u4fbf\u70b9\u6309 */\n  .yqm-sort-item { padding: 8px; }\n  .yqm-item { padding: 9px 8px; }\n}\n\n/* \u624b\u673a\u7aef\u5f39\u7a97\uff1a\u8f93\u5165\u6846\u5b57\u53f7\u5fc5\u987b \u226516px\uff0c\u5426\u5219\u805a\u7126\u8f93\u5165\u6846\u65f6\u6d4f\u89c8\u5668\u4f1a\u6574\u9875\u653e\u5927 */\n@media (max-width: 500px) {\n  .yqm-dialog-overlay { padding: 8px; }\n  .yqm-dialog {\n    width: 100%;\n    max-height: calc(100vh - 16px);\n    max-height: calc(100dvh - 16px);\n  }\n  .yqm-dialog-input { font-size: 16px; padding: 8px 10px; }\n  .yqm-chips { max-height: 104px; }\n  .yqm-chip { padding: 6px 11px; }\n  .yqm-dialog-footer .yqm-btn { padding: 7px 14px; }\n}\n\n/* \u7535\u8111\u7aef\u5f39\u7a97\uff1a\u52a0\u5bbd\u8ba9\u5206\u7ec4\u6807\u7b7e\u4e00\u884c\u6392\u5f00\uff0c\u62ff\u5230\u4e0b\u62c9\u6846\u90a3\u79cd\u7d27\u51d1\u611f */\n@media (min-width: 501px) {\n  .yqm-dialog { width: 420px; }\n  .yqm-chips { max-height: 96px; }\n}\n\n/* \u77ee\u5c4f\u515c\u5e95\uff08\u624b\u673a\u6a2a\u5c4f / \u6d4f\u89c8\u5668\u5de5\u5177\u680f\u5403\u6389\u5927\u534a\u4e2a\u5c4f\u5e55\uff09\uff1a\n   \u9762\u677f\u6574\u4f53\u53ef\u6eda\u52a8 + \u5217\u8868\u9650\u9ad8\uff0c\u4fdd\u8bc1\u6807\u9898\u680f\u4e0e\u5e95\u90e8\u6309\u94ae\u5728\u4efb\u4f55\u60c5\u51b5\u4e0b\u90fd\u80fd\u6eda\u5230\uff0c\n   \u675c\u7edd\"\u6309\u94ae\u591f\u4e0d\u7740 \u2192 \u9000\u4e0d\u51fa\u53bb\"\u3002 */\n@media (max-height: 560px) {\n  .yqm-panel { overflow-y: auto; }\n  .yqm-list-wrap { flex: none; max-height: 46dvh; }\n}\n";

    function pageDocument() {
      // \u3010\u987a\u5e8f\u5173\u952e\u3011\u5728\u9152\u9986\u52a9\u624b iframe \u4e2d\uff0c\u81ea\u8eab\u6587\u6863\u662f\u7a7a\u7684\u7a7a\u58f3\uff0c
      // \u5fc5\u987b\u4f18\u5148\u7236\u7a97\u53e3/top\uff0c\u6700\u540e\u624d\u8003\u8651\u81ea\u8eab\u3002
      const cands = [];
      try { if (window.parent && window.parent !== window) cands.push(window.parent); } catch (_e) { /* ignore */ }
      try { if (window.top && window.top !== window) cands.push(window.top); } catch (_e) { /* ignore */ }
      cands.push(window);
      for (const w of cands) {
        try { if (w && w.document && w.document.head) return w.document; } catch (_e) { /* \u7ee7\u7eed */ }
      }
      return document;
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
      // \u3010\u987a\u5e8f\u5173\u952e\u3011iframe \u81ea\u8eab\u662f\u7a7a\u58f3\uff0c\u4f18\u5148\u7236\u7a97\u53e3/top\uff0c\u6700\u540e\u624d\u662f\u81ea\u8eab
      const cands = [];
      try { if (window.parent && window.parent !== window) cands.push(window.parent); } catch (_e) { /* ignore */ }
      try { if (window.top && window.top !== window) cands.push(window.top); } catch (_e) { /* ignore */ }
      cands.push(window);
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
      const list = Object.entries(all)
        .filter(([, v]) => !tableId || String(v.tableId) === String(tableId))
        .map(([name, v]) => ({
          name,
          tableId: String(v.tableId || ''),
          recordIds: Array.isArray(v.recordIds) ? v.recordIds.map(String) : [],
          updatedAt: Number(v.updatedAt || 0),
          group: String(v.group || ''),
          order: Number(v.order || 0),
        }));

      // \u6392\u5e8f\uff1a\u6709\u5206\u7ec4\u7684\u5728\u524d\uff08\u6309\u7ec4\u540d\u5b57\u5178\u5e8f\uff09\uff0c\u672a\u5206\u7ec4\u57ab\u5e95\uff1b\u7ec4\u5185\u6309 order\uff0c\u5176\u6b21\u6309\u66f4\u65b0\u65f6\u95f4
      list.sort((a, b) => {
        if (a.group !== b.group) {
          if (!a.group) return 1;
          if (!b.group) return -1;
          return a.group.localeCompare(b.group, 'zh');
        }
        if (a.order !== b.order) return a.order - b.order;
        return b.updatedAt - a.updatedAt;
      });
      return list;
    }

    // \u53d6\u67d0\u5206\u7ec4\u5185\u9884\u8bbe\u7684\u300c\u5f53\u524d\u987a\u5e8f\u300d\uff08\u540d\u5b57\u6570\u7ec4\uff09
    function groupOrder(all, group) {
      const g = String(group || '');
      return Object.entries(all)
        .filter(([, v]) => String(v.group || '') === g)
        .sort((a, b) =>
          (Number(a[1].order || 0) - Number(b[1].order || 0)) ||
          (Number(b[1].updatedAt || 0) - Number(a[1].updatedAt || 0)) ||
          a[0].localeCompare(b[0], 'zh'))
        .map(([n]) => n);
    }

    function nextOrderInGroup(all, group) {
      const g = String(group || '');
      return Object.values(all)
        .filter((v) => String(v.group || '') === g)
        .reduce((m, v) => Math.max(m, Number(v.order || 0)), -1) + 1;
    }

    function savePreset(name, tableId, recordIds, options = {}) {
      const clean = String(name || '').trim();
      if (!clean) return { ok: false, error: '\u9884\u8bbe\u540d\u4e0d\u80fd\u4e3a\u7a7a' };
      const all = loadAll();
      const prev = all[clean];
      const group = options.group !== undefined
        ? String(options.group || '').trim()
        : String(prev ? prev.group || '' : '');
      all[clean] = {
        tableId: String(tableId || ''),
        recordIds: Array.from(new Set((recordIds || []).map(String))),
        updatedAt: Date.now(),
        group,
        order: prev ? Number(prev.order || 0) : nextOrderInGroup(all, group),
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

    // \u91cd\u547d\u540d\uff1a\u4fdd\u7559\u539f\u6709\u6761\u76ee\u5185\u5bb9\uff0c\u53ea\u6362\u540d\u5b57
    function renamePreset(oldName, newName, options = {}) {
      const all = loadAll();
      if (!(oldName in all)) return { ok: false, error: '\u539f\u9884\u8bbe\u4e0d\u5b58\u5728' };
      const clean = String(newName || '').trim();
      if (!clean) return { ok: false, error: '\u65b0\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a' };
      if (clean === oldName) return { ok: true, unchanged: true };
      if (clean in all && !options.overwrite) return { ok: false, error: '\u540d\u79f0\u5df2\u5b58\u5728' };
      const item = all[oldName];
      delete all[oldName];
      all[clean] = { ...item, updatedAt: Date.now() };
      return saveAll(all) ? { ok: true } : { ok: false, error: '\u4fdd\u5b58\u5931\u8d25' };
    }

    // \u8bbe\u7f6e\u9884\u8bbe\u6240\u5c5e\u5206\u7ec4\uff08\u7a7a\u5b57\u7b26\u4e32 = \u672a\u5206\u7ec4\uff09\u3002\u4f1a\u632a\u5230\u76ee\u6807\u7ec4\u672b\u5c3e\u3002
    function setPresetGroup(name, group) {
      const all = loadAll();
      if (!(name in all)) return { ok: false, error: '\u9884\u8bbe\u4e0d\u5b58\u5728' };
      const clean = String(group || '').trim();
      all[name].group = clean;
      all[name].order = nextOrderInGroup(all, clean);
      all[name].updatedAt = Number(all[name].updatedAt || Date.now());
      return saveAll(all) ? { ok: true, group: clean } : { ok: false, error: '\u4fdd\u5b58\u5931\u8d25' };
    }

    // \u7ec4\u5185\u4e0a\u79fb / \u4e0b\u79fb
    function movePreset(name, dir) {
      const all = loadAll();
      if (!(name in all)) return { ok: false, error: '\u9884\u8bbe\u4e0d\u5b58\u5728' };
      const group = String(all[name].group || '');
      const names = groupOrder(all, group);
      const idx = names.indexOf(name);
      const swapIdx = dir === 'up' ? idx - 1 : idx + 1;
      if (idx < 0 || swapIdx < 0 || swapIdx >= names.length) return { ok: true, unchanged: true };
      const tmp = names[idx];
      names[idx] = names[swapIdx];
      names[swapIdx] = tmp;
      names.forEach((n, i) => { if (all[n]) all[n].order = i; });
      return saveAll(all) ? { ok: true } : { ok: false, error: '\u4fdd\u5b58\u5931\u8d25' };
    }

    // \u6309\u7ed9\u5b9a\u540d\u5b57\u6570\u7ec4\u91cd\u6392\u67d0\u7ec4\uff08\u62d6\u62fd\u6392\u5e8f\u7528\uff09
    function reorderPresets(group, orderedNames) {
      const all = loadAll();
      const g = String(group || '');
      (orderedNames || []).forEach((n, i) => {
        if (all[n] && String(all[n].group || '') === g) all[n].order = i;
      });
      return saveAll(all) ? { ok: true } : { ok: false, error: '\u4fdd\u5b58\u5931\u8d25' };
    }

    // \u5217\u51fa\u6240\u6709\u5206\u7ec4\u540d\uff08\u53bb\u91cd\u3001\u5df2\u6392\u5e8f\uff09
    function listGroups() {
      const all = loadAll();
      const set = new Set();
      Object.values(all).forEach((v) => { const g = String(v.group || '').trim(); if (g) set.add(g); });
      return Array.from(set).sort((a, b) => a.localeCompare(b, 'zh'));
    }

    window[NS] = window[NS] || {};
    window[NS].Presets = {
      listPresets,
      listGroups,
      savePreset,
      deletePreset,
      getPreset,
      renamePreset,
      setPresetGroup,
      movePreset,
      reorderPresets,
      groupOrder,
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
      viewFilter: '',       // \u5217\u8868\u8fc7\u6ee4\uff1a'' \u5168\u90e8 | 'hidden' \u53ea\u770b\u5df2\u9690\u85cf | 'shown' \u53ea\u770b\u5df2\u663e\u793a
      advOpen: false,       // \u9884\u8bbe\u300c\u22ef\u300d\u66f4\u591a\u64cd\u4f5c\u662f\u5426\u5c55\u5f00
      sortOverlay: null,    // \u6392\u5e8f\u6a21\u5f0f\u6d6e\u5c42
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
    // \u901a\u7528\u5f39\u7a97\u7ec4\u4ef6\uff08\u53d6\u4ee3 window.prompt \u2014\u2014 \u624b\u673a\u4e0a\u90a3\u4e2a\u7cfb\u7edf\u767d\u6846\u53c8\u4e11\u53c8\u96be\u7528\uff09
    //
    //   openDialog({
    //     title, confirmText,
    //     fields: [{ key, label, placeholder, value, options, blankLabel, hint, required }],
    //     validate: (values) => \u9519\u8bef\u6587\u6848 | null
    //   }) => Promise<values | null>        // null \u8868\u793a\u7528\u6237\u53d6\u6d88
    //
    // \u5b57\u6bb5\u5e26 options\uff08\u5df2\u6709\u5206\u7ec4\u540d\uff09\u65f6\uff0c\u8f93\u5165\u6846\u4e0b\u65b9\u4f1a\u6e32\u67d3\u300c\u53ef\u70b9\u6807\u7b7e\u300d\uff1a
    //   \u00b7 \u70b9\u6807\u7b7e \u2192 \u628a\u540d\u5b57\u76f4\u63a5\u586b\u8fdb\u8f93\u5165\u6846\uff08\u7b54\u6848\u6c38\u8fdc\u53ea\u6709\u4e00\u4e2a\u6765\u6e90\uff0c\u4e0d\u4f1a\u641e\u6df7\u586b\u54ea\u8fb9\uff09
    //   \u00b7 \u6253\u5b57   \u2192 \u6807\u7b7e\u5b9e\u65f6\u8fc7\u6ee4\uff08\u7b49\u4ef7\u4e8e\u4e0b\u62c9\u6846\u7684\u7b5b\u9009\u80fd\u529b\uff09
    //   \u00b7 \u7559\u7a7a   \u2192 \u8868\u793a\u300c\u4e0d\u5206\u7ec4\u300d\uff0c\u6709\u4e13\u95e8\u7684\u865a\u7ebf\u6807\u7b7e\u660e\u793a
    //
    // \u9000\u51fa\u65b9\u5f0f\u4e0e\u6392\u5e8f\u6d6e\u5c42\u4e00\u81f4\uff1a\u53d6\u6d88 / \u00d7 / \u70b9\u906e\u7f69\u7a7a\u767d / Esc \u56db\u6761\u8def\u3002
    // --------------------------------------------------------------------------
    function openDialog(opts) {
      const o = opts || {};
      const fields = (o.fields || []).filter(Boolean);

      return new Promise((resolve) => {
        // \u540c\u4e00\u65f6\u523b\u53ea\u4fdd\u7559\u4e00\u4e2a\u5f39\u7a97
        try { PAGE_DOC.querySelectorAll('.yqm-dialog-overlay').forEach((n) => n.remove()); } catch (_e) { /* ignore */ }

        const overlay = el('div', { class: 'yqm-dialog-overlay' });
        const card = el('div', { class: 'yqm-dialog' });
        const body = el('div', { class: 'yqm-dialog-body' });
        const inputs = Object.create(null);
        const chipBoxes = Object.create(null);

        let done = false;
        function finish(val) {
          if (done) return;
          done = true;
          try { PAGE_DOC.removeEventListener('keydown', onKey); } catch (_e) { /* ignore */ }
          overlay.remove();
          resolve(val);
        }
        const cancel = () => finish(null);

        function submit() {
          const out = Object.create(null);
          let missing = null;
          fields.forEach((f) => {
            const v = inputs[f.key] ? String(inputs[f.key].value || '').trim() : '';
            out[f.key] = v;
            if (!v && f.required && !missing) missing = f;
          });
          if (missing) {
            toast(missing.requiredMsg || '\u8bf7\u586b\u5199\u5fc5\u586b\u9879', 'warn');
            if (inputs[missing.key]) { try { inputs[missing.key].focus(); } catch (_e) { /* ignore */ } }
            return;
          }
          if (typeof o.validate === 'function') {
            const err = o.validate(out);
            if (err) { toast(String(err), 'warn'); return; }
          }
          finish(out);
        }

        function onKey(e) {
          if (!e) return;
          if (e.key === 'Escape') { cancel(); return; }
          if (e.key === 'Enter' && e.target && e.target.classList && e.target.classList.contains('yqm-dialog-input')) {
            e.preventDefault();
            submit();
          }
        }

        const norm = (s) => String(s == null ? '' : s).trim().toLowerCase();

        // \u6e32\u67d3\u6807\u7b7e\u5899\uff1a\u865a\u7ebf\u300c\u4e0d\u5206\u7ec4\u300d+ \u5df2\u6709\u5206\u7ec4
        //   filtering = false\uff08\u9ed8\u8ba4\uff09\uff1a\u663e\u793a\u3010\u5168\u90e8\u3011\u5df2\u6709\u5206\u7ec4\uff0c\u4ec5\u9ad8\u4eae\u5f53\u524d\u503c
        //   filtering = true         \uff1a\u6309\u8f93\u5165\u6846\u5185\u5bb9\u7b5b\u9009
        // \u3010\u4e3a\u4ec0\u4e48\u8981\u6709\u8fd9\u4e2a\u5f00\u5173\u3011\u8f93\u5165\u6846\u4f1a\u9884\u586b\u300c\u5f53\u524d\u5206\u7ec4\u300d\uff0c\u82e5\u4e00\u4e0a\u6765\u5c31\u6309\u5b83\u8fc7\u6ee4\uff0c
        // \u7528\u6237\u6253\u5f00\u5f39\u7a97\u53ea\u4f1a\u770b\u5230\u8ddf\u5f53\u524d\u7ec4\u540d\u5339\u914d\u7684\u90a3\u4e00\u4e2a\u6807\u7b7e \u2014\u2014 \u90a3\u5c31\u6ca1\u6cd5\u6311\u522b\u7684\u7ec4\u4e86\u3002
        // \u6240\u4ee5\u53ea\u6709\u7528\u6237\u300c\u771f\u7684\u5728\u6253\u5b57\u300d\uff08input \u4e8b\u4ef6\uff09\u65f6\u624d\u8fc7\u6ee4\u3002
        function renderChips(f, filtering) {
          const box = chipBoxes[f.key];
          const inp = inputs[f.key];
          if (!box || !inp) return;
          const cur = norm(inp.value);
          const q = filtering ? cur : '';
          box.innerHTML = '';

          // \u300c\u4e0d\u5206\u7ec4\u300d\u5e38\u9a7b\u6700\u524d\uff08\u865a\u7ebf\uff09\uff0c\u968f\u65f6\u53ef\u4e00\u952e\u6e05\u7a7a \u2014\u2014 \u9ad8\u4eae\u8868\u793a\u5f53\u524d\u5c31\u662f\u7a7a\u503c
          if (f.blankLabel) {
            box.appendChild(el('span', {
              class: 'yqm-chip blank' + (cur ? '' : ' on'),
              text: f.blankLabel,
              onclick: () => { inp.value = ''; renderChips(f, false); try { inp.focus(); } catch (_e) { /* ignore */ } },
            }));
          }

          let shown = 0;
          (f.options || []).forEach((g) => {
            const name = String(g);
            if (q && norm(name).indexOf(q) === -1) return;
            shown++;
            box.appendChild(el('span', {
              class: 'yqm-chip' + (norm(name) === cur ? ' on' : ''),
              text: name,
              onclick: () => { inp.value = name; renderChips(f, false); try { inp.focus(); } catch (_e) { /* ignore */ } },
            }));
          });

          if (!shown) {
            box.appendChild(el('span', {
              class: 'yqm-chip-empty',
              text: q ? '\u6ca1\u6709\u5339\u914d\u7684\u5206\u7ec4\uff0c\u53ef\u76f4\u63a5\u7528\u8fd9\u4e2a\u65b0\u540d\u5b57' : (f.emptyHint || '\u8fd8\u6ca1\u6709\u5206\u7ec4\uff0c\u76f4\u63a5\u8f93\u5165\u65b0\u540d\u5b57\u5373\u53ef'),
            }));
          }
        }

        fields.forEach((f) => {
          const field = el('div', { class: 'yqm-field' });
          if (f.label) field.appendChild(el('div', { class: 'yqm-field-label', text: f.label }));

          const inp = el('input', {
            class: 'yqm-dialog-input',
            type: 'text',
            placeholder: f.placeholder || '',
            value: f.value || '',
            autocomplete: 'off',
            spellcheck: 'false',
          });
          inputs[f.key] = inp;
          if (Array.isArray(f.options)) inp.addEventListener('input', () => renderChips(f, true));
          field.appendChild(inp);

          if (Array.isArray(f.options)) {
            const box = el('div', { class: 'yqm-chips' });
            chipBoxes[f.key] = box;
            field.appendChild(box);
          }
          if (f.hint) field.appendChild(el('div', { class: 'yqm-field-hint', text: f.hint }));

          body.appendChild(field);
        });

        card.appendChild(el('div', { class: 'yqm-dialog-header' }, [
          el('span', { class: 'yqm-dialog-title', text: o.title || '' }),
          el('button', { class: 'yqm-close', html: '&times;', title: '\u53d6\u6d88', onclick: cancel }),
        ]));
        card.appendChild(body);
        card.appendChild(el('div', { class: 'yqm-dialog-footer' }, [
          el('button', { class: 'yqm-btn', text: '\u53d6\u6d88', onclick: cancel }),
          el('button', { class: 'yqm-btn primary', text: o.confirmText || '\u786e\u5b9a', onclick: submit }),
        ]));

        overlay.appendChild(card);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) cancel(); });
        try { PAGE_DOC.addEventListener('keydown', onKey); } catch (_e) { /* ignore */ }

        PAGE_DOC.body.appendChild(overlay);

        fields.forEach((f) => { if (Array.isArray(f.options)) renderChips(f, false); });

        // \u81ea\u52a8\u805a\u7126\u7b2c\u4e00\u4e2a\u8f93\u5165\u6846\uff0c\u7701\u4e00\u6b21\u70b9\u51fb\uff08\u624b\u673a\u4e0a\u5c24\u5176\u91cd\u8981\uff09
        const first = fields.length ? fields[0].key : '';
        if (inputs[first]) {
          setTimeout(() => {
            try { inputs[first].focus(); inputs[first].select(); } catch (_e) { /* ignore */ }
          }, 30);
        }
      });
    }

    // --------------------------------------------------------------------------
    // \u914d\u8272\u4e3b\u9898
    //   \u63d2\u4ef6\u5b8c\u5168\u7528\u81ea\u5df1\u7684\u914d\u8272\uff0c\u4e0d\u8ddf\u968f\u9152\u9986\u4e3b\u9898 \u2014\u2014 \u9152\u9986\u6ca1\u6709\u300c\u65e5/\u591c\u300d\u5f00\u5173\uff0c
    //   \u5b83\u7684\u4e3b\u9898\u662f\u4e00\u6574\u5957 JSON \u4e14\u672a\u6807\u660e\u660e\u6697\uff0c\u8ddf\u968f\u53ea\u4f1a\u51fa\u82b1\u8138\u3002
    //   \u5b9e\u73b0\uff1a\u7ed9 <body> \u52a0 data-yqm-theme="<id>"\uff0cpanel.css \u91cc\u6309 id \u5b9a\u4e49\u53d8\u91cf\u7ec4\u3002
    //   \u65b0\u589e\u4e00\u5957\u914d\u8272\uff1a\u5f80 THEMES \u91cc\u52a0\u4e00\u9879\uff0c\u518d\u5f80 CSS \u91cc\u6284\u4e00\u6bb5\u53d8\u91cf\u5373\u53ef\u3002
    // --------------------------------------------------------------------------
    const THEME_KEY = 'yzm_quick_panel_theme_v1';
    const RECENT_KEY = 'yzm_quick_panel_theme_recent_v1';
    const RECENT_MAX = 3;   // \u300c\u6700\u8fd1\u7528\u8fc7\u300d\u6700\u591a\u7f6e\u9876\u51e0\u5957
    const THEMES = [
      // \u2500\u2500 \u7d2b\u8c03 \u2500\u2500
      { id: 'youyue', group: '\u7d2b\u8c03', name: '\u6708\u5149\u767d', a: '#c4a7ff', b: '#8a63f0', dot: '#eef2ff' },
      { id: 'youyue-pink', group: '\u7d2b\u8c03', name: '\u871c\u6843\u7c89', a: '#e0a9ec', b: '#b56fd8', dot: '#ff9fbe' },
      { id: 'violet', group: '\u7d2b\u8c03', name: '\u6df1\u7d2b\u7f57\u5170', a: '#a97fe0', b: '#8a5ecb', dot: '#c9a6ff' },
      // \u2500\u2500 \u91d1\u5c5e \u2500\u2500
      { id: 'gold-champagne', group: '\u91d1\u5c5e', name: '\u9ed1\u91d1 \u00b7 \u9999\u69df', a: '#d4af6a', b: '#a8802f', dot: '#f2dfae' },
      { id: 'gold-bright', group: '\u91d1\u5c5e', name: '\u9ed1\u91d1 \u00b7 \u938f\u91d1', a: '#f5c542', b: '#d99f1a', dot: '#ffd95e' },
      { id: 'silver', group: '\u91d1\u5c5e', name: '\u9ed1\u94f6', a: '#c3cad6', b: '#8e97a6', dot: '#eef3fc' },
      // \u2500\u2500 \u9187\u7ea2 \u2500\u2500
      { id: 'crimson-gold', group: '\u9187\u7ea2', name: '\u9152\u7ea2 \u00b7 \u91d1', a: '#d4af6a', b: '#a8802f', dot: '#f2dfae' },
      { id: 'crimson-classic', group: '\u9187\u7ea2', name: '\u52c3\u826e\u7b2c\u7ea2', a: '#e9c67e', b: '#c19a45', dot: '#f7e8c0' },
      { id: 'crimson-black', group: '\u9187\u7ea2', name: '\u7ea2\u9ed1', a: '#c8505a', b: '#a83a45', dot: '#f08a92' },
      // \u2500\u2500 \u84dd\u8c03 \u2500\u2500
      { id: 'night', group: '\u84dd\u8c03', name: '\u591c\u84dd', a: '#7c9cff', b: '#5b7cfa', dot: '#3ecf8e' },
      { id: 'blue-mist', group: '\u84dd\u8c03', name: '\u6d45\u84dd\u767d', a: '#4e7fb8', b: '#35608e', dot: '#35608e' },
      { id: 'aqua', group: '\u84dd\u8c03', name: '\u6c34\u84dd \u00b7 \u94f6\u767d', a: '#4fc8e8', b: '#3195b4', dot: '#dceaf2' },
      { id: 'peacock', group: '\u84dd\u8c03', name: '\u5b54\u96c0\u84dd \u00b7 \u82cd\u9752', a: '#58b5d0', b: '#3f9ab8', dot: '#9fc9d6' },
      { id: 'prussian', group: '\u84dd\u8c03', name: '\u666e\u9c81\u58eb\u84dd \u00b7 \u91d1', a: '#d4af6a', b: '#a8802f', dot: '#f2dfae' },
      // \u2500\u2500 \u8349\u6728 \u2500\u2500
      { id: 'sprout', group: '\u8349\u6728', name: '\u5ae9\u82bd\u7eff', a: '#43884f', b: '#2f6b3f', dot: '#2f6b3f' },
      { id: 'verdant', group: '\u8349\u6728', name: '\u9752\u7fe0\u6b32\u6ef4', a: '#5fd97f', b: '#31965a', dot: '#a7f3c0' },
      { id: 'moss', group: '\u8349\u6728', name: '\u96e8\u96fe\u7eff', a: '#a8c4af', b: '#869e8d', dot: '#dceade' },
      { id: 'ancient', group: '\u8349\u6728', name: '\u68ee\u6797\u53e4\u6728', a: '#7a5a3c', b: '#5a4230', dot: '#a8825a' },
      // \u2500\u2500 \u7d20\u51c0 \u2500\u2500
      { id: 'graphite', group: '\u7d20\u51c0', name: '\u77f3\u58a8\u7070', a: '#d6dae1', b: '#aab0ba', dot: '#ffffff' },
      { id: 'mist', group: '\u7d20\u51c0', name: '\u96fe\u767d', a: '#b3bcc7', b: '#8d97a4', dot: '#808c9b' },
      { id: 'cream', group: '\u7d20\u51c0', name: '\u5976\u9ec4\u6708\u767d', a: '#ffe98f', b: '#f0d155', dot: '#f0d155' },
    ];
    const DEFAULT_THEME = 'youyue';

    // \u6700\u8fd1\u7528\u8fc7\u7684\uff08\u7f6e\u9876\u7528\uff09\u3002\u8fd9\u6837\u914d\u8272\u591a\u4e86\u4ee5\u540e\u4e0d\u7528\u6bcf\u6b21\u6ed1\u5230\u5e95\u627e\u3002
    function recentThemes() {
      try {
        const arr = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
        if (!Array.isArray(arr)) return [];
        return arr.filter((id) => THEMES.some((t) => t.id === id)).slice(0, RECENT_MAX);
      } catch (_e) { return []; }
    }

    function pushRecentTheme(id) {
      try {
        const arr = recentThemes().filter((x) => x !== id);
        arr.unshift(id);
        localStorage.setItem(RECENT_KEY, JSON.stringify(arr.slice(0, RECENT_MAX)));
      } catch (_e) { /* ignore */ }
    }

    function currentTheme() {
      try {
        const v = localStorage.getItem(THEME_KEY);
        return THEMES.some((t) => t.id === v) ? v : DEFAULT_THEME;
      } catch (_e) { return DEFAULT_THEME; }
    }

    function applyTheme(id) {
      const theme = THEMES.some((t) => t.id === id) ? id : DEFAULT_THEME;
      try { localStorage.setItem(THEME_KEY, theme); } catch (_e) { /* ignore */ }
      pushRecentTheme(theme);
      try {
        if (PAGE_DOC && PAGE_DOC.body) {
          // \u9ed8\u8ba4\u4e3b\u9898\u5c31\u662f CSS \u91cc :root \u90a3\u4e00\u7ec4\uff0c\u4e0d\u7528\u6302\u5c5e\u6027
          if (theme === DEFAULT_THEME) PAGE_DOC.body.removeAttribute('data-yqm-theme');
          else PAGE_DOC.body.setAttribute('data-yqm-theme', theme);
        }
      } catch (_e) { /* ignore */ }
      return theme;
    }

    // \u914d\u8272\u9009\u62e9\u6d6e\u5c42\uff1a\u70b9\u6761\u76ee\u5373\u5e94\u7528\u5e76\u5173\u95ed\uff08\u9000\u51fa\u65b9\u5f0f\u540c\u5176\u5b83\u5f39\u5c42\uff1a\u00d7 / \u70b9\u906e\u7f69 / Esc\uff09
    function openThemePicker() {
      try { PAGE_DOC.querySelectorAll('.yqm-theme-overlay').forEach((n) => n.remove()); } catch (_e) { /* ignore */ }

      const overlay = el('div', { class: 'yqm-dialog-overlay yqm-theme-overlay' });
      const card = el('div', { class: 'yqm-dialog yqm-theme-card' });
      const list = el('div', { class: 'yqm-theme-list' });
      const cur = currentTheme();

      let closed = false;
      function close() {
        if (closed) return;
        closed = true;
        try { PAGE_DOC.removeEventListener('keydown', onKey); } catch (_e) { /* ignore */ }
        overlay.remove();
      }
      function onKey(e) { if (e && e.key === 'Escape') close(); }
      try { PAGE_DOC.addEventListener('keydown', onKey); } catch (_e) { /* ignore */ }

      const makeItem = (t) => el('div', {
        class: 'yqm-theme-item' + (t.id === cur ? ' on' : ''),
        onclick: () => { applyTheme(t.id); close(); toast(`\u914d\u8272\u5df2\u5207\u6362\u4e3a\u300c${t.name}\u300d`); },
      }, [
        el('span', { class: 'yqm-theme-swatches' }, [
          el('span', { class: 'yqm-theme-swatch', style: `--sw-a:${t.a};--sw-b:${t.b}` }),
          el('span', { class: 'yqm-theme-dot2', style: `background:${t.dot}` }),
        ]),
        el('span', { class: 'yqm-theme-name', text: t.name }),
        el('span', { class: 'yqm-theme-check', text: '\u2713' }),
      ]);

      // \u300c\u6700\u8fd1\u7528\u8fc7\u300d\u7f6e\u9876\uff1a\u5957\u6570\u591a\u4e86\u4ee5\u540e\u5217\u8868\u8981\u6eda\u52a8\uff0c\u5e38\u7528\u7684\u4e00\u773c\u5c31\u80fd\u70b9\u5230
      const recent = recentThemes();
      if (recent.length) {
        list.appendChild(el('div', { class: 'yqm-theme-group', text: '\u6700\u8fd1\u7528\u8fc7' }));
        recent.forEach((id) => {
          const t = THEMES.find((x) => x.id === id);
          if (t) list.appendChild(makeItem(t));
        });
      }

      let lastGroup = null;
      THEMES.forEach((t) => {
        // \u5206\u7ec4\u5c0f\u6807\u9898\uff08\u7d2b\u8c03 / \u91d1\u5c5e / \u9187\u7ea2 / \u84dd\u8c03 / \u8349\u6728 / \u7d20\u51c0\uff09
        if (t.group && t.group !== lastGroup) {
          lastGroup = t.group;
          list.appendChild(el('div', { class: 'yqm-theme-group', text: t.group }));
        }
        list.appendChild(makeItem(t));
      });

      card.appendChild(el('div', { class: 'yqm-dialog-header' }, [
        el('span', { class: 'yqm-dialog-title', text: '\u914d\u8272' }),
        el('button', { class: 'yqm-close', html: '&times;', title: '\u5173\u95ed', onclick: close }),
      ]));
      card.appendChild(list);
      overlay.appendChild(card);
      overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
      PAGE_DOC.body.appendChild(overlay);
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
      const btnHiddenOnly = el('button', {
        class: 'yqm-btn',
        text: '\u53ea\u770b\u5df2\u9690\u85cf',
        title: '\u4ec5\u663e\u793a\u5df2\u9690\u85cf\u7684\u6761\u76ee\uff08\u518d\u6b21\u70b9\u51fb\u6062\u590d\u5168\u90e8\uff09',
        onclick: () => toggleViewFilter('hidden'),
      });
      const btnShownOnly = el('button', {
        class: 'yqm-btn',
        text: '\u53ea\u770b\u5df2\u663e\u793a',
        title: '\u4ec5\u663e\u793a\u5df2\u663e\u793a\u7684\u6761\u76ee\uff08\u518d\u6b21\u70b9\u51fb\u6062\u590d\u5168\u90e8\uff09',
        onclick: () => toggleViewFilter('shown'),
      });
      const btnSavePreset = el('button', {
        class: 'yqm-btn',
        text: '\u4fdd\u5b58\u4e3a\u9884\u8bbe',
        title: '\u628a\u5f53\u524d\u52fe\u9009\u7684\u6761\u76ee\u5b58\u4e3a\u65b0\u9884\u8bbe',
        onclick: saveAsPreset,
      });
      const btnUp = el('button', {
        class: 'yqm-btn yqm-btn-narrow',
        text: '\u2191',
        title: '\u5728\u7ec4\u5185\u4e0a\u79fb',
        onclick: () => movePresetBy('up'),
      });
      const btnDown = el('button', {
        class: 'yqm-btn yqm-btn-narrow',
        text: '\u2193',
        title: '\u5728\u7ec4\u5185\u4e0b\u79fb',
        onclick: () => movePresetBy('down'),
      });
      const moreBtn = el('button', {
        class: 'yqm-btn',
        text: '\u22ef',
        title: '\u66f4\u591a\u9884\u8bbe\u64cd\u4f5c',
        onclick: toggleAdvanced,
      });
      const moreRow = el('div', { class: 'yqm-row yqm-actions yqm-more-row' }, [
        el('button', { class: 'yqm-btn', text: '\u91cd\u547d\u540d', onclick: renamePreset }),
        el('button', { class: 'yqm-btn', text: '\u5206\u7ec4', onclick: presetGroup }),
        el('button', { class: 'yqm-btn', text: '\u6392\u5e8f\u6a21\u5f0f', onclick: openSortMode }),
        el('button', { class: 'yqm-btn warn', text: '\u5220\u9664', onclick: removePreset }),
      ]);

      const panel = el('div', { class: 'yqm-panel' }, [
        el('div', { class: 'yqm-header' }, [
          el('span', { class: 'yqm-title', text: '\u8bb0\u5fc6\u5feb\u6377\u9762\u677f' }),
          el('div', { class: 'yqm-header-right' }, [
            el('button', {
              class: 'yqm-theme-btn',
              title: '\u6362\u914d\u8272',
              onclick: openThemePicker,
            }, [
              // \u53cc\u8272\u5c0f\u5706\uff1a\u5de6\uff1d\u4e3b\u8272\uff08\u968f\u4e3b\u9898\u53d8\u8272\uff09\uff0c\u53f3\uff1d\u8be5\u4e3b\u9898\u300c\u4eae\u8d77\u6765\u300d\u7684\u989c\u8272
              el('span', { class: 'yqm-theme-swatches' }, [
                el('span', { class: 'yqm-theme-swatch' }),
                el('span', { class: 'yqm-theme-dot2' }),
              ]),
            ]),
            el('button', { class: 'yqm-close', html: '&times;', onclick: closePanel, title: '\u5173\u95ed' }),
          ]),
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
          ]),
          el('div', { class: 'yqm-row yqm-actions' }, [
            btnHiddenOnly,
            btnShownOnly,
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
            btnUp,
            btnDown,
          ]),
          el('div', { class: 'yqm-row yqm-actions' }, [
            btnSavePreset,
            el('button', { class: 'yqm-btn primary', text: '\u5e94\u7528\u9884\u8bbe', onclick: applyPreset }),
            moreBtn,
          ]),
          moreRow,
          el('div', { class: 'yqm-row yqm-actions' }, [
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
            el('span', { class: 'yqm-label', text: '\u5927\u5c0f' }),
            ...BALL_SIZES.map((s) => el('button', {
              class: `yqm-btn yqm-btn-narrow yqm-ball-size-btn${s.id === ballSize() ? ' active' : ''}`,
              'data-size': s.id,
              text: s.name,
              title: `\u60ac\u6d6e\u7403\u5927\u5c0f\uff1a${s.name}`,
              onclick: () => {
                setBallSize(s.id);
                (ui.$ballSizeBtns || []).forEach((b) => {
                  b.classList.toggle('active', b.getAttribute('data-size') === s.id);
                });
                toast(`\u60ac\u6d6e\u7403\u5927\u5c0f\uff1a${s.name}`);
              },
            })),
          ]),
        ]),
      ]);

      // \u7f13\u5b58\u5f15\u7528
      ui.$tableSelect = tableSelect;
      ui.$searchInput = searchInput;
      ui.$list = list;
      ui.$count = countLabel;
      ui.$presetSelect = presetSelect;
      ui.$btnHiddenOnly = btnHiddenOnly;
      ui.$btnShownOnly = btnShownOnly;
      ui.$savePresetBtn = btnSavePreset;
      ui.$moreRow = moreRow;
      ui.$moreBtn = moreBtn;
      ui.$btnUp = btnUp;
      ui.$btnDown = btnDown;
      ui.$ballSizeBtns = Array.from(panel.querySelectorAll('.yqm-ball-size-btn'));

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
      syncFilterButtons();
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
    // \u5f53\u524d\u300c\u5217\u8868\u91cc\u5b9e\u9645\u53ef\u89c1\u300d\u7684\u6761\u76ee = \u89c6\u56fe\u8fc7\u6ee4 + \u5173\u952e\u8bcd\u641c\u7d22 \u53e0\u52a0
    function visibleRecords() {
      const keyword = ui.searchText.trim().toLowerCase();
      return ui.records.filter((r) => {
        if (ui.viewFilter === 'hidden' && !r.hidden) return false;
        if (ui.viewFilter === 'shown' && r.hidden) return false;
        if (keyword && !r.name.toLowerCase().includes(keyword)) return false;
        return true;
      });
    }

    function renderList() {
      const list = ui.$list;
      if (!list) return;
      const filtered = visibleRecords();

      list.innerHTML = '';
      if (!filtered.length) {
        let emptyText = '\u8fd9\u5f20\u8868\u8fd8\u6ca1\u6709\u6761\u76ee';
        if (ui.records.length) {
          if (ui.viewFilter === 'hidden') emptyText = '\u6ca1\u6709\u5df2\u9690\u85cf\u7684\u6761\u76ee';
          else if (ui.viewFilter === 'shown') emptyText = '\u6ca1\u6709\u5df2\u663e\u793a\u7684\u6761\u76ee';
          else emptyText = '\u6ca1\u6709\u5339\u914d\u7684\u6761\u76ee';
        }
        list.appendChild(el('div', { class: 'yqm-empty', text: emptyText }));
        updateCount();
        return;
      }

      filtered.forEach((r) => {
        const isChecked = ui.checked.has(r.id);
        const row = el('label', { class: `yqm-item${isChecked ? ' checked' : ''}${r.hidden ? ' is-hidden' : ''}` }, [
          // \u72b6\u6001\u5706\u70b9\uff1a\u5b9e\u5fc3\u4eae\u8272\uff1d\u5df2\u663e\u793a\uff0c\u7a7a\u5fc3\u7070\u5708\uff1d\u5df2\u9690\u85cf\uff08\u989c\u8272\u968f\u4e3b\u9898\u8d70\uff09
          el('span', { class: 'yqm-dot', title: r.hidden ? '\u5df2\u9690\u85cf' : '\u5df2\u663e\u793a' }),
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
      const visible = visibleRecords().length;
      const total = ui.records.length;
      ui.$count.textContent = visible === total
        ? `\u5df2\u9009 ${ui.checked.size} / \u5171 ${total}`
        : `\u5df2\u9009 ${ui.checked.size} / \u53ef\u89c1 ${visible}\uff08\u5171 ${total}\uff09`;
    }

    // --------------------------------------------------------------------------
    // \u4ea4\u4e92\u56de\u8c03
    // --------------------------------------------------------------------------
    function onTableChange(e) {
      ui.selectedTableId = e.target.value;
      ui.checked.clear();
      ui.viewFilter = '';
      try { localStorage.setItem(LS_KEY_SELECTED_TABLE, ui.selectedTableId); } catch (_e) { /* ignore */ }
      loadRecords();
      renderPresets();
      syncFilterButtons();
    }

    function onSearchInput(e) {
      ui.searchText = e.target.value || '';
      renderList();
    }

    function selectAll() {
      visibleRecords().forEach((r) => ui.checked.add(r.id));
      renderList();
    }

    function clearAll() {
      ui.checked.clear();
      renderList();
    }

    function invertSelection() {
      visibleRecords().forEach((r) => {
        if (ui.checked.has(r.id)) ui.checked.delete(r.id);
        else ui.checked.add(r.id);
      });
      renderList();
    }

    // \u5207\u6362\u300c\u5217\u8868\u8fc7\u6ee4\u89c6\u56fe\u300d\uff1a\u53ea\u5f71\u54cd\u5217\u8868\u663e\u793a\uff0c\u5e76\u987a\u624b\u5168\u9009\u8fc7\u6ee4\u7ed3\u679c\uff0c\u65b9\u4fbf\u4e00\u952e\u64cd\u4f5c\u3002
    // \u518d\u6b21\u70b9\u51fb\u540c\u4e00\u6309\u94ae \u2192 \u53d6\u6d88\u8fc7\u6ee4\uff0c\u6062\u590d\u5168\u90e8\u3002
    function toggleViewFilter(kind) {
      if (ui.viewFilter === kind) {
        ui.viewFilter = '';
        ui.checked.clear();
        renderList();
        syncFilterButtons();
        toast('\u5df2\u6062\u590d\u663e\u793a\u5168\u90e8\u6761\u76ee');
        return;
      }
      ui.viewFilter = kind;
      ui.checked.clear();
      const pool = visibleRecords();
      pool.forEach((r) => ui.checked.add(r.id));
      renderList();
      syncFilterButtons();
      toast(kind === 'hidden'
        ? `\u53ea\u770b\u5df2\u9690\u85cf\uff1a${pool.length} \u4e2a\uff08\u5df2\u5168\u9009\uff09`
        : `\u53ea\u770b\u5df2\u663e\u793a\uff1a${pool.length} \u4e2a\uff08\u5df2\u5168\u9009\uff09`);
    }

    // \u540c\u6b65\u8fc7\u6ee4\u6309\u94ae\u7684\u9ad8\u4eae\u6001
    function syncFilterButtons() {
      if (ui.$btnHiddenOnly) ui.$btnHiddenOnly.classList.toggle('active', ui.viewFilter === 'hidden');
      if (ui.$btnShownOnly) ui.$btnShownOnly.classList.toggle('active', ui.viewFilter === 'shown');
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

      // \u6309\u5206\u7ec4\u805a\u5408\uff08\u4fdd\u6301 listPresets \u7684\u6392\u5e8f\uff1a\u6709\u5206\u7ec4\u5728\u524d\u3001\u672a\u5206\u7ec4\u57ab\u5e95\uff09
      const groupSeq = [];
      const buckets = new Map();
      list.forEach((p) => {
        const g = p.group || '';
        if (!buckets.has(g)) { buckets.set(g, []); groupSeq.push(g); }
        buckets.get(g).push(p);
      });

      const makeOpt = (p) => {
        const opt = el('option', { value: p.name, text: `${p.name}\uff08${p.recordIds.length}\uff09` });
        if (p.name === ui.selectedPreset) opt.selected = true;
        return opt;
      };

      groupSeq.forEach((g) => {
        const items = buckets.get(g);
        if (!g) {
          items.forEach((p) => sel.appendChild(makeOpt(p)));
        } else {
          const og = el('optgroup', { label: g });
          items.forEach((p) => og.appendChild(makeOpt(p)));
          sel.appendChild(og);
        }
      });

      syncSavePresetButton();
    }

    function onPresetChange(e) {
      ui.selectedPreset = e.target.value || '';
      syncSavePresetButton();
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

    // \u4fdd\u5b58 / \u66f4\u65b0\u9884\u8bbe\uff1a
    //   - \u5df2\u5728\u4e0b\u62c9\u6846\u9009\u4e2d\u67d0\u9884\u8bbe \u2192 \u76f4\u63a5\u7528\u5f53\u524d\u52fe\u9009\u8986\u76d6\u5b83\uff08\u65e0\u9700\u91cd\u65b0\u8f93\u540d\u5b57\uff09
    //   - \u672a\u9009\u4e2d \u2192 \u5f39\u7a97\u4e00\u6b21\u6027\u95ee\u300c\u9884\u8bbe\u540d + \u5206\u7ec4\u300d\uff08\u4e0d\u518d\u4f9d\u8d56\u300c\u7ec4\u540d/\u9884\u8bbe\u540d\u300d\u659c\u6760\u8bed\u6cd5\uff09
    async function saveAsPreset() {
      if (!ui.checked.size) {
        toast('\u8bf7\u5148\u52fe\u9009\u8981\u4fdd\u5b58\u7684\u89d2\u8272', 'warn');
        return;
      }

      const current = ui.selectedPreset ? Presets().getPreset(ui.selectedPreset) : null;

      if (current) {
        const res = Presets().savePreset(ui.selectedPreset, ui.selectedTableId, Array.from(ui.checked));
        if (res.ok) {
          toast(`\u5df2\u66f4\u65b0\u9884\u8bbe\u300c${ui.selectedPreset}\u300d`, 'ok');
          renderPresets();
        } else {
          toast('\u66f4\u65b0\u5931\u8d25\uff1a' + (res.error || ''), 'warn');
        }
        return;
      }

      const r = await openDialog({
        title: '\u4fdd\u5b58\u4e3a\u9884\u8bbe',
        confirmText: '\u4fdd\u5b58',
        fields: [
          {
            key: 'name',
            label: '\u9884\u8bbe\u540d\u79f0',
            placeholder: '\u4f8b\u5982\uff1a\u9ad8\u6f6e\u7ae0',
            required: true,
            requiredMsg: '\u8bf7\u5148\u586b\u9884\u8bbe\u540d\u79f0',
          },
          {
            key: 'group',
            label: '\u5206\u7ec4\uff08\u53ef\u7559\u7a7a\uff09',
            placeholder: '\u70b9\u4e0b\u65b9\u6807\u7b7e\u9009\u62e9\uff0c\u6216\u8f93\u5165\u65b0\u5206\u7ec4\u540d',
            options: Presets().listGroups(),
            blankLabel: '\u2715 \u4e0d\u5206\u7ec4',
            value: '',
          },
        ],
        validate: (v) => (Presets().getPreset(v.name)
          ? `\u9884\u8bbe\u300c${v.name}\u300d\u5df2\u5b58\u5728\uff1b\u8981\u8986\u76d6\u5b83\u8bf7\u5148\u5728\u4e0b\u62c9\u6846\u9009\u4e2d\u5b83\uff0c\u518d\u70b9\u300c\u66f4\u65b0\u9884\u8bbe\u300d`
          : null),
      });
      if (!r) return;

      const res = Presets().savePreset(r.name, ui.selectedTableId, Array.from(ui.checked), { group: r.group });
      if (res.ok) {
        toast(r.group ? `\u5df2\u4fdd\u5b58\u300c${r.name}\u300d\uff08\u5206\u7ec4\uff1a${r.group}\uff09` : `\u5df2\u4fdd\u5b58\u9884\u8bbe\u300c${r.name}\u300d`, 'ok');
        ui.selectedPreset = r.name;
        renderPresets();
      } else {
        toast('\u4fdd\u5b58\u5931\u8d25\uff1a' + (res.error || ''), 'warn');
      }
    }

    // \u4f9d\u636e\u300c\u662f\u5426\u9009\u4e2d\u4e86\u9884\u8bbe\u300d\u5207\u6362\u4fdd\u5b58\u6309\u94ae\u7684\u6587\u6848
    function syncSavePresetButton() {
      if (!ui.$savePresetBtn) return;
      const p = ui.selectedPreset ? Presets().getPreset(ui.selectedPreset) : null;
      if (p) {
        ui.$savePresetBtn.textContent = '\u66f4\u65b0\u9884\u8bbe';
        ui.$savePresetBtn.title = `\u7528\u5f53\u524d\u52fe\u9009\u8986\u76d6\u9884\u8bbe\u300c${ui.selectedPreset}\u300d`;
      } else {
        ui.$savePresetBtn.textContent = '\u4fdd\u5b58\u4e3a\u9884\u8bbe';
        ui.$savePresetBtn.title = '\u628a\u5f53\u524d\u52fe\u9009\u7684\u6761\u76ee\u5b58\u4e3a\u65b0\u9884\u8bbe';
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

    // \u91cd\u547d\u540d\u5f53\u524d\u9009\u4e2d\u7684\u9884\u8bbe\uff08\u4fdd\u7559\u5185\u5bb9\uff0c\u53ea\u6362\u540d\u5b57\uff09
    function renamePreset() {
      if (!ui.selectedPreset) { toast('\u8bf7\u5148\u5728\u4e0b\u62c9\u6846\u9009\u62e9\u8981\u91cd\u547d\u540d\u7684\u9884\u8bbe', 'warn'); return; }
      const old = ui.selectedPreset;
      if (!Presets().getPreset(old)) { toast('\u9884\u8bbe\u4e0d\u5b58\u5728', 'warn'); return; }
      const input = window.prompt(`\u628a\u9884\u8bbe\u300c${old}\u300d\u91cd\u547d\u540d\u4e3a\uff1a`, old);
      if (!input || !input.trim()) return;
      const clean = input.trim();
      if (clean === old) return;
      const exists = !!Presets().getPreset(clean);
      if (exists && !window.confirm(`\u9884\u8bbe\u300c${clean}\u300d\u5df2\u5b58\u5728\uff0c\u8981\u8986\u76d6\u5b83\u5417\uff1f`)) return;
      const res = Presets().renamePreset(old, clean, { overwrite: exists });
      if (res.ok) {
        ui.selectedPreset = clean;
        renderPresets();
        toast(`\u5df2\u91cd\u547d\u540d\u4e3a\u300c${clean}\u300d`, 'ok');
      } else {
        toast('\u91cd\u547d\u540d\u5931\u8d25\uff1a' + (res.error || ''), 'warn');
      }
    }

    // \u5c55\u5f00 / \u6536\u8d77\u300c\u22ef\u300d\u66f4\u591a\u64cd\u4f5c
    function toggleAdvanced() {
      ui.advOpen = !ui.advOpen;
      if (ui.$moreRow) ui.$moreRow.style.display = ui.advOpen ? 'flex' : 'none';
      if (ui.$moreBtn) ui.$moreBtn.classList.toggle('active', ui.advOpen);
    }

    // \u5f52\u5165 / \u79fb\u51fa\u5206\u7ec4\uff08\u7559\u7a7a = \u672a\u5206\u7ec4\uff09\u3002\u5df2\u6709\u5206\u7ec4\u5217\u6210\u53ef\u70b9\u6807\u7b7e\uff0c\u4e0d\u7528\u624b\u6253\u3002
    async function presetGroup() {
      if (!ui.selectedPreset) { toast('\u8bf7\u5148\u5728\u4e0b\u62c9\u6846\u9009\u62e9\u9884\u8bbe', 'warn'); return; }
      const cur = Presets().getPreset(ui.selectedPreset);
      if (!cur) { toast('\u9884\u8bbe\u4e0d\u5b58\u5728', 'warn'); return; }

      const r = await openDialog({
        title: `\u628a\u300c${ui.selectedPreset}\u300d\u5f52\u5165\u5206\u7ec4`,
        confirmText: '\u786e\u5b9a',
        fields: [
          {
            key: 'group',
            label: '\u5206\u7ec4\u540d',
            placeholder: '\u70b9\u4e0b\u65b9\u6807\u7b7e\u9009\u62e9\uff0c\u6216\u8f93\u5165\u65b0\u5206\u7ec4\u540d',
            value: String(cur.group || ''),
            options: Presets().listGroups(),
            blankLabel: '\u2715 \u4e0d\u5206\u7ec4',
            hint: '\u70b9\u6807\u7b7e\u76f4\u63a5\u586b\u5165\uff1b\u6253\u5b57\u53ef\u7b5b\u9009\u5df2\u6709\u5206\u7ec4',
          },
        ],
      });
      if (!r) return;

      const res = Presets().setPresetGroup(ui.selectedPreset, r.group);
      if (res.ok) {
        renderPresets();
        toast(r.group ? `\u5df2\u5f52\u5165\u5206\u7ec4\u300c${r.group}\u300d` : '\u5df2\u79fb\u51fa\u5206\u7ec4', 'ok');
      } else {
        toast('\u64cd\u4f5c\u5931\u8d25\uff1a' + (res.error || ''), 'warn');
      }
    }

    // \u7ec4\u5185\u4e0a\u79fb / \u4e0b\u79fb
    function movePresetBy(dir) {
      if (!ui.selectedPreset) { toast('\u8bf7\u5148\u9009\u62e9\u9884\u8bbe', 'warn'); return; }
      const res = Presets().movePreset(ui.selectedPreset, dir);
      if (!res.ok) { toast('\u79fb\u52a8\u5931\u8d25\uff1a' + (res.error || ''), 'warn'); return; }
      if (res.unchanged) { toast(dir === 'up' ? '\u5df2\u7ecf\u5728\u6700\u524d\u9762\u4e86' : '\u5df2\u7ecf\u5728\u6700\u540e\u9762\u4e86'); return; }
      renderPresets();
    }

    // ---------------------------------------------------------------
    // \u6392\u5e8f\u6a21\u5f0f\uff1a\u6309\u7ec4\u7f57\u5217\u5168\u90e8\u9884\u8bbe\uff0c\u652f\u6301 \u2191\u2193 \u4e0e\u957f\u6309\u62d6\u62fd\uff08\u4ec5\u7ec4\u5185\u6392\u5e8f\uff09
    // ---------------------------------------------------------------
    function openSortMode() {
      if (ui.sortOverlay) { ui.sortOverlay.remove(); ui.sortOverlay = null; }

      const overlay = el('div', { class: 'yqm-sort-overlay' });
      const card = el('div', { class: 'yqm-sort-card' });
      const body = el('div', { class: 'yqm-sort-body' });

      let closed = false;
      function closeSort() {
        if (closed) return;
        closed = true;
        overlay.remove();
        ui.sortOverlay = null;
        try { PAGE_DOC.removeEventListener('keydown', onKey); } catch (_e) { /* ignore */ }
        renderPresets();
      }

      // \u3010\u9000\u51fa\u65b9\u5f0f\u6709\u4e09\u6761\uff0c\u522b\u53ea\u7559\u4e00\u4e2a\u6309\u94ae\u3011
      //   \u2460 \u5361\u7247\u53f3\u4e0a\u89d2\u300c\u5b8c\u6210\u300d \u2461 \u70b9\u5361\u7247\u5916\u7684\u906e\u7f69\u7a7a\u767d \u2462 \u6309 Esc
      // \u4e4b\u524d\u53ea\u6709 \u2460\uff0c\u800c\u5361\u7247\u9876\u90e8\u4e00\u65e6\u88ab\u88c1\u51fa\u5c4f\u5e55\uff0c\u4eba\u5c31\u5f7b\u5e95\u51fa\u4e0d\u6765\u4e86\u3002
      function onKey(e) {
        if (e && e.key === 'Escape') closeSort();
      }
      try { PAGE_DOC.addEventListener('keydown', onKey); } catch (_e) { /* ignore */ }
      overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSort(); });

      const header = el('div', { class: 'yqm-sort-header' }, [
        el('span', { class: 'yqm-title', text: '\u6392\u5e8f\u9884\u8bbe' }),
        el('button', { class: 'yqm-btn primary', text: '\u5b8c\u6210', onclick: closeSort }),
      ]);

      function renderSort() {
        body.innerHTML = '';
        const list = Presets().listPresets(ui.selectedTableId);
        const seq = [];
        const buckets = new Map();
        list.forEach((p) => {
          const g = p.group || '';
          if (!buckets.has(g)) { buckets.set(g, []); seq.push(g); }
          buckets.get(g).push(p);
        });

        if (!list.length) {
          body.appendChild(el('div', { class: 'yqm-empty', text: '\u6682\u65e0\u9884\u8bbe' }));
          return;
        }

        seq.forEach((g) => {
          body.appendChild(el('div', { class: 'yqm-sort-group', text: g || '\u672a\u5206\u7ec4' }));
          const listEl = el('div', { class: 'yqm-sort-list' });

          buckets.get(g).forEach((p) => {
            listEl.appendChild(el('div', { class: 'yqm-sort-item', 'data-name': p.name }, [
              el('span', { class: 'yqm-sort-handle', text: '\u2630' }),
              el('span', { class: 'yqm-sort-name', text: `${p.name}\uff08${p.recordIds.length}\uff09` }),
              el('button', { class: 'yqm-btn yqm-btn-narrow', text: '\u2191', onclick: () => { Presets().movePreset(p.name, 'up'); renderSort(); } }),
              el('button', { class: 'yqm-btn yqm-btn-narrow', text: '\u2193', onclick: () => { Presets().movePreset(p.name, 'down'); renderSort(); } }),
            ]));
          });

          attachSortDrag(listEl, g);
          body.appendChild(listEl);
        });
      }

      renderSort();
      card.appendChild(header);
      card.appendChild(body);
      overlay.appendChild(card);
      PAGE_DOC.body.appendChild(overlay);
      ui.sortOverlay = overlay;
    }

    // \u7ec4\u5185\u62d6\u62fd\u6392\u5e8f\uff08pointer \u4e8b\u4ef6\uff0c\u79fb\u52a8\u7aef\u53ef\u7528\uff09
    function attachSortDrag(listEl, group) {
      let dragEl = null;

      listEl.addEventListener('pointerdown', (e) => {
        const handle = e.target && e.target.closest ? e.target.closest('.yqm-sort-handle') : null;
        if (!handle) return;
        dragEl = handle.parentElement;
        dragEl.classList.add('dragging');
        e.preventDefault();
      });

      listEl.addEventListener('pointermove', (e) => {
        if (!dragEl) return;
        e.preventDefault();
        const y = e.clientY;
        const others = Array.from(listEl.querySelectorAll('.yqm-sort-item')).filter((n) => n !== dragEl);
        let target = null;
        for (const it of others) {
          const r = it.getBoundingClientRect();
          if (y < r.top + r.height / 2) { target = it; break; }
        }
        if (target) listEl.insertBefore(dragEl, target);
        else listEl.appendChild(dragEl);
      });

      const finish = () => {
        if (!dragEl) return;
        dragEl.classList.remove('dragging');
        dragEl = null;
        const names = Array.from(listEl.querySelectorAll('.yqm-sort-item')).map((n) => n.dataset.name);
        Presets().reorderPresets(group, names);
      };
      listEl.addEventListener('pointerup', finish);
      listEl.addEventListener('pointercancel', finish);
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

    // \u60ac\u6d6e\u7403\u5c3a\u5bf8\uff1a\u5927 / \u6807\u51c6 / \u5c0f\u3002
    // \u5b9e\u73b0\uff1a\u7ed9 <body> \u6302 data-yqm-ball-size\uff0cCSS \u91cc\u7531 --yqm-ball-size \u7edf\u4e00\u63a7\u5236
    // \u5c3a\u5bf8\u3001\u4f4d\u7f6e\u504f\u79fb\u548c\u56fe\u6807\u5b57\u53f7 \u2014\u2014 \u4ee5\u540e\u72d7\u5b50\u9020\u578b\u5171\u7528\u540c\u4e00\u5957\u5c3a\u5bf8\u6863\u4f4d\u3002
    const LS_KEY_BALL_SIZE = 'yzm_quick_panel_ball_size_v1';
    const BALL_SIZES = [
      { id: 'large', name: '\u5927' },
      { id: 'normal', name: '\u6807\u51c6' },
      { id: 'small', name: '\u5c0f' },
    ];
    const DEFAULT_BALL_SIZE = 'large';

    function ballSize() {
      try {
        const v = localStorage.getItem(LS_KEY_BALL_SIZE);
        return BALL_SIZES.some((s) => s.id === v) ? v : DEFAULT_BALL_SIZE;
      } catch (_e) { return DEFAULT_BALL_SIZE; }
    }

    function setBallSize(id) {
      const size = BALL_SIZES.some((s) => s.id === id) ? id : DEFAULT_BALL_SIZE;
      try { localStorage.setItem(LS_KEY_BALL_SIZE, size); } catch (_e) { /* ignore */ }
      try {
        if (PAGE_DOC && PAGE_DOC.body) {
          // \u9ed8\u8ba4\uff08\u5927\uff09\u5c31\u662f CSS \u91cc :root \u90a3\u4e00\u6863\uff0c\u4e0d\u7528\u6302\u5c5e\u6027
          if (size === DEFAULT_BALL_SIZE) PAGE_DOC.body.removeAttribute('data-yqm-ball-size');
          else PAGE_DOC.body.setAttribute('data-yqm-ball-size', size);
        }
      } catch (_e) { /* ignore */ }
      return size;
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

      // \u591a\u91cd\u4fdd\u9669\u7684\u6253\u5f00\u903b\u8f91\uff08\u9632\u79fb\u52a8\u7aef\u4e8b\u4ef6\u5dee\u5f02 / \u5bb9\u5668\u62e6\u622a\uff09
      let lastOpenTap = 0;
      const tryOpen = (tag) => {
        const now = Date.now();
        if (now - lastOpenTap < 400) return; // \u9632\u6b62 touchend+click \u53cc\u89e6\u53d1
        lastOpenTap = now;
        info('\u83dc\u5355\u9879\u89e6\u53d1(' + tag + ')\uff0c\u5c1d\u8bd5\u6253\u5f00\u9762\u677f\u2026');
        try {
          openPanel();
          // \u6253\u5f00\u540e\u81ea\u68c0\u9762\u677f\u53ef\u89c1\u6027
          setTimeout(() => {
            try {
              const p = PAGE_DOC.querySelector('.yqm-panel');
              if (!p) { warn('\u81ea\u68c0:\u9762\u677f\u5143\u7d20\u4e0d\u5b58\u5728\uff01'); return; }
              const cs = PAGE_DOC.defaultView.getComputedStyle(p);
              const r = p.getBoundingClientRect();
              info('\u81ea\u68c0:\u9762\u677f', 'display=' + cs.display, 'position=' + cs.position,
                '\u5c3a\u5bf8=' + Math.round(r.width) + 'x' + Math.round(r.height),
                '\u4f4d\u7f6e=' + Math.round(r.left) + ',' + Math.round(r.top),
                'open\u7c7b=' + p.classList.contains('open'));
            } catch (e) { warn('\u81ea\u68c0\u9762\u677f\u5931\u8d25:', e); }
          }, 150);
        } catch (e) {
          warn('openPanel \u629b\u5f02\u5e38:', e && e.stack ? e.stack : e);
        }
        // \u70b9\u5b8c\u6536\u8d77\u9b54\u6cd5\u68d2\u83dc\u5355\uff08\u7528\u4e3b\u9875\u9762\u81ea\u5df1\u7684 jQuery\uff0c\u907f\u514d\u62ff\u5230 iframe \u91cc\u7684\uff09
        try {
          const jq = PAGE_WIN.jQuery || PAGE_WIN.$ || (typeof jQuery !== 'undefined' ? jQuery : null);
          if (jq) {
            jq(menu).hide();
            jq(PAGE_DOC.getElementById('extensionsMenuButton')).removeClass('rotated');
          }
        } catch (_e) { /* ignore */ }
      };

      item.addEventListener('click', () => tryOpen('click'));
      item.addEventListener('touchend', () => tryOpen('touchend'), { passive: true });
      // \u5bb9\u5668\u7ea7\u6355\u83b7\u4ee3\u7406\uff1a\u5373\u4f7f item \u4e0a\u7684\u4e8b\u4ef6\u88ab\u62e6\u622a\uff0c\u4e5f\u80fd\u5728\u6355\u83b7\u9636\u6bb5\u63a5\u5230
      menu.addEventListener('click', (e) => {
        const t = e.target;
        if (t && (t.id === 'yqm_wand_menu_item' || (t.closest && t.closest('#yqm_wand_menu_item')))) {
          tryOpen('menu-capture');
        }
      }, true);

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

      // \u6062\u590d\u4e0a\u6b21\u9009\u7684\u914d\u8272\u4e0e\u60ac\u6d6e\u7403\u5c3a\u5bf8\uff08\u90fd\u6302\u5728\u4e3b\u9875\u9762 body \u4e0a\uff09
      applyTheme(currentTheme());
      setBallSize(ballSize());

      info('==============================================');
      info('\u8bb0\u5fc6\u5feb\u6377\u9762\u677f v1.7 \u5df2\u52a0\u8f7d\uff08\u60ac\u6d6e\u7403\u53ef\u8c03\u5927\u5c0f / 21 \u5957\u914d\u8272 / \u5f39\u7a97\u5f0f\u4fdd\u5b58 / \u8fc7\u6ee4 / \u6392\u5e8f\uff09');
      info('==============================================');
      info('boot \u5f00\u59cb',
        '| \u8fd0\u884c\u73af\u5883:', (window.parent && window.parent !== window) ? 'iframe(\u9152\u9986\u52a9\u624b)' : '\u4e3b\u9875\u9762(\u6269\u5c55)',
        '| \u9875\u9762\u6587\u6863\u53ef\u8fbe:', !!PAGE_DOC,
        '| URL:', (() => { try { return PAGE_DOC.location.href; } catch (_e) { return 'N/A'; } })());
      info('\u6587\u6863\u63a2\u6d4b\u660e\u7ec6:', PROBE_LOG.join(' || '));
      info('\u83dc\u5355\u5bb9\u5668:', (() => { const m = findExtensionsMenu(); return m ? ('<' + m.tagName.toLowerCase() + (m.id ? '#' + m.id : '') + '>') : '\u672a\u627e\u5230'; })(),
        '| #chat \u5b58\u5728:', !!(() => { try { return PAGE_DOC.getElementById('chat'); } catch (_e) { return false; } })());

      // 0) \u5168\u5c40 Esc\uff1a\u53ea\u8981\u6709\u5f39\u5c42\uff08\u6392\u5e8f\u6d6e\u5c42 / \u5f39\u7a97 / \u914d\u8272\uff09\u5728\u573a\uff0c\u5c31\u4ea4\u7ed9\u5b83\u4eec\u81ea\u5df1\u5904\u7406\uff0c
      //    \u5426\u5219\u4f1a\u628a\u4e3b\u9762\u677f\u4e00\u8d77\u5173\u6389 \u2014\u2014 \u6309\u4e00\u6b21 Esc \u5173\u4e24\u4e2a\uff0c\u662f\u5f88\u70e6\u4eba\u7684\u4f53\u9a8c\u3002
      try {
        PAGE_DOC.addEventListener('keydown', (e) => {
          if (!e || e.key !== 'Escape') return;
          if (ui.sortOverlay || PAGE_DOC.querySelector('.yqm-dialog-overlay')) return;
          if (ui.open) closePanel();
        });
      } catch (_e) { /* ignore */ }

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

      // 3) \u5ef6\u8fdf\u81ea\u68c0\uff1a3 \u79d2\u540e\u68c0\u67e5\u6837\u5f0f\u6ce8\u5165\u4e0e\u7403\u7684\u53ef\u89c1\u6027\uff0c\u628a\u5b9e\u9645\u8ba1\u7b97\u6837\u5f0f\u6253\u8fdb\u65e5\u5fd7
      setTimeout(() => {
        try {
          refreshPageRefs();
          const styleEl = PAGE_DOC.getElementById('yqm-panel-style');
          info('\u81ea\u68c0\u2460 \u6837\u5f0f\u8868\u5df2\u6ce8\u5165\u4e3b\u9875\u9762:', !!styleEl);
          const ball = PAGE_DOC.querySelector('.yqm-ball');
          if (!ball) {
            warn('\u81ea\u68c0\u2461 \u7403\u5143\u7d20\u4e0d\u5b58\u5728\u4e8e\u4e3b\u9875\u9762\uff01');
          } else {
            const win = PAGE_DOC.defaultView;
            const cs = win.getComputedStyle(ball);
            const r = ball.getBoundingClientRect();
            const vh = win.innerHeight, vw = win.innerWidth;
            info('\u81ea\u68c0\u2461 \u7403\u8ba1\u7b97\u6837\u5f0f: position=' + cs.position,
              'display=' + cs.display,
              '\u5c3a\u5bf8=' + Math.round(r.width) + 'x' + Math.round(r.height),
              '\u4f4d\u7f6e=right' + Math.round(vw - r.right) + '/bottom' + Math.round(vh - r.bottom),
              'zIndex=' + cs.zIndex,
              'visibility=' + cs.visibility,
              'opacity=' + cs.opacity,
              '| \u89c6\u53e3=' + vw + 'x' + vh,
              '| \u5728\u89c6\u53e3\u5185:', r.top >= 0 && r.left >= 0 && r.bottom <= vh && r.right <= vw);
          }
        } catch (e) { warn('\u81ea\u68c0\u5931\u8d25:', e); }
      }, 3000);

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
