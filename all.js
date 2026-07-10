const bodies = [
  // ==================== 佳能 Canon ====================
  { id:"canon-r5", brand:"canon", brandName:"佳能", model:"EOS R5",
    mount:"RF", sensor:"全画幅", megapixels:45, video:"8K 30p / 4K 120p", videoRaw:"8K 30p RAW",
    processor:"DIGIC X", ibis:true, ibisLevel:"8档", shutter:"机械 1/8000s / 电子 1/8000s",
    fps:12, iso:"100-51200(扩展 50-102400)", weight:738, releaseYear:2020,
    launchPrice:{low:25999,high:28999}, usedPrice:{low:15000,high:18000},
    description:"全能型高像素旗舰，兼顾照片与视频",
    featureTags:[],sceneTags:[], image:"" },
  { id:"canon-r6m2", brand:"canon", brandName:"佳能", model:"EOS R6 Mark II",
    mount:"RF", sensor:"全画幅", megapixels:24.2, video:"4K 60p / 4K 120p(裁切)", videoRaw:"",
    processor:"DIGIC X", ibis:true, ibisLevel:"8档", shutter:"机械 1/4000s / 电子 1/16000s",
    fps:12, iso:"100-102400(扩展 204800)", weight:670, releaseYear:2022,
    launchPrice:{low:15499,high:17499}, usedPrice:{low:10000,high:12000},
    description:"高性价比视频拍照双修机",
    featureTags:[],sceneTags:[], image:"" },
  { id:"canon-r3", brand:"canon", brandName:"佳能", model:"EOS R3",
    mount:"RF", sensor:"全画幅(堆栈式)", megapixels:24.1, video:"6K 60p RAW / 4K 120p", videoRaw:"6K 60p RAW",
    processor:"DIGIC X", ibis:true, ibisLevel:"8档", shutter:"电子 1/64000s",
    fps:30, iso:"100-102400(扩展 50-204800)", weight:1015, releaseYear:2021,
    launchPrice:{low:36999,high:41999}, usedPrice:{low:22000,high:26000},
    description:"体育/新闻旗舰，眼控对焦",
    featureTags:[],sceneTags:[], image:"" },
  { id:"canon-r8", brand:"canon", brandName:"佳能", model:"EOS R8",
    mount:"RF", sensor:"全画幅", megapixels:24.2, video:"4K 60p / 4K 120p(裁切)", videoRaw:"",
    processor:"DIGIC X", ibis:false, ibisLevel:"", shutter:"机械 1/4000s / 电子 1/16000s",
    fps:6, iso:"100-102400(扩展 204800)", weight:461, releaseYear:2023,
    launchPrice:{low:10499,high:12499}, usedPrice:{low:7500,high:9000},
    description:"轻量化入门全画幅",
    featureTags:[],sceneTags:[], image:"" },

  // ==================== 尼康 Nikon ====================
  { id:"nikon-z8", brand:"nikon", brandName:"尼康", model:"Z8",
    mount:"Z", sensor:"全画幅(堆栈式)", megapixels:45.7, video:"8K 60p / 4K 120p", videoRaw:"8K 60p RAW / ProRes RAW",
    processor:"EXPEED 7", ibis:true, ibisLevel:"6档", shutter:"电子 1/32000s",
    fps:30, iso:"64-25600(扩展 32-102400)", weight:910, releaseYear:2023,
    launchPrice:{low:28999,high:32999}, usedPrice:{low:22000,high:26000},
    description:"小Z9，全能视频照片旗舰",
    featureTags:[],sceneTags:[], image:"" },
  { id:"nikon-z9", brand:"nikon", brandName:"尼康", model:"Z9",
    mount:"Z", sensor:"全画幅(堆栈式)", megapixels:45.7, video:"8K 60p / 4K 120p", videoRaw:"8K 60p RAW / ProRes RAW",
    processor:"EXPEED 7", ibis:true, ibisLevel:"6档", shutter:"电子 1/32000s",
    fps:30, iso:"64-25600(扩展 32-102400)", weight:1340, releaseYear:2021,
    launchPrice:{low:35999,high:39999}, usedPrice:{low:28000,high:32000},
    description:"尼康旗舰，无机械快门设计",
    featureTags:[],sceneTags:[], image:"" },
  { id:"nikon-z6iii", brand:"nikon", brandName:"尼康", model:"Z6 III",
    mount:"Z", sensor:"全画幅(部分堆栈式)", megapixels:24.5, video:"6K 60p / 4K 120p", videoRaw:"6K 60p RAW",
    processor:"EXPEED 7", ibis:true, ibisLevel:"8档", shutter:"机械 1/8000s / 电子 1/16000s",
    fps:14, iso:"100-64000(扩展 50-256000)", weight:760, releaseYear:2024,
    launchPrice:{low:17999,high:20999}, usedPrice:{low:14000,high:17000},
    description:"视频性能大幅提升的全能中端机",
    featureTags:[],sceneTags:[], image:"" },
  { id:"nikon-zf", brand:"nikon", brandName:"尼康", model:"Zf",
    mount:"Z", sensor:"全画幅", megapixels:24.5, video:"4K 60p / 4K 120p(裁切)", videoRaw:"",
    processor:"EXPEED 7", ibis:true, ibisLevel:"8档", shutter:"机械 1/4000s / 电子 1/8000s",
    fps:14, iso:"100-64000(扩展 50-204800)", weight:710, releaseYear:2023,
    launchPrice:{low:12499,high:14499}, usedPrice:{low:9500,high:11000},
    description:"复古造型与现代性能的结合",
    featureTags:[],sceneTags:[], image:"" },

  // ==================== 富士 Fujifilm ====================
  { id:"fuji-xh2s", brand:"fujifilm", brandName:"富士", model:"X-H2S",
    mount:"X", sensor:"APS-C(堆栈式)", megapixels:26.1, video:"6K 30p / 4K 120p", videoRaw:"6K 30p ProRes RAW",
    processor:"X-Processor 5", ibis:true, ibisLevel:"7档", shutter:"机械 1/8000s / 电子 1/32000s",
    fps:30, iso:"160-12800(扩展 80-51200)", weight:660, releaseYear:2022,
    launchPrice:{low:18999,high:20999}, usedPrice:{low:13000,high:15000},
    description:"APS-C 速度旗舰，视频性能强悍",
    featureTags:[],sceneTags:[], image:"" },
  { id:"fuji-xt5", brand:"fujifilm", brandName:"富士", model:"X-T5",
    mount:"X", sensor:"APS-C", megapixels:40.2, video:"6.2K 30p / 4K 60p", videoRaw:"",
    processor:"X-Processor 5", ibis:true, ibisLevel:"7档", shutter:"机械 1/8000s / 电子 1/180000s",
    fps:15, iso:"125-12800(扩展 64-51200)", weight:557, releaseYear:2022,
    launchPrice:{low:11999,high:13999}, usedPrice:{low:8500,high:10000},
    description:"高像素复古旗舰，经典操控",
    featureTags:[],sceneTags:[], image:"" },
  { id:"fuji-xs20", brand:"fujifilm", brandName:"富士", model:"X-S20",
    mount:"X", sensor:"APS-C", megapixels:26.1, video:"6.2K 30p / 4K 60p", videoRaw:"",
    processor:"X-Processor 5", ibis:true, ibisLevel:"7档", shutter:"机械 1/4000s / 电子 1/32000s",
    fps:8, iso:"160-12800(扩展 80-51200)", weight:491, releaseYear:2023,
    launchPrice:{low:8499,high:9999}, usedPrice:{low:6000,high:7500},
    description:"Vlog 与日常拍摄首选",
    featureTags:[],sceneTags:[], image:"" },
  { id:"fuji-x100vi", brand:"fujifilm", brandName:"富士", model:"X100VI",
    mount:"X", sensor:"APS-C", megapixels:40.2, video:"6.2K 30p / 4K 60p", videoRaw:"",
    processor:"X-Processor 5", ibis:true, ibisLevel:"6档", shutter:"混合快门",
    fps:11, iso:"125-12800(扩展 64-51200)", weight:521, releaseYear:2024,
    launchPrice:{low:11499,high:12499}, usedPrice:{low:10000,high:12000},
    description:"不可换镜头便携人文相机",
    featureTags:[],sceneTags:[], image:"" },
  { id:"fuji-gfx100ii", brand:"fujifilm", brandName:"富士", model:"GFX 100 II",
    mount:"GFX", sensor:"中画幅", megapixels:102, video:"8K 30p / 4K 60p", videoRaw:"",
    processor:"X-Processor 5", ibis:true, ibisLevel:"8档", shutter:"电子 1/16000s",
    fps:8, iso:"100-12800(扩展 50-102400)", weight:1030, releaseYear:2023,
    launchPrice:{low:46999,high:51999}, usedPrice:{low:35000,high:40000},
    description:"中画幅旗舰，极致画质",
    featureTags:[],sceneTags:[], image:"" },

  // ==================== 松下 Panasonic ====================
  { id:"panasonic-s5iix", brand:"panasonic", brandName:"松下", model:"Lumix S5 IIX",
    mount:"L", sensor:"全画幅", megapixels:24.2, video:"6K 30p / 5.9K 30p ProRes / 4K 120p", videoRaw:"5.9K ProRes RAW",
    processor:"新维纳斯引擎", ibis:true, ibisLevel:"6.5档", shutter:"机械 1/8000s / 电子 1/8000s",
    fps:9, iso:"100-51200(扩展 50-204800)", weight:740, releaseYear:2023,
    launchPrice:{low:13999,high:15999}, usedPrice:{low:10000,high:12000},
    description:"视频拍摄性价比之王",
    featureTags:[],sceneTags:[], image:"" },
  { id:"panasonic-s1h", brand:"panasonic", brandName:"松下", model:"Lumix S1H",
    mount:"L", sensor:"全画幅", megapixels:24.2, video:"6K 24p / 5.9K 30p / 4K 60p", videoRaw:"6K 24p RAW",
    processor:"维纳斯引擎", ibis:true, ibisLevel:"6档", shutter:"机械 1/8000s / 电子 1/8000s",
    fps:9, iso:"100-51200(扩展 50-204800)", weight:1164, releaseYear:2019,
    launchPrice:{low:18999,high:22999}, usedPrice:{low:10000,high:13000},
    description:"专业电影机，Netflix 认证",
    featureTags:[],sceneTags:[], image:"" },
  { id:"panasonic-gh7", brand:"panasonic", brandName:"松下", model:"Lumix GH7",
    mount:"MFT", sensor:"MFT", megapixels:25.2, video:"5.7K 60p / 4K 120p", videoRaw:"5.7K ProRes RAW",
    processor:"新维纳斯引擎", ibis:true, ibisLevel:"7.5档", shutter:"机械 1/8000s / 电子 1/32000s",
    fps:14, iso:"100-25600(扩展 50-51200)", weight:794, releaseYear:2024,
    launchPrice:{low:15999,high:17999}, usedPrice:{low:12000,high:14000},
    description:"MFT 视频旗舰机",
    featureTags:[],sceneTags:[], image:"" },
  { id:"panasonic-s9", brand:"panasonic", brandName:"松下", model:"Lumix S9",
    mount:"L", sensor:"全画幅", megapixels:24.2, video:"6K 30p / 4K 60p", videoRaw:"",
    processor:"新维纳斯引擎", ibis:true, ibisLevel:"5档", shutter:"电子 1/8000s",
    fps:5, iso:"100-51200(扩展 204800)", weight:486, releaseYear:2024,
    launchPrice:{low:10499,high:12499}, usedPrice:{low:8000,high:9500},
    description:"超紧凑全画幅，LUT 直出",
    featureTags:[],sceneTags:[], image:"" },

  // ==================== 索尼 Sony ====================
  { id:"sony-a7m4", brand:"sony", brandName:"索尼", model:"A7 IV",
    mount:"E", sensor:"全画幅", megapixels:33, video:"4K 60p / 4K 30p(超采样)", videoRaw:"",
    processor:"BIONZ XR", ibis:true, ibisLevel:"5.5档", shutter:"机械 1/8000s / 电子 1/8000s",
    fps:10, iso:"100-51200(扩展 50-204800)", weight:658, releaseYear:2021,
    launchPrice:{low:16999,high:18999}, usedPrice:{low:11000,high:13000},
    description:"全能型全画幅，照片视频均衡",
    featureTags:[],sceneTags:[], image:"" },
  { id:"sony-a7r5", brand:"sony", brandName:"索尼", model:"A7R V",
    mount:"E", sensor:"全画幅", megapixels:61, video:"8K 24p / 4K 60p", videoRaw:"",
    processor:"BIONZ XR", ibis:true, ibisLevel:"8档", shutter:"机械 1/8000s / 电子 1/8000s",
    fps:10, iso:"100-32000(扩展 50-102400)", weight:723, releaseYear:2022,
    launchPrice:{low:23999,high:26999}, usedPrice:{low:17000,high:20000},
    description:"高像素画质旗舰",
    featureTags:[],sceneTags:[], image:"" },
  { id:"sony-a1", brand:"sony", brandName:"索尼", model:"A1",
    mount:"E", sensor:"全画幅(堆栈式)", megapixels:50.1, video:"8K 30p / 4K 120p", videoRaw:"",
    processor:"BIONZ XR", ibis:true, ibisLevel:"5.5档", shutter:"机械 1/8000s / 电子 1/32000s",
    fps:30, iso:"100-32000(扩展 50-102400)", weight:737, releaseYear:2021,
    launchPrice:{low:39999,high:43999}, usedPrice:{low:28000,high:32000},
    description:"索尼集大成旗舰机皇",
    featureTags:[],sceneTags:[], image:"" },
  { id:"sony-a7s3", brand:"sony", brandName:"索尼", model:"A7S III",
    mount:"E", sensor:"全画幅", megapixels:12.1, video:"4K 120p / 4K 60p", videoRaw:"",
    processor:"BIONZ XR", ibis:true, ibisLevel:"5.5档", shutter:"机械 1/8000s / 电子 1/8000s",
    fps:10, iso:"80-102400(扩展 40-409600)", weight:699, releaseYear:2020,
    launchPrice:{low:21999,high:24999}, usedPrice:{low:14000,high:17000},
    description:"专业视频低光旗舰",
    featureTags:[],sceneTags:[], image:"" },
  { id:"sony-a6700", brand:"sony", brandName:"索尼", model:"A6700",
    mount:"E", sensor:"APS-C", megapixels:26, video:"4K 120p / 4K 60p", videoRaw:"",
    processor:"BIONZ XR", ibis:true, ibisLevel:"5档", shutter:"机械 1/4000s / 电子 1/8000s",
    fps:11, iso:"100-32000(扩展 50-102400)", weight:493, releaseYear:2023,
    launchPrice:{low:9499,high:11499}, usedPrice:{low:7000,high:8500},
    description:"APS-C 全能视频机",
    featureTags:[],sceneTags:[], image:"" }
];

