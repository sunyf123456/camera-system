// ============================================================
// 影视设备打分 - 主应用
// ============================================================

// ---------- 页面路由 ----------
const page = {
  current: "home",
  params: {},

  init() {
    window.addEventListener("hashchange", () => this.navigate());
    this.navigate();
  },

  navigate(hash) {
    if (hash !== undefined) {
      window.location.hash = hash;
      return;
    }
    const raw = window.location.hash.slice(1) || "home";
    const parts = raw.split("?");
    const path = parts[0];
    const searchParams = new URLSearchParams(parts[1] || "");
    this.params = {};
    for (const [k, v] of searchParams) this.params[k] = v;
    this.current = path;
    this.render();
  },

  go(path, extraParams = {}) {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries(extraParams)) p.set(k, v);
    const qs = p.toString();
    this.navigate(path + (qs ? "?" + qs : ""));
  }
};

// ---------- 辅助函数 ----------
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

const brands = {
  canon: { name: "佳能", cn: "Canon", color: "#D52024" },
  nikon: { name: "尼康", cn: "Nikon", color: "#B8960F" },
  fujifilm: { name: "富士", cn: "Fujifilm", color: "#4CAF50" },
  panasonic: { name: "松下", cn: "Panasonic", color: "#0066B4" },
  sony: { name: "索尼", cn: "Sony", color: "#1A1A1A" }
};

function brandIcon(b) {
  const info = brands[b];
  return `<span class="brand-icon brand-bg-${b}">${info.cn[0]}</span>`;
}

function brandTag(b) {
  const info = brands[b];
  return `<span class="brand-tag brand-bg-${b}">${info.name}</span>`;
}

function brandDot(b) {
  return `<span class="brand-dot brand-bg-${b}"></span>`;
}

function priceText(p) {
  const [low, high] = p.split("-");
  return `¥${low}-${high}`;
}

