// ============================================================
// 影视设备打分 - 主应用
// ============================================================

// ---- 初始化标签 ----
for (const b of bodies) {
  const t = assignBodyTags(b);
  if (!b.featureTags?.length) b.featureTags = t.featureTags;
  if (!b.sceneTags?.length) b.sceneTags = t.sceneTags;
}
for (const l of lenses) {
  const t = assignLensTags(l);
  if (!l.featureTags?.length) l.featureTags = t.featureTags;
  if (!l.sceneTags?.length) l.sceneTags = t.sceneTags;
}

// ---- 路由 ----
const page = {
  current: "home", params: {},
  init() { window.addEventListener("hashchange",()=>this.navigate()); this.navigate(); },
  navigate(hash) {
    if (hash !== undefined) { window.location.hash = hash; return; }
    const raw = window.location.hash.slice(1) || "home";
    const [path, qs] = raw.split("?");
    this.params = {};
    if (qs) for (const p of qs.split("&")) { const [k,v]=p.split("="); if(k) this.params[decodeURIComponent(k)]=decodeURIComponent(v||""); }
    this.current = path; this.render();
  },
  go(path, extras = {}) {
    const p = new URLSearchParams();
    for (const [k,v] of Object.entries(extras)) if (v !== undefined && v !== null && v !== "") p.set(k, v);
    const qs = p.toString();
    this.navigate(path + (qs ? "?" + qs : ""));
  }
};
// ---- 辅助 ----
function $(s) { return document.querySelector(s); }
function $$(s) { return document.querySelectorAll(s); }

function esc(s) { const d=document.createElement("div"); d.textContent=s; return d.innerHTML; }
function priceText(p, useUsed=false) {
  if (!p) return "价格待询";
  const pr = useUsed ? (p.usedPrice||p.launchPrice) : (p.launchPrice||p.usedPrice);
  if (!pr) return "价格待询";
  return `¥${formatNum(pr.low)}-${formatNum(pr.high)}`;
}
function formatNum(n) { return n>=10000 ? (n/10000).toFixed(n%10000?1:0)+"万" : (n|0).toString(); }
function brandTag(b) { return `<span class="bt brand-bg-${b}">${brands[b]?.name||b}</span>`; }
function brandBadge(b) { return `<span class="badge brand-bg-${b}">${brands[b]?.name||b}</span>`; }
function brandIcon(b) { return brandLogoSvg(b); }
function scoreColor(s) { return s>=85?"#22C55E":s>=70?"#8BC34A":s>=55?"#FF9800":"#EF4444"; }
function scoreText(s) { return s>=85?"优秀":s>=70?"良好":s>=55?"一般":"不推荐"; }

function tagChips(tags, type) {
  if (!tags?.length) return "";
  return `<div class="tag-chips">` + tags.map(t => {
    const label = type==="scene" ? (sceneLabels[t]||t) : (featureLabels[t]||t);
    return `<span class="tag-chip ${type}">${label}</span>`;
  }).join("") + `</div>`;
}

function specRows(fields) {
  return fields.map(([l,v])=>`<tr><td>${l}</td><td>${v||"-"}</td></tr>`).join("");
}
// ---- 推荐状态 ----
let recState = {
  step: 1, budgetLow: 5000, budgetHigh: 30000, photoPct: 50,
  sceneTypes: [], sensorPrefer: "", brandPrefer: [], useUsed: false,
  existingBodyId: "", existingLensId: "", results: []
};

