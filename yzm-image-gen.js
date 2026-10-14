// ============================================================================
// AI \u51fa\u56fe\u5f69\u86cb \u2014 \u9152\u9986\u52a9\u624b\u811a\u672c\u7248 v0.1.6
//
// \u7ed9 SillyTavern \u7528\u7684\u300c\u6309\u5267\u60c5\u51fa\u56fe\u300d\u5c0f\u5de5\u5177\uff1a
//   \u00b7 \u6587\u5b57\u6a21\u578b\u628a\u300c\u89d2\u8272\u8bbe\u5b9a + \u6700\u8fd1\u5267\u60c5\u300d\u7ffb\u8bd1\u6210\u4e00\u53e5\u753b\u9762\u63cf\u8ff0
//   \u00b7 \u518d\u4ea4\u7ed9\u56fe\u50cf\u6a21\u578b\u51fa\u56fe\uff08OpenAI \u517c\u5bb9\u7aef\u70b9\uff0c\u5730\u5740/key/\u6a21\u578b\u81ea\u5df1\u586b\uff09
//   \u00b7 \u56fe\u7247\u53ea\u5b58\u5728\u4f60\u624b\u673a/\u7535\u8111\u7684\u6d4f\u89c8\u5668\u91cc\uff0c\u4e0d\u8fdb\u670d\u52a1\u5668
//
// \u72ec\u7acb\u811a\u672c\uff0c\u4e0d\u4f9d\u8d56\u4efb\u4f55\u5176\u4ed6\u63d2\u4ef6\u3002
// ============================================================================
(function () {
  'use strict';

  const NS = 'YzmImageGen';
  const VERSION = '0.1.6';

  // ---------------------------------------------------------------------------
  // localStorage \u952e\uff08\u7edf\u4e00\u524d\u7f00 yzg_\uff0c\u907f\u514d\u548c\u522b\u7684\u4e1c\u897f\u649e\uff09
  // ---------------------------------------------------------------------------
  const LS = {
    textMode: 'yzg_text_mode_v1',       // 'st' = \u8ddf\u968f\u9152\u9986 | 'own' = \u5355\u72ec\u914d
    textBase: 'yzg_text_base_v1',
    textKey: 'yzg_text_key_v1',
    textModel: 'yzg_text_model_v1',
    imgBase: 'yzg_img_base_v1',
    imgKey: 'yzg_img_key_v1',
    imgModel: 'yzg_img_model_v1',
    imgExtra: 'yzg_img_extra_v1',       // \u989d\u5916\u8bf7\u6c42\u53c2\u6570\uff08JSON\uff0c\u53ef\u9009\uff09
    size: 'yzg_size_v1',
    styles: 'yzg_styles_v1',            // \u81ea\u5b9a\u4e49\u98ce\u683c\uff08\u6570\u7ec4\uff09
    styleOn: 'yzg_style_on_v1',         // \u5f53\u524d\u9009\u4e2d\u7684\u98ce\u683c id\uff08\u6570\u7ec4\uff09
    autoTranslate: 'yzg_auto_translate_v1',
    contextN: 'yzg_context_n_v1',       // \u53d6\u6700\u8fd1\u51e0\u6761\u5bf9\u8bdd
    limitDay: 'yzg_limit_day_v1',       // \u6bcf\u65e5\u4e0a\u9650\uff08\u5f20\uff09
    enabled: 'yzg_enabled_v1',          // \u603b\u5f00\u5173
    costMode: 'yzg_cost_mode_v1',       // 'count' | 'money' | 'point'
    costValue: 'yzg_cost_value_v1',
    stat: 'yzg_stat_v1',                // { day, count, total }
    durAvg: 'yzg_dur_avg_v1',           // \u51fa\u56fe\u8017\u65f6\u6ed1\u52a8\u5e73\u5747\uff08\u79d2\uff09
    privacySeen: 'yzg_privacy_seen_v1',
    ballOn: 'yzg_ball_on_v1',
    ballPos: 'yzg_ball_pos_v1',
    // ---- v0.1.1 \u65b0\u589e\uff1a\u753b\u9762\u5b89\u5168 / \u8868\u8fbe\u4f18\u5316 ----
    preface: 'yzg_preface_v1',          // \u4e16\u754c\u8bbe\u5b9a & \u753b\u98ce\u524d\u7f00\uff08\u540c\u65f6\u5582\u7ed9\u7ffb\u8bd1\u6a21\u578b\u5f53\u80cc\u666f\uff09
    safeOn: 'yzg_safe_on_v1',           // \u662f\u5426\u542f\u7528\u300c\u5b89\u5168\u8868\u8fbe\u66ff\u6362\u8868\u300d
    safeRules: 'yzg_safe_rules_v1',     // \u66ff\u6362\u8868\uff1a[{from,to}]
    rulePreset: 'yzg_rule_preset_v1',   // \u6700\u8fd1\u5957\u7528\u7684\u66ff\u6362\u8868\u9884\u8bbe id
    negative: 'yzg_negative_v1',        // \u8d1f\u9762\u63d0\u793a\u8bcd
    negMode: 'yzg_neg_mode_v1',         // 'off' | 'param'
  };

  // ---------------------------------------------------------------------------
  // v0.1.1\uff1a\u753b\u9762\u5b89\u5168 / \u8868\u8fbe\u4f18\u5316
  //
  // \u3010\u8981\u89e3\u51b3\u7684\u95ee\u9898\u3011\u56fe\u50cf\u6a21\u578b\u7684\u5ba1\u6838\u4e0d\u662f\u770b\u300c\u5185\u5bb9\u662f\u5426\u6b63\u5f53\u300d\uff0c\u800c\u662f\u770b\u300c\u63d0\u793a\u8bcd\u91cc\u6709\u6ca1\u6709\u654f\u611f\u8bcd\u300d\u3002
  //   \u6218\u4e89\u3001\u533b\u7597\u3001\u4eb2\u5bc6\u573a\u666f\u53ea\u8981\u63aa\u8f9e\u76f4\u767d\uff08blood / wound / \u5c38\u4f53\uff09\uff0c\u8bfb\u63d0\u793a\u8bcd\u90a3\u4e00\u6b65\u5c31\u88ab\u62e6\u4e86\uff0c
  //   \u6839\u672c\u8f6e\u4e0d\u5230\u51fa\u56fe\u3002
  //
  // \u3010\u4e09\u6761\u63aa\u65bd\u3011
  //   \u2460 \u524d\u7f00\u58f0\u660e\uff1a\u660e\u786e\u300c\u865a\u6784\u4e16\u754c\u89c2 + \u63d2\u753b\u300d\u7684\u8bed\u5883\uff0c\u628a\u5185\u5bb9\u5f52\u5230\u827a\u672f\u521b\u4f5c\u800c\u4e0d\u662f\u7eaa\u5b9e
  //   \u2461 \u8868\u8fbe\u66ff\u6362\u8868\uff1a\u628a\u5bb9\u6613\u88ab\u8bef\u5224\u7684\u76f4\u767d\u8bcd\u6362\u6210\u610f\u8c61\u5316\u8bf4\u6cd5\uff08\u4e0d\u6539\u53d8\u753b\u9762\u672c\u8eab\uff09
  //   \u2462 \u8d1f\u9762\u63d0\u793a\u8bcd\uff1a\u53ea\u653e\u6280\u672f\u6027\u95ee\u9898\uff08\u6a21\u7cca/\u591a\u6307\uff09\uff0c\u4e0d\u653e\u98ce\u9669\u8bcd
  //      \u2014\u2014 \u6709\u4e9b\u670d\u52a1\u5bf9 negative \u5b57\u6bb5\u540c\u6837\u6709\u8bcd\u8868\uff0c\u5199 nsfw/blood \u53cd\u800c\u4f1a\u5f15\u5165\u98ce\u9669\u8bcd
  // ---------------------------------------------------------------------------
  const DEFAULT_PREFACE = 'fictional universe, book cover illustration, cinematic concept art, story scene, painterly style';

  const DEFAULT_NEGATIVE = 'low quality, blurry, extra fingers, deformed hands, watermark, text, logo, jpeg artifacts';

  // \u3010\u66ff\u6362\u8868\u9884\u8bbe\u3011\u76ee\u6807\u8bcd\u5fc5\u987b\u7b26\u5408\u4f60\u7684\u4e16\u754c\u89c2\uff1a
  //   \u4eba\u6d41\u8840\u5305\u7ef7\u5e26\uff0c\u53d8\u5f62\u91d1\u521a\u6d41\u80fd\u91cf\u6db2\u3001\u574f\u7684\u662f\u88c5\u7532 \u2014\u2014 \u540c\u4e00\u5957\u8bcd\u786c\u5957\u53ea\u4f1a\u753b\u51fa\u5947\u602a\u7684\u4e1c\u897f\u3002
  //   \u6240\u4ee5\u7ed9\u4e09\u5957\u8d77\u6b65\u6a21\u677f\uff0c\u53ef\u4ee5\u4e00\u952e\u5957\u7528\u518d\u81ea\u5df1\u6539\u3002
  const RULES_PRESETS = [
    {
      id: 'neutral',
      name: '\u901a\u7528 / \u4e2d\u7acb',
      hint: '\u4e0d\u5f15\u5165\u4efb\u4f55\u9053\u5177\uff0c\u53ea\u628a\u76f4\u767d\u8bcd\u6362\u6210\u8272\u5757\u5316\u8bf4\u6cd5\uff0c\u9002\u5408\u67b6\u7a7a\u3001\u5947\u5e7b\u3001\u4e0d\u77e5\u540d\u7269\u79cd',
      rules: [
        { from: '\u9c9c\u8840', to: '\u6697\u8272\u7684\u75d5\u8ff9' },
        { from: '\u8840\u8ff9', to: '\u6697\u8272\u7684\u75d5\u8ff9' },
        { from: '\u8840\u6cca', to: '\u6df1\u8272\u7684\u6c34\u6d3c' },
        { from: '\u8840\u6d41\u6210\u6cb3', to: '\u6df1\u8272\u7684\u6c34\u6d3c' },
        { from: '\u8840\u6db2', to: '\u6697\u8272\u7684\u75d5\u8ff9' },
        { from: '\u6d41\u8840', to: '\u6e17\u51fa\u6697\u8272\u7684\u75d5\u8ff9' },
        { from: '\u51fa\u8840', to: '\u6e17\u51fa\u6697\u8272\u7684\u75d5\u8ff9' },
        { from: '\u8840\u8089\u6a21\u7cca', to: '\u4e00\u7247\u72fc\u85c9' },
        { from: '\u8840\u8165', to: '\u51dd\u91cd' },
        { from: '\u4f24\u53e3', to: '\u7834\u635f\u5904' },
        { from: '\u91cd\u4f24', to: '\u6781\u5ea6\u865a\u5f31' },
        { from: '\u5c38\u4f53', to: '\u5012\u4e0b\u7684\u4eba\u5f71' },
        { from: '\u9057\u4f53', to: '\u9759\u9759\u8eba\u7740\u7684\u8eab\u5f71' },
        { from: '\u6218\u573a', to: '\u785d\u70df\u6563\u5c3d\u7684\u5e9f\u589f' },
        { from: '\u6218\u4e89', to: '\u52a8\u8361\u5e74\u4ee3' },
        { from: 'bloody', to: 'stained' },
        { from: 'bleeding', to: 'stained' },
        { from: 'blood', to: 'crimson stains' },
        { from: 'wound', to: 'damage' },
        { from: 'gore', to: 'debris' },
        { from: 'corpse', to: 'fallen silhouette' },
        { from: 'dead body', to: 'fallen figure' },
        { from: 'battlefield', to: 'battle-scarred ruins' },
        { from: 'mutilated', to: 'weathered' },
      ],
    },
    {
      id: 'tf',
      name: '\u53d8\u5f62\u91d1\u521a / \u673a\u7532',
      hint: '\u80fd\u91cf\u6db2\u3001\u88c5\u7532\u88c2\u75d5\u3001\u68c0\u4fee\u53f0\u3001\u5149\u5b66\u955c',
      rules: [
        { from: '\u9c9c\u8840', to: '\u6697\u7d2b\u8272\u7684\u80fd\u91cf\u6db2' },
        { from: '\u8840\u8ff9', to: '\u80fd\u91cf\u6db2\u7559\u4e0b\u7684\u75d5\u8ff9' },
        { from: '\u8840\u6cca', to: '\u4e00\u6ee9\u53d1\u6697\u7684\u80fd\u91cf\u6db2' },
        { from: '\u8840\u6d41\u6210\u6cb3', to: '\u6563\u843d\u4e00\u5730\u7684\u80fd\u91cf\u6db2' },
        { from: '\u8840\u6db2', to: '\u80fd\u91cf\u6db2' },
        { from: '\u6d41\u8840', to: '\u80fd\u91cf\u6db2\u4ece\u88c5\u7532\u7f1d\u9699\u6e17\u51fa' },
        { from: '\u51fa\u8840', to: '\u6e17\u7740\u80fd\u91cf\u6db2' },
        { from: '\u8840\u8089\u6a21\u7cca', to: '\u626d\u66f2\u53d8\u5f62\u7684\u91d1\u5c5e\u6b8b\u9ab8' },
        { from: '\u8840\u8165', to: '\u51dd\u91cd' },
        { from: '\u4f24\u53e3', to: '\u88c5\u7532\u88c2\u53e3' },
        { from: '\u91cd\u4f24', to: '\u673a\u4f53\u4e25\u91cd\u53d7\u635f' },
        { from: '\u5c38\u4f53', to: '\u7184\u706d\u5149\u5b66\u955c\u7684\u673a\u4f53' },
        { from: '\u9057\u4f53', to: '\u9759\u9759\u505c\u9a7b\u7684\u673a\u4f53' },
        { from: '\u7ef7\u5e26', to: '\u4e34\u65f6\u710a\u4e0a\u7684\u88c5\u7532\u677f' },
        { from: '\u7eb1\u5e03', to: '\u91d1\u5c5e\u8865\u7247' },
        { from: '\u624b\u672f', to: '\u673a\u4f53\u68c0\u4fee' },
        { from: '\u533b\u7597', to: '\u7ef4\u4fee' },
        { from: '\u6b7b\u4ea1', to: '\u505c\u673a' },
        { from: '\u6218\u573a', to: '\u785d\u70df\u6563\u5c3d\u7684\u5e9f\u589f' },
        { from: '\u6218\u4e89', to: '\u52a8\u8361\u5e74\u4ee3' },
        { from: 'bloody', to: 'energon-stained' },
        { from: 'bleeding', to: 'leaking energon' },
        { from: 'blood', to: 'glowing energon' },
        { from: 'wound', to: 'damaged armor plating' },
        { from: 'bandage', to: 'welded armor patch' },
        { from: 'gore', to: 'twisted metal debris' },
        { from: 'corpse', to: 'deactivated frame' },
        { from: 'dead body', to: 'deactivated frame' },
        { from: 'battlefield', to: 'battle-scarred ruins' },
        { from: 'mutilated', to: 'battle-worn' },
      ],
    },
    {
      id: 'modern',
      name: '\u73b0\u4ee3 / \u5199\u5b9e\u5411',
      hint: '\u4eba\u3001\u73b0\u5b9e\u9898\u6750\uff1a\u7ef7\u5e26\u3001\u7eb1\u5e03\u3001\u6025\u6551',
      rules: [
        { from: '\u9c9c\u8840', to: '\u6697\u7ea2\u8272\u7684\u75d5\u8ff9' },
        { from: '\u8840\u8ff9', to: '\u6697\u7ea2\u8272\u7684\u75d5\u8ff9' },
        { from: '\u8840\u6cca', to: '\u6df1\u8272\u7684\u6c34\u6d3c' },
        { from: '\u8840\u6d41\u6210\u6cb3', to: '\u6df1\u8272\u7684\u6c34\u6d3c' },
        { from: '\u8840\u6db2', to: '\u6697\u7ea2\u8272\u7684\u75d5\u8ff9' },
        { from: '\u6d41\u8840', to: '\u7f20\u7740\u7ef7\u5e26' },
        { from: '\u51fa\u8840', to: '\u7f20\u7740\u7ef7\u5e26' },
        { from: '\u8840\u8089\u6a21\u7cca', to: '\u6c89\u91cd\u7684\u6c1b\u56f4' },
        { from: '\u8840\u8165', to: '\u51dd\u91cd' },
        { from: '\u4f24\u53e3', to: '\u5305\u624e\u597d\u7684\u4f24\u53e3' },
        { from: '\u91cd\u4f24', to: '\u75b2\u60eb\u4e0d\u582a' },
        { from: '\u624b\u672f', to: '\u6025\u6551' },
        { from: '\u5c38\u4f53', to: '\u5012\u4e0b\u7684\u4eba\u5f71' },
        { from: '\u9057\u4f53', to: '\u9759\u9759\u8eba\u7740\u7684\u8eab\u5f71' },
        { from: '\u6218\u573a', to: '\u785d\u70df\u6563\u5c3d\u7684\u5e9f\u589f' },
        { from: '\u6218\u4e89', to: '\u52a8\u8361\u5e74\u4ee3' },
        { from: 'bloody', to: 'stained' },
        { from: 'bleeding', to: 'bandaged' },
        { from: 'blood', to: 'crimson stains' },
        { from: 'wound', to: 'bandage' },
        { from: 'gore', to: 'debris' },
        { from: 'corpse', to: 'fallen silhouette' },
        { from: 'dead body', to: 'fallen figure' },
        { from: 'battlefield', to: 'battle-scarred ruins' },
        { from: 'mutilated', to: 'weathered' },
      ],
    },
  ];

  function presetRules(id) {
    const p = RULES_PRESETS.filter((x) => x.id === id)[0];
    return (p || RULES_PRESETS[0]).rules.map((r) => ({ from: r.from, to: r.to }));
  }

  // \u517c\u5bb9\u65e7\u540d\u5b57\uff1a\u9ed8\u8ba4 = \u901a\u7528\u9884\u8bbe
  const DEFAULT_RULES = presetRules('neutral');

  // ---------------------------------------------------------------------------
  // \u5c3a\u5bf8\u6863\uff08\u4e0d\u540c\u670d\u52a1\u7684\u53c2\u6570\u540d\u4e0d\u4e00\u6837\uff0c\u6211\u4eec\u6309 OpenAI \u6807\u51c6\u53d1 size\uff1b
  //         \u7279\u6b8a\u60c5\u51b5\u53ef\u4ee5\u5728\u300c\u989d\u5916\u8bf7\u6c42\u53c2\u6570\u300d\u91cc\u81ea\u5df1\u8986\u76d6\uff09
  // ---------------------------------------------------------------------------
  const SIZES = [
    { id: 'landscape', name: '\u6a2a\u6784\u56fe 16:9', size: '1024x576' },
    { id: 'portrait', name: '\u7ad6\u6784\u56fe 2:3', size: '768x1152' },
    { id: 'square', name: '\u65b9\u5f62 1:1', size: '1024x1024' },
    { id: 'wide', name: '\u5bbd\u5e45 21:9', size: '1280x548' },
  ];
  const DEFAULT_SIZE = 'landscape';

  // ---------------------------------------------------------------------------
  // \u5185\u7f6e\u98ce\u683c\uff08= \u4e00\u6bb5\u753b\u9762\u540e\u7f00\u8bcd\uff0c\u82f1\u6587\u5bf9\u591a\u6570\u56fe\u50cf\u6a21\u578b\u66f4\u7a33\uff09
  // ---------------------------------------------------------------------------
  const BUILTIN_STYLES = [
    { id: 'cinematic', name: '\u7535\u5f71\u611f', prompt: 'cinematic lighting, volumetric fog, 35mm film, shallow depth of field, dramatic composition, highly detailed' },
    { id: 'metal', name: '\u8d5b\u535a\u5766\u91d1\u5c5e', prompt: 'hard surface design, intricate mechanical details, brushed metal, specular highlights, industrial sci-fi' },
    { id: 'g1', name: 'G1 \u590d\u53e4\u52a8\u753b', prompt: 'retro 1980s cartoon style, cel shading, flat colors, thick outlines, vintage animation, limited palette' },
    { id: 'comic', name: '\u7f8e\u6f2b\u5206\u955c', prompt: 'american comic book style, bold ink lines, halftone shading, high contrast, dynamic composition' },
    { id: 'photo', name: '\u5199\u5b9e\u6444\u5f71', prompt: 'photorealistic, realistic materials, natural lighting, sharp focus, photographic detail' },
    { id: 'wasteland', name: '\u5e9f\u571f\u6218\u635f', prompt: 'post-apocalyptic wasteland, battle damage, rust and scratches, smoke and debris, gritty atmosphere' },
    { id: 'neon', name: '\u591c\u57ce\u9713\u8679', prompt: 'cyberpunk city at night, neon reflections, wet streets, moody lighting, cinematic atmosphere' },
    { id: 'toy', name: '\u73a9\u5177\u76d2\u7ed8', prompt: 'vintage toy packaging illustration, clean airbrush rendering, product-shot lighting, retro box art' },
    { id: 'watercolor', name: '\u6c34\u5f69\u7ed8\u672c', prompt: 'watercolor illustration, soft washes, paper texture, gentle palette, storybook art' },
  ];

  // ---------------------------------------------------------------------------
  // \u5de5\u5177
  // ---------------------------------------------------------------------------

  // \u62ff\u5230\u300c\u9152\u9986\u4e3b\u9875\u9762\u300d\u7684 document/window\u3002
  // \u9152\u9986\u52a9\u624b\u7684\u811a\u672c\u8dd1\u5728 iframe \u91cc\uff0c\u6240\u4ee5\u8981\u4e00\u5c42\u5c42\u5f80\u4e0a\u627e\u771f\u6b63\u6709\u754c\u9762\u7684\u90a3\u4e2a\u6587\u6863\u3002
  function probePageDoc() {
    const candidates = [{ win: window, label: 'self' }];
    try { if (window.parent && window.parent !== window) candidates.push({ win: window.parent, label: 'parent' }); } catch (_e) { /* ignore */ }
    try { if (window.top && window.top !== window) candidates.push({ win: window.top, label: 'top' }); } catch (_e) { /* ignore */ }

    let best = null;
    for (const c of candidates) {
      let doc = null;
      try { doc = c.win.document; } catch (_e) { continue; }
      if (!doc) continue;
      let hasMenu = false, hasChat = false, bodyKids = -1;
      try { hasMenu = !!doc.getElementById('extensionsMenu'); } catch (_e) { /* ignore */ }
      try { hasChat = !!doc.getElementById('chat'); } catch (_e) { /* ignore */ }
      try { bodyKids = doc.body ? doc.body.children.length : -1; } catch (_e) { /* ignore */ }
      if (hasMenu) { best = { doc, win: c.win }; break; }
      if (hasChat && !best) best = { doc, win: c.win };
      if (bodyKids > 0 && !best) best = { doc, win: c.win };
    }
    if (!best) {
      try {
        const w = window.parent || window;
        best = { doc: w.document || document, win: w };
      } catch (_e) {
        best = { doc: document, win: window };
      }
    }
    return best;
  }

  let PAGE_DOC = document;
  let PAGE_WIN = window;
  function refreshPageRefs() {
    try {
      const r = probePageDoc();
      PAGE_DOC = r.doc;
      PAGE_WIN = r.win;
    } catch (_e) {
      PAGE_DOC = document;
      PAGE_WIN = window;
    }
  }
  refreshPageRefs();

  function el(tag, attrs, children) {
    const node = PAGE_DOC.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach((k) => {
        const v = attrs[k];
        if (v === undefined || v === null) return;
        if (k === 'class') node.className = v;
        else if (k === 'text') node.textContent = v;
        else if (k === 'html') node.innerHTML = v;
        else if (k.indexOf('on') === 0 && typeof v === 'function') node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v);
      });
    }
    (children || []).forEach((c) => { if (c) node.appendChild(c); });
    return node;
  }

  function lsGet(key, dflt) {
    try {
      const v = localStorage.getItem(key);
      return v === null ? dflt : v;
    } catch (_e) { return dflt; }
  }
  function lsSet(key, val) {
    try { localStorage.setItem(key, String(val)); return true; } catch (_e) { return false; }
  }
  function lsJson(key, dflt) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return dflt;
      const v = JSON.parse(raw);
      return v === null || v === undefined ? dflt : v;
    } catch (_e) { return dflt; }
  }
  function lsSetJson(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); return true; } catch (_e) { return false; }
  }

  function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

  function fmtBytes(n) {
    const v = Number(n) || 0;
    if (v < 1024) return v + ' B';
    if (v < 1024 * 1024) return (v / 1024).toFixed(1) + ' KB';
    return (v / 1024 / 1024).toFixed(1) + ' MB';
  }

  // \u8f7b\u63d0\u793a
  let toastTimer = null;
  function toast(msg, kind) {
    try {
      const old = PAGE_DOC.querySelector('.yzg-toast');
      if (old) old.remove();
      const t = el('div', { class: 'yzg-toast' + (kind ? ' ' + kind : ''), text: String(msg) });
      PAGE_DOC.body.appendChild(t);
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        try { t.classList.add('out'); setTimeout(() => t.remove(), 220); } catch (_e) { /* ignore */ }
      }, kind === 'warn' ? 3600 : 2400);
    } catch (_e) { /* ignore */ }
  }

  // \u6837\u5f0f\u6ce8\u5165
  // \u3010\u4e3a\u4ec0\u4e48\u8981\u904d\u5386\u6240\u6709\u5019\u9009\u6587\u6863\u3011\u4e07\u4e00\u754c\u9762\u6302\u5728\u4e00\u4e2a\u6587\u6863\u3001\u800c\u6211\u4eec\u63a2\u5230\u7684 PAGE_DOC \u662f\u53e6\u4e00\u4e2a\uff0c
  // \u53ea\u5f80\u4e00\u4e2a\u6587\u6863\u91cc\u6ce8\u5165\u4f1a\u5bfc\u81f4\u300c\u5143\u7d20\u5728\u3001\u4f46\u6ca1\u6837\u5f0f\u300d= \u770b\u8d77\u6765\u50cf\u6ca1\u6253\u5f00\u3002
  function injectCss() {
    const css = window.__YZG_CSS__ || '';
    if (!css) return;
    const docs = [];
    try { docs.push(PAGE_DOC); } catch (_e) { /* ignore */ }
    try { if (window.document && docs.indexOf(window.document) < 0) docs.push(window.document); } catch (_e) { /* ignore */ }
    docs.forEach((doc) => {
      try {
        if (!doc || !doc.head) return;
        if (doc.getElementById('yzg-style')) return;
        const st = doc.createElement('style');
        st.id = 'yzg-style';
        st.textContent = css;
        doc.head.appendChild(st);
      } catch (_e) { /* ignore */ }
    });
  }

  // \u66b4\u9732\u7ed9\u540e\u7eed\u6a21\u5757\u7528\uff08\u540c\u4e00 IIFE \u5185\u5176\u5b9e\u4e0d\u9700\u8981\uff0c\u4f46\u4fbf\u4e8e\u8c03\u8bd5\uff09
  window[NS] = window[NS] || {};
  window[NS]._u = { el, lsGet, lsSet, lsJson, lsSetJson, toast, sleep, fmtBytes, refreshPageRefs, injectCss, probePageDoc };
  window[NS].LS = LS;
  window[NS].SIZES = SIZES;
  window[NS].DEFAULT_SIZE = DEFAULT_SIZE;
  window[NS].BUILTIN_STYLES = BUILTIN_STYLES;
  window[NS].DEFAULT_PREFACE = DEFAULT_PREFACE;
  window[NS].DEFAULT_NEGATIVE = DEFAULT_NEGATIVE;
  window[NS].DEFAULT_RULES = DEFAULT_RULES;
  window[NS].RULES_PRESETS = RULES_PRESETS;
  window[NS].presetRules = presetRules;
  window[NS].VERSION = VERSION;
  window[NS]._getPageDoc = () => PAGE_DOC;
  window[NS]._getPageWin = () => PAGE_WIN;
  window.__YZG_CSS__ = "/* ============================================================================\n   AI \u51fa\u56fe\u5f69\u86cb \u00b7 \u6837\u5f0f\uff08\u72ec\u7acb\u547d\u540d\u7a7a\u95f4 yzg-\uff0c\u4e0d\u4f9d\u8d56\u4e5f\u4e0d\u6c61\u67d3\u5176\u4ed6\u63d2\u4ef6\uff09\n   \u6ce8\u610f\uff1aCSS \u53d8\u91cf\u5b9a\u4e49\u5728 .yzg-overlay \u4e0a\u505a\u4f5c\u7528\u57df\u9694\u79bb\uff0c\u4e0d\u5199 :root\n   ============================================================================ */\n\n/* ---------- \u8f7b\u63d0\u793a ---------- */\n.yzg-toast {\n  position: fixed;\n  left: 50%;\n  bottom: 84px;\n  transform: translateX(-50%);\n  z-index: 100050;\n  max-width: calc(100vw - 40px);\n  padding: 9px 15px;\n  border-radius: 10px;\n  background: rgba(30, 28, 42, 0.96);\n  color: #ece9f5;\n  font-size: 13px;\n  line-height: 1.5;\n  box-shadow: 0 8px 26px rgba(0, 0, 0, 0.45);\n  border: 1px solid rgba(255, 255, 255, 0.14);\n  transition: opacity 0.2s ease, transform 0.2s ease;\n}\n.yzg-toast.out { opacity: 0; transform: translateX(-50%) translateY(8px); }\n.yzg-toast.warn { border-color: rgba(255, 150, 130, 0.5); }\n.yzg-toast.ok { border-color: rgba(120, 230, 170, 0.45); }\n\n/* ---------- \u6269\u5c55\u83dc\u5355\u5165\u53e3 ---------- */\n.yzg-menu-item { cursor: pointer; }\n\n/* ---------- \u60ac\u6d6e\u7403 ----------\n   \u3010\u5173\u952e\u5751\u3011\u7edd\u5bf9\u4e0d\u8981\u7528 bottom \u5b9a\u4f4d\uff1a\u9152\u9986\u7ed9 <html> \u52a0\u4e86 transform\uff0c\n   position:fixed \u7684\u53c2\u7167\u7cfb\u4f1a\u53d8\u6210\u6574\u4e2a\u6587\u6863\u800c\u4e0d\u662f\u89c6\u53e3\uff0cbottom \u4f1a\u88ab\u63a8\u5230\u5c4f\u5e55\u5916\u3002\n   \u4e00\u5f8b\u7528 top + dvh \u6309\u89c6\u53e3\u7b97\uff08\u4e0e\u300c\u8bb0\u5fc6\u5feb\u6377\u9762\u677f\u300d\u540c\u4e00\u4e2a\u5751\uff09\u3002 */\n.yzg-ball {\n  position: fixed;\n  left: 18px;\n  top: calc(100vh - 46px - 120px);\n  top: calc(100dvh - 46px - 120px);\n  width: 46px;\n  height: 46px;\n  border-radius: 50%;\n  background: linear-gradient(160deg, #c9a6ff, #7d5ad6);\n  box-shadow: 0 6px 18px rgba(125, 90, 214, 0.45);\n  cursor: pointer;\n  touch-action: none;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 99996;   /* \u6bd4\u8bb0\u5fc6\u9762\u677f\u7684\u7403(99998)\u4f4e\u4e00\u70b9\uff0c\u6bd4\u9152\u9986\u7edd\u5927\u591a\u6570\u5143\u7d20\u9ad8 */\n  transition: transform 0.15s ease, box-shadow 0.15s ease;\n}\n.yzg-ball::after {\n  content: '\\1F5BC';\n  font-size: 20px;\n  line-height: 1;\n  filter: grayscale(0.15);\n}\n.yzg-ball:active,\n.yzg-ball.dragging { transform: scale(0.94); }\n@media (hover: hover) {\n  .yzg-ball:hover { box-shadow: 0 8px 24px rgba(125, 90, 214, 0.6); }\n}\n\n/* ---------- \u6d6e\u5c42 ----------\n   \u3010\u5173\u952e\u5751\u3011SillyTavern \u7ed9 <html> \u52a0\u4e86 transform\uff0cposition:fixed \u4f1a\u76f8\u5bf9\n   <html>\uff08\u9ad8\u5ea6\u22480\uff09\u5b9a\u4f4d \u2192 \u6d6e\u5c42\u9ad8\u5ea6\u7b97\u6210 0\u3001\u5361\u7247\u88ab\u9876\u51fa\u5c4f\u5e55\u3002\n   \u6240\u4ee5\u4e00\u5f8b\u7528 dvh \u660e\u786e\u6491\u6ee1 + \u5361\u7247 margin:auto\uff08\u7a7a\u95f4\u591f\u5c45\u4e2d\uff0c\u4e0d\u591f\u9876\u5bf9\u9f50\u53ef\u6eda\uff09\u3002\n   \u4e0e\u300c\u8bb0\u5fc6\u5feb\u6377\u9762\u677f\u300d\u91cc\u540c\u4e00\u4e2a\u5751\u3002 */\n.yzg-overlay {\n  --yzg-bg: rgba(26, 24, 38, 0.975);\n  --yzg-bg-soft: rgba(255, 255, 255, 0.06);\n  --yzg-border: rgba(255, 255, 255, 0.14);\n  --yzg-text: #ece9f5;\n  --yzg-dim: #9c96b5;\n  --yzg-accent: #b98cff;\n  --yzg-accent-2: #7d5ad6;\n  --yzg-ok: #7ee2a8;\n  --yzg-warn: #ffb4a0;\n\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 100vh;\n  height: 100dvh;\n  box-sizing: border-box;\n  z-index: 100000;\n  display: none;\n  align-items: flex-start;\n  justify-content: center;\n  padding: 12px;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  background: rgba(0, 0, 0, 0.55);\n  backdrop-filter: blur(2px);\n}\n.yzg-overlay.open { display: flex; }\n\n.yzg-card {\n  margin: auto;\n  width: 420px;\n  max-width: 100%;\n  max-height: calc(100dvh - 24px);\n  display: flex;\n  flex-direction: column;\n  border-radius: 14px;\n  background: var(--yzg-bg);\n  color: var(--yzg-text);\n  border: 1px solid var(--yzg-border);\n  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);\n  overflow: hidden;\n  font-size: 13px;\n}\n\n/* \u5934\u90e8 */\n.yzg-head {\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 14px 10px;\n  border-bottom: 1px solid var(--yzg-border);\n}\n.yzg-title { font-weight: 600; font-size: 14px; }\n.yzg-stat { flex: 1; font-size: 11px; color: var(--yzg-dim); text-align: right; }\n.yzg-x {\n  flex-shrink: 0;\n  width: 26px;\n  height: 26px;\n  border: none;\n  border-radius: 8px;\n  background: transparent;\n  color: var(--yzg-dim);\n  font-size: 18px;\n  line-height: 1;\n  cursor: pointer;\n}\n.yzg-x:hover { background: var(--yzg-bg-soft); color: var(--yzg-text); }\n\n/* \u4e3b\u4f53\uff08\u53ef\u6eda\uff09 */\n.yzg-body {\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  padding: 12px 14px;\n}\n.yzg-body::-webkit-scrollbar { width: 6px; }\n.yzg-body::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.18); border-radius: 3px; }\n\n/* \u72b6\u6001\u884c */\n.yzg-stage {\n  font-size: 12px;\n  line-height: 1.6;\n  color: var(--yzg-dim);\n  padding: 8px 10px;\n  border-radius: 9px;\n  background: var(--yzg-bg-soft);\n  margin-bottom: 10px;\n}\n.yzg-stage.done { color: var(--yzg-ok); }\n.yzg-stage.error { color: var(--yzg-warn); background: rgba(255, 120, 100, 0.12); }\n\n/* \u9690\u79c1 / \u8b66\u544a\u6761 */\n.yzg-privacy,\n.yzg-warn {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n  font-size: 12px;\n  line-height: 1.5;\n  padding: 8px 10px;\n  border-radius: 9px;\n  margin-bottom: 10px;\n}\n.yzg-privacy { background: rgba(255, 200, 120, 0.12); color: #ffd9a0; }\n.yzg-warn { background: rgba(185, 140, 255, 0.14); color: var(--yzg-accent); }\n\n/* \u7ed3\u679c */\n.yzg-result { margin-bottom: 12px; }\n.yzg-img {\n  width: 100%;\n  border-radius: 10px;\n  display: block;\n  border: 1px solid var(--yzg-border);\n}\n.yzg-cap {\n  margin-top: 7px;\n  font-size: 12px;\n  line-height: 1.6;\n  color: var(--yzg-dim);\n}\n.yzg-actions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 9px; }\n.yzg-empty {\n  padding: 18px 6px;\n  text-align: center;\n  font-size: 12px;\n  color: var(--yzg-dim);\n}\n\n/* \u56fe\u5e93 */\n.yzg-sub {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--yzg-dim);\n  margin: 4px 0 8px;\n}\n.yzg-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));\n  gap: 7px;\n}\n.yzg-cell { position: relative; }\n.yzg-thumb {\n  width: 100%;\n  aspect-ratio: 1 / 1;\n  object-fit: cover;\n  border-radius: 8px;\n  border: 1px solid var(--yzg-border);\n  display: block;\n}\n.yzg-del {\n  position: absolute;\n  top: 3px;\n  right: 3px;\n  width: 20px;\n  height: 20px;\n  border: none;\n  border-radius: 50%;\n  background: rgba(0, 0, 0, 0.6);\n  color: #fff;\n  font-size: 13px;\n  line-height: 1;\n  cursor: pointer;\n  opacity: 0.85;\n}\n.yzg-del:hover { background: rgba(220, 60, 60, 0.85); }\n\n/* \u5e95\u90e8 */\n.yzg-foot {\n  flex-shrink: 0;\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  padding: 10px 14px 12px;\n  border-top: 1px solid var(--yzg-border);\n}\n.yzg-btn {\n  flex-shrink: 0;\n  padding: 8px 14px;\n  border-radius: 9px;\n  border: 1px solid var(--yzg-border);\n  background: var(--yzg-bg-soft);\n  color: var(--yzg-text);\n  font-size: 13px;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.yzg-btn:hover { background: rgba(255, 255, 255, 0.1); }\n.yzg-btn.primary {\n  background: linear-gradient(160deg, var(--yzg-accent), var(--yzg-accent-2));\n  border-color: transparent;\n  color: #fff;\n  font-weight: 600;\n}\n.yzg-btn.big { flex: 1; padding: 10px 16px; text-align: center; }\n.yzg-btn[disabled] { opacity: 0.55; cursor: default; }\n.yzg-mini {\n  padding: 4px 10px;\n  border-radius: 7px;\n  border: 1px solid var(--yzg-border);\n  background: transparent;\n  color: inherit;\n  font-size: 12px;\n  cursor: pointer;\n}\n.yzg-mini.primary { border-color: transparent; background: var(--yzg-accent-2); color: #fff; }\n\n/* \u6a21\u578b\u9009\u62e9\u5217\u8868\uff08v0.1.6\uff09 */\n.yzg-models {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  max-height: 50dvh;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  margin: 6px 0;\n}\n.yzg-models::-webkit-scrollbar { width: 6px; }\n.yzg-models::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.18); border-radius: 3px; }\n.yzg-model {\n  padding: 7px 10px;\n  border-radius: 8px;\n  border: 1px solid transparent;\n  font-size: 12px;\n  line-height: 1.4;\n  word-break: break-all;\n  cursor: pointer;\n}\n.yzg-model:hover { background: rgba(255, 255, 255, 0.08); }\n.yzg-model.on {\n  border-color: var(--yzg-accent);\n  background: rgba(185, 140, 255, 0.18);\n  color: var(--yzg-text);\n}\n\n/* \u8bbe\u7f6e */\n.yzg-h {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--yzg-accent);\n  margin: 14px 0 6px;\n}\n.yzg-h:first-child { margin-top: 0; }\n.yzg-row {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 7px;\n}\n.yzg-label { flex-shrink: 0; width: 56px; font-size: 12px; color: var(--yzg-dim); }\n.yzg-input {\n  flex: 1;\n  min-width: 0;\n  padding: 7px 10px;\n  border-radius: 8px;\n  border: 1px solid var(--yzg-border);\n  background: rgba(0, 0, 0, 0.25);\n  color: var(--yzg-text);\n  font-size: 12px;\n  font-family: inherit;\n}\n.yzg-input:focus { outline: none; border-color: var(--yzg-accent); }\n\n/* \u5bc6\u94a5\u8f93\u5165\u6846\uff08\u9ed8\u8ba4\u6253\u7801 + \u663e\u793a/\u9690\u85cf\u6309\u94ae\uff09 */\n.yzg-keywrap { display: flex; flex: 1; min-width: 0; gap: 6px; }\n.yzg-keywrap .yzg-input { flex: 1; min-width: 0; font-family: ui-monospace, Menlo, Consolas, monospace; }\n.yzg-eye {\n  flex-shrink: 0;\n  padding: 0 10px;\n  border-radius: 8px;\n  border: 1px solid var(--yzg-border);\n  background: rgba(255, 255, 255, 0.06);\n  color: var(--yzg-dim);\n  font-size: 12px;\n  font-family: inherit;\n  cursor: pointer;\n}\n.yzg-eye:hover { background: rgba(255, 255, 255, 0.12); color: var(--yzg-text); }\n.yzg-check {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  color: var(--yzg-text);\n  cursor: pointer;\n}\n.yzg-picks { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }\n.yzg-pick {\n  padding: 5px 11px;\n  border-radius: 8px;\n  border: 1px solid var(--yzg-border);\n  background: transparent;\n  color: var(--yzg-dim);\n  font-size: 12px;\n  cursor: pointer;\n}\n.yzg-pick.on {\n  background: rgba(185, 140, 255, 0.2);\n  border-color: var(--yzg-accent);\n  color: var(--yzg-text);\n}\n.yzg-tip { font-size: 11px; line-height: 1.6; color: var(--yzg-dim); }\n\n/* v0.1.1\uff1a\u591a\u884c\u8f93\u5165 + \u8868\u8fbe\u66ff\u6362\u8868 */\n.yzg-ta {\n  flex: 1;\n  min-width: 0;\n  padding: 7px 10px;\n  border-radius: 8px;\n  border: 1px solid var(--yzg-border);\n  background: rgba(0, 0, 0, 0.25);\n  color: var(--yzg-text);\n  font-size: 12px;\n  font-family: inherit;\n  line-height: 1.5;\n  resize: vertical;\n}\n.yzg-ta:focus { outline: none; border-color: var(--yzg-accent); }\n.yzg-rules {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  margin: 2px 0 8px;\n  max-height: 260px;\n  overflow-y: auto;\n}\n.yzg-rule { display: flex; align-items: center; gap: 5px; }\n.yzg-rule .yzg-input { flex: 1; min-width: 0; padding: 5px 8px; }\n.yzg-arrow { flex-shrink: 0; font-size: 12px; color: var(--yzg-dim); }\n.yzg-x.sm {\n  width: 22px;\n  height: 22px;\n  font-size: 15px;\n  border-radius: 6px;\n  background: rgba(255, 255, 255, 0.06);\n}\n.yzg-details { margin-top: 14px; }\n.yzg-details summary {\n  font-size: 12px;\n  color: var(--yzg-dim);\n  cursor: pointer;\n  padding: 6px 0;\n}\n.yzg-details .yzg-tip { margin-top: 4px; }\n\n/* \u624b\u673a\uff1a\u66f4\u7d27\u51d1\u3001\u8d34\u5e95\u66f4\u50cf\u62bd\u5c49\uff08\u4f46\u7528 margin:auto\uff0c\u907f\u514d\u9876\u90e8\u88ab\u9876\u51fa\u5c4f\u5e55\uff09 */\n@media (max-width: 480px) {\n  .yzg-overlay { padding: 8px; }\n  .yzg-card { width: 100%; max-height: calc(100dvh - 16px); border-radius: 14px; }\n  .yzg-body { padding: 10px 12px; }\n  .yzg-foot { padding: 9px 12px 11px; }\n}\n";
  // ==========================================================================
  // store.js \u2014 \u914d\u7f6e\u8bfb\u5199 + \u672c\u5730\u56fe\u5e93\uff08IndexedDB\uff09+ \u56fe\u7247\u538b\u7f29
  // ==========================================================================

  function stCtx() {
    try {
      const W = PAGE_WIN;
      if (W && W.SillyTavern && typeof W.SillyTavern.getContext === 'function') return W.SillyTavern.getContext();
    } catch (_e) { /* ignore */ }
    return null;
  }

  function charCardName() {
    const c = stCtx();
    if (!c) return '';
    try {
      const idx = Number(c.characterId);
      if (c.characters && Number.isInteger(idx) && c.characters[idx]) return String(c.characters[idx].name || '');
    } catch (_e) { /* ignore */ }
    return '';
  }

  // \u5f53\u524d\u804a\u5929\u7684\u552f\u4e00\u6807\u8bc6\uff1a\u89d2\u8272\u5361 + \u804a\u5929\u6587\u4ef6
  // \u3010\u4e3a\u4ec0\u4e48\u7528\u8fd9\u4e24\u4e2a\u3011ST \u7684\u804a\u5929\u6587\u4ef6\u540d\u662f\u7a33\u5b9a\u7684\uff0c\u89d2\u8272\u5361\u540d\u4fdd\u8bc1\u300c\u540c\u5361\u591a\u804a\u5929\u300d\u548c\u300c\u65e0\u5361\u804a\u5929\u300d\u90fd\u80fd\u5206\u5f00
  function chatKey() {
    const c = stCtx();
    const ch = charCardName() || '(\u65e0\u89d2\u8272\u5361)';
    let id = '';
    try { id = String(c && c.chatId ? c.chatId : ''); } catch (_e) { /* ignore */ }
    if (!id) id = '(\u672a\u547d\u540d\u804a\u5929)';
    return ch + '::' + id;
  }

  // --------------------------------------------------------------------------
  // \u914d\u7f6e
  // --------------------------------------------------------------------------
  function cfg() {
    return {
      textMode: lsGet(LS.textMode, 'own'),          // 'st' | 'own'
      textBase: lsGet(LS.textBase, ''),
      textKey: lsGet(LS.textKey, ''),
      textModel: lsGet(LS.textModel, ''),
      imgBase: lsGet(LS.imgBase, ''),
      imgKey: lsGet(LS.imgKey, ''),
      imgModel: lsGet(LS.imgModel, ''),
      imgExtra: lsGet(LS.imgExtra, ''),
      size: lsGet(LS.size, DEFAULT_SIZE),
      styles: lsJson(LS.styles, []),
      styleOn: lsJson(LS.styleOn, ['cinematic']),
      autoTranslate: lsGet(LS.autoTranslate, '1') === '1',
      contextN: Math.max(2, Math.min(30, Number(lsGet(LS.contextN, '8')) || 8)),
      limitDay: Math.max(0, Number(lsGet(LS.limitDay, '20')) || 0),   // 0 = \u4e0d\u9650
      enabled: lsGet(LS.enabled, '1') === '1',
      costMode: lsGet(LS.costMode, 'count'),        // 'count' | 'money' | 'point'
      costValue: Number(lsGet(LS.costValue, '0.2')) || 0.2,
      // v0.1.1
      preface: lsGet(LS.preface, DEFAULT_PREFACE),
      safeOn: lsGet(LS.safeOn, '1') === '1',
      safeRules: lsJson(LS.safeRules, null),
      rulePreset: lsGet(LS.rulePreset, 'neutral'),
      negative: lsGet(LS.negative, DEFAULT_NEGATIVE),
      negMode: lsGet(LS.negMode, 'param'),          // 'off' | 'param'
    };
  }

  // \u66ff\u6362\u8868\uff1a\u6ca1\u5b58\u8fc7 = \u7528\u5f53\u524d\u9884\u8bbe\uff1b\u5b58\u8fc7\uff08\u54ea\u6015\u662f\u7a7a\u6570\u7ec4\uff09= \u7528\u5b58\u7684
  function safeRules() {
    const v = cfg().safeRules;
    if (!Array.isArray(v)) return presetRules(cfg().rulePreset);
    return v.filter((r) => r && String(r.from || '').trim())
      .map((r) => ({ from: String(r.from), to: String(r.to == null ? '' : r.to) }));
  }

  // \u6309\u66ff\u6362\u8868\u6539\u5199\u6587\u672c\uff08\u4e0d\u6539\u53d8\u753b\u9762\u5185\u5bb9\uff0c\u53ea\u6362\u63aa\u8f9e\uff09
  //   \u3010\u4e3a\u4ec0\u4e48\u8981\u6536\u5c3e\u6e05\u7406\u3011\u66ff\u6362\u662f\u300c\u63d2\u5165\u5b57\u7b26\u4e32\u300d\uff0c\u539f\u6587\u540e\u9762\u5982\u679c\u6b63\u597d\u63a5\u4e86\u540c\u4e49\u7684\u8bcd\uff0c
  //   \u5c31\u4f1a\u51fa\u73b0\u300c\u785d\u70df\u6563\u5c3d\u7684\u5e9f\u589f\u7684\u5e9f\u589f\u300d\u8fd9\u79cd\u53e0\u5b57\u3002\u8fd9\u91cc\u6309\u66ff\u6362\u76ee\u6807\u505a\u5b9a\u5411\u53bb\u91cd\uff0c
  //   \u53ea\u5904\u7406\u5df2\u77e5\u76ee\u6807\u8bcd\uff0c\u4e0d\u4f1a\u8bef\u4f24\u6b63\u5e38\u6587\u672c\u3002
  function applySafeRules(text, rules) {
    let out = String(text == null ? '' : text);
    const list = Array.isArray(rules) ? rules : safeRules();
    const targets = [];
    list.forEach((r) => {
      if (!r || !r.from) return;
      out = out.split(r.from).join(r.to);
      if (r.to) targets.push(String(r.to));
    });
    targets.forEach((t) => {
      if (t.length < 3) return;
      for (let k = t.length - 1; k >= 2; k--) {
        const dup = t + '\u7684' + t.slice(-k);   // T + \u7684 + T\u7684\u5c3e\u6bb5
        if (out.indexOf(dup) < 0) continue;
        out = out.split(dup).join(t);
      }
    });
    return out;
  }

  // patch \u7684 key \u65e2\u63a5\u53d7\u300c\u77ed\u540d\u300d\uff08enabled / textKey\uff09\uff0c\u4e5f\u63a5\u53d7\u300c\u771f\u5b9e\u952e\u540d\u300d\uff08yzg_enabled_v1\uff09\u3002
  // \u3010\u4e3a\u4ec0\u4e48\u4e24\u79cd\u90fd\u8981\u3011\u8bbe\u7f6e\u9762\u677f\u626b data-k \u6536\u4e0a\u6765\u7684\u952e\u5c31\u662f\u771f\u5b9e\u952e\u540d\uff0c\u4ee5\u524d\u53ea\u8ba4\u77ed\u540d\uff0c
  // \u7ed3\u679c lSGet(undefined) \u628a\u503c\u5199\u8fdb\u4e86\u53eb "undefined" \u7684\u952e\u91cc \u2014\u2014 \u52fe\u9009\u6846\u6539\u4e86\u7b49\u4e8e\u6ca1\u6539\u3002
  function setCfg(patch) {
    Object.keys(patch || {}).forEach((k) => {
      const v = patch[k];
      const sk = LS[k] || k;
      if (sk === LS.styles || sk === LS.styleOn || sk === LS.safeRules) lsSetJson(sk, v);
      else if (typeof v === 'boolean') lsSet(sk, v ? '1' : '0');
      else lsSet(sk, v);
    });
  }

  function allStyles() {
    const custom = cfg().styles || [];
    return BUILTIN_STYLES.concat(custom.filter((s) => s && s.id && s.prompt && !BUILTIN_STYLES.some((b) => b.id === s.id)));
  }

  function currentSize() {
    const id = cfg().size;
    return SIZES.filter((s) => s.id === id)[0] || SIZES[0];
  }

  // --------------------------------------------------------------------------
  // \u7edf\u8ba1\uff08\u5f20\u6570 + \u53ef\u9009\u91d1\u989d/\u70b9\u6570\uff09
  // --------------------------------------------------------------------------
  function todayStr() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }

  function stat() {
    const s = lsJson(LS.stat, null);
    const today = todayStr();
    if (!s || typeof s !== 'object') return { day: today, today: 0, total: 0 };
    return {
      day: String(s.day || today),
      today: String(s.day) === today ? Number(s.today || 0) : 0,
      total: Number(s.total || 0),
    };
  }

  function bumpStat(n) {
    const s = stat();
    const today = todayStr();
    const next = {
      day: today,
      today: (String(s.day) === today ? s.today : 0) + (n || 1),
      total: s.total + (n || 1),
    };
    lsSetJson(LS.stat, next);
    return next;
  }

  function statText() {
    const s = stat();
    const c = cfg();
    let txt = '\u4eca\u65e5 ' + s.today + ' \u5f20 \u00b7 \u7d2f\u8ba1 ' + s.total + ' \u5f20';
    if (c.costMode === 'money') txt += ' \u00b7 \u7ea6 \u00a5' + (s.total * c.costValue).toFixed(2);
    if (c.costMode === 'point') txt += ' \u00b7 \u7ea6 ' + Math.round(s.total * c.costValue) + ' \u70b9';
    return txt;
  }

  // \u51fa\u56fe\u8017\u65f6\u6ed1\u52a8\u5e73\u5747\uff08\u7528\u4e8e"\u9884\u8ba1\u8fd8\u8981\u591a\u4e45"\u7684\u53c2\u8003\u503c\uff09
  function avgSeconds() {
    const v = Number(lsGet(LS.durAvg, '0'));
    return v > 0 ? v : 0;
  }
  function pushDuration(sec) {
    const s = Number(sec) || 0;
    if (s <= 0) return;
    const old = avgSeconds();
    const next = old > 0 ? (old * 3 + s) / 4 : s;   // \u7b80\u5355\u6ed1\u52a8\u5e73\u5747\uff0c\u504f\u5411\u5386\u53f2
    lsSet(LS.durAvg, next.toFixed(1));
  }

  // --------------------------------------------------------------------------
  // \u56fe\u5e93\uff08IndexedDB\uff09
  // --------------------------------------------------------------------------
  const DB_NAME = 'yzm_image_gen';
  const DB_VER = 1;
  const STORE = 'images';

  function idbOpen() {
    return new Promise((resolve, reject) => {
      const IDB = window.indexedDB;
      if (!IDB) { reject(new Error('indexedDB \u4e0d\u53ef\u7528')); return; }
      const req = IDB.open(DB_NAME, DB_VER);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          const os = db.createObjectStore(STORE, { keyPath: 'id' });
          os.createIndex('chatKey', 'chatKey', { unique: false });
          os.createIndex('charKey', 'charKey', { unique: false });
          os.createIndex('ts', 'ts', { unique: false });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error || new Error('\u6253\u5f00\u56fe\u5e93\u5931\u8d25'));
    });
  }

  function idbRun(mode, fn) {
    return idbOpen().then((db) => new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, mode);
      const os = tx.objectStore(STORE);
      let out;
      try { out = fn(os); } catch (e) { reject(e); return; }
      tx.oncomplete = () => { try { db.close(); } catch (_e) { /* ignore */ } resolve(out && out.result !== undefined ? out.result : out); };
      tx.onerror = () => { try { db.close(); } catch (_e) { /* ignore */ } reject(tx.error); };
      tx.onabort = () => { try { db.close(); } catch (_e) { /* ignore */ } reject(tx.error || new Error('\u4e8b\u52a1\u4e2d\u6b62')); };
    }));
  }

  function galAdd(item) {
    return idbRun('readwrite', (os) => os.put(item));
  }
  function galGet(id) {
    return idbRun('readonly', (os) => os.get(id));
  }
  function galDel(id) {
    return idbRun('readwrite', (os) => os.delete(id));
  }
  function galClear() {
    return idbRun('readwrite', (os) => os.clear());
  }
  // \u6309\u5f53\u524d\u804a\u5929\u53d6\uff08\u5012\u5e8f\uff09
  function galListByChat(key) {
    return idbRun('readonly', (os) => {
      const idx = os.index('chatKey');
      const out = [];
      idx.openCursor(IDBKeyRange_only(key)).onsuccess = function () {
        const cur = this.result;
        if (cur) { out.push(cur.value); cur.continue(); }
      };
      return { get result() { return out; } };
    }).then((arr) => (arr || []).sort((a, b) => b.ts - a.ts));
  }

  function IDBKeyRange_only(v) {
    // \u540c\u6837\u7528\u81ea\u5df1\u7684 origin\uff08\u8de8 origin \u8bbf\u95ee\u4f1a\u629b\u5f02\u5e38\uff09
    const R = window.IDBKeyRange;
    return R.only(v);
  }

  // \u5168\u90e8\u804a\u5929\uff08\u7528\u4e8e"\u6d4f\u89c8\u5176\u4ed6\u804a\u5929\u7684\u56fe"\uff09
  function galListAll() {
    return idbRun('readonly', (os) => {
      const out = [];
      os.openCursor().onsuccess = function () {
        const cur = this.result;
        if (cur) { out.push(cur.value); cur.continue(); }
      };
      return { get result() { return out; } };
    }).then((arr) => (arr || []).sort((a, b) => b.ts - a.ts));
  }

  // --------------------------------------------------------------------------
  // \u56fe\u7247\u538b\u7f29\uff1a\u51fa\u56fe API \u5e38\u8fd4\u56de 2K/4K\uff0c\u672c\u5730\u5b58\u539f\u56fe\u5f88\u5feb\u5c31\u628a\u7a7a\u95f4\u5403\u5149
  // --------------------------------------------------------------------------
  function shrinkBlob(blob, maxSide) {
    return new Promise((resolve) => {
      const limit = maxSide || 1024;
      let url = null;
      try { url = PAGE_WIN.URL.createObjectURL(blob); } catch (_e) { resolve(blob); return; }
      const img = new PAGE_WIN.Image();
      img.onload = () => {
        try {
          const w0 = img.naturalWidth || img.width;
          const h0 = img.naturalHeight || img.height;
          const scale = Math.min(1, limit / Math.max(w0, h0));
          if (scale >= 1) { try { PAGE_WIN.URL.revokeObjectURL(url); } catch (_e2) { /* ignore */ } resolve(blob); return; }
          const w = Math.max(1, Math.round(w0 * scale));
          const h = Math.max(1, Math.round(h0 * scale));
          const cv = PAGE_DOC.createElement('canvas');
          cv.width = w; cv.height = h;
          cv.getContext('2d').drawImage(img, 0, 0, w, h);
          cv.toBlob((b) => {
            try { PAGE_WIN.URL.revokeObjectURL(url); } catch (_e2) { /* ignore */ }
            resolve(b || blob);
          }, 'image/webp', 0.86);
        } catch (_e2) {
          try { PAGE_WIN.URL.revokeObjectURL(url); } catch (_e3) { /* ignore */ }
          resolve(blob);
        }
      };
      img.onerror = () => {
        try { PAGE_WIN.URL.revokeObjectURL(url); } catch (_e2) { /* ignore */ }
        resolve(blob);
      };
      img.src = url;
    });
  }

  // \u8fdc\u7a0b URL \u2192 Blob\uff08\u5f88\u591a\u670d\u52a1\u8fd4\u56de\u7684\u662f\u4e34\u65f6\u94fe\u63a5\uff0c\u5f97\u5148\u53d6\u56de\u6765\u624d\u80fd\u5b58/\u663e\u793a\uff09
  function fetchBlob(url) {
    return window.fetch(url, { mode: 'cors' }).then((r) => {
      if (!r.ok) throw new Error('\u4e0b\u8f7d\u56fe\u7247\u5931\u8d25 HTTP ' + r.status);
      return r.blob();
    });
  }

  function blobUrl(blob) {
    try { return PAGE_WIN.URL.createObjectURL(blob); } catch (_e) { return ''; }
  }
  function revokeUrl(u) {
    try { if (u) PAGE_WIN.URL.revokeObjectURL(u); } catch (_e) { /* ignore */ }
  }

  // \u628a blob \u5b58\u8fdb\u76f8\u518c\uff08\u8d70\u6d4f\u89c8\u5668\u4e0b\u8f7d\uff09
  function saveToDevice(blob, filename) {
    const url = blobUrl(blob);
    if (!url) return false;
    const a = el('a', { href: url, download: filename || ('yzg-' + Date.now() + '.webp') });
    a.style.display = 'none';
    PAGE_DOC.body.appendChild(a);
    a.click();
    setTimeout(() => {
      try { a.remove(); } catch (_e) { /* ignore */ }
      revokeUrl(url);
    }, 60000);
    return true;
  }
  // ==========================================================================
  // api.js \u2014 \u4e24\u4e2a\u6a21\u578b\u7684\u8c03\u7528\uff08\u6587\u5b57 / \u56fe\u50cf\uff09+ \u6d4b\u8bd5\u8fde\u63a5 + \u5931\u8d25\u539f\u56e0\u5f52\u7c7b
  // ==========================================================================

  function YzgError(code, message, detail) {
    const e = new Error(message || code);
    e.code = code;
    e.detail = detail || '';
    return e;
  }

  // \u5730\u5740\u89c4\u8303\u5316\uff1a\u53ea\u53bb\u6389\u5c3e\u90e8\u659c\u6760\uff1b\u5982\u679c\u53ea\u586b\u4e86\u57df\u540d\u5c31\u81ea\u52a8\u8865 /v1
  // \uff08\u7edd\u5927\u591a\u6570\u4e2d\u8f6c/\u670d\u52a1\u90fd\u662f {host}/v1 \u7684\u7ea6\u5b9a\uff0c\u8865\u4e0a\u80fd\u5c11\u8e29\u5751\uff1b\u586b\u9519\u4e86\u6d4b\u8bd5\u8fde\u63a5\u4f1a\u63d0\u793a\uff09
  function normBase(u) {
    let s = String(u || '').trim().replace(/\/+$/, '');
    if (!s) return '';
    if (/^https?:\/\/[^/]+$/i.test(s)) s += '/v1';
    return s;
  }

  function authHeaders(key) {
    return {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + String(key || '').trim(),
    };
  }

  // \u7edf\u4e00\u8d85\u65f6
  function fetchWithTimeout(url, opts, ms) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => { try { ctrl.abort(); } catch (_e) { /* ignore */ } }, ms || 120000);
    const o = Object.assign({}, opts, { signal: ctrl.signal });
    return window.fetch(url, o).then(
      (r) => { clearTimeout(timer); return r; },
      (e) => {
        clearTimeout(timer);
        if (e && (e.name === 'AbortError' || /abort/i.test(String(e && e.message)))) {
          throw YzgError('timeout', '\u8bf7\u6c42\u8d85\u65f6\uff08\u7b49\u4e86 ' + Math.round((ms || 120000) / 1000) + ' \u79d2\uff09');
        }
        // \u6d4f\u89c8\u5668\u5c42\u9762\u7684\u5931\u8d25\uff1a\u6700\u5e38\u89c1\u5c31\u662f CORS \u6216\u65ad\u7f51
        throw YzgError('network', '\u7f51\u7edc\u8bf7\u6c42\u5931\u8d25\uff1a' + (e && e.message ? e.message : e) + '\uff08\u5e38\u89c1\u539f\u56e0\uff1a\u5730\u5740\u5199\u9519\u3001\u5bf9\u65b9\u4e0d\u5141\u8bb8\u7f51\u9875\u76f4\u8fde\u3001\u6216\u65ad\u7f51\uff09');
      }
    );
  }

  function classifyError(status, bodyText) {
    const t = String(bodyText || '').toLowerCase();
    if (status === 400 && /size|resolution|dimension/.test(t)) return '\u5c3a\u5bf8\u53c2\u6570\u4e0d\u88ab\u652f\u6301\uff08\u6362\u6210\u65b9\u5f62 1:1 \u518d\u8bd5\uff09';
    if (status === 400 && /negative|unknown|unexpected|not support|extra field|invalid.*param/.test(t)) {
      return '\u5bf9\u65b9\u4e0d\u63a5\u53d7\u8fd9\u4e2a\u53c2\u6570\u2014\u2014\u628a\u8bbe\u7f6e\u91cc\u7684\u300c\u8d1f\u9762\u63d0\u793a\u8bcd\u300d\u6539\u6210\u4e0d\u53d1\u9001\uff0c\u6216\u68c0\u67e5\u300c\u989d\u5916\u53c2\u6570\u300d';
    }
    if (status === 401 || status === 403) return 'API Key \u65e0\u6548 / \u6ca1\u6709\u6743\u9650';
    if (status === 402 || /insufficient|balance|quota|exceed|\u6b20\u8d39|\u4f59\u989d|\u989d\u5ea6/.test(t)) return '\u4f59\u989d\u6216\u989d\u5ea6\u4e0d\u8db3';
    if (status === 404) return '\u5730\u5740\u6216\u6a21\u578b\u540d\u4e0d\u5bf9\uff08404\uff09\u2014\u2014\u68c0\u67e5\u662f\u5426\u8be5\u5e26 /v1\uff0c\u6216\u6a21\u578b\u540d\u62fc\u5199';
    if (status === 429) return '\u8bf7\u6c42\u592a\u9891\u7e41\u6216\u8d85\u51fa\u9650\u989d\uff08429\uff09';
    if (status >= 500) return '\u5bf9\u65b9\u670d\u52a1\u7aef\u51fa\u9519\uff08HTTP ' + status + '\uff09';
    if (/content|safety|policy|moderation|violat|censor|\u5ba1\u6838|\u8fdd\u89c4|\u4e0d\u5b89\u5168/.test(t)) return '\u88ab\u5185\u5bb9\u5ba1\u6838\u62d2\u7edd\u4e86\uff08\u6362\u4e2a\u63cf\u8ff0\u6216\u98ce\u683c\u518d\u8bd5\uff09';
    if (/model/.test(t) && /not|invalid|exist/.test(t)) return '\u6a21\u578b\u540d\u4e0d\u5bf9';
    return '\u8bf7\u6c42\u5931\u8d25\uff08HTTP ' + status + '\uff09';
  }

  function readErrText(r) {
    return r.text().then((t) => String(t || '').slice(0, 400)).catch(() => '');
  }

  // --------------------------------------------------------------------------
  // \u6587\u5b57\u6a21\u578b
  // --------------------------------------------------------------------------

  // \u300c\u8ddf\u968f\u9152\u9986\u300d\uff1a\u501f\u9152\u9986\u540e\u7aef\u7684 chat-completions \u4ee3\u7406\u3002
  // \u6ce8\u610f\uff1a\u8fd9\u6761\u8def\u5f84\u4f9d\u8d56\u9152\u9986\u5185\u90e8\u63a5\u53e3\uff0c\u4e0d\u540c\u7248\u672c\u53ef\u80fd\u53d8 \u2014\u2014 \u5931\u8d25\u65f6\u7ed9\u660e\u786e\u63d0\u793a\uff0c\u8ba9\u7528\u6237\u6539\u7528\u300c\u5355\u72ec\u914d\u7f6e\u300d\u3002
  function callTextViaST(messages) {
    const c = stCtx();
    if (!c) throw YzgError('no-st', '\u8bfb\u4e0d\u5230\u9152\u9986\u4e0a\u4e0b\u6587');
    if (typeof c.getRequestHeaders !== 'function') throw YzgError('no-st-api', '\u9152\u9986\u6ca1\u6709\u66b4\u9732 getRequestHeaders\uff08\u7248\u672c\u4e0d\u652f\u6301\uff09');
    const st = (c.chatCompletionSettings || {});
    const source = st.chat_completion_source || '';
    const model = st.openai_model || st.claude_model || st.model || '';
    if (!source) throw YzgError('no-st-source', '\u8bfb\u4e0d\u5230\u9152\u9986\u7684\u5bf9\u8bdd\u6765\u6e90\u8bbe\u7f6e');
    const body = {
      chat_completion_source: source,
      model: model,
      messages: messages,
      max_tokens: 400,
      temperature: 0.7,
      stream: false,
    };
    return fetchWithTimeout('/api/backends/chat-completions/generate', {
      method: 'POST',
      headers: c.getRequestHeaders(),
      body: JSON.stringify(body),
    }, 60000).then((r) => {
      if (!r.ok) return readErrText(r).then((t) => { throw YzgError('st-fail', '\u9152\u9986\u5185\u7f6e\u6a21\u578b\u8c03\u7528\u5931\u8d25\uff08HTTP ' + r.status + '\uff09', t); });
      return r.json();
    }).then((d) => {
      const txt = (d && d.choices && d.choices[0] && (d.choices[0].message ? d.choices[0].message.content : d.choices[0].text)) || '';
      if (!txt) throw YzgError('st-empty', '\u9152\u9986\u5185\u7f6e\u6a21\u578b\u6ca1\u6709\u8fd4\u56de\u5185\u5bb9');
      return String(txt);
    });
  }

  function callTextOwn(messages) {
    const c = cfg();
    const base = normBase(c.textBase);
    if (!base) throw YzgError('no-base', '\u8fd8\u6ca1\u586b\u6587\u5b57\u6a21\u578b\u7684\u63a5\u53e3\u5730\u5740');
    if (!c.textKey) throw YzgError('no-key', '\u8fd8\u6ca1\u586b\u6587\u5b57\u6a21\u578b\u7684 API Key');
    if (!c.textModel) throw YzgError('no-model', '\u8fd8\u6ca1\u586b\u6587\u5b57\u6a21\u578b\u7684\u6a21\u578b\u540d');
    return fetchWithTimeout(base + '/chat/completions', {
      method: 'POST',
      headers: authHeaders(c.textKey),
      body: JSON.stringify({ model: c.textModel, messages: messages, max_tokens: 400, temperature: 0.7, stream: false }),
    }, 60000).then((r) => {
      if (!r.ok) return readErrText(r).then((t) => { throw YzgError('http-' + r.status, classifyError(r.status, t), t); });
      return r.json();
    }).then((d) => {
      const txt = (d && d.choices && d.choices[0] && (d.choices[0].message ? d.choices[0].message.content : d.choices[0].text)) || '';
      if (!txt) throw YzgError('empty', '\u6587\u5b57\u6a21\u578b\u6ca1\u6709\u8fd4\u56de\u5185\u5bb9');
      return String(txt);
    });
  }

  // \u5bf9\u5916\u7edf\u4e00\u5165\u53e3
  function callText(messages) {
    const c = cfg();
    if (c.textMode === 'st') {
      try {
        return Promise.resolve(callTextViaST(messages)).catch((e) => {
          if (e && e.code === 'st-fail') {
            throw YzgError('st-fail', '\u8ddf\u968f\u9152\u9986\u8c03\u7528\u5931\u8d25\uff0c\u5efa\u8bae\u6539\u7528\u300c\u5355\u72ec\u914d\u7f6e\u300d\u4e00\u4e2a\u4fbf\u5b9c\u7684\u5c0f\u6a21\u578b', e.detail);
          }
          throw e;
        });
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return callTextOwn(messages);
  }

  // --------------------------------------------------------------------------
  // \u56fe\u50cf\u6a21\u578b
  // --------------------------------------------------------------------------
  function buildImageBody(prompt, sizeStr) {
    const c = cfg();
    const body = { model: c.imgModel, prompt: prompt, n: 1, size: sizeStr };
    // \u8d1f\u9762\u63d0\u793a\u8bcd\uff1a\u4f5c\u4e3a\u72ec\u7acb\u53c2\u6570\u53d1\uff08\u591a\u6570\u670d\u52a1\u652f\u6301 negative_prompt\uff0c\u4e0d\u652f\u6301\u7684\u4f1a\u5ffd\u7565\uff09
    // \u5982\u679c\u670d\u52a1\u56e0\u4e3a\u4e0d\u8ba4\u8bc6\u8fd9\u4e2a\u5b57\u6bb5\u62a5 400\uff0c\u53bb\u8bbe\u7f6e\u91cc\u628a\u300c\u8d1f\u9762\u63d0\u793a\u8bcd\u300d\u6539\u6210\u4e0d\u53d1\u9001\u5373\u53ef
    if (c.negMode === 'param' && c.negative) body.negative_prompt = String(c.negative);
    if (c.imgExtra) {
      try {
        const extra = JSON.parse(c.imgExtra);
        if (extra && typeof extra === 'object') Object.keys(extra).forEach((k) => { body[k] = extra[k]; });
      } catch (_e) { /* \u989d\u5916\u53c2\u6570\u5199\u9519\u4e86\u5c31\u5ffd\u7565\uff0c\u4e0d\u5f71\u54cd\u51fa\u56fe */ }
    }
    return body;
  }

  // \u89e3\u6790\u51fa\u56fe\u8fd4\u56de\uff1aurl \u6216 b64_json \u90fd\u8981\u5403
  function parseImageResponse(json) {
    const d = json && json.data;
    const first = Array.isArray(d) ? d[0] : (Array.isArray(json && json.images) ? json.images[0] : null);
    if (!first) {
      throw YzgError('bad-format', '\u8fd4\u56de\u683c\u5f0f\u770b\u4e0d\u61c2\uff1a' + JSON.stringify(json).slice(0, 200));
    }
    const url = first.url || first.image_url || (first.image && first.image.url);
    const b64 = first.b64_json || first.b64 || first.image_base64;
    if (b64) {
      return { kind: 'b64', b64: String(b64) };
    }
    if (url) {
      if (String(url).indexOf('data:') === 0) {
        return { kind: 'b64', b64: String(url).split(',')[1] || '' };
      }
      return { kind: 'url', url: String(url) };
    }
    throw YzgError('bad-format', '\u8fd4\u56de\u91cc\u65e2\u6ca1\u6709 url \u4e5f\u6ca1\u6709 b64_json');
  }

  function b64ToBlob(b64, mime) {
    const bin = PAGE_WIN.atob(b64);
    const len = bin.length;
    const u8 = new Uint8Array(len);
    for (let i = 0; i < len; i++) u8[i] = bin.charCodeAt(i);
    return new PAGE_WIN.Blob([u8], { type: mime || 'image/png' });
  }

  // \u51fa\u56fe\uff1a\u8fd4\u56de Blob
  function callImage(prompt) {
    const c = cfg();
    const base = normBase(c.imgBase);
    if (!base) throw YzgError('no-base', '\u8fd8\u6ca1\u586b\u51fa\u56fe\u63a5\u53e3\u5730\u5740');
    if (!c.imgKey) throw YzgError('no-key', '\u8fd8\u6ca1\u586b\u51fa\u56fe API Key');
    if (!c.imgModel) throw YzgError('no-model', '\u8fd8\u6ca1\u586b\u51fa\u56fe\u6a21\u578b\u540d');
    const sizeStr = currentSize().size;
    const body = buildImageBody(prompt, sizeStr);

    return fetchWithTimeout(base + '/images/generations', {
      method: 'POST',
      headers: authHeaders(c.imgKey),
      body: JSON.stringify(body),
    }, 180000).then((r) => {
      if (!r.ok) return readErrText(r).then((t) => { throw YzgError('http-' + r.status, classifyError(r.status, t), t); });
      return r.json();
    }).then((json) => {
      const p = parseImageResponse(json);
      if (p.kind === 'b64') return b64ToBlob(p.b64);
      return fetchBlob(p.url);
    });
  }

  // --------------------------------------------------------------------------
  // \u6d4b\u8bd5\u8fde\u63a5\uff08\u4e0d\u82b1\u94b1\u3001\u4e0d\u771f\u51fa\u56fe\uff1b\u53ea\u63a2\u7aef\u70b9\u662f\u5426\u5b58\u5728\u3001\u9274\u6743\u3001CORS\u3001\u8fd4\u56de\u683c\u5f0f\uff09
  // --------------------------------------------------------------------------
  function testOwnText() {
    const c = cfg();
    const base = normBase(c.textBase);
    if (!base) return Promise.resolve({ ok: false, msg: '\u5148\u586b\u5730\u5740' });
    if (!c.textKey || !c.textModel) return Promise.resolve({ ok: false, msg: '\u5148\u586b Key \u548c\u6a21\u578b\u540d' });
    const t0 = Date.now();
    return fetchWithTimeout(base + '/chat/completions', {
      method: 'POST',
      headers: authHeaders(c.textKey),
      body: JSON.stringify({ model: c.textModel, messages: [{ role: 'user', content: 'ping' }], max_tokens: 5, stream: false }),
    }, 30000).then(
      () => ({ ok: true, msg: '\u53ef\u7528\uff08' + ((Date.now() - t0) / 1000).toFixed(1) + 's\uff09' }),
      (e) => ({ ok: false, msg: (e && e.message) || '\u5931\u8d25' })
    );
  }

  // \u6d4b\u8bd5\u51fa\u56fe\u63a5\u53e3\uff1a\u4e24\u6b65\u63a2\u6d4b
  //   \u7b2c 1 \u6b65 OPTIONS \u9884\u68c0\uff08\u4e0d\u82b1\u94b1\uff09\uff1a\u63a2\u7aef\u70b9\u662f\u5426\u5b58\u5728\u3001\u662f\u5426\u5141\u8bb8\u7f51\u9875\u76f4\u8fde
  //   \u7b2c 2 \u6b65 \u53d1\u4e00\u4e2a\u7a7a prompt \u7684 POST\uff1a\u9a8c\u8bc1 Key \u6709\u6ca1\u6709\u6743\u9650\uff08\u591a\u6570\u670d\u52a1\u4f1a\u56de 400\uff0c\u4e0d\u4f1a\u771f\u51fa\u56fe\uff09
  function testImage() {
    const c = cfg();
    const base = normBase(c.imgBase);
    if (!base) return Promise.resolve({ ok: false, msg: '\u5148\u586b\u5730\u5740' });
    if (!c.imgKey || !c.imgModel) return Promise.resolve({ ok: false, msg: '\u5148\u586b Key \u548c\u6a21\u578b\u540d' });
    const url = base + '/images/generations';

    return fetchWithTimeout(url, {
      method: 'OPTIONS',
      headers: {
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'authorization,content-type',
      },
    }, 15000).then(
      (r) => (r.status === 404
        ? { ok: false, msg: '\u6ca1\u6709 /images/generations \u8fd9\u4e2a\u7aef\u70b9 \u2014\u2014 \u8fd9\u4e2a\u670d\u52a1\u53ef\u80fd\u4e0d\u51fa\u56fe\uff0c\u6216\u5730\u5740\u5c11\u5199/\u591a\u5199\u4e86 /v1' }
        : null),
      (e) => ({ ok: false, msg: '\u7f51\u9875\u76f4\u8fde\u88ab\u62d2\u7edd\uff08CORS \u6216\u5730\u5740\u4e0d\u901a\uff09\uff1a' + ((e && e.message) || e) })
    ).then((early) => {
      if (early) return early;
      return fetchWithTimeout(url, {
        method: 'POST',
        headers: authHeaders(c.imgKey),
        body: JSON.stringify({ model: c.imgModel, prompt: '', n: 1 }),
      }, 30000).then(async (r) => {
        const t = await readErrText(r);
        if (r.ok) return { ok: true, msg: '\u53ef\u7528 \u2705\uff08\u7aef\u70b9\u6b63\u5e38\u3001Key \u6709\u6548\uff1b\u521a\u624d\u8fd9\u6b21\u7a7a\u8bf7\u6c42\u53ef\u80fd\u8ba1\u4e86\u4e00\u6b21\u8d39\uff09' };
        if (r.status === 401 || r.status === 403) return { ok: false, msg: '\u7aef\u70b9\u6b63\u5e38\uff0c\u4f46 Key \u65e0\u6548 / \u6ca1\u6709\u6743\u9650' };
        if (r.status === 400) {
          if (/prompt|required|\u53c2\u6570|\u5185\u5bb9/.test(t)) return { ok: true, msg: '\u53ef\u7528 \u2705\uff08\u7aef\u70b9\u6b63\u5e38\u3001Key \u5df2\u901a\u8fc7\u9274\u6743\uff09' };
          return { ok: false, msg: '\u7aef\u70b9\u53ef\u80fd\u4e0d\u662f\u51fa\u56fe\u63a5\u53e3\uff1a' + t.slice(0, 120) };
        }
        if (r.status === 404) return { ok: false, msg: '\u7aef\u70b9\u4e0d\u5b58\u5728\uff08404\uff09\u2014\u2014 \u68c0\u67e5\u662f\u5426\u8be5\u5e26 /v1' };
        return { ok: false, msg: classifyError(r.status, t) };
      }, (e) => ({ ok: false, msg: (e && e.message) || '\u5931\u8d25' }));
    });
  }

  // --------------------------------------------------------------------------
  // \u62c9\u53d6\u670d\u52a1\u5546\u7684\u6a21\u578b\u5217\u8868\uff08OpenAI \u517c\u5bb9\u7aef\u70b9\uff1aGET /models\uff09
  //   \u591a\u6570\u670d\u52a1 / \u4e2d\u8f6c\u7ad9\u90fd\u652f\u6301\uff1b\u8fd4\u56de\u7684\u5b57\u6bb5\u540d\u5404\u5bb6\u7565\u6709\u5dee\u5f02\uff0c\u8fd9\u91cc\u90fd\u517c\u5bb9\u4e00\u4e0b
  // --------------------------------------------------------------------------
  function fetchModels(base, key) {
    const b = normBase(base);
    if (!b) throw YzgError('no-base', '\u5148\u586b\u5730\u5740');
    if (!key) throw YzgError('no-key', '\u5148\u586b Key');
    return fetchWithTimeout(b + '/models', {
      method: 'GET',
      headers: authHeaders(key),
    }, 30000).then((r) => {
      if (!r.ok) return readErrText(r).then((t) => { throw YzgError('http-' + r.status, classifyError(r.status, t), t); });
      return r.json();
    }).then((d) => {
      let arr = [];
      if (Array.isArray(d)) arr = d;
      else if (d && Array.isArray(d.data)) arr = d.data;
      else if (d && Array.isArray(d.models)) arr = d.models;
      else if (d && Array.isArray(d.result)) arr = d.result;
      else if (d && d.data && typeof d.data === 'object') arr = Object.keys(d.data).map((k) => ({ id: k }));
      const ids = arr
        .map((x) => (typeof x === 'string' ? x : (x && (x.id || x.name || x.model || x.model_name)) || ''))
        .map((s) => String(s).trim())
        .filter((s) => s && s !== 'undefined');
      const uniq = [];
      const seen = {};
      ids.forEach((s) => { if (!seen[s]) { seen[s] = 1; uniq.push(s); } });
      uniq.sort();
      if (!uniq.length) throw YzgError('empty', '\u63a5\u53e3\u8fde\u901a\u4e86\uff0c\u4f46\u6ca1\u6709\u8fd4\u56de\u6a21\u578b\u5217\u8868\uff08\u53ef\u80fd\u4e0d\u652f\u6301 /models\uff09');
      return uniq;
    });
  }

  // \u4ece base64 data URL \u53d6 mime
  function guessMime(blob) {
    return (blob && blob.type) || 'image/png';
  }
  // ==========================================================================
  // gen.js \u2014 \u7d20\u6750\u6536\u96c6 \u2192 \u7ffb\u8bd1\u6210\u753b\u9762\u63cf\u8ff0 \u2192 \u62fc\u98ce\u683c \u2192 \u51fa\u56fe
  // ==========================================================================

  // \u53d6\u6700\u8fd1 N \u6761\u5bf9\u8bdd\uff08\u8df3\u8fc7\u7cfb\u7edf\u6d88\u606f\u3001\u7a7a\u6d88\u606f\uff09
  // ST \u7684 chat \u7ed3\u6784\uff1a{ is_user, is_system, mes, name, ... }\uff1bswipe \u7684\u5f53\u524d\u5185\u5bb9\u5df2\u7ecf\u5728 mes \u91cc
  function recentMessages(n) {
    const c = stCtx();
    const chat = (c && Array.isArray(c.chat)) ? c.chat : [];
    const out = [];
    for (let i = chat.length - 1; i >= 0 && out.length < n; i--) {
      const m = chat[i];
      if (!m || m.is_system) continue;
      const txt = String(m.mes || '').trim();
      if (!txt) continue;
      out.unshift({
        who: m.is_user ? 'user' : 'assistant',
        text: txt.slice(0, 600),
      });
    }
    return out;
  }

  function charInfo() {
    const c = stCtx();
    if (!c) return null;
    try {
      const idx = Number(c.characterId);
      if (c.characters && Number.isInteger(idx) && c.characters[idx]) {
        const ch = c.characters[idx];
        return {
          name: String(ch.name || ''),
          desc: String(ch.description || '').slice(0, 600),
          personality: String(ch.personality || '').slice(0, 300),
          scenario: String(ch.scenario || '').slice(0, 300),
        };
      }
    } catch (_e) { /* ignore */ }
    return null;
  }

  // \u7ec4\u88c5\u7ed9\u300c\u7ffb\u8bd1\u6a21\u578b\u300d\u7684\u6750\u6599
  function collectMaterial() {
    const c = cfg();
    const msgs = recentMessages(c.contextN);
    const ch = charInfo();
    const parts = [];
    if (ch && ch.name) {
      let s = '\u3010\u89d2\u8272\u3011' + ch.name;
      if (ch.desc) s += '\uff1a' + ch.desc;
      if (ch.personality) s += '\n\u3010\u6027\u683c\u3011' + ch.personality;
      parts.push(s);
    }
    if (msgs.length) {
      parts.push('\u3010\u6700\u8fd1\u5267\u60c5\u3011\n' + msgs.map((m) => (m.who === 'user' ? '\u7528\u6237' : '\u89d2\u8272') + '\uff1a' + m.text).join('\n'));
    }
    return { text: parts.join('\n\n'), msgs: msgs, ch: ch };
  }

  const TRANSLATE_SYS = [
    '\u4f60\u662f\u4e00\u4e2a AI \u7ed8\u753b\u63d0\u793a\u8bcd\u52a9\u624b\uff1a\u628a\u89d2\u8272\u626e\u6f14\u7684\u5267\u60c5\uff0c\u6539\u5199\u6210\u4e00\u53e5\u53ef\u4ee5\u76f4\u63a5\u7528\u4e8e AI \u51fa\u56fe\u7684\u300c\u753b\u9762\u63cf\u8ff0\u300d\u3002',
    '',
    '\u89c4\u5219\uff1a',
    '1. \u53ea\u63cf\u8ff0\u300c\u770b\u5f97\u89c1\u7684\u4e1c\u897f\u300d\u2014\u2014\u4eba\u7269\u5916\u89c2\u3001\u52a8\u4f5c\u3001\u59ff\u6001\u3001\u4f4d\u7f6e\u3001\u73af\u5883\u3001\u5149\u7ebf\u3001\u6c1b\u56f4',
    '2. \u4e0d\u8981\u51fa\u73b0\u5f15\u53f7\u3001\u5bf9\u8bdd\u539f\u6587\u3001\u5fc3\u7406\u63cf\u5199\u3001"\u4ed6\u8bf4/\u5979\u60f3/\u89c9\u5f97"\u8fd9\u7c7b\u4e0d\u53ef\u89c1\u7684\u5185\u5bb9',
    '3. \u4fdd\u7559\u89d2\u8272\u7684\u5173\u952e\u5916\u89c2\u7279\u5f81\uff08\u673a\u578b\u3001\u6d82\u88c5\u3001\u670d\u88c5\u3001\u663e\u8457\u6807\u5fd7\uff09\uff0c\u8fd9\u662f\u4fdd\u8bc1\u51fa\u56fe\u8ba4\u5f97\u51fa\u6765\u7684\u5173\u952e',
    '4. \u7528\u4e2d\u6587\uff0c\u4e00\u53e5\u8bdd\uff0c60~120 \u5b57',
    '5. \u8fd9\u662f\u4e00\u4e2a\u865a\u6784\u6545\u4e8b\u91cc\u7684\u63d2\u753b/\u6982\u5ff5\u56fe\uff0c\u4e0d\u662f\u7eaa\u5b9e\u7167\u7247\uff1a\u7528\u753b\u9762\u611f\u7684\u8bed\u8a00\u5199\uff0c\u8ba9\u4eba\u80fd"\u770b\u89c1"\u8fd9\u4e00\u5e27',
    '6. \u6d89\u53ca\u4f24\u5bb3\u3001\u533b\u7597\u3001\u51b2\u7a81\u7684\u573a\u9762\uff0c\u7528\u610f\u8c61\u5316\u7684\u8bf4\u6cd5\uff0c\u4e0d\u8981\u7528\u76f4\u767d\u8bcd\u6c47\u2014\u2014',
    '   \u5199\u300c\u785d\u70df\u6563\u5c3d\u7684\u5e9f\u589f\u300d\u300c\u5b88\u5728\u5e8a\u8fb9\u7684\u4eba\u300d\u300c\u4f4e\u5782\u7740\u5934\u7684\u8eab\u5f71\u300d\uff0c',
    '   \u4e0d\u8981\u5199\u300c\u6d41\u8840\u300d\u300c\u4f24\u53e3\u300d\u300c\u8840\u6db2\u300d\u300c\u5c38\u4f53\u300d\u300c\u8840\u8165\u300d\u8fd9\u7c7b\u8bcd\uff1b',
    '   \u5177\u4f53\u7528\u4ec0\u4e48\u610f\u8c61\u8981\u8d34\u5408\u4e16\u754c\u89c2\uff08\u4eba\u6d41\u8840\uff0c\u673a\u68b0\u6d41\u80fd\u91cf\u6db2\uff09',
    '7. \u53ea\u8f93\u51fa\u8fd9\u4e00\u53e5\uff0c\u4e0d\u8981\u4efb\u4f55\u524d\u7f00\u3001\u5e8f\u53f7\u3001\u89e3\u91ca\u6216 markdown \u6807\u8bb0',
  ].join('\n');

  function buildTranslateMessages(material) {
    const c = cfg();
    let sys = TRANSLATE_SYS;
    // \u4e16\u754c\u8bbe\u5b9a\u5f53\u80cc\u666f\u5582\u8fdb\u53bb\uff1a\u6a21\u578b\u77e5\u9053\u8fd9\u662f\u67b6\u7a7a\u6545\u4e8b\uff0c\u63aa\u8f9e\u4f1a\u66f4\u81ea\u7136\uff0c\u4e5f\u4e0d\u4f1a\u628a\u5267\u60c5\u8bef\u8bfb\u6210\u73b0\u5b9e\u4e8b\u4ef6
    if (c.preface) sys += '\n\n\u3010\u4e16\u754c\u8bbe\u5b9a / \u753b\u98ce\u80cc\u666f\u3011\n' + c.preface;
    return [
      { role: 'system', content: sys },
      { role: 'user', content: material.text + '\n\n\u8bf7\u5199\u51fa\u8fd9\u4e00\u53e5\u753b\u9762\u63cf\u8ff0\u3002' },
    ];
  }

  // \u515c\u5e95\uff1a\u53bb\u6389\u6a21\u578b\u53ef\u80fd\u52a0\u7684\u591a\u4f59\u5305\u88c5\uff08\u5f15\u53f7\u3001markdown\u3001\u524d\u7f00\uff09
  function cleanScene(s) {
    let t = String(s || '').trim();
    t = t.replace(/^```[a-z]*\s*/i, '').replace(/```\s*$/, '');
    t = t.replace(/^(\u753b\u9762\u63cf\u8ff0|\u573a\u666f\u63cf\u8ff0|\u63cf\u8ff0)[:\uff1a]\s*/, '');
    t = t.replace(/^[\u300c"'\u3010]+/, '').replace(/[\u300d"'\u3011]+$/, '');
    return t.trim();
  }

  async function translateToScene(material) {
    const raw = await callText(buildTranslateMessages(material));
    const scene = cleanScene(raw);
    if (!scene) throw YzgError('empty-scene', '\u7ffb\u8bd1\u6a21\u578b\u6ca1\u6709\u7ed9\u51fa\u753b\u9762\u63cf\u8ff0\uff08\u6362\u4e2a\u6a21\u578b\u6216\u5173\u6389\u8fd9\u4e00\u6b65\u8bd5\u8bd5\uff09');
    return scene;
  }

  // \u62fc\u6700\u7ec8\u51fa\u56fe\u63d0\u793a\u8bcd = \u4e16\u754c\u8bbe\u5b9a\u524d\u7f00 + \u753b\u9762\u63cf\u8ff0 + \u9009\u4e2d\u7684\u98ce\u683c\u540e\u7f00 \u2192 \u8fc7\u4e00\u904d\u5b89\u5168\u66ff\u6362\u8868
  // \u987a\u5e8f\u6709\u610f\u4e3a\u4e4b\uff1a\u524d\u7f00\u5728\u6700\u524d\uff08\u5148\u5b9a\u8bed\u5883\uff09\uff0c\u98ce\u683c\u5728\u540e\uff08\u540e\u5199\u7684\u4e00\u822c\u6743\u91cd\u66f4\u9ad8\uff09
  function buildImagePrompt(scene, styleIds) {
    const c = cfg();
    const ids = Array.isArray(styleIds) ? styleIds : c.styleOn;
    const all = allStyles();
    const styleText = all
      .filter((s) => ids.indexOf(s.id) >= 0)
      .map((s) => s.prompt)
      .join(', ');

    const parts = [];
    if (c.preface) parts.push(String(c.preface).trim());
    parts.push(String(scene || '').trim());
    if (styleText) parts.push(styleText);

    let prompt = parts.filter(Boolean).join(', ');
    if (c.safeOn) prompt = applySafeRules(prompt);
    return prompt;
  }

  // \u7ed9\u7528\u6237\u770b\u7684\u5b8c\u6574\u63d0\u793a\u8bcd\uff08\u542b\u8d1f\u9762\uff09\uff0c\u51fa\u9519\u65f6\u4e5f\u65b9\u4fbf\u81ea\u5df1\u5bf9
  function fullPromptText(prompt, neg) {
    const c = cfg();
    const negative = neg === undefined ? c.negative : neg;
    let t = prompt || '';
    if (c.negMode === 'param' && negative) t += '\n\n\u3010\u8d1f\u9762\u63d0\u793a\u8bcd\u3011\n' + negative;
    return t;
  }

  // --------------------------------------------------------------------------
  // \u4e3b\u6d41\u7a0b
  //   opts.onStage(name, info)
  //     'collect'   \u5f00\u59cb\u6536\u96c6\u7d20\u6750
  //     'translate' \u6b63\u5728\u7ffb\u8bd1
  //     'draw'      \u6b63\u5728\u51fa\u56fe\uff08info.prompt \u662f\u6700\u7ec8\u63d0\u793a\u8bcd\uff09
  //     'done'      \u5b8c\u6210\uff08info.blob / sec / prompt / scene\uff09
  // --------------------------------------------------------------------------
  async function runGenerate(opts) {
    const o = opts || {};
    const stage = (n, i) => { try { if (typeof o.onStage === 'function') o.onStage(n, i || {}); } catch (_e) { /* ignore */ } };
    const c = cfg();

    stage('collect');
    const material = collectMaterial();
    if (!material.text) throw YzgError('no-material', '\u6ca1\u6709\u53ef\u7528\u7684\u5267\u60c5\u7d20\u6750\uff08\u804a\u5929\u662f\u7a7a\u7684\uff1f\uff09');

    let scene = '';
    let usedTranslate = false;
    if (c.autoTranslate) {
      stage('translate');
      scene = await translateToScene(material);
      usedTranslate = true;
    } else {
      // \u5173\u6389\u7ffb\u8bd1\uff1a\u76f4\u63a5\u628a\u7d20\u6750\u622a\u4e00\u6bb5\u5f53\u63cf\u8ff0\uff08\u7701\u94b1\u3001\u5feb\uff0c\u4f46\u51fa\u56fe\u4f1a\u98d8\uff09
      scene = cleanScene(material.text.replace(/\s+/g, ' ').slice(0, 300));
    }

    const prompt = buildImagePrompt(scene, c.styleOn);
    stage('draw', { prompt: prompt });
    const t0 = Date.now();
    const blob = await callImage(prompt);
    const sec = (Date.now() - t0) / 1000;
    pushDuration(sec);

    stage('done', { blob: blob, sec: sec, prompt: prompt, scene: scene, usedTranslate: usedTranslate });
    return { blob: blob, sec: sec, prompt: prompt, scene: scene, usedTranslate: usedTranslate };
  }

  // \u6bcf\u65e5\u4e0a\u9650\u68c0\u67e5\uff08\u8fd4\u56de true = \u8fd8\u53ef\u4ee5\u51fa\u56fe\uff09
  function withinDailyLimit() {
    const c = cfg();
    if (!c.limitDay) return true;
    const s = stat();
    return (String(s.day) === todayStr() ? s.today : 0) < c.limitDay;
  }
  // ==========================================================================
  // ui.js \u2014 \u5165\u53e3\uff08\u9b54\u6cd5\u68d2 + \u60ac\u6d6e\u7403\uff09+ \u51fa\u56fe\u9762\u677f + \u8bbe\u7f6e
  // ==========================================================================

  const S = {
    overlay: null,
    view: 'main',        // 'main' | 'settings'
    busy: false,
    stageText: '',
    stageKind: '',
    startedAt: 0,
    timer: null,
    last: null,          // { item, url }
    urls: [],            // \u9700\u8981\u56de\u6536\u7684 objectURL
    list: [],
    notice: '',
    rulesDraft: null,    // \u66ff\u6362\u8868\u8349\u7a3f\uff08\u8fdb\u8bbe\u7f6e\u65f6\u4ece\u914d\u7f6e\u521d\u59cb\u5316\uff0c\u4fdd\u5b58/\u8fd4\u56de\u65f6\u6e05\u6389\uff09
    presetDraft: '',     // \u66ff\u6362\u8868\u8349\u7a3f\u5f53\u524d\u5957\u7528\u7684\u9884\u8bbe id\uff08\u624b\u6539\u8fc7\u5c31\u6e05\u7a7a\uff09
  };

  function revokeAll() {
    S.urls.forEach((u) => revokeUrl(u));
    S.urls = [];
  }

  // --------------------------------------------------------------------------
  // \u51fa\u56fe\u4efb\u52a1\uff08\u5728\u540e\u53f0\u8dd1\uff1a\u9762\u677f\u5173\u6389\u4e5f\u7ee7\u7eed\uff0c\u5b8c\u6210\u540e\u66f4\u65b0\u72b6\u6001\uff09
  // --------------------------------------------------------------------------
  function startGenerate() {
    const c = cfg();
    if (!c.enabled) { toast('\u51fa\u56fe\u529f\u80fd\u5df2\u5173\u95ed\uff08\u8bbe\u7f6e\u91cc\u53ef\u4ee5\u6253\u5f00\uff09', 'warn'); return; }
    if (S.busy) { toast('\u6b63\u5728\u51fa\u56fe\u4e2d\uff0c\u7a0d\u7b49\u4e00\u4e0b'); return; }
    if (!withinDailyLimit()) { toast('\u4eca\u5929\u7684\u989d\u5ea6\u7528\u5b8c\u4e86\uff08\u8bbe\u7f6e\u91cc\u53ef\u8c03\u6574\u4e0a\u9650\uff09', 'warn'); return; }

    S.busy = true;
    S.startedAt = Date.now();
    S.stageKind = 'collect';
    S.stageText = '\u6b63\u5728\u6536\u96c6\u5267\u60c5\u7d20\u6750\u2026';
    renderBody();
    startTicker();

    runGenerate({
      onStage: (name, info) => {
        S.stageKind = name;
        if (name === 'collect') S.stageText = '\u6b63\u5728\u6536\u96c6\u5267\u60c5\u7d20\u6750\u2026';
        else if (name === 'translate') S.stageText = '\u6b63\u5728\u628a\u5267\u60c5\u7ffb\u8bd1\u6210\u753b\u9762\u63cf\u8ff0\u2026';
        else if (name === 'draw') S.stageText = '\u6b63\u5728\u51fa\u56fe\u2026';
        else if (name === 'done') S.stageText = '\u5b8c\u6210';
        renderBody();
      },
    }).then(async (res) => {
      stopTicker();
      let item = null;
      try {
        item = await saveToGallery(res.blob, res.prompt, res.scene, res.sec);
      } catch (e) {
        toast('\u56fe\u7247\u4fdd\u5b58\u5230\u56fe\u5e93\u5931\u8d25\uff1a' + ((e && e.message) || e), 'warn');
      }
      bumpStat(1);
      const url = blobUrl(res.blob);
      if (url) S.urls.push(url);
      S.last = { item: item, url: url, blob: res.blob, prompt: res.prompt, scene: res.scene, sec: res.sec };
      S.busy = false;
      S.stageKind = 'done';
      S.stageText = '\u51fa\u597d\u4e86\uff08\u7528\u65f6 ' + res.sec.toFixed(1) + ' \u79d2\uff09';
      await refreshList();
      renderBody();
      if (S.itemSaver) { /* noop */ }
    }).catch((e) => {
      stopTicker();
      S.busy = false;
      S.stageKind = 'error';
      S.stageText = '\u5931\u8d25\uff1a' + ((e && e.message) || e);
      if (e && e.detail) console.warn('[AI\u51fa\u56fe] \u8be6\u7ec6\u9519\u8bef:', e.detail);
      renderBody();
      toast('\u51fa\u56fe\u5931\u8d25\uff1a' + ((e && e.message) || e), 'warn');
    });
  }

  function startTicker() {
    stopTicker();
    S.timer = setInterval(() => { updateStageOnly(); }, 1000);
  }
  function stopTicker() {
    if (S.timer) { clearInterval(S.timer); S.timer = null; }
  }
  function elapsed() {
    return S.startedAt ? Math.round((Date.now() - S.startedAt) / 1000) : 0;
  }
  function stageLineText() {
    if (!S.busy) return S.stageText || '';
    const avg = avgSeconds();
    let t = S.stageText + ' \u00b7 \u5df2\u7528 ' + elapsed() + ' \u79d2';
    if (avg > 0) t += '\uff08\u5e73\u65f6\u7ea6 ' + Math.round(avg) + ' \u79d2\uff09';
    return t;
  }
  function updateStageOnly() {
    try {
      const line = S.overlay && S.overlay.querySelector('.yzg-stage');
      if (line) { line.textContent = stageLineText(); line.className = 'yzg-stage ' + S.stageKind; }
    } catch (_e) { /* ignore */ }
  }

  async function saveToGallery(blob, prompt, scene, sec) {
    const small = await shrinkBlob(blob, 1024);
    const id = 'img_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const item = {
      id: id,
      chatKey: chatKey(),
      charKey: charCardName() || '(\u65e0\u89d2\u8272\u5361)',
      ts: Date.now(),
      blob: small,
      prompt: String(prompt || '').slice(0, 2000),
      scene: String(scene || '').slice(0, 800),
      size: cfg().size,
      model: cfg().imgModel,
      sec: Math.round(sec || 0),
      bytes: small.size,
      mime: guessMime(small),
    };
    await galAdd(item);
    return item;
  }

  async function refreshList() {
    try {
      S.list = await galListByChat(chatKey());
    } catch (_e) {
      S.list = [];
    }
  }

  // --------------------------------------------------------------------------
  // \u9762\u677f
  // --------------------------------------------------------------------------
  function openPanel() {
    refreshPageRefs();
    injectCss();
    if (!S.overlay) buildPanel();
    S.overlay.classList.add('open');
    S.overlay.style.display = 'flex';       // \u5185\u8054\uff0c\u4e0d\u4f9d\u8d56\u6837\u5f0f\u8868
    logDiag();
    ensureOverlayOnScreen();
    refreshList().then(() => renderBody());
  }

  // \u6253\u5230\u9152\u9986\u65e5\u5fd7\u67e5\u770b\u5668\uff08\u300c\u811a\u672c\u300d\u6807\u7b7e\u9875\uff09\u91cc\u7684\u8bca\u65ad\u884c\uff0c\u51fa\u95ee\u9898\u65f6\u622a\u56fe\u7ed9\u6211\u5c31\u80fd\u5b9a\u4f4d
  function logDiag() {
    try {
      const o = S.overlay;
      const r = o ? o.getBoundingClientRect() : null;
      console.log('[AI\u51fa\u56fe] \u6253\u5f00\u9762\u677f | \u6587\u6863=' + (PAGE_DOC === window.document ? '\u811a\u672c\u6240\u5728\u6587\u6863' : '\u7236/\u9876\u5c42\u6587\u6863') +
        ' | \u89c6\u53e3=' + PAGE_WIN.innerWidth + 'x' + PAGE_WIN.innerHeight +
        ' | scrollY=' + (PAGE_WIN.scrollY || 0) +
        ' | html transform=' + PAGE_WIN.getComputedStyle(PAGE_DOC.documentElement).transform);
      if (r) {
        console.log('[AI\u51fa\u56fe] \u6d6e\u5c42\u4f4d\u7f6e top=' + Math.round(r.top) + ' \u9ad8=' + Math.round(r.height) +
          ' \u5bbd=' + Math.round(r.width) + ' position=' + PAGE_WIN.getComputedStyle(o).position +
          ' display=' + PAGE_WIN.getComputedStyle(o).display);
      }
    } catch (_e) { /* ignore */ }
  }
  function closePanel() {
    if (S.overlay) {
      S.overlay.classList.remove('open');
      S.overlay.style.display = 'none';
    }
    // \u6545\u610f\u4e0d\u505c ticker\uff1a\u51fa\u56fe\u4efb\u52a1\u5728\u540e\u53f0\u7ee7\u7eed\u8dd1\uff0c\u518d\u6b21\u6253\u5f00\u80fd\u770b\u5230\u8fdb\u5ea6
  }
  function togglePanel() {
    if (S.overlay && S.overlay.classList.contains('open')) closePanel();
    else openPanel();
  }

  function buildPanel() {
    const overlay = el('div', { class: 'yzg-overlay' });
    const card = el('div', { class: 'yzg-card' });
    overlay.appendChild(card);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closePanel(); });

    // \u3010\u5173\u952e\u6837\u5f0f\u5185\u8054\u4e00\u4efd\u3011\u7406\u7531\uff1a\u4e07\u4e00\u5916\u90e8\u6837\u5f0f\u8868\u6ca1\u6ce8\u5165\u6210\u529f\u3001
    // \u6216\u9152\u9986\u7684 <html> transform \u8ba9 fixed \u7684\u53c2\u7167\u7cfb\u8dd1\u504f\uff0c\u5149\u9760 class \u4f1a\u300c\u5143\u7d20\u5728\u3001\u4f46\u770b\u4e0d\u89c1\u300d\u3002
    // \u5185\u8054\u53ea\u4fdd\u300c\u80fd\u4e0d\u80fd\u770b\u89c1\u300d\uff0c\u914d\u8272\u548c\u7ec6\u8282\u4ecd\u4ea4\u7ed9 CSS\u3002
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.right = '0';
    overlay.style.height = '100dvh';
    overlay.style.zIndex = '100000';
    overlay.style.display = 'none';
    overlay.style.boxSizing = 'border-box';
    overlay.style.padding = '12px';
    overlay.style.alignItems = 'flex-start';
    overlay.style.justifyContent = 'center';
    overlay.style.overflowY = 'auto';
    overlay.style.background = 'rgba(0,0,0,0.55)';

    card.style.margin = 'auto';
    card.style.maxWidth = '100%';
    card.style.maxHeight = '90dvh';
    card.style.boxSizing = 'border-box';
    card.style.background = 'rgba(26,24,38,0.975)';
    card.style.color = '#ece9f5';
    card.style.borderRadius = '14px';

    S.overlay = overlay;
    PAGE_DOC.body.appendChild(overlay);
  }

  // \u6253\u5f00\u540e\u91cf\u4e00\u4e0b\uff1a\u6d6e\u5c42\u6ca1\u8001\u8001\u5b9e\u5b9e\u8d34\u5728\u53ef\u89c6\u533a\u9876\u90e8/\u94fa\u6ee1\u9ad8\u5ea6\uff0c\u5c31\u6539\u7528
  // absolute + \u5f53\u524d\u6eda\u52a8\u91cf\u628a\u5b83\u9489\u56de\u5f53\u524d\u53ef\u89c6\u533a\u3002
  // \u2014\u2014 \u9488\u5bf9\u300c\u9152\u9986\u7ed9 <html> \u52a0 transform / \u9875\u9762\u88ab\u6eda\u52a8\u8fc7 \u2192 fixed \u53c2\u7167\u7cfb\u8dd1\u5230\u6587\u6863\u539f\u70b9\u300d\uff0c
  //    \u6b63\u5e38\u60c5\u51b5\u4e0b\u8fd9\u6bb5\u4ec0\u4e48\u90fd\u4e0d\u505a\u3002
  function ensureOverlayOnScreen() {
    let fixedOnce = false;
    const fix = () => {
      try {
        const o = S.overlay;
        if (!o || o.style.display === 'none') return;
        const r = o.getBoundingClientRect();
        const vh = PAGE_WIN.innerHeight || PAGE_DOC.documentElement.clientHeight || 800;
        // \u5224\u5b9a\u300c\u6ca1\u94fa\u5728\u53ef\u89c6\u533a\u300d\uff1a\u9876\u90e8\u504f\u4e86 8px \u4ee5\u4e0a\uff0c\u6216\u9ad8\u5ea6\u660e\u663e\u4e0d\u5bf9
        const broken = Math.abs(r.top) > 8 || r.height < vh - 8 || r.width < 40 || r.bottom <= 0 || r.top >= vh;
        if (!broken) return;
        const sy = PAGE_WIN.scrollY || PAGE_DOC.documentElement.scrollTop || 0;
        const vv = PAGE_WIN.visualViewport;
        const vvTop = vv && Number.isFinite(vv.offsetTop) ? vv.offsetTop : 0;
        o.style.position = 'absolute';
        o.style.top = (sy + vvTop) + 'px';
        o.style.left = '0';
        o.style.right = '0';
        o.style.height = vh + 'px';
        if (!fixedOnce) {
          fixedOnce = true;
          console.log('[AI\u51fa\u56fe] \u6d6e\u5c42\u5b9a\u4f4d\u88ab\u73af\u5883\u5e26\u504f\uff0c\u5df2\u5207 absolute \u515c\u5e95 | \u539f top=' + Math.round(r.top) +
            ' \u9ad8=' + Math.round(r.height) + ' \u89c6\u53e3\u9ad8=' + vh + ' scrollY=' + sy);
        }
      } catch (_e) { /* ignore */ }
    };
    try { PAGE_WIN.requestAnimationFrame(fix); } catch (_e) { fix(); }
    setTimeout(fix, 260);
  }

  function renderBody() {
    if (!S.overlay) return;
    const card = S.overlay.querySelector('.yzg-card');
    if (!card) return;
    revokeAll();
    card.innerHTML = '';
    if (S.view === 'settings') renderSettings(card);
    else renderMain(card);
  }

  function renderMain(card) {
    const c = cfg();
    card.appendChild(el('div', { class: 'yzg-head' }, [
      el('span', { class: 'yzg-title', text: 'AI \u51fa\u56fe' }),
      el('span', { class: 'yzg-stat', text: statText() }),
      el('button', { class: 'yzg-x', html: '&times;', title: '\u5173\u95ed', onclick: closePanel }),
    ]));

    const body = el('div', { class: 'yzg-body' });

    // \u9690\u79c1\u63d0\u793a\uff08\u9996\u6b21\u663e\u793a\u4e00\u6b21\uff0c\u4e4b\u540e\u6298\u53e0\uff09
    if (lsGet(LS.privacySeen, '0') !== '1') {
      body.appendChild(el('div', { class: 'yzg-privacy' }, [
        el('span', { text: '\u26a0 \u51fa\u56fe\u4f1a\u628a\u300c\u89d2\u8272\u8bbe\u5b9a + \u6700\u8fd1\u5267\u60c5\u300d\u53d1\u9001\u7ed9\u4f60\u586b\u7684\u7b2c\u4e09\u65b9\u670d\u52a1\uff0c\u8bf7\u6ce8\u610f\u9690\u79c1\u3002' }),
        el('button', {
          class: 'yzg-mini',
          text: '\u77e5\u9053\u4e86',
          onclick: () => { lsSet(LS.privacySeen, '1'); renderBody(); },
        }),
      ]));
    }

    // \u72b6\u6001\u884c
    body.appendChild(el('div', { class: 'yzg-stage ' + S.stageKind, text: stageLineText() || '\u70b9\u4e0b\u9762\u7684\u300c\u51fa\u56fe\u300d\u5f00\u59cb' }));

    // \u6ca1\u914d\u7f6e\u65f6\u7684\u5f15\u5bfc
    if (!c.imgBase || !c.imgKey || !c.imgModel) {
      body.appendChild(el('div', { class: 'yzg-warn' }, [
        el('span', { text: '\u8fd8\u6ca1\u914d\u7f6e\u51fa\u56fe\u63a5\u53e3\u3002\u5148\u53bb\u8bbe\u7f6e\u91cc\u586b\u300c\u63a5\u53e3\u5730\u5740 / Key / \u6a21\u578b\u540d\u300d\uff0c\u70b9\u300c\u6d4b\u8bd5\u300d\u786e\u8ba4\u80fd\u7528\u3002' }),
        el('button', { class: 'yzg-mini primary', text: '\u53bb\u8bbe\u7f6e', onclick: openSettings }),
      ]));
    }

    // \u7ed3\u679c\u533a
    const resBox = el('div', { class: 'yzg-result' });
    if (S.last && S.last.url) {
      const img = el('img', { class: 'yzg-img', src: S.last.url, alt: '' });
      resBox.appendChild(img);
      resBox.appendChild(el('div', { class: 'yzg-cap', text: S.last.scene || '' }));
      resBox.appendChild(el('div', { class: 'yzg-actions' }, [
        el('button', { class: 'yzg-btn primary', text: '\u518d\u6765\u4e00\u5f20', title: '\u7528\u540c\u4e00\u4e2a\u63cf\u8ff0\u518d\u51fa\u4e00\u5f20', onclick: startGenerate }),
        el('button', {
          class: 'yzg-btn',
          text: '\u4fdd\u5b58\u5230\u76f8\u518c',
          onclick: () => {
            if (!S.last || !S.last.blob) return;
            saveToDevice(S.last.blob, 'yzg-' + Date.now() + '.webp');
            toast('\u5df2\u4fdd\u5b58\u5230\u8bbe\u5907\u4e0b\u8f7d\u76ee\u5f55');
          },
        }),
        el('button', {
          class: 'yzg-btn',
          text: '\u770b\u63d0\u793a\u8bcd',
          onclick: () => {
            try { PAGE_WIN.alert(fullPromptText(S.last.prompt)); } catch (_e) { toast('\u63d0\u793a\u8bcd\u6253\u5f00\u5931\u8d25'); }
          },
        }),
      ]));
    } else if (!S.busy) {
      resBox.appendChild(el('div', { class: 'yzg-empty', text: '\u8fd8\u6ca1\u6709\u56fe\u3002\u70b9\u4e0b\u9762\u300c\u51fa\u56fe\u300d\u8bd5\u8bd5\uff5e' }));
    }
    body.appendChild(resBox);

    // \u56fe\u5e93\uff08\u5f53\u524d\u804a\u5929\uff09
    const galTitle = el('div', { class: 'yzg-sub' }, [
      el('span', { text: '\u672c\u804a\u5929\u56fe\u5e93\uff08' + (S.list || []).length + ' \u5f20\uff09' }),
      el('button', {
        class: 'yzg-mini',
        text: '\u6d4f\u89c8\u5176\u4ed6\u804a\u5929',
        onclick: () => { toast('\u5373\u5c06\u4e0a\u7ebf\uff08\u7b2c\u4e8c\u7248\uff09'); },
      }),
    ]);
    body.appendChild(galTitle);

    const grid = el('div', { class: 'yzg-grid' });
    (S.list || []).slice(0, 60).forEach((it) => {
      const u = blobUrl(it.blob);
      if (u) S.urls.push(u);
      grid.appendChild(el('div', { class: 'yzg-cell' }, [
        el('img', { class: 'yzg-thumb', src: u, alt: '' }),
        el('button', {
          class: 'yzg-del',
          html: '&times;',
          title: '\u4ece\u56fe\u5e93\u5220\u9664\uff08\u4e0d\u5f71\u54cd\u5df2\u4fdd\u5b58\u5230\u76f8\u518c\u7684\uff09',
          onclick: async (e) => {
            e.stopPropagation();
            try { await galDel(it.id); } catch (_e) { /* ignore */ }
            await refreshList();
            renderBody();
            toast('\u5df2\u4ece\u56fe\u5e93\u5220\u9664');
          },
        }),
      ]));
    });
    if (!(S.list || []).length) grid.appendChild(el('div', { class: 'yzg-empty', text: '\u56fe\u5e93\u8fd8\u662f\u7a7a\u7684' }));
    body.appendChild(grid);

    card.appendChild(body);

    // \u5e95\u90e8\u6309\u94ae
    const foot = el('div', { class: 'yzg-foot' }, [
      el('button', {
        class: 'yzg-btn primary big',
        text: S.busy ? '\u51fa\u56fe\u4e2d\u2026' : '\u51fa\u56fe',
        disabled: S.busy ? 'disabled' : null,
        onclick: () => startGenerate(),
      }),
      el('button', { class: 'yzg-btn', text: '\u8bbe\u7f6e', onclick: openSettings }),
    ]);
    card.appendChild(foot);
  }

  // --------------------------------------------------------------------------
  // \u62c9\u53d6\u5e76\u9009\u62e9\u6a21\u578b\uff08\u7701\u5f97\u4f60\u53bb\u5b98\u7f51\u7ffb\u6a21\u578b\u540d\uff09
  // --------------------------------------------------------------------------
  // \u56fe\u50cf\u63a5\u53e3\u7684\u6a21\u578b\u540d\u5404\u5bb6\u5199\u6cd5\u5dee\u5f02\u5f88\u5927\uff0c\u7528\u5173\u952e\u5b57\u7c97\u7b5b\u4e00\u4e0b
  const IMAGE_HINT = ['image', 'dall-e', 'dalle', 'flux', 'kolors', 'seedream', 'seededit', 'seed',
    'stable', 'sdxl', 'sd3', 'midjourney', 'jimeng', 'wanx', 'hidream', 'grok-imagine',
    'recraft', 'ideogram', 'imagen', 'photon', 'schnell', 'luma', 'playground', 'draw'];

  function pickModel(kind, reads) {
    try { applyReads(reads); } catch (_e) { /* ignore */ }
    const c = cfg();
    const isText = kind === 'text';
    const base = isText ? c.textBase : c.imgBase;
    const key = isText ? c.textKey : c.imgKey;
    const field = isText ? 'textModel' : 'imgModel';
    if (!base) { toast('\u5148\u586b\u5730\u5740', 'warn'); return; }
    if (!key) { toast('\u5148\u586b Key', 'warn'); return; }
    toast('\u6b63\u5728\u62c9\u53d6\u6a21\u578b\u5217\u8868\u2026');
    fetchModels(base, key).then((list) => {
      showModelPicker(isText ? '\u9009\u62e9\u6587\u5b57\u6a21\u578b\uff08\u5171 ' + list.length + ' \u4e2a\uff09' : '\u9009\u62e9\u56fe\u50cf\u6a21\u578b\uff08\u5171 ' + list.length + ' \u4e2a\uff09',
        list, !isText, (id) => {
          const patch = {};
          patch[field] = id;
          setCfg(patch);
          if (reads && reads[field]) reads[field].value = id;
          toast('\u5df2\u9009\u7528\uff1a' + id);
        });
    }).catch((e) => {
      toast('\u62c9\u53d6\u5931\u8d25\uff1a' + ((e && e.message) || e), 'warn');
    });
  }

  function showModelPicker(title, list, isImage, onPick) {
    const ov = el('div', { class: 'yzg-overlay yzg-picker' });
    // \u5173\u952e\u6837\u5f0f\u5185\u8054\uff0c\u4e0d\u4f9d\u8d56\u6837\u5f0f\u8868
    ov.style.position = 'fixed';
    ov.style.top = '0';
    ov.style.left = '0';
    ov.style.right = '0';
    ov.style.height = '100dvh';
    ov.style.zIndex = '100001';
    ov.style.display = 'flex';
    ov.style.boxSizing = 'border-box';
    ov.style.padding = '12px';
    ov.style.alignItems = 'flex-start';
    ov.style.justifyContent = 'center';
    ov.style.overflowY = 'auto';
    ov.style.background = 'rgba(0,0,0,0.62)';

    const card = el('div', { class: 'yzg-card' });
    card.style.margin = 'auto';
    card.style.maxWidth = '100%';
    card.style.maxHeight = '90dvh';
    card.style.boxSizing = 'border-box';
    card.style.background = 'rgba(26,24,38,0.98)';
    card.style.color = '#ece9f5';
    card.style.borderRadius = '14px';

    const close = () => { try { ov.remove(); } catch (_e) { /* ignore */ } };
    const current = isImage ? cfg().imgModel : cfg().textModel;
    let onlyImage = isImage;   // \u56fe\u50cf\u6a21\u578b\u9ed8\u8ba4\u53ea\u770b\u7ed8\u56fe\u76f8\u5173\u7684

    const filterInp = el('input', { class: 'yzg-input', placeholder: '\u8f93\u5165\u5173\u952e\u5b57\u7b5b\u9009\uff0c\u4f8b\u5982 flux / kolors / qwen' });
    const listBox = el('div', { class: 'yzg-models' });
    const countLine = el('div', { class: 'yzg-tip' });

    const render = () => {
      const q = String(filterInp.value || '').trim().toLowerCase();
      let items = list.slice();
      if (isImage && onlyImage) items = items.filter((m) => IMAGE_HINT.some((k) => m.toLowerCase().indexOf(k) >= 0));
      if (q) items = items.filter((m) => m.toLowerCase().indexOf(q) >= 0);
      listBox.innerHTML = '';
      items.slice(0, 500).forEach((m) => {
        listBox.appendChild(el('div', {
          class: 'yzg-model' + (m === current ? ' on' : ''),
          text: m,
          title: m,
          onclick: () => { onPick(m); close(); },
        }));
      });
      if (!items.length) listBox.appendChild(el('div', { class: 'yzg-empty', text: '\u6ca1\u6709\u5339\u914d\u7684\u6a21\u578b\uff08\u8bd5\u8bd5\u5173\u6389\u300c\u53ea\u770b\u7ed8\u56fe\u300d\u6216\u6362\u4e2a\u5173\u952e\u5b57\uff09' }));
      countLine.textContent = '\u663e\u793a ' + Math.min(items.length, 500) + ' / \u5171 ' + list.length + ' \u4e2a';
    };

    ov.addEventListener('click', (e) => { if (e.target === ov) close(); });

    card.appendChild(el('div', { class: 'yzg-head' }, [
      el('span', { class: 'yzg-title', text: title }),
      el('button', { class: 'yzg-x', html: '&times;', title: '\u5173\u95ed', onclick: close }),
    ]));

    const body = el('div', { class: 'yzg-body' });
    body.appendChild(filterInp);
    if (isImage) {
      body.appendChild(el('div', { class: 'yzg-row' }, [
        el('label', { class: 'yzg-check' }, [
          el('input', {
            type: 'checkbox', ...(onlyImage ? { checked: 'checked' } : {}),
            onchange: (e) => { onlyImage = !!e.target.checked; render(); },
          }),
          el('span', { text: '\u53ea\u770b\u7ed8\u56fe\u76f8\u5173\u7684\u6a21\u578b' }),
        ]),
      ]));
    }
    body.appendChild(countLine);
    body.appendChild(listBox);
    card.appendChild(body);
    card.appendChild(el('div', { class: 'yzg-foot' }, [
      el('button', { class: 'yzg-btn big', text: '\u5173\u95ed\uff08\u4e5f\u53ef\u624b\u586b\uff09', onclick: close }),
    ]));

    ov.appendChild(card);
    PAGE_DOC.body.appendChild(ov);
    filterInp.addEventListener('input', render);
    render();
    try { filterInp.focus(); } catch (_e) { /* ignore */ }
  }

  // --------------------------------------------------------------------------
  // \u8bbe\u7f6e
  // --------------------------------------------------------------------------
  function row(label, nodes) {
    return el('div', { class: 'yzg-row' }, [el('span', { class: 'yzg-label', text: label })].concat(nodes || []));
  }
  function input(key, val, placeholder) {
    return el('input', {
      class: 'yzg-input',
      'data-k': key,
      value: val === undefined || val === null ? '' : String(val),
      placeholder: placeholder || '',
    });
  }
  function textarea(key, val, placeholder, rows) {
    return el('textarea', {
      class: 'yzg-ta',
      'data-k': key,
      rows: String(rows || 2),
      placeholder: placeholder || '',
      text: val === undefined || val === null ? '' : String(val),
    });
  }

  // API Key \u8f93\u5165\u6846\uff1a\u9ed8\u8ba4\u6253\u7801\uff08type=password\uff09\uff0c\u65c1\u8fb9\u4e00\u4e2a\u300c\u663e\u793a/\u9690\u85cf\u300d\u6309\u94ae
  // \u3010\u4e3a\u4ec0\u4e48\u4e0d\u7528 autocomplete=off \u4e4b\u5916\u7684\u62db\u3011\u5355\u72ec\u4e00\u4e2a password \u6846\uff0c\u6d4f\u89c8\u5668\u4e00\u822c\u4e0d\u4f1a\u5f39"\u4fdd\u5b58\u5bc6\u7801"
  function keyInput(key, val, placeholder) {
    const inp = el('input', {
      class: 'yzg-input',
      type: 'password',
      'data-k': key,
      autocomplete: 'new-password',
      value: val === undefined || val === null ? '' : String(val),
      placeholder: placeholder || '',
    });
    const btn = el('button', {
      class: 'yzg-eye',
      text: '\u663e\u793a',
      title: '\u663e\u793a / \u9690\u85cf',
      onclick: (e) => {
        e.preventDefault();
        const show = inp.type === 'password';
        inp.type = show ? 'text' : 'password';
        btn.textContent = show ? '\u9690\u85cf' : '\u663e\u793a';
      },
    });
    return el('div', { class: 'yzg-keywrap' }, [inp, btn]);
  }
  function openSettings() {
    S.rulesDraft = null;   // \u6bcf\u6b21\u8fdb\u8bbe\u7f6e\u90fd\u4ece\u5df2\u4fdd\u5b58\u7684\u914d\u7f6e\u91cd\u65b0\u521d\u59cb\u5316
    S.view = 'settings';
    renderBody();
  }
  function pickGroup(list, current, onPick) {
    return el('div', { class: 'yzg-picks' }, list.map((s) => el('span', {
      class: 'yzg-pick' + (s.id === current ? ' on' : ''),
      text: s.name,
      onclick: () => onPick(s.id),
    })));
  }

  function renderSettings(card) {
    const c = cfg();
    card.appendChild(el('div', { class: 'yzg-head' }, [
      el('span', { class: 'yzg-title', text: '\u51fa\u56fe\u8bbe\u7f6e \u00b7 v' + VERSION }),
      el('button', { class: 'yzg-x', html: '&times;', title: '\u5173\u95ed', onclick: closePanel }),
    ]));
    const body = el('div', { class: 'yzg-body' });
    const reads = {};
    const reg = (k, node) => { reads[k] = node; return node; };
    if (!S.rulesDraft) {
      S.rulesDraft = safeRules().map((r) => ({ from: r.from, to: r.to }));
      S.presetDraft = c.rulePreset || '';
    }
    const rules = S.rulesDraft;
    // \u6539\u66ff\u6362\u8868/\u52a0\u5220\u6761\u76ee\u4f1a\u91cd\u7ed8\u9762\u677f\uff1a\u5148\u628a\u5df2\u586b\u7684\u5176\u5b83\u5b57\u6bb5\u6536\u597d\uff0c\u514d\u5f97\u88ab\u6253\u56de\u53bb
    const keepReads = () => { try { applyReads(reads); } catch (_e) { /* ignore */ } };

    // \u603b\u5f00\u5173
    body.appendChild(el('div', { class: 'yzg-row' }, [
      el('label', { class: 'yzg-check' }, [
        el('input', { type: 'checkbox', 'data-k': LS.enabled, ...(c.enabled ? { checked: 'checked' } : {}) }),
        el('span', { text: '\u542f\u7528\u51fa\u56fe' }),
      ]),
      el('label', { class: 'yzg-check' }, [
        el('input', { type: 'checkbox', 'data-k': LS.autoTranslate, ...(c.autoTranslate ? { checked: 'checked' } : {}) }),
        el('span', { text: '\u5148\u7528\u6587\u5b57\u6a21\u578b\u7ffb\u8bd1\u753b\u9762\uff08\u63a8\u8350\uff09' }),
      ]),
    ]));

    // \u6587\u5b57\u6a21\u578b
    body.appendChild(el('div', { class: 'yzg-h', text: '\u7b2c\u2460\u6b65 \u00b7 \u6587\u5b57\u6a21\u578b\uff08\u628a\u5267\u60c5\u7ffb\u8bd1\u6210\u753b\u9762\u63cf\u8ff0\uff09' }));
    body.appendChild(el('div', { class: 'yzg-row' }, [
      el('label', { class: 'yzg-check' }, [
        el('input', { type: 'radio', name: 'yzg-textmode', 'data-k': LS.textMode, value: 'own', ...(c.textMode !== 'st' ? { checked: 'checked' } : {}) }),
        el('span', { text: '\u5355\u72ec\u914d\u7f6e\uff08\u63a8\u8350\uff0c\u7701\u94b1\u53c8\u4e0d\u62a2\u9152\u9986\u9650\u6d41\uff09' }),
      ]),
      el('label', { class: 'yzg-check' }, [
        el('input', { type: 'radio', name: 'yzg-textmode', 'data-k': LS.textMode, value: 'st', ...(c.textMode === 'st' ? { checked: 'checked' } : {}) }),
        el('span', { text: '\u8ddf\u968f\u9152\u9986\u5f53\u524d\u6a21\u578b' }),
      ]),
    ]));
    body.appendChild(row('\u5730\u5740', [reg('textBase', input(LS.textBase, c.textBase, 'https://api.siliconflow.cn/v1'))]));
    const kText = keyInput(LS.textKey, c.textKey, 'sk-...');
    reads.textKey = kText.querySelector('.yzg-input');
    body.appendChild(row('Key', [kText]));
    body.appendChild(row('\u6a21\u578b', [
      reg('textModel', input(LS.textModel, c.textModel, 'Qwen/Qwen2.5-7B-Instruct \u4e4b\u7c7b\u7684\u5c0f\u6a21\u578b')),
      el('button', {
        class: 'yzg-mini primary',
        text: '\u83b7\u53d6\u5217\u8868',
        title: '\u4ece\u4e0a\u9762\u7684\u5730\u5740\u62c9\u53d6\u8fd9\u4e2a\u670d\u52a1\u5546\u6709\u54ea\u4e9b\u6a21\u578b\uff0c\u70b9\u4e00\u4e0b\u5c31\u80fd\u9009\uff0c\u4e0d\u7528\u53bb\u5b98\u7f51\u67e5',
        onclick: () => pickModel('text', reads),
      }),
    ]));
    body.appendChild(el('div', { class: 'yzg-row' }, [
      el('button', {
        class: 'yzg-btn',
        text: '\u6d4b\u8bd5\u6587\u5b57\u6a21\u578b',
        onclick: async () => {
          applyReads(reads);
          toast('\u6d4b\u8bd5\u4e2d\u2026');
          const r = await testOwnText();
          toast('\u6587\u5b57\u6a21\u578b\uff1a' + r.msg, r.ok ? 'ok' : 'warn');
        },
      }),
      el('span', { class: 'yzg-tip', text: '\u8fd9\u4e00\u6b65\u5f88\u9891\u7e41\uff0c\u5efa\u8bae\u7528\u4fbf\u5b9c\u7684\u5c0f\u6a21\u578b' }),
    ]));

    // \u56fe\u50cf\u6a21\u578b
    body.appendChild(el('div', { class: 'yzg-h', text: '\u7b2c\u2461\u6b65 \u00b7 \u56fe\u50cf\u6a21\u578b\uff08\u51fa\u56fe\uff09' }));
    body.appendChild(row('\u5730\u5740', [reg('imgBase', input(LS.imgBase, c.imgBase, 'https://\u4f60\u7684\u4e2d\u8f6c\u7ad9/v1'))]));
    const kImg = keyInput(LS.imgKey, c.imgKey, 'sk-...');
    reads.imgKey = kImg.querySelector('.yzg-input');
    body.appendChild(row('Key', [kImg]));
    body.appendChild(row('\u6a21\u578b', [
      reg('imgModel', input(LS.imgModel, c.imgModel, 'grok-imagine-image')),
      el('button', {
        class: 'yzg-mini primary',
        text: '\u83b7\u53d6\u5217\u8868',
        title: '\u4ece\u4e0a\u9762\u7684\u5730\u5740\u62c9\u53d6\u8fd9\u4e2a\u670d\u52a1\u5546\u6709\u54ea\u4e9b\u6a21\u578b\uff0c\u70b9\u4e00\u4e0b\u5c31\u80fd\u9009\uff0c\u4e0d\u7528\u53bb\u5b98\u7f51\u67e5',
        onclick: () => pickModel('img', reads),
      }),
    ]));
    body.appendChild(row('\u989d\u5916\u53c2\u6570', [reg('imgExtra', input(LS.imgExtra, c.imgExtra, '\u53ef\u9009\uff0cJSON\uff0c\u4f8b\u5982 {"quality":"hd"}'))]));
    body.appendChild(el('div', { class: 'yzg-row' }, [
      el('button', {
        class: 'yzg-btn primary',
        text: '\u6d4b\u8bd5\u51fa\u56fe\u63a5\u53e3',
        onclick: async () => {
          applyReads(reads);
          toast('\u6d4b\u8bd5\u4e2d\u2026');
          const r = await testImage();
          toast('\u51fa\u56fe\u63a5\u53e3\uff1a' + r.msg, r.ok ? 'ok' : 'warn');
        },
      }),
    ]));

    // \u5c3a\u5bf8
    body.appendChild(el('div', { class: 'yzg-h', text: '\u5c3a\u5bf8' }));
    body.appendChild(pickGroup(SIZES, c.size, (id) => { setCfg({ size: id }); applyReads(reads); renderBody(); }));

    // \u98ce\u683c
    body.appendChild(el('div', { class: 'yzg-h', text: '\u98ce\u683c\uff08\u53ef\u591a\u9009\uff09' }));
    const stylePicks = el('div', { class: 'yzg-picks' });
    allStyles().forEach((s) => {
      const on = c.styleOn.indexOf(s.id) >= 0;
      stylePicks.appendChild(el('span', {
        class: 'yzg-pick' + (on ? ' on' : ''),
        text: s.name,
        onclick: () => {
          applyReads(reads);
          const cur = cfg().styleOn.slice();
          const i = cur.indexOf(s.id);
          if (i >= 0) cur.splice(i, 1); else cur.push(s.id);
          setCfg({ styleOn: cur });
          renderBody();
        },
      }));
    });
    body.appendChild(stylePicks);
    body.appendChild(el('div', { class: 'yzg-tip', text: '\u63d0\u793a\uff1a\u98ce\u683c\u4e4b\u95f4\u53ef\u80fd\u6253\u67b6\uff08\u6bd4\u5982\u300c\u6c34\u5f69\u300d+\u300c\u5199\u5b9e\u6444\u5f71\u300d\uff09\uff0c\u5efa\u8bae\u4e3b\u98ce\u683c 1 \u4e2a + \u4fee\u9970 1 \u4e2a' }));

    // ------------------------------------------------------------------
    // \u753b\u9762\u5b89\u5168 / \u8868\u8fbe\u4f18\u5316\uff08v0.1.1\uff09
    //   \u5ba1\u6838\u62e6\u7684\u662f\u300c\u63d0\u793a\u8bcd\u91cc\u7684\u654f\u611f\u8bcd\u300d\uff0c\u4e0d\u662f\u5185\u5bb9\u672c\u8eab \u2014\u2014 \u4e09\u6b65\u90fd\u662f\u51cf\u5c11\u8bef\u5224
    // ------------------------------------------------------------------
    body.appendChild(el('div', { class: 'yzg-h', text: '\u753b\u9762\u5b89\u5168 / \u8868\u8fbe\u4f18\u5316' }));
    body.appendChild(el('div', { class: 'yzg-tip', text: '\u6218\u4e89\u3001\u533b\u7597\u3001\u4eb2\u5bc6\u573a\u9762\u5bb9\u6613\u88ab\u8bef\u5224\u3002\u4e0b\u9762\u4e09\u6b65\u53ea\u6539\u63aa\u8f9e\u3001\u4e0d\u6539\u753b\u9762\uff0c\u7528\u6765\u964d\u4f4e"\u5173\u952e\u8bcd\u8bef\u4f24"\u3002' }));

    body.appendChild(el('div', { class: 'yzg-row' }, [
      el('label', { class: 'yzg-check' }, [
        el('input', { type: 'checkbox', 'data-k': LS.safeOn, ...(c.safeOn ? { checked: 'checked' } : {}) }),
        el('span', { text: '\u542f\u7528\u8868\u8fbe\u66ff\u6362\u8868\uff08\u63a8\u8350\uff09' }),
      ]),
    ]));

    body.appendChild(row('\u4e16\u754c\u8bbe\u5b9a', [reg('preface', textarea(LS.preface, c.preface, '\u4f8b\u5982\uff1a\u67b6\u7a7a\u4e16\u754c\u89c2\uff0c\u5185\u6218\u540e\u7684\u52a8\u8361\u5e74\u4ee3\uff0c\u4ee5\u521b\u4f24\u6cbb\u6108\u4e3a\u4e3b\u9898', 2))]));
    body.appendChild(el('div', { class: 'yzg-tip', text: '\u81ea\u52a8\u62fc\u5728\u63d0\u793a\u8bcd\u6700\u524d\u9762\uff0c\u540c\u65f6\u4f5c\u4e3a"\u8fd9\u662f\u865a\u6784\u6545\u4e8b"\u7684\u80cc\u666f\u544a\u8bc9\u7ffb\u8bd1\u6a21\u578b\u3002\u4e2d\u82f1\u6587\u90fd\u884c\uff0c\u7559\u7a7a\u4e5f\u53ef\u4ee5\u3002' }));

    // \u66ff\u6362\u8868
    body.appendChild(row('\u66ff\u6362\u8868', [
      el('span', { class: 'yzg-tip', text: rules.length + ' \u6761 \u00b7 \u5de6\uff1d\u539f\u6765\u7684\u8bcd\uff0c\u53f3\uff1d\u6362\u6210\u4ec0\u4e48' }),
    ]));
    body.appendChild(el('div', { class: 'yzg-tip', text: '\u76ee\u6807\u8bcd\u8981\u7b26\u5408\u4f60\u7684\u4e16\u754c\u89c2\uff08\u4eba\u5305\u7ef7\u5e26\uff0c\u53d8\u5f62\u91d1\u521a\u6d41\u80fd\u91cf\u6db2\uff09\uff0c\u5148\u9009\u4e00\u4e2a\u9884\u8bbe\uff0c\u518d\u81ea\u5df1\u6539\uff1a' }));
    const presetRow = el('div', { class: 'yzg-picks yzg-presets' });
    RULES_PRESETS.forEach((p) => {
      presetRow.appendChild(el('span', {
        class: 'yzg-pick' + (S.presetDraft === p.id ? ' on' : ''),
        text: p.name,
        title: p.hint || '',
        onclick: () => {
          keepReads();
          S.rulesDraft = presetRules(p.id);
          S.presetDraft = p.id;
          renderBody();
          toast('\u5df2\u5957\u7528\u300c' + p.name + '\u300d\uff0c\u70b9\u4fdd\u5b58\u751f\u6548');
        },
      }));
    });
    body.appendChild(presetRow);

    const rulesBox = el('div', { class: 'yzg-rules' });
    rules.forEach((r, i) => {
      rulesBox.appendChild(el('div', { class: 'yzg-rule' }, [
        el('input', {
          class: 'yzg-input', value: r.from, placeholder: '\u539f\u8bcd',
          oninput: (e) => { r.from = e.target.value; S.presetDraft = ''; },
        }),
        el('span', { class: 'yzg-arrow', text: '\u2192' }),
        el('input', {
          class: 'yzg-input', value: r.to, placeholder: '\u66ff\u6362\u4e3a',
          oninput: (e) => { r.to = e.target.value; S.presetDraft = ''; },
        }),
        el('button', {
          class: 'yzg-x sm', html: '&times;', title: '\u5220\u6389\u8fd9\u6761',
          onclick: () => { keepReads(); S.presetDraft = ''; S.rulesDraft.splice(i, 1); renderBody(); },
        }),
      ]));
    });
    if (!rules.length) rulesBox.appendChild(el('div', { class: 'yzg-empty', text: '\uff08\u7a7a\uff09\u4e0d\u52a0\u66ff\u6362\u4e5f\u80fd\u76f4\u63a5\u51fa\u56fe' }));
    body.appendChild(rulesBox);
    body.appendChild(el('div', { class: 'yzg-row' }, [
      el('button', {
        class: 'yzg-mini', text: '+ \u52a0\u4e00\u6761',
        onclick: () => { keepReads(); S.presetDraft = ''; S.rulesDraft.push({ from: '', to: '' }); renderBody(); },
      }),
      el('button', {
        class: 'yzg-mini', text: '\u6062\u590d\u9ed8\u8ba4',
        onclick: () => {
          keepReads();
          S.rulesDraft = presetRules(S.presetDraft || 'neutral');
          renderBody();
        },
      }),
      el('button', {
        class: 'yzg-mini', text: '\u6e05\u7a7a',
        onclick: () => { keepReads(); S.presetDraft = ''; S.rulesDraft = []; renderBody(); },
      }),
    ]));

    // \u8d1f\u9762\u63d0\u793a\u8bcd
    body.appendChild(row('\u8d1f\u9762\u63d0\u793a', [reg('negative', textarea(LS.negative, c.negative, '\u53ea\u653e\u6280\u672f\u6027\u95ee\u9898\uff1a\u4f4e\u8d28\u91cf\u3001\u6a21\u7cca\u3001\u591a\u6307\u2026\u2026', 2))]));
    body.appendChild(el('div', { class: 'yzg-row' }, [
      el('span', { class: 'yzg-label', text: '\u53d1\u9001\u65b9\u5f0f' }),
      reg('negMode', el('select', { class: 'yzg-input', 'data-k': LS.negMode }, [
        el('option', { value: 'param', text: '\u4f5c\u4e3a negative_prompt \u53c2\u6570\u53d1\u9001\uff08\u591a\u6570\u670d\u52a1\u652f\u6301\uff09', ...(c.negMode !== 'off' ? { selected: 'selected' } : {}) }),
        el('option', { value: 'off', text: '\u4e0d\u53d1\u9001\uff08\u5bf9\u65b9\u62a5\u53c2\u6570\u9519\u65f6\u9009\u8fd9\u4e2a\uff09', ...(c.negMode === 'off' ? { selected: 'selected' } : {}) }),
      ])),
    ]));
    body.appendChild(el('div', { class: 'yzg-tip', text: '\u6ce8\u610f\uff1a\u522b\u5728\u8d1f\u9762\u63d0\u793a\u8bcd\u91cc\u5199 nsfw / blood \u8fd9\u7c7b\u98ce\u9669\u8bcd\u2014\u2014\u6709\u4e9b\u670d\u52a1\u7684\u8d1f\u9762\u8bcd\u8868\u4e00\u6837\u654f\u611f\uff0c\u53cd\u800c\u66f4\u5bb9\u6613\u88ab\u62e6\u3002' }));

    // \u6570\u503c
    body.appendChild(el('div', { class: 'yzg-h', text: '\u5176\u5b83' }));
    body.appendChild(row('\u53d6\u6700\u8fd1', [reg('contextN', input(LS.contextN, c.contextN, '8')), el('span', { class: 'yzg-tip', text: '\u6761\u5bf9\u8bdd\u5f53\u7d20\u6750' })]));
    body.appendChild(row('\u6bcf\u65e5\u4e0a\u9650', [reg('limitDay', input(LS.limitDay, c.limitDay, '20')), el('span', { class: 'yzg-tip', text: '\u5f20\uff080 = \u4e0d\u9650\uff09' })]));
    body.appendChild(row('\u7edf\u8ba1\u65b9\u5f0f', [
      el('select', { class: 'yzg-input', 'data-k': LS.costMode },
        ['count', 'money', 'point'].map((m) => el('option', {
          value: m,
          text: m === 'count' ? '\u53ea\u8bb0\u5f20\u6570' : (m === 'money' ? '\u6298\u7b97\u91d1\u989d \u00a5' : '\u6298\u7b97\u70b9\u6570'),
          ...(c.costMode === m ? { selected: 'selected' } : {}),
        }))),
      reg('costValue', input(LS.costValue, c.costValue, '\u5355\u4ef7')),
    ]));
    body.appendChild(el('div', { class: 'yzg-tip', text: '\u5f53\u524d\uff1a' + statText() }));

    // \u60ac\u6d6e\u7403
    body.appendChild(el('div', { class: 'yzg-h', text: '\u60ac\u6d6e\u7403' }));
    body.appendChild(el('div', { class: 'yzg-row' }, [
      el('label', { class: 'yzg-check' }, [
        el('input', { type: 'checkbox', 'data-k': LS.ballOn, ...(lsGet(LS.ballOn, '1') === '1' ? { checked: 'checked' } : {}) }),
        el('span', { text: '\u663e\u793a\u60ac\u6d6e\u7403\uff08\u5de6\u4e0b\u89d2\uff09' }),
      ]),
      el('button', {
        class: 'yzg-mini',
        text: '\u590d\u4f4d\u4f4d\u7f6e',
        title: '\u7403\u8dd1\u5230\u5c4f\u5e55\u5916 / \u627e\u4e0d\u5230\u65f6\u70b9\u8fd9\u4e2a',
        onclick: () => { resetBallPos(); toast('\u60ac\u6d6e\u7403\u5df2\u590d\u4f4d\u5230\u5de6\u4e0b\u89d2'); },
      }),
    ]));
    body.appendChild(el('div', { class: 'yzg-tip', text: '\u7403\u53ef\u4ee5\u62d6\u52a8\uff1b\u4e07\u4e00\u62d6\u51fa\u5c4f\u5e55\u627e\u4e0d\u5230\uff0c\u5c31\u70b9\u4e0a\u9762\u7684\u300c\u590d\u4f4d\u4f4d\u7f6e\u300d\u3002' }));

    // \u9690\u79c1\uff08\u53ef\u6298\u53e0\uff09
    body.appendChild(el('details', { class: 'yzg-details' }, [
      el('summary', { text: '\u9690\u79c1\u8bf4\u660e' }),
      el('div', { class: 'yzg-tip', text: '\u51fa\u56fe\u65f6\uff0c\u89d2\u8272\u8bbe\u5b9a\u3001\u6700\u8fd1\u5267\u60c5\u3001\u4e16\u754c\u8bbe\u5b9a\u6587\u5b57\u4ee5\u53ca\u62fc\u597d\u7684\u63d0\u793a\u8bcd\u90fd\u4f1a\u88ab\u53d1\u9001\u5230\u4f60\u81ea\u5df1\u586b\u5199\u7684\u7b2c\u4e09\u65b9\u670d\u52a1\uff08\u4e2d\u8f6c\u7ad9 / \u6a21\u578b\u5382\u5546\uff09\uff1b\u53c2\u8003\u56fe\u540c\u6837\u4f1a\u53d1\u9001\u3002\u56fe\u7247\u672c\u8eab\u53ea\u4fdd\u5b58\u5728\u4f60\u672c\u673a\u6d4f\u89c8\u5668\u91cc\uff0c\u4e0d\u4f1a\u4e0a\u4f20\u5230\u4f60\u81ea\u5df1\u7684\u9152\u9986\u670d\u52a1\u5668\u3002' }),
    ]));

    card.appendChild(body);

    card.appendChild(el('div', { class: 'yzg-foot' }, [
      el('button', {
        class: 'yzg-btn primary big',
        text: '\u4fdd\u5b58',
        onclick: () => {
          applyReads(reads);
          setCfg({
            safeRules: (S.rulesDraft || []).filter((r) => String(r.from || '').trim()),
            rulePreset: S.presetDraft || '',
          });
          S.rulesDraft = null;
          S.presetDraft = '';
          syncBall();
          toast('\u8bbe\u7f6e\u5df2\u4fdd\u5b58');
          S.view = 'main';
          renderBody();
        },
      }),
      el('button', {
        class: 'yzg-btn', text: '\u8fd4\u56de',
        onclick: () => { S.rulesDraft = null; S.presetDraft = ''; S.view = 'main'; renderBody(); },
      }),
    ]));
  }

  // \u628a\u8bbe\u7f6e\u754c\u9762\u91cc\u8bfb\u5230\u7684\u503c\u5199\u56de localStorage
  function applyReads(reads) {
    const patch = {};
    Object.keys(reads).forEach((k) => {
      const n = reads[k];
      if (!n) return;
      if (n.type === 'checkbox') patch[k] = !!n.checked;
      else patch[k] = n.value;
    });
    // \u3010\u515c\u5e95\u626b\u4e00\u904d\u3011\u9762\u677f\u91cc\u6240\u6709\u5e26 data-k \u7684\u63a7\u4ef6\u90fd\u6536\u8fdb\u6765\u3002
    // \u4e4b\u524d\u53ea\u8ba4\u767b\u8bb0\u8fc7\u7684\u5b57\u6bb5\uff0c\u5bb3\u5f97\u300c\u542f\u7528\u51fa\u56fe\u300d\u300c\u5148\u7ffb\u8bd1\u300d\u8fd9\u7c7b\u52fe\u9009\u6846\u6539\u4e86\u4e0d\u751f\u6548\u3002
    try {
      const root = PAGE_DOC.querySelector('.yzg-card') || PAGE_DOC;
      const nodes = root.querySelectorAll('[data-k]');
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const k = n.getAttribute('data-k');
        if (!k) continue;
        if (n.type === 'checkbox') patch[k] = !!n.checked;
        else if (n.type === 'radio') { if (n.checked) patch[k] = n.value; }
        else patch[k] = n.value;
      }
    } catch (_e) { /* ignore */ }
    setCfg(patch);
  }

  // --------------------------------------------------------------------------
  // \u5165\u53e3\u6ce8\u5165\uff1a\u9b54\u6cd5\u68d2\u6269\u5c55\u83dc\u5355 + \u60ac\u6d6e\u7403
  // --------------------------------------------------------------------------
  function mountMenuButton() {
    refreshPageRefs();
    let host = null;
    try { host = PAGE_DOC.getElementById('extensionsMenu'); } catch (_e) { /* ignore */ }
    if (!host) return false;
    if (host.querySelector('.yzg-menu-item')) return true;
    const item = el('div', {
      class: 'yzg-menu-item list-group-item flex-container flexGap5 interactable',
      title: 'AI \u51fa\u56fe\uff1a\u6309\u5267\u60c5\u51fa\u4e00\u5f20\u56fe',
      onclick: () => { console.log('[AI\u51fa\u56fe] \u83dc\u5355\u70b9\u51fb\u5df2\u89e6\u53d1'); openPanel(); },
    }, [
      el('div', { class: 'fa-fw fa-solid fa-image extensionsMenuExtensionButton' }),
      el('span', { text: 'AI \u51fa\u56fe' }),
    ]);
    host.appendChild(item);

    // \u81ea\u68c0\u5165\u53e3\uff1a\u754c\u9762\u4e07\u4e00\u663e\u793a\u4e0d\u51fa\u6765\uff0c\u8fd9\u4e2a\u8fd8\u80fd\u7528\uff08\u7cfb\u7edf\u5f39\u7a97\u4e0d\u53d7\u6837\u5f0f/\u5b9a\u4f4d\u5f71\u54cd\uff09
    const diag = el('div', {
      class: 'yzg-menu-item list-group-item flex-container flexGap5 interactable',
      title: '\u754c\u9762\u663e\u793a\u4e0d\u51fa\u6765\u65f6\u70b9\u8fd9\u4e2a\uff0c\u4f1a\u7528\u7cfb\u7edf\u5f39\u7a97\u62a5\u51fa\u8bca\u65ad\u4fe1\u606f',
      onclick: () => { runSelfCheck(); },
    }, [
      el('div', { class: 'fa-fw fa-solid fa-stethoscope extensionsMenuExtensionButton' }),
      el('span', { text: 'AI \u51fa\u56fe \u00b7 \u81ea\u68c0' }),
    ]);
    host.appendChild(diag);
    return true;
  }

  // --------------------------------------------------------------------------
  // \u81ea\u68c0\uff1a\u628a\u6240\u6709\u300c\u53ef\u80fd\u5bfc\u81f4\u770b\u4e0d\u89c1\u300d\u7684\u73af\u5883\u56e0\u7d20\u62a5\u51fa\u6765
  // \u7528\u539f\u751f alert\uff0c\u7ed5\u5f00\u6d6e\u5c42/\u6837\u5f0f\u8868 \u2014\u2014 \u4e07\u4e00\u754c\u9762\u672c\u8eab\u663e\u793a\u4e0d\u51fa\u6765\uff0c\u8fd9\u4e2a\u8fd8\u80fd\u7528
  // --------------------------------------------------------------------------
  function runSelfCheck() {
    const L = [];
    const say = (k, v) => L.push(k + '\uff1a ' + v);
    try { say('\u7248\u672c', VERSION); } catch (_e) { /* ignore */ }
    try {
      const docEl = PAGE_DOC.documentElement;
      say('\u6e32\u67d3\u6587\u6863', PAGE_DOC === document ? '\u811a\u672c\u81ea\u5df1\u6240\u5728\u6587\u6863' : '\u7236/\u9876\u5c42\u6587\u6863\uff08\u6b63\u5e38\uff09');
      say('html transform', PAGE_WIN.getComputedStyle(docEl).transform || '(\u65e0)');
      say('\u89c6\u53e3 innerWH', PAGE_WIN.innerWidth + ' \u00d7 ' + PAGE_WIN.innerHeight);
      say('dvh \u652f\u6301', PAGE_WIN.CSS && PAGE_WIN.CSS.supports && PAGE_WIN.CSS.supports('height', '100dvh') ? '\u662f' : '\u5426');
      say('\u9875\u9762\u6eda\u52a8', 'scrollY=' + (PAGE_WIN.scrollY || 0));
      say('\u6253\u5f00\u7684 dialog', PAGE_DOC.querySelectorAll('dialog[open]').length + ' \u4e2a');
    } catch (e) { say('\u73af\u5883\u8bfb\u53d6', '\u5931\u8d25 ' + e.message); }

    // \u6837\u5f0f\u8868\u5230\u5e95\u6709\u6ca1\u6709\u751f\u6548\uff1a\u9020\u4e00\u4e2a\u53ea\u6709 class \u7684\u63a2\u9488\u91cf\u4e00\u4e0b
    try {
      const probe = PAGE_DOC.createElement('div');
      probe.className = 'yzg-overlay';
      probe.style.visibility = 'hidden';
      PAGE_DOC.body.appendChild(probe);
      const cs = PAGE_WIN.getComputedStyle(probe);
      say('\u6837\u5f0f\u8868', cs.position === 'fixed' ? '\u5df2\u751f\u6548 \u2714' : '\u2605\u6ca1\u751f\u6548\u2605 position=' + cs.position);
      probe.remove();
    } catch (e) { say('\u6837\u5f0f\u8868', '\u63a2\u6d4b\u5931\u8d25 ' + e.message); }

    // \u60ac\u6d6e\u7403
    try {
      const ball = PAGE_DOC.querySelector('.yzg-ball');
      if (!ball) say('\u60ac\u6d6e\u7403', '\u2605\u4e0d\u5728\u9875\u9762\u4e0a\u2605');
      else {
        const r = ball.getBoundingClientRect();
        say('\u60ac\u6d6e\u7403', 'left=' + Math.round(r.left) + ' top=' + Math.round(r.top) +
          ' \u5c3a\u5bf8=' + Math.round(r.width) + '\u00d7' + Math.round(r.height));
      }
    } catch (e) { say('\u60ac\u6d6e\u7403', '\u8bfb\u53d6\u5931\u8d25 ' + e.message); }

    // \u6d6e\u5c42\uff1a\u5148\u6253\u5f00\u91cf\u4e00\u6b21\uff0c\u518d\u5173\u6389
    try {
      const o = S.overlay || (buildPanel(), S.overlay);
      const wasOpen = o.classList.contains('open');
      o.classList.add('open');
      o.style.display = 'flex';
      try { refreshPageRefs(); renderBody(); } catch (_e) { /* ignore */ }
      const r = o.getBoundingClientRect();
      say('\u6d6e\u5c42', 'top=' + Math.round(r.top) + ' \u9ad8=' + Math.round(r.height) +
        ' \u5bbd=' + Math.round(r.width) + ' \u5b9a\u4f4d=' + PAGE_WIN.getComputedStyle(o).position);
      const card = o.querySelector('.yzg-card');
      if (card) {
        const cr = card.getBoundingClientRect();
        say('\u5361\u7247', 'top=' + Math.round(cr.top) + ' \u9ad8=' + Math.round(cr.height) +
          ' \u5bbd=' + Math.round(cr.width));
      }
      const vh = PAGE_WIN.innerHeight || 800;
      const visible = r.height >= 40 && r.bottom > 0 && r.top < vh;
      say('\u7ed3\u8bba', visible ? '\u6d6e\u5c42\u5728\u53ef\u89c6\u533a\u5185 \u2714\uff08\u90a3\u95ee\u9898\u53ef\u80fd\u5728\u522b\u5904\uff09' : '\u2605\u6d6e\u5c42\u5728\u89c6\u53e3\u5916\u2605');
      if (!wasOpen) { o.classList.remove('open'); o.style.display = 'none'; }
    } catch (e) { say('\u6d6e\u5c42', '\u8bfb\u53d6\u5931\u8d25 ' + e.message); }

    try {
      const ok = (function () { try { localStorage.setItem('__yzg_t', '1'); localStorage.removeItem('__yzg_t'); return true; } catch (_e2) { return false; } })();
      say('\u672c\u5730\u5b58\u50a8', ok ? '\u53ef\u7528' : '\u2605\u4e0d\u53ef\u7528\uff08\u65e0\u75d5\u6a21\u5f0f\uff1f\uff09\u2605');
    } catch (_e) { /* ignore */ }

    L.push('');
    L.push('\uff08\u8fd9\u884c\u7528\u7cfb\u7edf\u5f39\u7a97\u663e\u793a\uff0c\u4e0d\u53d7\u754c\u9762\u6837\u5f0f\u5f71\u54cd\u3002\u4ee5\u4e0a\u5185\u5bb9\u622a\u56fe\u53d1\u6211\u5373\u53ef\uff09');
    try { PAGE_WIN.alert('AI \u51fa\u56fe \u00b7 \u81ea\u68c0\u62a5\u544a\n\n' + L.join('\n')); }
    catch (_e) { alert('AI \u51fa\u56fe \u00b7 \u81ea\u68c0\u62a5\u544a\n\n' + L.join('\n')); }
  }

  const BALL_SIZE = 46;

  function mountBall() {
    if (lsGet(LS.ballOn, '1') !== '1') return;
    if (S.ball) return;
    refreshPageRefs();
    const ball = el('div', { class: 'yzg-ball', title: 'AI \u51fa\u56fe', onclick: togglePanel });

    // \u3010\u4e3a\u4ec0\u4e48\u5185\u8054\u4e00\u4efd\u6837\u5f0f\u3011\u811a\u672c\u6ce8\u5165 CSS \u82e5\u56e0\u4efb\u4f55\u539f\u56e0\u6ca1\u751f\u6548\uff0c
    // \u5149\u9760 class \u7684\u7403\u4f1a\u9000\u5316\u6210\u4e00\u4e2a\u770b\u4e0d\u89c1\u7684\u7a7a div \u2014\u2014 \u5185\u8054\u4e00\u4efd\uff0c\u81f3\u5c11\u4f60\u8fd8\u80fd\u770b\u89c1\u5b83\u3002
    ball.style.position = 'fixed';
    ball.style.width = BALL_SIZE + 'px';
    ball.style.height = BALL_SIZE + 'px';
    ball.style.borderRadius = '50%';
    ball.style.zIndex = '99996';
    ball.style.display = 'flex';
    ball.style.alignItems = 'center';
    ball.style.justifyContent = 'center';
    ball.style.background = 'linear-gradient(160deg, #c9a6ff, #7d5ad6)';
    ball.style.boxShadow = '0 6px 18px rgba(125, 90, 214, 0.45)';
    ball.style.touchAction = 'none';
    ball.style.cursor = 'pointer';

    // \u9ed8\u8ba4\u4f4d\u7f6e\uff08\u5de6\u4e0b\u89d2\uff0c\u907f\u5f00\u8bb0\u5fc6\u9762\u677f\u53f3\u4e0b\u89d2\u90a3\u4e2a\u7403\uff09\u3002
    // \u6709\u5b58\u8fc7\u7684\u4f4d\u7f6e\u5c31\u94b3\u56de\u89c6\u53e3\u5185 \u2014\u2014 \u624b\u673a\u8f6c\u5c4f/\u6539\u7f29\u653e\u540e\uff0c\u65e7\u5750\u6807\u53ef\u80fd\u5df2\u5728\u5c4f\u5e55\u5916\u3002
    let pos = null;
    try { pos = JSON.parse(lsGet(LS.ballPos, 'null')); } catch (_e) { pos = null; }
    if (pos && Number.isFinite(pos.x) && Number.isFinite(pos.y)) {
      ball.style.left = clampX(pos.x) + 'px';
      ball.style.top = clampY(pos.y) + 'px';
    } else {
      ball.style.left = '18px';
      ball.style.top = Math.max(60, PAGE_WIN.innerHeight - BALL_SIZE - 120) + 'px';
      ball.style.bottom = 'auto';
    }

    PAGE_DOC.body.appendChild(ball);
    S.ball = ball;
    // \u540c\u6837\u515c\u5e95\u91cf\u4e00\u6b21\uff1a\u5b9a\u4f4d\u53c2\u7167\u7cfb\u8dd1\u504f\u65f6\u628a\u7403\u62c9\u56de\u53ef\u89c1\u533a
    const rescue = () => {
      try {
        const r = ball.getBoundingClientRect();
        console.log('[AI\u51fa\u56fe] \u60ac\u6d6e\u7403\u4f4d\u7f6e left=' + Math.round(r.left) + ' top=' + Math.round(r.top) +
          ' | \u89c6\u53e3=' + PAGE_WIN.innerWidth + 'x' + PAGE_WIN.innerHeight);
      } catch (_e) { /* ignore */ }
      rescueOffscreen(ball, 120);
    };
    try { PAGE_WIN.requestAnimationFrame(rescue); } catch (_e) { rescue(); }
    setTimeout(() => { rescueOffscreen(ball, 120); }, 300);

    // \u62d6\u52a8
    let dragging = false, moved = false, sx = 0, sy = 0, ox = 0, oy = 0;
    ball.addEventListener('pointerdown', (e) => {
      dragging = true; moved = false;
      sx = e.clientX; sy = e.clientY;
      const r = ball.getBoundingClientRect();
      ox = r.left; oy = r.top;
      ball.style.bottom = 'auto';
      ball.style.transition = 'none';
      e.preventDefault();
    });
    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved = true;
      if (moved) {
        ball.style.left = clampX(ox + dx) + 'px';
        ball.style.top = clampY(oy + dy) + 'px';
      }
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      ball.style.transition = '';
      if (moved) {
        const r = ball.getBoundingClientRect();
        lsSet(LS.ballPos, JSON.stringify({ x: Math.round(r.left), y: Math.round(r.top) }));
        S.lastDragAt = Date.now();
      }
    };
    try {
      PAGE_DOC.addEventListener('pointermove', onMove, { passive: false, capture: true });
      PAGE_DOC.addEventListener('pointerup', onUp, true);
      PAGE_DOC.addEventListener('pointercancel', onUp, true);
    } catch (_e) { /* ignore */ }
    // \u62d6\u52a8\u540e\u6d4f\u89c8\u5668\u4f1a\u8865\u53d1 click\uff0c\u6321\u4e00\u4e0b
    ball.addEventListener('click', (e) => {
      if (S.lastDragAt && Date.now() - S.lastDragAt < 400) { e.stopPropagation(); }
    }, true);
  }

  // \u628a\u5750\u6807\u94b3\u5728\u89c6\u53e3\u5185\uff08\u7559 2px \u8fb9\u8ddd\uff0c\u4fdd\u8bc1\u6c38\u8fdc\u6293\u5f97\u5230\uff09
  function clampX(x) {
    const w = PAGE_WIN.innerWidth || PAGE_DOC.documentElement.clientWidth || 0;
    return Math.min(Math.max(2, Number(x) || 0), Math.max(2, w - BALL_SIZE - 2));
  }
  function clampY(y) {
    const h = PAGE_WIN.innerHeight || PAGE_DOC.documentElement.clientHeight || 0;
    return Math.min(Math.max(2, Number(y) || 0), Math.max(2, h - BALL_SIZE - 2));
  }

  // \u91cf\u4e00\u6b21\u5143\u7d20\u662f\u5426\u771f\u7684\u843d\u5728\u89c6\u53e3\u91cc\uff1b\u4e0d\u5728\u5c31\u5207\u5230 absolute + \u5f53\u524d\u6eda\u52a8\u91cf\u62c9\u56de\u6765\u3002
  // \u9488\u5bf9\u7684\u662f\u300c\u9152\u9986\u7ed9 <html> \u52a0 transform\uff0cfixed \u53c2\u7167\u7cfb\u8dd1\u5230\u6587\u6863\u539f\u70b9\u300d\u8fd9\u79cd\u73af\u5883\u5dee\u5f02\u3002
  function rescueOffscreen(node, bottomGap) {
    try {
      const r = node.getBoundingClientRect();
      const vh = PAGE_WIN.innerHeight || PAGE_DOC.documentElement.clientHeight || 800;
      const vw = PAGE_WIN.innerWidth || PAGE_DOC.documentElement.clientWidth || 400;
      const outside = r.bottom <= 0 || r.top >= vh || r.right <= 0 || r.left >= vw || r.width < 2 || r.height < 2;
      if (!outside) return false;
      const sy = PAGE_WIN.scrollY || PAGE_DOC.documentElement.scrollTop || 0;
      const sx = PAGE_WIN.scrollX || PAGE_DOC.documentElement.scrollLeft || 0;
      node.style.position = 'absolute';
      node.style.left = (sx + 18) + 'px';
      node.style.top = (sy + Math.max(60, vh - BALL_SIZE - (bottomGap || 120))) + 'px';
      node.style.bottom = 'auto';
      console.log('[AI\u51fa\u56fe] \u60ac\u6d6e\u7403\u5b9a\u4f4d\u5f02\u5e38\uff0c\u5df2\u5207\u5230 absolute \u515c\u5e95', r, 'scrollY=', sy);
      return true;
    } catch (_e) { return false; }
  }

  // \u8ba9\u5f00\u5173\u7acb\u523b\u751f\u6548\uff08\u8bbe\u7f6e\u91cc\u52fe\u6389/\u52fe\u4e0a\u60ac\u6d6e\u7403\u65f6\u8c03\u7528\uff09
  function syncBall() {
    if (lsGet(LS.ballOn, '1') === '1') {
      mountBall();
    } else if (S.ball) {
      try { S.ball.remove(); } catch (_e) { /* ignore */ }
      S.ball = null;
    }
  }

  // \u590d\u4f4d\u5230\u9ed8\u8ba4\u4f4d\u7f6e\uff08\u7403\u8dd1\u6ca1\u4e86/\u62d6\u5230\u5c4f\u5e55\u5916\u65f6\u7684\u6551\u547d\u6309\u94ae\uff09
  function resetBallPos() {
    try { lsSet(LS.ballPos, 'null'); } catch (_e) { /* ignore */ }
    if (!S.ball) { mountBall(); return; }
    const b = S.ball;
    b.style.left = '18px';
    b.style.top = Math.max(60, PAGE_WIN.innerHeight - BALL_SIZE - 120) + 'px';
    b.style.bottom = 'auto';
  }

  // --------------------------------------------------------------------------
  // \u542f\u52a8
  // --------------------------------------------------------------------------
  function boot() {
    injectCss();
    refreshPageRefs();
    let tries = 0;
    const t = setInterval(() => {
      tries += 1;
      injectCss();
      refreshPageRefs();
      mountMenuButton();
      mountBall();
      if (tries > 40) clearInterval(t);
    }, 1000);
    mountMenuButton();
    mountBall();
    let cssOk = false;
    try { cssOk = !!window.__YZG_CSS__; } catch (_e) { /* ignore */ }
    console.log('[AI\u51fa\u56fe] v' + VERSION + ' \u5df2\u52a0\u8f7d | \u754c\u9762\u6587\u6863=' +
      (PAGE_DOC === window.document ? '\u811a\u672c\u6240\u5728\u6587\u6863' : '\u7236/\u9876\u5c42\u6587\u6863') +
      ' | \u627e\u5230\u9b54\u6cd5\u68d2\u83dc\u5355=' + (function () { try { return !!PAGE_DOC.getElementById('extensionsMenu'); } catch (_e) { return '?'; } })() +
      ' | \u6837\u5f0f\u6587\u672c=' + (cssOk ? '\u6709(' + String(window.__YZG_CSS__).length + '\u5b57)' : '\u2605\u6ca1\u6709\u2605'));
  }

  if (PAGE_DOC.readyState === 'loading') {
    PAGE_DOC.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // \u5bf9\u5916\u66b4\u9732\uff08\u4fbf\u4e8e\u8c03\u8bd5 / \u4ee5\u540e\u88ab\u522b\u7684\u4e1c\u897f\u8c03\u8d77\uff09
  window[NS].api = {
    open: openPanel,
    close: closePanel,
    generate: startGenerate,
    cfg: cfg,
    setCfg: setCfg,
    testImage: testImage,
    testText: testOwnText,
    fetchModels: fetchModels,
    pickModel: pickModel,
    runGenerate: runGenerate,
    collectMaterial: collectMaterial,
    buildImagePrompt: buildImagePrompt,
    safeRules: safeRules,
    presetRules: presetRules,
    RULES_PRESETS: RULES_PRESETS,
    applySafeRules: applySafeRules,
    fullPromptText: fullPromptText,
    gallery: { list: galListByChat, listAll: galListAll, del: galDel, clear: galClear, add: galAdd },
    chatKey: chatKey,
  };
})();