function esc(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

// ---------- 评分颜色 ----------
function scoreColor(s) {
  if (s >= 85) return "#22C55E";
  if (s >= 70) return "#8BC34A";
  if (s >= 55) return "#FF9800";
  return "#EF4444";
}

function scoreText(s) {
  if (s >= 85) return "优秀";
  if (s >= 70) return "良好";
  if (s >= 55) return "一般";
  return "不推荐";
}

// ---------- 页面渲染器 ----------
const render = {
  // ----- 首页 -----
  home() {
    const brandCards = Object.entries(brands).map(([key, val]) => `
      <div class="brand-card" onclick="page.go('bodyList',{brand:'${key}'})" style="border-bottom-color:${val.color}">
        ${brandIcon(key)}
        <h3>${val.name}</h3>
        <div class="count">${bodies.filter(b=>b.brand===key).length} 款机身 · ${lenses.filter(l=>l.brand===key).length} 款镜头</div>
      </div>
    `).join("");

    // 推荐组合：取几组高分组合
    let featuredCombos = [];
    for (const body of bodies) {
      const compatLenses = lenses.filter(l => l.brand === body.brand && l.mount === body.mount);
      for (const lens of compatLenses.slice(0, 3)) {
        const score = getComboScore(body.id, lens.id);
        if (score && !score.error) featuredCombos.push({ body, lens, score });
      }
    }
    featuredCombos.sort((a, b) => b.score.overall - a.score.overall);
    featuredCombos = featuredCombos.slice(0, 6);

    const comboCards = featuredCombos.map(({body, lens, score}) => `
      <div class="combo-card" onclick="page.go('combo',{body:'${body.id}',lens:'${lens.id}'})">
        <div class="combo-header">
          <span class="brand-name brand-bg-${body.brand}">${brands[body.brand].name}</span>
          <span class="score" style="color:${scoreColor(score.overall)}">${score.overall}</span>
        </div>
        <div class="combo-items">
          <div class="combo-item"><span class="role">机身</span><span class="name">${esc(body.model)}</span></div>
          <div class="combo-item"><span class="role">镜头</span><span class="name">${esc(lens.model)}</span></div>
        </div>
        <div class="score-bar"><div class="fill" style="width:${score.overall}%"></div></div>
      </div>
    `).join("");

    return `
      <h2 class="section-title">选择品牌</h2>
      <div class="brand-grid">${brandCards}</div>
      <h2 class="section-title">推荐组合</h2>
      <div class="combo-grid">${comboCards || '<p style="color:#999">暂无推荐组合</p>'}</div>
    `;
  },

  // ----- 机身列表 -----
  bodyList() {
    const brand = page.params.brand || "";
    let list = bodies;
    if (brand) list = list.filter(b => b.brand === brand);

    // 传感器筛选
    const sensorFilter = page.params.sensor || "";
    if (sensorFilter) list = list.filter(b => b.sensor === sensorFilter);

    // 排序
    const sort = page.params.sort || "";
    if (sort === "price-asc") list.sort((a,b) => a.priceRange.localeCompare(b.priceRange));
    else if (sort === "price-desc") list.sort((a,b) => b.priceRange.localeCompare(a.priceRange));
    else if (sort === "mp-desc") list.sort((a,b) => b.megapixels - a.megapixels);
    else if (sort === "year-desc") list.sort((a,b) => b.releaseYear - a.releaseYear);

    const filterBtns = (key, options) => {
      const cur = page.params[key] || "";
      const items = [{v:"",l:"全部"}].concat(options).map(o => `
        <span class="filter-btn ${cur===o.v?'active':''}" onclick="page.go('bodyList',{...page.params,'${key}':'${o.v}'})">${o.l}</span>
      `).join("");
      // 为了简单，这里用 onclick 但保留之前选中的参数
      // 用更优雅的方式
      return `<div class="filter-bar">${items}</div>`;
    };

    // 用更直接的方式写筛选
    let filterHTML = `<div class="filter-bar">`;
    const sensors = ["全画幅", "APS-C", "中画幅", "MFT"];
    const allS = brand ? sensors : [""];
    // 品牌筛选
    filterHTML += `<span class="filter-btn ${!brand?'active':''}" onclick="page.go('bodyList',{})">全部品牌</span>`;
    for (const [k, v] of Object.entries(brands)) {
      filterHTML += `<span class="filter-btn ${brand===k?'active':''}" onclick="page.go('bodyList',{brand:'${k}'})">${v.name}</span>`;
    }
    filterHTML += `</div>`;

    // 传感器筛选 (仅当选择了品牌)
    let sensorHTML = "";
    if (brand) {
      sensorHTML = `<div class="filter-bar">`;
      sensorHTML += `<span class="filter-btn ${!sensorFilter?'active':''}" onclick="page.go('bodyList',{brand:'${brand}'})">全部画幅</span>`;
      const available = [...new Set(bodies.filter(b=>b.brand===brand).map(b=>b.sensor))];
      for (const s of available) {
        sensorHTML += `<span class="filter-btn ${sensorFilter===s?'active':''}" onclick="page.go('bodyList',{brand:'${brand}',sensor:'${s}'})">${s}</span>`;
      }
      sensorHTML += `</div>`;
    }

    // 排序按钮
    const sortHTML = `
      <div class="filter-bar">
        <span class="filter-btn ${sort===''?'active':''}" onclick="page.go('bodyList',{brand:'${brand}',sensor:'${sensorFilter}'})">默认</span>
        <span class="filter-btn ${sort==='price-asc'?'active':''}" onclick="page.go('bodyList',{brand:'${brand}',sensor:'${sensorFilter}',sort:'price-asc'})">价格↑</span>
        <span class="filter-btn ${sort==='price-desc'?'active':''}" onclick="page.go('bodyList',{brand:'${brand}',sensor:'${sensorFilter}',sort:'price-desc'})">价格↓</span>
        <span class="filter-btn ${sort==='mp-desc'?'active':''}" onclick="page.go('bodyList',{brand:'${brand}',sensor:'${sensorFilter}',sort:'mp-desc'})">像素↓</span>
        <span class="filter-btn ${sort==='year-desc'?'active':''}" onclick="page.go('bodyList',{brand:'${brand}',sensor:'${sensorFilter}',sort:'year-desc'})">年份↓</span>
      </div>
    `;

    const cards = list.map(b => `
      <div class="device-card" onclick="page.go('bodyDetail',{id:'${b.id}'})">
        <div class="card-top">
          ${brandTag(b.brand)}
          <span class="type-tag">${b.sensor}</span>
        </div>
        <h3>${esc(b.model)}</h3>
        <div class="sub">${esc(b.description)}</div>
        <div class="specs">
          <span>📷 ${b.megapixels}MP</span>
          <span>🎬 ${b.video}</span>
          <span>📅 ${b.releaseYear}</span>
        </div>
        <div class="price">${priceText(b.priceRange)}</div>
      </div>
    `).join("");

    return `
      <div class="back-link" onclick="page.go('home')">← 返回首页</div>
      ${filterHTML}
      ${sensorHTML}
      ${sortHTML}
      <div class="device-grid">${cards || '<p style="color:#999;padding:40px;text-align:center">没有找到匹配的机身</p>'}</div>
    `;
  },

  // ----- 机身详情 -----
  bodyDetail() {
    const id = page.params.id;
    const b = bodies.find(x => x.id === id);
    if (!b) return '<div class="error-box">未找到该机身</div>';

    // 兼容镜头
    const compatLenses = lenses.filter(l => l.brand === b.brand && l.mount === b.mount);
    const compatCards = compatLenses.map(l => {
      const score = getComboScore(b.id, l.id);
      const sc = score && !score.error ? score.overall : 0;
      return `
        <div class="device-card" onclick="page.go('combo',{body:'${b.id}',lens:'${l.id}'})">
          <div class="card-top">
            ${brandTag(l.brand)}
            <span class="type-tag">${l.type}</span>
          </div>
          <h3>${esc(l.model)}</h3>
          <div class="sub">${l.focalRange} ${l.aperture}</div>
          <div class="specs">
            <span>⚖️ ${l.weight}g</span>
            <span>🔘 ${l.filterSize}mm</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
            <span class="price">${priceText(l.priceRange)}</span>
            <span style="font-weight:700;font-size:18px;color:${scoreColor(sc)}">${sc}</span>
          </div>
        </div>
      `;
    }).join("");

    const rows = [
      ["品牌", brandTag(b.brand)],
      ["型号", b.model],
      ["卡口", b.mount],
      ["传感器", b.sensor],
      ["有效像素", `${b.megapixels} MP`],
      ["视频规格", b.video],
      ["RAW 视频", b.videoRaw || "不支持"],
      ["图像处理器", b.processor],
      ["防抖", b.ibis ? `${b.ibisLevel} 防抖` : "无机身防抖"],
      ["快门速度", b.shutter],
      ["连拍速度", `${b.fps} 张/秒`],
      ["ISO", b.iso],
      ["重量", `${b.weight}g`],
      ["上市年份", b.releaseYear],
      ["参考价格", priceText(b.priceRange)]
    ];

    const specRows = rows.map(([label, val]) =>
      `<tr><td>${label}</td><td>${val}</td></tr>`
    ).join("");

    return `
      <div class="back-link" onclick="page.go('bodyList',{brand:'${b.brand}'})">← 返回列表</div>
      <div class="detail-header">
        <div class="title-row">
          <div>
            <h2>${esc(b.model)}</h2>
            <div class="desc">${b.description}</div>
          </div>
          <div><span class="brand-badge brand-bg-${b.brand}">${brands[b.brand].name} ${b.brandName}</span></div>
        </div>
      </div>
      <div class="specs-table">
        <table>${specRows}</table>
      </div>
      <div class="compat-section">
        <h3>推荐搭配镜头</h3>
        <div class="device-grid">${compatCards || '<p style="color:#999">暂无兼容镜头</p>'}</div>
      </div>
    `;
  },

  // ----- 镜头列表 -----
  lensList() {
    const brand = page.params.brand || "";
    let list = lenses;
    if (brand) list = list.filter(l => l.brand === brand);

    const typeFilter = page.params.type || "";
    if (typeFilter) list = list.filter(l => l.type === typeFilter);

    const sort = page.params.sort || "";
    if (sort === "price-asc") list.sort((a,b) => a.priceRange.localeCompare(b.priceRange));
    else if (sort === "price-desc") list.sort((a,b) => b.priceRange.localeCompare(a.priceRange));
    else if (sort === "weight-asc") list.sort((a,b) => a.weight - b.weight);

    let filterHTML = `<div class="filter-bar">`;
    filterHTML += `<span class="filter-btn ${!brand?'active':''}" onclick="page.go('lensList',{})">全部品牌</span>`;
    for (const [k, v] of Object.entries(brands)) {
      filterHTML += `<span class="filter-btn ${brand===k?'active':''}" onclick="page.go('lensList',{brand:'${k}'})">${v.name}</span>`;
    }
    filterHTML += `</div>`;

    let typeHTML = "";
    if (brand) {
      typeHTML = `<div class="filter-bar">`;
      typeHTML += `<span class="filter-btn ${!typeFilter?'active':''}" onclick="page.go('lensList',{brand:'${brand}'})">全部类型</span>`;
      const types = [...new Set(lenses.filter(l=>l.brand===brand).map(l=>l.type))];
      for (const t of types) {
        typeHTML += `<span class="filter-btn ${typeFilter===t?'active':''}" onclick="page.go('lensList',{brand:'${brand}',type:'${t}'})">${t}</span>`;
      }
      typeHTML += `</div>`;
    }

    const sortHTML = `
      <div class="filter-bar">
        <span class="filter-btn ${sort===''?'active':''}" onclick="page.go('lensList',{brand:'${brand}',type:'${typeFilter}'})">默认</span>
        <span class="filter-btn ${sort==='price-asc'?'active':''}" onclick="page.go('lensList',{brand:'${brand}',type:'${typeFilter}',sort:'price-asc'})">价格↑</span>
        <span class="filter-btn ${sort==='price-desc'?'active':''}" onclick="page.go('lensList',{brand:'${brand}',type:'${typeFilter}',sort:'price-desc'})">价格↓</span>
        <span class="filter-btn ${sort==='weight-asc'?'active':''}" onclick="page.go('lensList',{brand:'${brand}',type:'${typeFilter}',sort:'weight-asc'})">重量↑</span>
      </div>
    `;

    const cards = list.map(l => {
      const compatBodies = bodies.filter(b => b.brand === l.brand && b.mount === l.mount);
      return `
        <div class="device-card" onclick="page.go('lensDetail',{id:'${l.id}'})">
          <div class="card-top">
            ${brandTag(l.brand)}
            <span class="type-tag">${l.type}</span>
          </div>
          <h3>${esc(l.model)}</h3>
          <div class="sub">${l.focalRange} · ${l.aperture}</div>
          <div class="specs">
            <span>⚖️ ${l.weight}g</span>
            <span>🔘 ${l.filterSize}mm</span>
            <span>📅 ${l.releaseYear}</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
            <span class="price">${priceText(l.priceRange)}</span>
            <span style="font-size:12px;color:#999">${compatBodies.length} 款兼容机身</span>
          </div>
        </div>
      `;
    }).join("");

    return `
      <div class="back-link" onclick="page.go('home')">← 返回首页</div>
      ${filterHTML}
      ${typeHTML}
      ${sortHTML}
      <div class="device-grid">${cards || '<p style="color:#999;padding:40px;text-align:center">没有找到匹配的镜头</p>'}</div>
    `;
  },

  // ----- 镜头详情 -----
  lensDetail() {
    const id = page.params.id;
    const l = lenses.find(x => x.id === id);
    if (!l) return '<div class="error-box">未找到该镜头</div>';

    const compatBodies = bodies.filter(b => b.brand === l.brand && b.mount === l.mount);
    const compatCards = compatBodies.map(b => {
      const score = getComboScore(b.id, l.id);
      const sc = score && !score.error ? score.overall : 0;
      return `
        <div class="device-card" onclick="page.go('combo',{body:'${b.id}',lens:'${l.id}'})">
          <div class="card-top">
            ${brandTag(b.brand)}
            <span class="type-tag">${b.sensor}</span>
          </div>
          <h3>${esc(b.model)}</h3>
          <div class="sub">${b.megapixels}MP · ${b.video}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
            <span class="price">${priceText(b.priceRange)}</span>
            <span style="font-weight:700;font-size:18px;color:${scoreColor(sc)}">${sc}</span>
          </div>
        </div>
      `;
    }).join("");

    const rows = [
      ["品牌", brandTag(l.brand)],
      ["型号", l.model],
      ["卡口", l.mount],
      ["类型", l.type],
      ["焦距/焦段", l.focalRange],
      ["最大光圈", l.aperture],
      ["最小光圈", l.minAperture],
      ["镜头结构", `${l.elements}`],
      ["滤镜口径", `${l.filterSize}mm`],
      ["重量", `${l.weight}g`],
      ["防抖", l.isIS ? "支持" : "不支持"],
      ["上市年份", l.releaseYear],
      ["参考价格", priceText(l.priceRange)],
      ["描述", l.description]
    ];

    const specRows = rows.map(([label, val]) =>
      `<tr><td>${label}</td><td>${val}</td></tr>`
    ).join("");

    return `
      <div class="back-link" onclick="page.go('lensList',{brand:'${l.brand}'})">← 返回列表</div>
      <div class="detail-header">
        <div class="title-row">
          <div>
            <h2>${esc(l.model)}</h2>
            <div class="desc">${l.focalRange} · ${l.aperture} · ${l.description}</div>
          </div>
          <div><span class="brand-badge brand-bg-${l.brand}">${brands[l.brand].name}</span></div>
        </div>
      </div>
      <div class="specs-table">
        <table>${specRows}</table>
      </div>
      <div class="compat-section">
        <h3>推荐搭配机身</h3>
        <div class="device-grid">${compatCards || '<p style="color:#999">暂无兼容机身</p>'}</div>
      </div>
    `;
  },

  // ----- 组合评分 -----
  combo() {
    const bodyId = page.params.body || "";
    const lensId = page.params.lens || "";

    // 选择器
    const allBrands = Object.entries(brands);
    const brandOptions = allBrands.map(([k, v]) => `<option value="${k}">${v.name}</option>`).join("");

    const selBody = bodies.find(b => b.id === bodyId);
    const selLens = lenses.find(l => l.id === lensId);

    // 品牌预选
    const defaultBrand = selBody ? selBody.brand : (selLens ? selLens.brand : "canon");
    const bodiesForBrand = bodies.filter(b => b.brand === defaultBrand);
    const lensesForBrand = lenses.filter(l => l.brand === defaultBrand);

    const bodyOpts = bodiesForBrand.map(b =>
      `<option value="${b.id}" ${b.id===bodyId?'selected':''}>${b.model}</option>`
    ).join("");
    const lensOpts = lensesForBrand.map(l =>
      `<option value="${l.id}" ${l.id===lensId?'selected':''}>${l.model}</option>`
    ).join("");

    let resultHTML = "";
    if (selBody && selLens) {
      const score = getComboScore(bodyId, lensId);
      if (score && !score.error) {
        const breakdown = [
          ["画质匹配度", score.resolutionMatch],
          ["视频性能匹配", score.videoMatch],
          ["便携性", score.portability],
          ["性价比", score.value],
          ["专业匹配度", score.professional]
        ];
        const barRows = breakdown.map(([label, val]) => `
          <div class="score-row">
            <span class="label">${label}</span>
            <div class="bar-track"><div class="bar-fill" style="width:${val}%;background:${scoreColor(val)}"></div></div>
            <span class="value">${val}</span>
          </div>
        `).join("");
        resultHTML = `
          <div class="score-card">
            <div class="score-big">
              <div class="number" style="color:${scoreColor(score.overall)}">${score.overall}</div>
              <div class="label">系统综合评分 · ${scoreText(score.overall)}</div>
            </div>
          </div>
          <div class="score-card">
            <h3 style="margin-bottom:16px;font-size:16px;font-weight:600">评分详情</h3>
            <div class="score-breakdown">${barRows}</div>
          </div>
          <div class="score-card">
            <h3 style="margin-bottom:12px;font-size:16px;font-weight:600">组合信息</h3>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
              <div>
                <div style="font-size:12px;color:#999;margin-bottom:4px">机身</div>
                <div style="font-weight:600">${esc(selBody.model)}</div>
                <div style="font-size:13px;color:#666">${brands[selBody.brand].name} · ${selBody.sensor} · ${selBody.megapixels}MP</div>
                <div style="font-size:13px;color:#666">${priceText(selBody.priceRange)} · ${selBody.weight}g</div>
              </div>
              <div>
                <div style="font-size:12px;color:#999;margin-bottom:4px">镜头</div>
                <div style="font-weight:600">${esc(selLens.model)}</div>
                <div style="font-size:13px;color:#666">${brands[selLens.brand].name} · ${selLens.focalRange} · ${selLens.aperture}</div>
                <div style="font-size:13px;color:#666">${priceText(selLens.priceRange)} · ${selLens.weight}g</div>
              </div>
            </div>
            <div style="margin-top:12px;font-size:13px;color:#999;border-top:1px solid var(--border);padding-top:12px">
              总重: ${selBody.weight + selLens.weight}g · 总价: ${priceText(String(parseInt(selBody.priceRange.split("-")[0]) + parseInt(selLens.priceRange.split("-")[0])))} 起
            </div>
          </div>
        `;
      } else {
        resultHTML = `<div class="error-box">${score?.error || "无法计算评分"}</div>`;
      }
    }

    return `
      <div class="back-link" onclick="page.go('home')">← 返回首页</div>
      <div class="score-card">
        <h3 style="margin-bottom:16px;font-size:16px;font-weight:600">选择组合评分</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
          <div>
            <label style="font-size:13px;color:#999;display:block;margin-bottom:4px">选择品牌</label>
            <select id="combo-brand" onchange="render.changeComboBrand()" style="width:100%;padding:10px;border-radius:8px;border:1px solid var(--border);font-size:14px">
              ${brandOptions}
            </select>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div>
            <label style="font-size:13px;color:#999;display:block;margin-bottom:4px">机身</label>
            <select id="combo-body" onchange="render.changeComboBody()" style="width:100%;padding:10px;border-radius:8px;border:1px solid var(--border);font-size:14px">
              <option value="">请选择机身</option>
              ${bodyOpts}
            </select>
          </div>
          <div>
            <label style="font-size:13px;color:#999;display:block;margin-bottom:4px">镜头</label>
            <select id="combo-lens" onchange="render.changeComboLens()" style="width:100%;padding:10px;border-radius:8px;border:1px solid var(--border);font-size:14px">
              <option value="">请选择镜头</option>
              ${lensOpts}
            </select>
          </div>
        </div>
      </div>
      ${resultHTML}
    `;
  },

  // ----- 搜索页 -----
  search() {
    const q = (page.params.q || "").toLowerCase().trim();

    const searchInput = `
      <div class="search-box">
        <span class="icon">🔍</span>
        <input type="text" id="search-input" placeholder="搜索机身或镜头型号、品牌..." value="${esc(q)}"
          onkeydown="if(event.key==='Enter'){const v=this.value.trim();if(v)page.go('search',{q:v})}">
      </div>
      <div style="margin-bottom:16px">
        <span class="filter-btn" onclick="page.go('search',{q})">开始搜索</span>
      </div>
    `;

    if (!q) {
      return `
        ${searchInput}
        <div style="text-align:center;padding:60px 0;color:#999">
          <div style="font-size:48px;margin-bottom:12px">🔍</div>
          <div>输入机身型号或镜头名称搜索</div>
        </div>
      `;
    }

    const matchedBodies = bodies.filter(b =>
      b.model.toLowerCase().includes(q) ||
      b.brandName.includes(q) ||
      brands[b.brand]?.name.includes(q) ||
      b.description.includes(q)
    );
    const matchedLenses = lenses.filter(l =>
      l.model.toLowerCase().includes(q) ||
      l.brandName.includes(q) ||
      brands[l.brand]?.name.includes(q) ||
      l.focalRange.includes(q)
    );

    let resultsHTML = "";
    if (matchedBodies.length) {
      resultsHTML += `<div class="search-result-group"><h3>机身 (${matchedBodies.length})</h3><div class="device-grid">`;
      resultsHTML += matchedBodies.map(b => `
        <div class="device-card" onclick="page.go('bodyDetail',{id:'${b.id}'})">
          <div class="card-top">${brandTag(b.brand)}<span class="type-tag">${b.sensor}</span></div>
          <h3>${esc(b.model)}</h3>
          <div class="sub">${b.megapixels}MP · ${b.video}</div>
          <div class="price">${priceText(b.priceRange)}</div>
        </div>
      `).join("");
      resultsHTML += `</div></div>`;
    }
    if (matchedLenses.length) {
      resultsHTML += `<div class="search-result-group"><h3>镜头 (${matchedLenses.length})</h3><div class="device-grid">`;
      resultsHTML += matchedLenses.map(l => `
        <div class="device-card" onclick="page.go('lensDetail',{id:'${l.id}'})">
          <div class="card-top">${brandTag(l.brand)}<span class="type-tag">${l.type}</span></div>
          <h3>${esc(l.model)}</h3>
          <div class="sub">${l.focalRange} · ${l.aperture}</div>
          <div class="price">${priceText(l.priceRange)}</div>
        </div>
      `).join("");
      resultsHTML += `</div></div>`;
    }

    if (!resultsHTML) {
      resultsHTML = `<div style="text-align:center;padding:40px;color:#999">没有找到匹配结果 " ${esc(q)} "</div>`;
    }

    return `${searchInput}${resultsHTML}`;
  }
};

// 组合选择器变更处理
render.changeComboBrand = function() {
  const brand = document.getElementById("combo-brand").value;
  const bodySel = document.getElementById("combo-body");
  const lensSel = document.getElementById("combo-lens");
  const bodiesForBrand = bodies.filter(b => b.brand === brand);
  const lensesForBrand = lenses.filter(l => l.brand === brand);
  bodySel.innerHTML = `<option value="">请选择机身</option>` + bodiesForBrand.map(b => `<option value="${b.id}">${b.model}</option>`).join("");
  lensSel.innerHTML = `<option value="">请选择镜头</option>` + lensesForBrand.map(l => `<option value="${l.id}">${l.model}</option>`).join("");
};

render.changeComboBody = function() {
  const bodyId = document.getElementById("combo-body").value;
  const lensId = document.getElementById("combo-lens").value;
  if (bodyId && lensId) {
    page.go("combo", { body: bodyId, lens: lensId });
  }
};

render.changeComboLens = function() {
  const bodyId = document.getElementById("combo-body").value;
  const lensId = document.getElementById("combo-lens").value;
  if (bodyId && lensId) {
    page.go("combo", { body: bodyId, lens: lensId });
  }
};

// ---------- 页面渲染入口 ----------
page.render = function() {
  const app = document.getElementById("app");
  const content = render[this.current] ? render[this.current]() : render.home();
  app.innerHTML = content;

  // 更新导航高亮
  $$(".nav a").forEach(a => {
    a.classList.toggle("active", a.dataset.page === this.current);
  });

  // 搜索结果自动聚焦 + 自动触发
  const searchInput = document.getElementById("search-input");
  if (searchInput && !this.params.q) {
    setTimeout(() => searchInput.focus(), 100);
  }
};

// ---------- 启动 ----------
document.addEventListener("DOMContentLoaded", () => page.init());

// Expose to global scope for onclick handlers
window.page = page;
window.render = render;
