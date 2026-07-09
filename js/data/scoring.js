// ============================================================
// 影视设备打分 - 评分算法
// 依赖：bodies, lenses (全局变量)
// ============================================================

// ---- 品牌色 ----
const brands = {
  canon:     { name: "佳能",   cn: "Canon",    color: "#D52024", mount: "RF" },
  nikon:     { name: "尼康",   cn: "Nikon",    color: "#B8960F", mount: "Z" },
  fujifilm:  { name: "富士",   cn: "Fujifilm", color: "#4CAF50", mount: "X" },
  panasonic: { name: "松下",   cn: "Panasonic",color: "#0066B4", mount: "L" },
  sony:      { name: "索尼",   cn: "Sony",     color: "#1A1A1A", mount: "E" },
  olympus:   { name: "奥林巴斯",cn: "Olympus", color: "#0077B5", mount: "MFT" }
};

// ---- 场景标签中文名 ----
const sceneLabels = {
  portrait:    "人像摄影",
  landscape:   "风光/旅行",
  wedding:     "婚礼/活动",
  documentary: "纪录片",
  cinema:      "电影/短片",
  vlog:        "Vlog/自媒体",
  sports:      "体育/运动",
  commercial:  "商业产品",
  wildlife:    "野生动物",
  street:      "街拍/人文"
};

const sceneIcons = {
  portrait:    "👤",
  landscape:   "🏔️",
  wedding:     "💒",
  documentary: "🎬",
  cinema:      "🎥",
  vlog:        "🎙️",
  sports:      "⚽",
  commercial:  "📦",
  wildlife:    "🦅",
  street:      "🏙️"
};

// ---- 特性标签中文名 ----
const featureLabels = {
  "high-mp": "高像素", "mid-mp": "中像素", "low-mp": "低像素",
  "high-fps": "高速连拍", "mid-fps": "中速连拍",
  "8k-video": "8K视频", "6k-video": "6K视频", "4k120-video": "4K高帧率", "raw-video": "RAW视频",
  "lightweight": "轻便", "heavy": "沉重",
  "pro-body": "专业旗舰", "pro-ibis": "防抖出色", "stacked-sensor": "堆栈式传感器",
  "high-iso": "高感光", "retro": "复古外观",
  "large-aperture": "大光圈", "mid-aperture": "中光圈", "constant-aperture": "恒定光圈",
  "pro-lens": "专业镜头",
  "wide-angle": "广角", "telephoto": "长焦", "standard": "标准焦段",
  "macro": "微距", "is-lens": "防抖镜头", "portrait-focal": "人像焦段",
  "travel-zoom": "旅行变焦", "filter-82": "82mm口径"
};

// ---- 标签分配 ----
function assignBodyTags(body) {
  const ft = [], st = [];

  // 特性标签
  if (body.megapixels >= 40) ft.push("high-mp");
  else if (body.megapixels >= 25) ft.push("mid-mp");
  else ft.push("low-mp");

  if (body.fps >= 20) ft.push("high-fps");
  else if (body.fps >= 10) ft.push("mid-fps");

  if (body.video?.includes("8K")) ft.push("8k-video");
  else if (body.video?.includes("6K")) ft.push("6k-video");
  if (body.video?.includes("120p")) ft.push("4k120-video");
  if (body.videoRaw) ft.push("raw-video");

  if (body.weight < 600) ft.push("lightweight");
  if (body.weight > 1000) ft.push("heavy");

  if (body.launchPrice?.low >= 30000 || body.fps >= 20) ft.push("pro-body");
  const stops = parseInt(body.ibisLevel) || 0;
  if (stops >= 7) ft.push("pro-ibis");
  if (body.sensor?.includes("堆栈式")) ft.push("stacked-sensor");

  const isoUpper = parseInt((body.iso || "").split("(")[1]?.replace(/[^0-9]/g,"") || "0");
  if (isoUpper >= 102400) ft.push("high-iso");

  // 场景标签
  if (body.megapixels >= 40) {
    st.push("portrait", "landscape", "commercial");
  } else if (body.megapixels >= 24) {
    st.push("wedding", "documentary", "street");
  }
  if (body.video?.includes("8K")) { st.push("cinema", "documentary"); }
  else if (body.video?.includes("6K")) { st.push("cinema"); }
  if (body.video?.includes("120p")) st.push("sports");
  if (body.weight < 600) st.push("vlog", "street", "landscape");
  if (body.fps >= 20) st.push("sports", "wildlife");

  return { featureTags: ft, sceneTags: st };
}