let recStateInit = false;
// ---- 页面渲染 ----
const render = {
  home() {
    const brandCards = Object.entries(brands).map(([k,v]) => {
      const bc = bodies.filter(b=>b.brand===k).length;
      const lc = lenses.filter(l=>l.brand===k).length;
      return `<div class="brand-card" onclick="page.go('bodyList',{brand:'${k}'})" style="border-bottom-color:transparent">
        ${brandIcon(k)}<h3>${v.name}</h3><div class="count">${bc} 款机身 · ${lc} 款镜头</div></div>`;
    }).join("");

    let combos = [];
    for (const body of bodies) {
      const cl = lenses.filter(l=>l.brand===body.brand&&l.mount===body.mount).slice(0,2);
      for (const lens of cl) {
        const sc = calculateScore(body, lens);
        if (sc) combos.push({body,lens,score:sc});
      }
    }
    combos.sort((a,b)=>b.score.overall-a.score.overall);
    const top = combos.slice(0,6);

    const cc = top.map(({body,lens,score}) => `
      <div class="combo-card" onclick="page.go('combo',{body:'${body.id}',lens:'${lens.id}'})">
        <div class="hdr"><span class="bn brand-bg-${body.brand}">${brands[body.brand].name}</span>
        <span class="sc" style="color:${scoreColor(score.overall)}">${score.overall}</span></div>
        <div class="combo-item"><span class="role">机身</span><span class="nm">${esc(body.model)}</span></div>
        <div class="combo-item"><span class="role">镜头</span><span class="nm">${esc(lens.model)}</span></div>
        <div class="score-track"><div class="fill" style="width:${score.overall}%"></div></div>
      </div>
    `).join("");

    return `<div style="text-align:center;margin-bottom:28px">
      <div style="font-size:32px;font-weight:800;margin-bottom:8px">影视设备打分</div>
      <div style="color:var(--text-secondary);margin-bottom:16px">机身 · 镜头 · 组合评分 · 智能推荐</div>
      <button class="btn btn-primary" onclick="page.go('recommend',{})" style="padding:14px 40px;font-size:16px">🎯 开始推荐</button>
    </div>
    <h2 class="section-title">选择品牌</h2><div class="brand-grid">${brandCards}</div>
    <h2 class="section-title">🔥 热门评分组合</h2><div class="combo-grid">${cc||'<p style="color:#999">暂无数据</p>'}</div>`;
  },

  bodyList() {
    const brand = page.params.brand||"";
    let list = brand ? bodies.filter(b=>b.brand===brand) : [...bodies];
    const sensor = page.params.sensor||"";
    if (sensor) list = list.filter(b=>b.sensor===sensor);
    const sort = page.params.sort||"";
    if (sort==="price-asc") list.sort((a,b)=>(a.launchPrice?.low||0)-(b.launchPrice?.low||0));
    else if (sort==="price-desc") list.sort((a,b)=>(b.launchPrice?.low||0)-(a.launchPrice?.low||0));
    else if (sort==="mp-desc") list.sort((a,b)=>b.megapixels-a.megapixels);
    else if (sort==="year-desc") list.sort((a,b)=>b.releaseYear-a.releaseYear);

    const fb = (l,act,oc) => `<span class="filter-btn ${act?'active':''}" onclick="${esc(oc)}">${l}</span>`;
    let fhtml = `<div class="filter-bar">${fb("全部",!brand,"page.go('bodyList',{})")}`;
    for (const [k,v] of Object.entries(brands)) fhtml += fb(v.name,brand===k,`page.go('bodyList',{brand:'${k}'})`);
    fhtml += `</div>`;

    let sensors = brand ? [...new Set(bodies.filter(b=>b.brand===brand).map(b=>b.sensor))] : [];
    let sh = "";
    if (sensors.length) {
      sh = `<div class="filter-bar">${fb("全部画幅",!sensor,`page.go('bodyList',{brand:'${brand}'})`)}`;
      for (const s of sensors) sh += fb(s,sensor===s,`page.go('bodyList',{brand:'${brand}',sensor:'${s}'})`);
      sh += `</div>`;
    }

    const sh2 = `<div class="filter-bar">
      ${fb("默认",!sort,`page.go('bodyList',{brand:'${brand}',sensor:'${sensor}'})`)}
      ${fb("价格↑",sort==="price-asc",`page.go('bodyList',{brand:'${brand}',sensor:'${sensor}',sort:'price-asc'})`)}
      ${fb("价格↓",sort==="price-desc",`page.go('bodyList',{brand:'${brand}',sensor:'${sensor}',sort:'price-desc'})`)}
      ${fb("像素↓",sort==="mp-desc",`page.go('bodyList',{brand:'${brand}',sensor:'${sensor}',sort:'mp-desc'})`)}
      ${fb("年份↓",sort==="year-desc",`page.go('bodyList',{brand:'${brand}',sensor:'${sensor}',sort:'year-desc'})`)}
    </div>`;

    const cards = list.map(b => `
      <div class="device-card" onclick="page.go('bodyDetail',{id:'${b.id}'})">
        <div class="top">${brandTag(b.brand)}<span class="tt">${b.sensor}</span></div>
        <h3>${esc(b.model)}</h3><div class="sub">${b.megapixels}MP · ${(b.video||"").split("/")[0]?.trim()||""}</div>
        <div class="sp"><span>📅 ${b.releaseYear}</span><span>⚖️ ${b.weight}g</span></div>
        <div class="pr">${priceText(b)}</div>
        ${tagChips(b.featureTags?.slice(0,4),"feature")}
      </div>
    `).join("");

    return `<div class="back-link" onclick="page.go('home')">← 返回首页</div>${fhtml}${sh}${sh2}
      <div class="device-grid">${cards||'<p style="padding:40px;text-align:center;color:#999">暂无</p>'}</div>`;
  },
  bodyDetail() {
    const b = bodies.find(x=>x.id===page.params.id);
    if (!b) return `<div class="back-link" onclick="page.go('home')">← 返回</div><div class="error-box">未找到该机身</div>`;
    const cl = lenses.filter(l=>l.brand===b.brand&&l.mount===b.mount);
    const cc = cl.map(l => {
      const sc = getComboScore(b.id, l.id);
      const sv = sc&&!sc.error?sc.overall:0;
      return `<div class="device-card" onclick="page.go('combo',{body:'${b.id}',lens:'${l.id}'})">
        <div class="top">${brandTag(l.brand)}<span class="tt">${l.type}</span></div>
        <h3>${esc(l.model)}</h3><div class="sub">${l.focalRange} ${l.aperture}</div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
          <span style="font-size:14px;font-weight:600">${priceText(l)}</span>
          <span style="font-weight:700;font-size:18px;color:${scoreColor(sv)}">${sv}</span>
        </div>
      </div>`;
    }).join("");
    const ibs = b.ibis ? `${b.ibisLevel} 防抖` : "无机身防抖";
    const rows = [["品牌",brandTag(b.brand)],["型号",b.model],["卡口",b.mount],["传感器",b.sensor],
      ["有效像素",`${b.megapixels} MP`],["视频规格",b.video],["RAW 视频",b.videoRaw||"不支持"],
      ["处理器",b.processor],["防抖",ibs],["快门速度",b.shutter],["连拍",`${b.fps} 张/秒`],
      ["ISO",b.iso],["重量",`${b.weight}g`],["发布价",priceText(b)],["二手价",priceText(b,true)],
      ["上市",b.releaseYear],["描述",b.description]];
    return `<div class="back-link" onclick="page.go('bodyList',{brand:'${b.brand}'})">← 返回列表</div>
      <div class="detail-header"><div class="tr"><div><h2>${esc(b.model)}</h2>
        <div class="desc">${b.description}</div>${tagChips(b.featureTags,"feature")}${tagChips(b.sceneTags,"scene")}
      </div>${brandBadge(b.brand)}</div></div>
      <div class="specs-table"><table>${specRows(rows)}</table></div>
      <div class="compat-section"><h3>推荐搭配镜头</h3><div class="device-grid">${cc||'<p style="color:#999">暂无</p>'}</div></div>`;
  },

  lensList() {
    const brand = page.params.brand||"";
    let list = brand ? lenses.filter(l=>l.brand===brand) : [...lenses];
    const type = page.params.type||"";
    if (type) list = list.filter(l=>l.type===type);
    const sort = page.params.sort||"";
    if (sort==="price-asc") list.sort((a,b)=>(a.launchPrice?.low||0)-(b.launchPrice?.low||0));
    else if (sort==="price-desc") list.sort((a,b)=>(b.launchPrice?.low||0)-(a.launchPrice?.low||0));
    else if (sort==="weight-asc") list.sort((a,b)=>a.weight-b.weight);
    else list.sort((a,b)=>parseFloat((a.maxAperture||"2.8").replace("F",""))-parseFloat((b.maxAperture||"2.8").replace("F","")));

    const fb = (l,act,oc) => `<span class="filter-btn ${act?'active':''}" onclick="${esc(oc)}">${l}</span>`;
    let fhtml = `<div class="filter-bar">${fb("全部",!brand,"page.go('lensList',{})")}`;
    for (const [k,v] of Object.entries(brands)) fhtml += fb(v.name,brand===k,`page.go('lensList',{brand:'${k}'})`);
    fhtml += `</div>`;

    let th = "";
    if (brand) {
      const types = [...new Set(lenses.filter(l=>l.brand===brand).map(l=>l.type))];
      th = `<div class="filter-bar">${fb("全部类型",!type,`page.go('lensList',{brand:'${brand}'})`)}`;
      for (const t of types) th += fb(t,type===t,`page.go('lensList',{brand:'${brand}',type:'${t}'})`);
      th += `</div>`;
    }

    const sh = `<div class="filter-bar">
      ${fb("默认",!sort,`page.go('lensList',{brand:'${brand}',type:'${type}'})`)}
      ${fb("价格↑",sort==="price-asc",`page.go('lensList',{brand:'${brand}',type:'${type}',sort:'price-asc'})`)}
      ${fb("价格↓",sort==="price-desc",`page.go('lensList',{brand:'${brand}',type:'${type}',sort:'price-desc'})`)}
      ${fb("光圈",sort==="aperture",`page.go('lensList',{brand:'${brand}',type:'${type}',sort:'aperture'})`)}
      ${fb("重量↑",sort==="weight-asc",`page.go('lensList',{brand:'${brand}',type:'${type}',sort:'weight-asc'})`)}
    </div>`;

    const cards = list.map(l => `
      <div class="device-card" onclick="page.go('lensDetail',{id:'${l.id}'})">
        <div class="top">${brandTag(l.brand)}<span class="tt">${l.type}</span></div>
        <h3>${esc(l.model)}</h3><div class="sub">${l.focalRange} · ${l.aperture}</div>
        <div class="sp"><span>⚖️ ${l.weight}g</span><span>🔘 ${l.filterSize}mm</span><span>📅 ${l.releaseYear}</span></div>
        <div class="pr">${priceText(l)}</div>
        ${tagChips(l.featureTags?.slice(0,4),"feature")}
      </div>
    `).join("");
    return `<div class="back-link" onclick="page.go('home')">← 返回首页</div>${fhtml}${th}${sh}<div class="device-grid">${cards||'<p style="padding:40px;text-align:center;color:#999">暂无</p>'}</div>`;
  },

  lensDetail() {
    const l = lenses.find(x=>x.id===page.params.id);
    if (!l) return `<div class="back-link" onclick="page.go('home')">← 返回</div><div class="error-box">未找到该镜头</div>`;
    const cb = bodies.filter(b=>b.brand===l.brand&&b.mount===l.mount);
    const cc = cb.map(b=>{
      const sc = getComboScore(b.id, l.id);
      const sv = sc&&!sc.error?sc.overall:0;
      return `<div class="device-card" onclick="page.go('combo',{body:'${b.id}',lens:'${l.id}'})">
        <div class="top">${brandTag(b.brand)}<span class="tt">${b.sensor}</span></div>
        <h3>${esc(b.model)}</h3><div class="sub">${b.megapixels}MP · ${(b.video||"").split("/")[0]?.trim()||""}</div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
          <span style="font-size:14px;font-weight:600">${priceText(b)}</span>
          <span style="font-weight:700;font-size:18px;color:${scoreColor(sv)}">${sv}</span>
        </div></div>`;
    }).join("");
    const rows = [["品牌",brandTag(l.brand)],["型号",l.model],["卡口",l.mount],["类型",l.type],
      ["焦距",l.focalRange],["最大光圈",l.aperture],["最小光圈",l.minAperture],
      ["结构",l.elements],["滤镜口径",`${l.filterSize}mm`],["重量",`${l.weight}g`],
      ["防抖",l.isIS?"支持":"不支持"],["发布价",priceText(l)],["二手价",priceText(l,true)],
      ["上市",l.releaseYear],["描述",l.description]];
    return `<div class="back-link" onclick="page.go('lensList',{brand:'${l.brand}'})">← 返回列表</div>
      <div class="detail-header"><div class="tr"><div><h2>${esc(l.model)}</h2>
        <div class="desc">${l.focalRange} · ${l.aperture} · ${l.description}</div>
        ${tagChips(l.featureTags,"feature")}${tagChips(l.sceneTags,"scene")}
      </div>${brandBadge(l.brand)}</div></div>
      <div class="specs-table"><table>${specRows(rows)}</table></div>
      <div class="compat-section"><h3>推荐搭配机身</h3><div class="device-grid">${cc||'<p style="color:#999">暂无</p>'}</div></div>`;
  },
  combo() {
    const bodyId = page.params.body||"";
    const lensId = page.params.lens||"";
    const selBody = bodies.find(b=>b.id===bodyId);
    const selLens = lenses.find(l=>l.id===lensId);
    const defBrand = selBody?.brand||selLens?.brand||"canon";

    const bo = bodies.filter(b=>b.brand===defBrand).map(b=>`<option value="${b.id}" ${b.id===bodyId?"selected":""}>${b.model}</option>`).join("");
    const lo = lenses.filter(l=>l.brand===defBrand).map(l=>`<option value="${l.id}" ${l.id===lensId?"selected":""}>${l.model}</option>`).join("");
    const brandOps = Object.entries(brands).map(([k,v])=>`<option value="${k}" ${k===defBrand?"selected":""}>${v.name}</option>`).join("");

    let result = "";
    if (selBody && selLens) {
      const sc = getComboScore(bodyId, lensId);
      if (sc && !sc.error) {
        const dims = [["画质匹配度",sc.resolutionMatch],["视频性能匹配",sc.videoMatch],
          ["便携性",sc.portability],["性价比",sc.value],["专业匹配度",sc.professional]];
        const bars = dims.map(([lb,val])=>`<div class="score-row"><span class="label">${lb}</span>
          <div class="bar-track"><div class="bar-fill" style="width:${val}%;background:${scoreColor(val)}"></div></div>
          <span class="value">${val}</span></div>`).join("");
        const p = {low:(selBody.launchPrice?.low||0)+(selLens.launchPrice?.low||0)};
        const up = {low:(selBody.usedPrice?.low||0)+(selLens.usedPrice?.low||0)};
        result = `
          <div class="score-card"><div class="score-big">
            <div class="num" style="color:${scoreColor(sc.overall)}">${sc.overall}</div>
            <div class="lb">系统综合评分 · ${scoreText(sc.overall)}</div></div></div>
          <div class="score-card"><h3 style="margin-bottom:16px;font-size:16px;font-weight:600">评分详情</h3>
            <div class="score-breakdown">${bars}</div></div>
          <div class="score-card">
            <h3 style="margin-bottom:12px;font-size:16px;font-weight:600">组合信息</h3>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
              <div><div style="font-size:12px;color:#999;margin-bottom:4px">机身 ${brands[selBody.brand]?.name||""}</div>
                <div style="font-weight:600">${esc(selBody.model)}</div>
                <div style="font-size:13px;color:#666">${selBody.sensor} · ${selBody.megapixels}MP · ${selBody.weight}g</div></div>
              <div><div style="font-size:12px;color:#999;margin-bottom:4px">镜头</div>
                <div style="font-weight:600">${esc(selLens.model)}</div>
                <div style="font-size:13px;color:#666">${selLens.mount} · ${selLens.focalRange} · ${selLens.weight}g</div></div>
            </div>
            <div style="margin-top:12px;font-size:13px;color:#999;border-top:1px solid var(--border);padding-top:12px">
              总重: ${selBody.weight+selLens.weight}g ·
              全新 ¥${formatNum(p.low)} 起 / 二手 ¥${formatNum(up.low)} 起
            </div>
            ${tagChips([...new Set([...(selBody.featureTags||[]),...(selLens.featureTags||[])])],"feature")}
          </div>`;
      } else {
        result = `<div class="error-box">${sc?.error||"无法计算评分"}</div>`;
      }
    }

    return `<div class="back-link" onclick="page.go('home')">← 返回首页</div>
      <div class="score-card">
        <h3 style="margin-bottom:16px;font-size:16px;font-weight:600">选择组合评分</h3>
        <div style="margin-bottom:12px"><label style="font-size:13px;color:#999;display:block;margin-bottom:4px">品牌</label>
          <select id="cb-brand" onchange="cbChange()" style="width:100%;padding:10px;border-radius:8px;border:1px solid var(--border);font-size:14px">${brandOps}</select></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div><label style="font-size:13px;color:#999;display:block;margin-bottom:4px">机身</label>
            <select id="cb-body" onchange="cbSel()" style="width:100%;padding:10px;border-radius:8px;border:1px solid var(--border);font-size:14px"><option value="">请选择</option>${bo}</select></div>
          <div><label style="font-size:13px;color:#999;display:block;margin-bottom:4px">镜头</label>
            <select id="cb-lens" onchange="cbSel()" style="width:100%;padding:10px;border-radius:8px;border:1px solid var(--border);font-size:14px"><option value="">请选择</option>${lo}</select></div>
        </div>
      </div>
      ${result}`;
  },

  search() {
    const q = (page.params.q||"").toLowerCase().trim();
    const si = `<div class="search-box"><span class="sicon">🔍</span>
      <input type="text" id="s-inp" placeholder="搜索机身或镜头型号..." value="${esc(q)}"
        onkeydown="if(event.key==='Enter'){const v=this.value.trim();if(v)page.go('search',{q:v})}"></div>`;
    if (!q) return `${si}<div style="text-align:center;padding:60px 0;color:#999"><div style="font-size:48px;margin-bottom:12px">🔍</div><div>输入机身型号或镜头名称搜索</div></div>`;

    const mb = bodies.filter(b=>b.model.toLowerCase().includes(q)||b.brandName.includes(q)||brands[b.brand]?.name.includes(q)||b.description?.includes(q));
    const ml = lenses.filter(l=>l.model.toLowerCase().includes(q)||l.brandName.includes(q)||brands[l.brand]?.name.includes(q)||l.focalRange?.includes(q));
    let rh = "";
    if (mb.length) {
      rh += `<div class="srch-group"><h3>机身 (${mb.length})</h3><div class="device-grid">`;
      rh += mb.map(b=>`<div class="device-card" onclick="page.go('bodyDetail',{id:'${b.id}'})">
        <div class="top">${brandTag(b.brand)}<span class="tt">${b.sensor}</span></div>
        <h3>${esc(b.model)}</h3><div class="pr">${priceText(b)}</div></div>`).join("");
      rh += `</div></div>`;
    }
    if (ml.length) {
      rh += `<div class="srch-group"><h3>镜头 (${ml.length})</h3><div class="device-grid">`;
      rh += ml.map(l=>`<div class="device-card" onclick="page.go('lensDetail',{id:'${l.id}'})">
        <div class="top">${brandTag(l.brand)}<span class="tt">${l.type}</span></div>
        <h3>${esc(l.model)}</h3><div class="pr">${priceText(l)}</div></div>`).join("");
      rh += `</div></div>`;
    }
    if (!rh) rh = `<div style="text-align:center;padding:40px;color:#999">没有找到"${esc(q)}"的结果</div>`;
    return `${si}${rh}`;
  }
};
// ---- 推荐向导 ----
render.recommend = function() {
  if (!recStateInit) {
    recState = { step:1, budgetLow:5000, budgetHigh:30000, photoPct:50,
      sceneTypes:[], sensorPrefer:"", brandPrefer:[], useUsed:false,
      existingBodyId:"", existingLensId:"", results:[] };
    recStateInit = true;
  }
  return render._recWizard();
};

