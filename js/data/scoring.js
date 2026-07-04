function calculateScore(body, lens) {
  if (!body || !lens) return null;

  // 判断高端镜头
  const isPremiumLens = lens.isL ||
    (lens.type === "定焦" && parseFloat(lens.maxAperture.replace("F", "")) <= 1.4) ||
    (lens.type === "变焦" && lens.maxAperture === "F2.8");

  // 判断专业机身（高速连拍旗舰或高端全画幅）
  const bodyPriceLow = parseInt(body.priceRange?.split("-")[0]) || 0;
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
  if (body.sensor !== "APS-C" && lens.filterSize >= 72) resolutionScore += 3;
  if (body.sensor === "APS-C" && lens.weight < 500) resolutionScore += 3;
  resolutionScore = Math.min(resolutionScore, 100);

  // 2. 视频性能匹配 20%
  let videoScore = 60;
  if (body.video.includes("8K")) videoScore += 15;
  else if (body.video.includes("6K")) videoScore += 10;
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
  const lensPrice = parseInt(lens.priceRange?.split("-")[0]) || 0;
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
    resolutionScore * 0.30 +
    videoScore * 0.20 +
    portabilityScore * 0.15 +
    valueScore * 0.15 +
    proScore * 0.20
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

function getComboScore(bodyId, lensId) {
  const body = bodies.find(b => b.id === bodyId);
  const lens = lenses.find(l => l.id === lensId);
  if (!body || !lens) return null;
  if (body.brand !== lens.brand) return { error: "机身与镜头品牌不匹配", overall: 0 };
  // 卡口兼容性检查
  const lensMounts = { "RF": "RF", "Z": "Z", "X": "X", "GFX": "GFX", "L": "L", "MFT": "MFT", "E": "E" };
  const bodyMounts = { "RF": "RF", "Z": "Z", "X": "X", "GFX": "GFX", "L": "L", "MFT": "MFT", "E": "E" };
  if (lensMounts[lens.mount] !== bodyMounts[body.mount]) {
    return { error: "卡口不兼容", overall: 0 };
  }
  return calculateScore(body, lens);
}