function assignLensTags(lens) {
  const ft = [], st = [];

  const f = parseFloat((lens.maxAperture || "F2.8").replace("F", ""));

  if (f <= 1.4) ft.push("large-aperture");
  else if (f <= 2) ft.push("mid-aperture");
  if (lens.type === "变焦" && (f === 2.8 || f === 4)) ft.push("constant-aperture");

  if (lens.weight < 400) ft.push("lightweight");
  if (lens.weight > 800) ft.push("heavy");

  if (lens.isL || f <= 1.4 || (lens.type === "变焦" && f === 2.8)) ft.push("pro-lens");

  const lower = parseFloat(lens.focalRange?.split("-")[0]) || 0;
  const upper = parseFloat((lens.focalRange?.split("-")[1]) || lens.focalRange) || lower;
  if (lower <= 24) ft.push("wide-angle");
  if (upper >= 135 || lower >= 135) ft.push("telephoto");
  const fc = lens.focalRange || "";
  if (fc.includes("50") || fc.includes("85")) ft.push("standard");
  if (fc.includes("85") || fc.includes("135")) ft.push("portrait-focal");
  if (lens.isIS) ft.push("is-lens");
  if (lens.type === "变焦" && lower <= 24 && upper >= 70) ft.push("travel-zoom");
  if (lens.filterSize === 82) ft.push("filter-82");

  // 场景标签
  if (f <= 1.4) st.push("portrait");
  if (lens.isIS) st.push("vlog", "documentary");
  if (lens.type === "变焦" && f <= 2.8) st.push("wedding", "documentary");
  if (lens.weight < 400) st.push("vlog", "street", "landscape");
  if (ft.includes("telephoto")) st.push("sports", "wildlife");
  if (ft.includes("wide-angle")) st.push("landscape", "street");
  if (lens.type === "定焦" && f <= 1.4) st.push("street");

  return { featureTags: ft, sceneTags: st };
}

// ---- 计算系统综合评分 ----
function calculateScore(body, lens) {
  if (!body || !lens) return null;

  const isPremiumLens = lens.isL ||
    (lens.type === "定焦" && parseFloat((lens.maxAperture || "2.8").replace("F","")) <= 1.4) ||
    (lens.type === "变焦" && lens.maxAperture === "F2.8");

  const bodyPriceLow = body.launchPrice?.low || 10000;
  const isProBody = body.fps >= 20 || bodyPriceLow >= 30000;

  // 1. 画质匹配度 30%
  let resolutionScore = 70;
  if (body.megapixels >= 40) {
    resolutionScore = isPremiumLens ? 95 : 65;
  } else if (body.megapixels >= 30) {
    resolutionScore = isPremiumLens ? 90 : 75;
  } else {
    resolutionScore = isPremiumLens ? 85 : 80;
  }
  if (body.sensor !== "APS-C" && (lens.filterSize || 0) >= 72) resolutionScore += 3;
  if (body.sensor === "APS-C" && (lens.weight || 999) < 500) resolutionScore += 3;
  resolutionScore = Math.min(resolutionScore, 100);

  // 2. 视频性能匹配 20%
  let videoScore = 60;
  if (body.video?.includes("8K")) videoScore += 15;
  else if (body.video?.includes("6K")) videoScore += 10;
  if (body.videoRaw) videoScore += 5;
  if (lens.type === "变焦") videoScore += 8;
  if (lens.isIS) videoScore += 5;
  if (body.ibis) videoScore += 5;
  videoScore = Math.min(videoScore, 100);

  // 3. 便携性 15%
  const totalWeight = (body.weight || 0) + (lens.weight || 0);
  let portabilityScore;
  if (totalWeight < 800) portabilityScore = 95;
  else if (totalWeight < 1200) portabilityScore = 85;
  else if (totalWeight < 1600) portabilityScore = 70;
  else if (totalWeight < 2000) portabilityScore = 55;
  else portabilityScore = 40;

  // 4. 性价比 15%
  const lensPrice = lens.launchPrice?.low || 3000;
  const totalPrice = bodyPriceLow + lensPrice;
  let valueScore;
  if (totalPrice < 15000) valueScore = 90;
  else if (totalPrice < 25000) valueScore = 82;
  else if (totalPrice < 40000) valueScore = 68;
  else if (totalPrice < 60000) valueScore = 50;
  else valueScore = 35;

  // 5. 专业匹配度 20%
  let proScore = 70;
  if (isProBody && isPremiumLens) proScore = 95;
  else if (isProBody) proScore = 55;
  else if (isPremiumLens) proScore = 78;
  else proScore = 65;

  const overall = Math.round(
    resolutionScore * 0.30 + videoScore * 0.20 +
    portabilityScore * 0.15 + valueScore * 0.15 + proScore * 0.20
  );

  return {
    resolutionMatch: Math.round(resolutionScore),
    videoMatch: Math.round(videoScore),
    portability: Math.round(portabilityScore),
    value: Math.round(valueScore),
    professional: Math.round(proScore),
    overall
  };
}