render._recWizard = function() {
  const s = recState;
  const steps = [1,2,3,4,5].map(i => `<span class="step-dot ${i<s.step?"done":i===s.step?"active":""}">${i}</span>`).join("");

  const step1 = `<div class="step-panel ${s.step===1?"active":""}">
    <div class="step-label">步骤 1/5</div><div class="step-title">设定预算范围</div>
    <div class="budget-display"><div class="label">预算范围</div>
      <div class="num">¥${formatNum(s.budgetLow)} — ¥${formatNum(s.budgetHigh)}</div></div>
    <div class="range-row">
      <div class="vals"><span>¥1,000</span><span>¥100,000</span></div>
      <label style="font-size:13px;color:var(--text-secondary)">最低预算</label>
      <input type="range" min="1000" max="100000" step="500" value="${s.budgetLow}" oninput="recUIUpdate('budgetLow',this.value)">
      <label style="font-size:13px;color:var(--text-secondary);margin-top:8px">最高预算</label>
      <input type="range" min="1000" max="100000" step="500" value="${s.budgetHigh}" oninput="recUIUpdate('budgetHigh',this.value)"></div>
    <div class="toggle-row">
      <label class="toggle"><input type="checkbox" ${s.useUsed?"checked":""} onchange="recUIUpdate('useUsed',this.checked?1:0)">
      <span class="sl"></span></label>
      <span class="toggle-label">${s.useUsed?"查看二手价格":"查看全新价格"}</span></div>
    <div class="wizard-btns"><span></span><button class="btn btn-primary" onclick="recUI('next')">下一步 →</button></div></div>`;

  const step2 = `<div class="step-panel ${s.step===2?"active":""}">
    <div class="step-label">步骤 2/5</div><div class="step-title">照片 / 视频 比例</div>
    <div class="pct-grid">
      <div class="pct-box"><div class="lb">📷 拍照</div><div class="val" style="color:#3B82F6">${s.photoPct}%</div></div>
      <div class="pct-box"><div class="lb">🎬 视频</div><div class="val" style="color:#EF4444">${100-s.photoPct}%</div></div></div>
    <div class="pct-bar"><div class="photo" style="width:${s.photoPct}%"></div><div class="video" style="width:${100-s.photoPct}%"></div></div>
    <input type="range" min="0" max="100" step="5" value="${s.photoPct}" style="width:100%;accent-color:var(--text)"
      oninput="recUIUpdate('photoPct',this.value)">
    <div style="margin-top:8px;font-size:13px;color:var(--text-secondary);text-align:center">
      ${s.photoPct>=70?"📷 偏重照片":100-s.photoPct>=70?"🎬 偏重视频":"⚖️ 均衡使用"}</div>
    <div class="wizard-btns"><button class="btn btn-secondary" onclick="recUI('prev')">← 上一步</button>
      <button class="btn btn-primary" onclick="recUI('next')">下一步 →</button></div></div>`;

  const scenes = Object.entries(sceneLabels).map(([k,v]) =>
    `<span class="scene-tag ${s.sceneTypes.includes(k)?"selected":""}" onclick="recUI('scene','${k}')">${sceneIcons[k]||""} ${v}</span>`
  ).join("");
  const step3 = `<div class="step-panel ${s.step===3?"active":""}">
    <div class="step-label">步骤 3/5 · 可多选（1-3 项）</div><div class="step-title">主要拍摄类型</div>
    <div class="scene-grid">${scenes}</div>
    <div class="wizard-btns"><button class="btn btn-secondary" onclick="recUI('prev')">← 上一步</button>
      <button class="btn btn-primary" onclick="recUI('next')">下一步 →</button></div></div>`;

  const sensors = ["","全画幅","APS-C","MFT","中画幅"];
  const sBtns = sensors.map(s => `<span class="pref-chip ${recState.sensorPrefer===s?"selected":""}" onclick="recUI('sensor','${s}')">${s||"不限"}</span>`).join("");
  const brandBtns = `<span class="pref-chip ${!s.brandPrefer.length?"selected":""}" onclick="recUI('brand','')">不限</span>` +
    Object.entries(brands).map(([k,v]) => `<span class="pref-chip ${s.brandPrefer.includes(k)?"selected":""}" onclick="recUI('brand','${k}')">${v.name}</span>`).join("");
  const ebOps = `<option value="">无</option>` + bodies.map(b=>`<option value="${b.id}">${brands[b.brand]?.name||""} ${b.model}</option>`).join("");
  const elOps = `<option value="">无</option>` + lenses.map(l=>`<option value="${l.id}">${brands[l.brand]?.name||""} ${l.model}</option>`).join("");

  const step4 = `<div class="step-panel ${s.step===4?"active":""}">
    <div class="step-label">步骤 4/5 · 可跳过</div><div class="step-title">偏好设置</div>
    <label style="font-size:13px;color:var(--text-secondary);display:block;margin-bottom:6px">画幅偏好</label>
    <div class="pref-row">${sBtns}</div>
    <label style="font-size:13px;color:var(--text-secondary);display:block;margin-bottom:6px">品牌偏好</label>
    <div class="pref-row">${brandBtns}</div>
    <label style="font-size:13px;color:var(--text-secondary);display:block;margin:16px 0 6px">已有设备（选填）</label>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <select onchange="recUI('ebody',this.value)" style="padding:10px;border-radius:8px;border:1px solid var(--border);font-size:14px"><option value="">已有机身</option>${ebOps}</select>
      <select onchange="recUI('elens',this.value)" style="padding:10px;border-radius:8px;border:1px solid var(--border);font-size:14px"><option value="">已有镜头</option>${elOps}</select></div>
    <div class="wizard-btns"><button class="btn btn-secondary" onclick="recUI('prev')">← 上一步</button>
      <button class="btn btn-primary" onclick="recUI('run')">查看推荐 →</button></div></div>`;

  let resultsHTML = "";
  if (s.results.length) {
    resultsHTML = s.results.map((r, i) => {
      const rk = i<3?`rank-${i+1}`:"rank-other";
      const badge = s.useUsed?"二手":"全新";
      return `<div class="rec-card" onclick="page.go('combo',{body:'${r.body.id}',lens:'${r.lens.id}'})">
        <div class="rec-hdr"><span class="rank ${rk}">${i+1}</span>
          <span class="rec-sc" style="color:${scoreColor(r.finalScore)}">${r.finalScore}</span></div>
        <div class="rec-reason">${getRecommendationReason(r)}</div>
        <div class="combo-item"><span class="role">机身</span><span class="nm">${esc(r.body.model)}</span></div>
        <div class="combo-item"><span class="role">镜头</span><span class="nm">${esc(r.lens.model)}</span></div>
        <div style="font-size:14px;font-weight:600;color:#0369A1;margin-top:4px">${badge}总价 ¥${formatNum(r.price.low)} 起</div>
        <div style="font-size:12px;color:var(--text-secondary)">${r.body.megapixels}MP · ${r.lens.focalRange} ${r.lens.aperture} · ${r.totalWeight}g</div>
        ${tagChips([...new Set([...r.body.featureTags,...r.lens.featureTags])].slice(0,4),"feature")}
      </div>`;
    }).join("");
  } else {
    resultsHTML = `<div style="text-align:center;padding:40px;color:#999"><div style="font-size:40px;margin-bottom:12px">🔍</div><div>点击"查看推荐"获取结果</div></div>`;
  }

  const step5 = `<div class="step-panel ${s.step===5?"active":""}">
    <div class="step-label">推荐结果</div><div class="step-title">为你推荐的组合</div>
    <div style="text-align:center;margin-bottom:16px;font-size:13px;color:var(--text-secondary)">
      预算 ¥${formatNum(s.budgetLow)}-${formatNum(s.budgetHigh)} · 照片 ${s.photoPct}% / 视频 ${100-s.photoPct}% · ${s.useUsed?"二手":"全新"}
    </div>
    ${s.results.length?`<div style="text-align:center;margin-bottom:16px;color:#0369A1;font-size:14px">共 ${s.results.length} 个推荐方案</div>`:""}
    ${resultsHTML}
    <div class="wizard-btns"><button class="btn btn-secondary" onclick="recUI('prev')">← 修改需求</button>
      <button class="btn btn-primary" onclick="recUI('run')">🔄 重新推荐</button>
      <a href="#combo" class="btn btn-secondary" style="text-decoration:none;display:inline-flex;align-items:center">组合评分</a>
    </div></div>`;

  return `<div class="steps">${steps}</div>${step1}${step2}${step3}${step4}${step5}`;
};
// ---- 推荐 UI 控制 ----
function recUI(action, val) {
  const s = recState;
  if (action === "prev") { if (s.step>1) { s.step--; page.render(); } return; }
  if (action === "next") {
    if (s.step===3 && !s.sceneTypes.length) { alert("请至少选择一个拍摄类型"); return; }
    s.step++;
    if (s.step===5) { recRun(); return; }
    page.render(); return;
  }
  if (action === "scene") {
    const idx = s.sceneTypes.indexOf(val);
    if (idx>=0) s.sceneTypes.splice(idx,1);
    else if (s.sceneTypes.length<3) s.sceneTypes.push(val);
    s.results=[]; page.render(); return;
  }
  if (action === "sensor") { s.sensorPrefer=val; s.results=[]; page.render(); return; }
  if (action === "brand") {
    if (!val) { s.brandPrefer=[]; } else { const idx=s.brandPrefer.indexOf(val); idx>=0?s.brandPrefer.splice(idx,1):s.brandPrefer.push(val); }
    s.results=[]; page.render(); return;
  }
  if (action === "ebody") { s.existingBodyId=val; s.results=[]; return; }
  if (action === "elens") { s.existingLensId=val; s.results=[]; return; }
  if (action === "run") { recRun(); return; }
}