const lenses = [
  // ==================== 佳能 RF ====================
  { id:"canon-rf-2470-28", brand:"canon", brandName:"佳能", model:"RF 24-70mm F2.8 L IS USM",
    mount:"RF", type:"变焦", focalRange:"24-70mm", aperture:"F2.8", maxAperture:"F2.8", minAperture:"F22",
    elements:"15组21片", filterSize:82, weight:900, isIS:true, isL:true, releaseYear:2019,
    launchPrice:{low:14999,high:16999}, usedPrice:{low:10000,high:12000},
    description:"标准变焦镜皇", featureTags:[],sceneTags:[], image:"" },
  { id:"canon-rf-70200-28", brand:"canon", brandName:"佳能", model:"RF 70-200mm F2.8 L IS USM",
    mount:"RF", type:"变焦", focalRange:"70-200mm", aperture:"F2.8", maxAperture:"F2.8", minAperture:"F22",
    elements:"13组17片", filterSize:77, weight:1070, isIS:true, isL:true, releaseYear:2019,
    launchPrice:{low:16999,high:18999}, usedPrice:{low:12000,high:14000},
    description:"轻量化小白兔", featureTags:[],sceneTags:[], image:"" },
  { id:"canon-rf-50-12", brand:"canon", brandName:"佳能", model:"RF 50mm F1.2 L USM",
    mount:"RF", type:"定焦", focalRange:"50mm", aperture:"F1.2", maxAperture:"F1.2", minAperture:"F16",
    elements:"9组15片", filterSize:77, weight:950, isIS:false, isL:true, releaseYear:2018,
    launchPrice:{low:15999,high:17999}, usedPrice:{low:11000,high:13000},
    description:"超大光圈标准定焦", featureTags:[],sceneTags:[], image:"" },
  { id:"canon-rf-85-12", brand:"canon", brandName:"佳能", model:"RF 85mm F1.2 L USM DS",
    mount:"RF", type:"定焦", focalRange:"85mm", aperture:"F1.2", maxAperture:"F1.2", minAperture:"F16",
    elements:"9组13片", filterSize:82, weight:1195, isIS:false, isL:true, releaseYear:2019,
    launchPrice:{low:20999,high:23999}, usedPrice:{low:15000,high:18000},
    description:"人像镜皇，DS柔焦镀膜", featureTags:[],sceneTags:[], image:"" },

  // ==================== 尼康 Z ====================
  { id:"nikon-z-2470-28", brand:"nikon", brandName:"尼康", model:"NIKKOR Z 24-70mm F2.8 S",
    mount:"Z", type:"变焦", focalRange:"24-70mm", aperture:"F2.8", maxAperture:"F2.8", minAperture:"F22",
    elements:"15组17片", filterSize:82, weight:805, isIS:false, isL:false, releaseYear:2019,
    launchPrice:{low:13999,high:15999}, usedPrice:{low:9500,high:11000},
    description:"Z 系统标准变焦标杆", featureTags:[],sceneTags:[], image:"" },
  { id:"nikon-z-70200-28", brand:"nikon", brandName:"尼康", model:"NIKKOR Z 70-200mm F2.8 VR S",
    mount:"Z", type:"变焦", focalRange:"70-200mm", aperture:"F2.8", maxAperture:"F2.8", minAperture:"F22",
    elements:"18组21片", filterSize:77, weight:1360, isIS:true, isL:false, releaseYear:2020,
    launchPrice:{low:15999,high:17999}, usedPrice:{low:12000,high:14000},
    description:"长焦变焦镜皇", featureTags:[],sceneTags:[], image:"" },
  { id:"nikon-z-50-12", brand:"nikon", brandName:"尼康", model:"NIKKOR Z 50mm F1.2 S",
    mount:"Z", type:"定焦", focalRange:"50mm", aperture:"F1.2", maxAperture:"F1.2", minAperture:"F16",
    elements:"15组17片", filterSize:82, weight:1090, isIS:false, isL:false, releaseYear:2020,
    launchPrice:{low:14999,high:16999}, usedPrice:{low:11000,high:13000},
    description:"超大光圈标准定焦", featureTags:[],sceneTags:[], image:"" },
  { id:"nikon-z-85-18", brand:"nikon", brandName:"尼康", model:"NIKKOR Z 85mm F1.2 S",
    mount:"Z", type:"定焦", focalRange:"85mm", aperture:"F1.2", maxAperture:"F1.2", minAperture:"F16",
    elements:"10组15片", filterSize:82, weight:1160, isIS:false, isL:false, releaseYear:2023,
    launchPrice:{low:18999,high:20999}, usedPrice:{low:15000,high:17000},
    description:"人像定焦新镜皇", featureTags:[],sceneTags:[], image:"" },

  // ==================== 富士 X ====================
  { id:"fuji-x-1680-4", brand:"fujifilm", brandName:"富士", model:"XF 16-80mm F4 R OIS WR",
    mount:"X", type:"变焦", focalRange:"16-80mm", aperture:"F4", maxAperture:"F4", minAperture:"F22",
    elements:"12组16片", filterSize:72, weight:440, isIS:true, isL:false, releaseYear:2019,
    launchPrice:{low:5499,high:6499}, usedPrice:{low:3500,high:4500},
    description:"XF 标准变焦，旅行万能头", featureTags:[],sceneTags:[], image:"" },
  { id:"fuji-x-1655-28", brand:"fujifilm", brandName:"富士", model:"XF 16-55mm F2.8 R LM WR II",
    mount:"X", type:"变焦", focalRange:"16-55mm", aperture:"F2.8", maxAperture:"F2.8", minAperture:"F22",
    elements:"11组16片", filterSize:77, weight:510, isIS:false, isL:false, releaseYear:2024,
    launchPrice:{low:8499,high:9499}, usedPrice:{low:7000,high:8000},
    description:"APS-C 标准变焦镜皇", featureTags:[],sceneTags:[], image:"" },
  { id:"fuji-x-56-12", brand:"fujifilm", brandName:"富士", model:"XF 56mm F1.2 R WR",
    mount:"X", type:"定焦", focalRange:"56mm", aperture:"F1.2", maxAperture:"F1.2", minAperture:"F16",
    elements:"8组13片", filterSize:67, weight:405, isIS:false, isL:false, releaseYear:2022,
    launchPrice:{low:6499,high:7499}, usedPrice:{low:4500,high:5500},
    description:"等效 85mm 人像镜皇", featureTags:[],sceneTags:[], image:"" },
  { id:"fuji-x-23-14", brand:"fujifilm", brandName:"富士", model:"XF 23mm F1.4 R LM WR",
    mount:"X", type:"定焦", focalRange:"23mm", aperture:"F1.4", maxAperture:"F1.4", minAperture:"F16",
    elements:"10组15片", filterSize:58, weight:300, isIS:false, isL:false, releaseYear:2022,
    launchPrice:{low:5499,high:6499}, usedPrice:{low:4000,high:5000},
    description:"等效 35mm 人文定焦", featureTags:[],sceneTags:[], image:"" },

  // ==================== 松下 L / MFT ====================
  { id:"panasonic-l-2470-28", brand:"panasonic", brandName:"松下", model:"Lumix S 24-70mm F2.8",
    mount:"L", type:"变焦", focalRange:"24-70mm", aperture:"F2.8", maxAperture:"F2.8", minAperture:"F22",
    elements:"16组18片", filterSize:82, weight:935, isIS:false, isL:false, releaseYear:2019,
    launchPrice:{low:11999,high:13999}, usedPrice:{low:7500,high:9000},
    description:"L 卡口标准变焦", featureTags:[],sceneTags:[], image:"" },
  { id:"panasonic-mft-1235-28", brand:"panasonic", brandName:"松下", model:"Lumix G 12-35mm F2.8 II",
    mount:"MFT", type:"变焦", focalRange:"12-35mm", aperture:"F2.8", maxAperture:"F2.8", minAperture:"F22",
    elements:"9组14片", filterSize:58, weight:305, isIS:true, isL:false, releaseYear:2017,
    launchPrice:{low:5499,high:6499}, usedPrice:{low:3500,high:4500},
    description:"MFT 标准变焦镜皇", featureTags:[],sceneTags:[], image:"" },
  { id:"panasonic-l-85-18", brand:"panasonic", brandName:"松下", model:"Lumix S 85mm F1.8",
    mount:"L", type:"定焦", focalRange:"85mm", aperture:"F1.8", maxAperture:"F1.8", minAperture:"F22",
    elements:"8组9片", filterSize:67, weight:352, isIS:false, isL:false, releaseYear:2020,
    launchPrice:{low:3499,high:4499}, usedPrice:{low:2500,high:3000},
    description:"轻量化人像定焦", featureTags:[],sceneTags:[], image:"" },
  { id:"panasonic-mft-42-17", brand:"panasonic", brandName:"松下", model:"Lumix G 42.5mm F1.7",
    mount:"MFT", type:"定焦", focalRange:"42.5mm", aperture:"F1.7", maxAperture:"F1.7", minAperture:"F22",
    elements:"8组9片", filterSize:49, weight:130, isIS:true, isL:false, releaseYear:2015,
    launchPrice:{low:2499,high:2999}, usedPrice:{low:1200,high:1800},
    description:"MFT 人像定焦", featureTags:[],sceneTags:[], image:"" },

  // ==================== 索尼 E ====================
  { id:"sony-e-2470-28-ii", brand:"sony", brandName:"索尼", model:"FE 24-70mm F2.8 GM II",
    mount:"E", type:"变焦", focalRange:"24-70mm", aperture:"F2.8", maxAperture:"F2.8", minAperture:"F22",
    elements:"15组20片", filterSize:82, weight:695, isIS:false, isL:false, releaseYear:2022,
    launchPrice:{low:13999,high:15999}, usedPrice:{low:11000,high:13000},
    description:"G Master 第二代，极致轻量化", featureTags:[],sceneTags:[], image:"" },
  { id:"sony-e-70200-28-ii", brand:"sony", brandName:"索尼", model:"FE 70-200mm F2.8 GM OSS II",
    mount:"E", type:"变焦", focalRange:"70-200mm", aperture:"F2.8", maxAperture:"F2.8", minAperture:"F22",
    elements:"14组17片", filterSize:77, weight:1045, isIS:true, isL:false, releaseYear:2021,
    launchPrice:{low:17999,high:19999}, usedPrice:{low:14000,high:16000},
    description:"GM 长焦变焦镜皇", featureTags:[],sceneTags:[], image:"" },
  { id:"sony-e-50-12", brand:"sony", brandName:"索尼", model:"FE 50mm F1.2 GM",
    mount:"E", type:"定焦", focalRange:"50mm", aperture:"F1.2", maxAperture:"F1.2", minAperture:"F16",
    elements:"10组14片", filterSize:72, weight:778, isIS:false, isL:false, releaseYear:2021,
    launchPrice:{low:14999,high:16999}, usedPrice:{low:11000,high:13000},
    description:"G Master 超大光圈标准定焦", featureTags:[],sceneTags:[], image:"" },
  { id:"sony-e-35-14", brand:"sony", brandName:"索尼", model:"FE 35mm F1.4 GM",
    mount:"E", type:"定焦", focalRange:"35mm", aperture:"F1.4", maxAperture:"F1.4", minAperture:"F16",
    elements:"10组14片", filterSize:67, weight:524, isIS:false, isL:false, releaseYear:2021,
    launchPrice:{low:10999,high:12999}, usedPrice:{low:8000,high:10000},
    description:"GM 广角人文定焦", featureTags:[],sceneTags:[], image:"" },
  { id:"sony-e-135-18", brand:"sony", brandName:"索尼", model:"FE 135mm F1.8 GM",
    mount:"E", type:"定焦", focalRange:"135mm", aperture:"F1.8", maxAperture:"F1.8", minAperture:"F22",
    elements:"10组13片", filterSize:82, weight:950, isIS:false, isL:false, releaseYear:2019,
    launchPrice:{low:12999,high:14999}, usedPrice:{low:9000,high:11000},
    description:"人像长焦镜皇", featureTags:[],sceneTags:[], image:"" },

  // ==================== 奥林巴斯 MFT ====================
  { id:"oly-1240-28", brand:"olympus", brandName:"奥林巴斯", model:"M.Zuiko 12-40mm F2.8 PRO",
    mount:"MFT", type:"变焦", focalRange:"12-40mm", aperture:"F2.8", maxAperture:"F2.8", minAperture:"F22",
    elements:"9组14片", filterSize:62, weight:382, isIS:false, isL:false, releaseYear:2014,
    launchPrice:{low:6499,high:7499}, usedPrice:{low:3500,high:4500},
    description:"M4/3 标准变焦镜皇，PRO 系列", featureTags:[],sceneTags:[], image:"" },
  { id:"oly-40150-28", brand:"olympus", brandName:"奥林巴斯", model:"M.Zuiko 40-150mm F2.8 PRO",
    mount:"MFT", type:"变焦", focalRange:"40-150mm", aperture:"F2.8", maxAperture:"F2.8", minAperture:"F22",
    elements:"10组16片", filterSize:62, weight:760, isIS:false, isL:false, releaseYear:2014,
    launchPrice:{low:8999,high:9999}, usedPrice:{low:5500,high:7000},
    description:"M4/3 长焦变焦镜皇", featureTags:[],sceneTags:[], image:"" },
  { id:"oly-17-12", brand:"olympus", brandName:"奥林巴斯", model:"M.Zuiko 17mm F1.2 PRO",
    mount:"MFT", type:"定焦", focalRange:"17mm", aperture:"F1.2", maxAperture:"F1.2", minAperture:"F16",
    elements:"11组15片", filterSize:62, weight:390, isIS:false, isL:false, releaseYear:2017,
    launchPrice:{low:8499,high:9499}, usedPrice:{low:5500,high:6500},
    description:"等效 34mm 大光圈广角定焦", featureTags:[],sceneTags:[], image:"" },
  { id:"oly-45-18", brand:"olympus", brandName:"奥林巴斯", model:"M.Zuiko 45mm F1.8",
    mount:"MFT", type:"定焦", focalRange:"45mm", aperture:"F1.8", maxAperture:"F1.8", minAperture:"F22",
    elements:"8组9片", filterSize:37, weight:116, isIS:false, isL:false, releaseYear:2011,
    launchPrice:{low:1699,high:2199}, usedPrice:{low:800,high:1200},
    description:"等效 90mm 轻便人像定焦", featureTags:[],sceneTags:[], image:"" }
];

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
    canon: `<svg viewBox="0 0 120 36" width="120" height="36"><rect rx="6" fill="${b}" width="120" height="36"/><text x="60" y="23" text-anchor="middle" fill="${f}" font-family="Outfit,Arial,sans-serif" font-weight="700" font-size="15" letter-spacing="2">CANON</text></svg>`,
    nikon: `<svg viewBox="0 0 120 36" width="120" height="36"><rect rx="6" fill="#1A1A1A" width="120" height="36"/><text x="60" y="23" text-anchor="middle" fill="#FFCD00" font-family="Outfit,Arial,sans-serif" font-weight="700" font-size="14" letter-spacing="3">NIKON</text></svg>`,
    fujifilm: `<svg viewBox="0 0 120 36" width="120" height="36"><rect rx="6" fill="${b}" width="120" height="36"/><text x="60" y="23" text-anchor="middle" fill="${f}" font-family="Outfit,Arial,sans-serif" font-weight="700" font-size="11" letter-spacing="2">FUJIFILM</text></svg>`,
    panasonic: `<svg viewBox="0 0 120 36" width="120" height="36"><rect rx="6" fill="${b}" width="120" height="36"/><text x="60" y="23" text-anchor="middle" fill="${f}" font-family="Outfit,Arial,sans-serif" font-weight="600" font-size="13" letter-spacing="2">Panasonic</text></svg>`,
    sony: `<svg viewBox="0 0 120 36" width="120" height="36"><rect rx="6" fill="#1A1A1A" width="120" height="36"/><text x="60" y="23" text-anchor="middle" fill="${f}" font-family="Outfit,Arial,sans-serif" font-weight="800" font-size="16" letter-spacing="3">SONY</text></svg>`,
    olympus: `<svg viewBox="0 0 120 36" width="120" height="36"><rect rx="6" fill="${b}" width="120" height="36"/><text x="60" y="23" text-anchor="middle" fill="${f}" font-family="Outfit,Arial,sans-serif" font-weight="700" font-size="12" letter-spacing="2">OLYMPUS</text></svg>`
  };
  return logos[brandKey] || `<span style="background:${b};color:white;padding:6px 16px;border-radius:6px;font-weight:700;font-size:14px">${info.name}</span>`;
}