// ---- 检查卡口兼容性 ----
function mountCompatible(body, lens) {
  if (!body || !lens) return false;
  // 同品牌且同卡口
  if (body.brand !== lens.brand) return false;
  // MFT 卡口：松下和奥林巴斯共用
  if (body.mount === "MFT" && lens.mount === "MFT") return true;
  // L 卡口：松下 L 卡口
  if (body.mount === "L" && lens.mount === "L") return true;
  return body.mount === lens.mount;
}

// ---- 获取组合评分（含兼容性检查） ----
function getComboScore(bodyId, lensId) {
  const body = bodies.find(b => b.id === bodyId);
  const lens = lenses.find(l => l.id === lensId);
  if (!body || !lens) return null;
  if (!mountCompatible(body, lens)) {
    return { error: "卡口不兼容", overall: 0 };
  }
  return calculateScore(body, lens);
}

// ---- 获取价格（根据全新/二手模式） ----
function getPrice(item, useUsed = false) {
  if (!item) return { low: 0, high: 0 };
  const price = useUsed ? item.usedPrice : item.launchPrice;
  if (!price) return { low: 0, high: 0 };
  return price;
}

function getComboTotalPrice(body, lens, useUsed = false) {
  const bp = getPrice(body, useUsed);
  const lp = getPrice(lens, useUsed);
  return { low: bp.low + lp.low, high: bp.high + lp.high };
}

// ---- 用户需求匹配分（动态权重） ----
function getUserWeight(photoPct = 50, sceneTypes = []) {
  // 基础权重（依据照片/视频比例）
  let w = { quality: 30, video: 20, portable: 15, value: 15, pro: 20 };

  if (photoPct >= 90)       w = { quality: 5,  video: 50, portable: 20, value: 10, pro: 15 };
  else if (photoPct >= 70)  w = { quality: 10, video: 40, portable: 20, value: 15, pro: 15 };
  else if (photoPct >= 55)  w = { quality: 20, video: 30, portable: 18, value: 17, pro: 15 };
  else if (photoPct <= 30)  w = { quality: 40, video: 5,  portable: 15, value: 20, pro: 20 };
  else if (photoPct <= 45)  w = { quality: 35, video: 12, portable: 15, value: 18, pro: 20 };

  // 场景类型调整
  const adj = {
    portrait:    { quality: 5, pro: 5 },
    landscape:   { quality: 5, portable: 5, value: 5, pro: -5 },
    wedding:     { video: 5, pro: 5 },
    documentary: { video: 10, portable: 5, pro: -5 },
    cinema:      { video: 10, pro: 5 },
    vlog:        { quality: -5, video: 10, portable: 10, value: 5, pro: -10 },
    sports:      { pro: 10, value: -5 },
    commercial:  { quality: 10, value: -5, pro: 5 },
    wildlife:    { quality: 5, pro: 5 },
    street:      { portable: 5, value: 5 }
  };

  for (const s of sceneTypes) {
    if (adj[s]) {
      for (const [k, v] of Object.entries(adj[s])) {
        w[k] = (w[k] || 0) + v;
      }
    }
  }

  // 归一化
  const total = Object.values(w).reduce((a, b) => a + b, 0);
  if (total !== 100) {
    for (const k of Object.keys(w)) w[k] = Math.round(w[k] * 100 / total);
    // 修正舍入误差
    const diff = 100 - Object.values(w).reduce((a, b) => a + b, 0);
    if (diff !== 0) w.value = (w.value || 0) + diff;
  }

  return w;
}