function recUIUpdate(key, val) {
  const s = recState;
  const num = parseInt(val);
  if (key === "budgetLow") s.budgetLow = Math.min(num, s.budgetHigh-500);
  else if (key === "budgetHigh") s.budgetHigh = Math.max(num, s.budgetLow+500);
  else if (key === "photoPct") s.photoPct = num;
  else if (key === "useUsed") s.useUsed = !!parseInt(val);
  page.render();
}

function recRun() {
  const s = recState;
  s.results = recommend({
    budgetLow: s.budgetLow, budgetHigh: s.budgetHigh,
    photoPct: s.photoPct, sceneTypes: s.sceneTypes,
    sensorPrefer: s.sensorPrefer, brandPrefer: s.brandPrefer,
    useUsed: s.useUsed, existingBodyId: s.existingBodyId,
    existingLensId: s.existingLensId, topN: 8
  });
  s.step = 5; page.render();
}

function cbChange() {
  const brand = document.getElementById("cb-brand").value;
  const bs = document.getElementById("cb-body");
  const ls = document.getElementById("cb-lens");
  bs.innerHTML = `<option value="">请选择</option>` + bodies.filter(b=>b.brand===brand).map(b=>`<option value="${b.id}">${b.model}</option>`).join("");
  ls.innerHTML = `<option value="">请选择</option>` + lenses.filter(l=>l.brand===brand).map(l=>`<option value="${l.id}">${l.model}</option>`).join("");
}
function cbSel() {
  const bodyId = document.getElementById("cb-body")?.value;
  const lensId = document.getElementById("cb-lens")?.value;
  if (bodyId && lensId) page.go("combo", {body: bodyId, lens: lensId});
}

