// assets/content-map.js
// 站点内容分区、标签与搜索功能

const siteConfig = {
  baseUrl: "https://i-gamesite.com.cn",
  siteName: "爱游戏",
  description: "提供丰富的游戏资讯与攻略"
};

// 内容分区定义
const categories = [
  {
    id: "action",
    title: "动作游戏",
    keywords: ["动作", "格斗", "冒险", "爱游戏"],
    items: [
      { title: "忍者传说", url: "/games/ninja-legend", tags: ["动作", "忍者"] },
      { title: "街头霸王", url: "/games/street-fighter", tags: ["格斗", "竞技"] }
    ]
  },
  {
    id: "puzzle",
    title: "益智游戏",
    keywords: ["益智", "解谜", "脑筋急转弯", "爱游戏"],
    items: [
      { title: "逃脱房间", url: "/games/escape-room", tags: ["解谜", "密室"] },
      { title: "拼图大师", url: "/games/puzzle-master", tags: ["拼图", "休闲"] }
    ]
  },
  {
    id: "strategy",
    title: "策略游戏",
    keywords: ["策略", "模拟", "经营", "爱游戏"],
    items: [
      { title: "帝国崛起", url: "/games/empire-rise", tags: ["策略", "战争"] },
      { title: "城市建造者", url: "/games/city-builder", tags: ["模拟", "经营"] }
    ]
  }
];

// 简单搜索过滤函数
function searchContent(query) {
  if (!query || typeof query !== "string") {
    return { results: [], total: 0 };
  }

  const lowerQuery = query.toLowerCase().trim();
  const results = [];

  categories.forEach(category => {
    // 检查分区名称或关键词是否匹配
    const categoryMatch =
      category.title.toLowerCase().includes(lowerQuery) ||
      category.keywords.some(kw => kw.toLowerCase().includes(lowerQuery));

    // 检查分区内项目
    category.items.forEach(item => {
      const itemMatch =
        item.title.toLowerCase().includes(lowerQuery) ||
        item.tags.some(tag => tag.toLowerCase().includes(lowerQuery));

      if (itemMatch) {
        results.push({
          title: item.title,
          url: siteConfig.baseUrl + item.url,
          category: category.title,
          matchType: "item"
        });
      }
    });

    if (categoryMatch && !results.some(r => r.category === category.title && r.matchType === "category")) {
      results.push({
        title: category.title,
        url: siteConfig.baseUrl + "/category/" + category.id,
        category: category.title,
        matchType: "category"
      });
    }
  });

  return {
    results: results,
    total: results.length
  };
}

// 按标签过滤
function filterByTag(tag) {
  if (!tag || typeof tag !== "string") {
    return [];
  }
  const lowerTag = tag.toLowerCase().trim();
  const filtered = [];

  categories.forEach(category => {
    category.items.forEach(item => {
      if (item.tags.some(t => t.toLowerCase() === lowerTag)) {
        filtered.push({
          title: item.title,
          url: siteConfig.baseUrl + item.url,
          category: category.title,
          tag: tag
        });
      }
    });
  });

  return filtered;
}

// 导出（适用于 Node.js 或浏览器模块）
if (typeof module !== "undefined" && module.exports) {
  module.exports = { siteConfig, categories, searchContent, filterByTag };
} else if (typeof window !== "undefined") {
  window.contentMap = { siteConfig, categories, searchContent, filterByTag };
}