// ---- 推荐引擎 ----
function recommend(params = {}) {
  const {
    budgetLow = 1000, budgetHigh = 100000,
    photoPct = 50,
    sceneTypes = [],
    sensorPrefer = "",
    brandPrefer = [],
    useUsed = false,
    existingBodyId = "",
    existingLensId = "",
    topN = 8
  } = params;

  let candidates = [];

  // 过滤可用机身和镜头
  let eligibleBodies = [...bodies];
  let eligibleLenses = [...lenses];

  // 已有设备过滤
  if (existingBodyId) {
    const eb = bodies.find(b => b.id === existingBodyId);
    if (eb) {
      eligibleBodies = [eb];
      eligibleLenses = lenses.filter(l =>
        l.brand === eb.brand && mountCompatible(eb, l)
      );
    }
  }
  if (existingLensId) {
    const el = lenses.find(l => l.id === existingLensId);
    if (el) {
      eligibleLenses = [el];
      eligibleBodies = bodies.filter(b =>
        b.brand === el.brand && mountCompatible(b, el)
      );
    }
  }

  // 品牌偏好
  if (brandPrefer.length > 0) {
    eligibleBodies = eligibleBodies.filter(b => brandPrefer.includes(b.brand));
    eligibleLenses = eligibleLenses.filter(l => brandPrefer.includes(l.brand));
  }

  // 画幅偏好
  if (sensorPrefer) {
    eligibleBodies = eligibleBodies.filter(b => b.sensor === sensorPrefer);
  }

  // 生成候选组合（同品牌同卡口）
  for (const body of eligibleBodies) {
    const compatLenses = eligibleLenses.filter(l =>
      l.brand === body.brand && mountCompatible(body, l)
    );
    for (const lens of compatLenses) {
      const score = calculateScore(body, lens);
      if (!score) continue;
      const price = getComboTotalPrice(body, lens, useUsed);

      // 预算过滤
      if (price.low > budgetHigh * 1.15) continue;

      const budgetStatus =
        price.low < budgetLow ? "预算充裕" :
        price.low <= budgetHigh ? "预算内" :
        price.low <= budgetHigh * 1.15 ? "略超预算" : "超出";

      // 场景标签匹配加分
      const bodyTags = body.sceneTags || assignBodyTags(body).sceneTags;
      const lensTags = lens.sceneTags || assignLensTags(lens).sceneTags;
      const allTags = [...new Set([...bodyTags, ...lensTags])];
      let tagBonus = 0;
      for (const st of sceneTypes) {
        if (allTags.includes(st)) tagBonus += 3;
      }
      tagBonus = Math.min(tagBonus, 15);

      // 用户权重
      const weights = getUserWeight(photoPct, sceneTypes);
      const userScore = Math.round(
        score.resolutionMatch * weights.quality / 100 +
        score.videoMatch * weights.video / 100 +
        score.portability * weights.portable / 100 +
        score.value * weights.value / 100 +
        score.professional * weights.pro / 100
      );

      // 推荐总分
      const finalScore = Math.min(100, Math.round(userScore * (score.overall / 100) + tagBonus));

      candidates.push({
        body, lens, score,
        price, budgetStatus,
        tagBonus, userScore, finalScore,
        totalWeight: (body.weight || 0) + (lens.weight || 0)
      });
    }
  }

  // 按推荐总分排序
  candidates.sort((a, b) => b.finalScore - a.finalScore);
  return candidates.slice(0, topN);
}

// ---- 生成推荐理由 ----
function getRecommendationReason(rec) {
  const { body, lens, score, budgetStatus, tagBonus } = rec;

  if (budgetStatus === "略超预算") {
    return `总价 ${budgetStatus}，${body.model} + ${lens.model} 的 ${bestDim(score)} 表现突出`;
  }
  if (tagBonus > 0) {
    return `${body.model} 搭配 ${lens.model}，适合你选择的拍摄类型，${bestDim(score)} 优秀`;
  }
  if (score.value >= 80) {
    return `性价比之选，${body.model} + ${lens.model} 在性价比方面表现突出`;
  }
  return `${bestDim(score)}出色的组合：${body.model} × ${lens.model}`;
}

function bestDim(score) {
  const dims = [
    ["画质", score.resolutionMatch],
    ["视频", score.videoMatch],
    ["便携", score.portability],
    ["性价比", score.value],
    ["专业度", score.professional]
  ];
  dims.sort((a, b) => b[1] - a[1]);
  return dims[0][0];
}