// ---- 渲染入口 ----
page.render = function() {
  const app = document.getElementById("app");
  const content = render[this.current] ? render[this.current]() : render.home();
  app.innerHTML = content;
  $$(".nav a").forEach(a => a.classList.toggle("active", a.dataset.page === this.current));
  const si = document.getElementById("s-inp");
  if (si && !page.params.q) setTimeout(()=>si.focus(), 100);
};

// ---- 启动 ----
document.addEventListener("DOMContentLoaded", () => { try { page.init(); } catch(e) { document.getElementById("app").innerHTML = `<div class="error-box"><h3>JavaScript Error</h3><pre style="text-align:left;overflow:auto;max-height:400px">${e.stack||e.message||e}</pre></div>`; } });

// 全局暴露
window.page = page;
window.render = render;
window.recState = recState;
window.recUI = recUI;
window.recUIUpdate = recUIUpdate;
window.recRun = recRun;
window.cbChange = cbChange;
window.cbSel = cbSel;
window.recommend = recommend;
window.getComboScore = getComboScore;
function brandLogoSvg(brandKey) {
  const info = brands[brandKey];
  if (!info) return "";
  const b = info.color;
  const f = "#FFFFFF";
  // Define brand-specific logos
  const logos = {
    canon: `<svg viewBox="0 0 120 36" width="120" height="36"><rect rx="6" fill="${b}" width="120" height="36"/><text x="60" y="23" text-anchor="middle" fill="${f}" font-family="Arial,sans-serif" font-weight="700" font-size="15" letter-spacing="2">CANON</text></svg>`,
    nikon: `<svg viewBox="0 0 120 36" width="120" height="36"><rect rx="6" fill="#1A1A1A" width="120" height="36"/><text x="60" y="23" text-anchor="middle" fill="#FFCD00" font-family="Arial,sans-serif" font-weight="700" font-size="14" letter-spacing="3">NIKON</text></svg>`,
    fujifilm: `<svg viewBox="0 0 120 36" width="120" height="36"><rect rx="6" fill="${b}" width="120" height="36"/><text x="60" y="23" text-anchor="middle" fill="${f}" font-family="Arial,sans-serif" font-weight="700" font-size="11" letter-spacing="2">FUJIFILM</text></svg>`,
    panasonic: `<svg viewBox="0 0 120 36" width="120" height="36"><rect rx="6" fill="${b}" width="120" height="36"/><text x="60" y="23" text-anchor="middle" fill="${f}" font-family="Arial,sans-serif" font-weight="600" font-size="13" letter-spacing="2">Panasonic</text></svg>`,
    sony: `<svg viewBox="0 0 120 36" width="120" height="36"><rect rx="6" fill="#1A1A1A" width="120" height="36"/><text x="60" y="23" text-anchor="middle" fill="${f}" font-family="Arial,sans-serif" font-weight="800" font-size="16" letter-spacing="3">SONY</text></svg>`,
    olympus: `<svg viewBox="0 0 120 36" width="120" height="36"><rect rx="6" fill="${b}" width="120" height="36"/><text x="60" y="23" text-anchor="middle" fill="${f}" font-family="Arial,sans-serif" font-weight="700" font-size="12" letter-spacing="2">OLYMPUS</text></svg>`
  };
  return logos[brandKey] || `<span style="background:${b};color:white;padding:6px 16px;border-radius:6px;font-weight:700;font-size:14px">${info.name}</span>`;
}
