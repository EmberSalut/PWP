// ==================== 核心数据结构：在此处修改你的收藏 ====================
const linkData = [
    // 格式：{ title: "标题", url: "网址", tags: ["标签1", "标签2"], icon: "FontAwesome图标类名" }
    { title: "Google 搜索", url: "https://www.google.com", tags: ["工具", "搜索"], icon: "fab fa-google" },
    { title: "GitHub", url: "https://github.com", tags: ["开发", "社区"], icon: "fab fa-github" },
    { title: "稀土掘金", url: "https://juejin.cn", tags: ["开发", "博客"], icon: "fas fa-leaf" },
    { title: "V2EX", url: "https://www.v2ex.com", tags: ["社区", "生活"], icon: "fas fa-users" },
    { title: "MDN Web 文档", url: "https://developer.mozilla.org/zh-CN/", tags: ["开发", "文档"], icon: "fas fa-book" },
    { title: "阿里巴巴图标库", url: "https://www.iconfont.cn/", tags: ["设计", "工具"], icon: "fas fa-gem" },
    { title: "Unsplash (高清图)", url: "https://unsplash.com/", tags: ["设计", "图片"], icon: "fas fa-image" },
    { title: "哔哩哔哩", url: "https://www.bilibili.com", tags: ["娱乐", "视频"], icon: "fas fa-video" },
    { title: "YouTube", url: "https://www.youtube.com", tags: ["娱乐", "视频", "工具"], icon: "fab fa-youtube" },
    // **请在这里添加/修改你的自定义链接**
];

let activeTag = "全部"; // 当前激活的标签

// ==================== 标签和链接渲染逻辑 ====================

/**
 * 动态渲染标签按钮
 */
function renderTags() {
    const tagContainer = document.getElementById('tag-container');
    if (!tagContainer) return;

    // 1. 收集所有不重复的标签
    const allTags = new Set(["全部"]);
    linkData.forEach(item => {
        item.tags.forEach(tag => allTags.add(tag));
    });

    tagContainer.innerHTML = ''; 
    
    // 2. 生成标签按钮
    allTags.forEach(tag => {
        const button = document.createElement('button');
        button.className = `tag-button ${tag === activeTag ? 'active' : ''}`;
        button.textContent = tag;
        button.setAttribute('data-tag', tag);
        
        button.onclick = () => {
            activeTag = tag;
            renderTags(); // 重新激活标签样式
            renderLinks(); // 筛选链接
        };
        tagContainer.appendChild(button);
    });
}


/**
 * 动态渲染链接卡片
 */
function renderLinks() {
    const linksContainer = document.getElementById('links-container');
    if (!linksContainer) return;

    const fragment = document.createDocumentFragment();
    
    // 过滤链接
    const filteredLinks = linkData.filter(item => 
        activeTag === "全部" || item.tags.includes(activeTag)
    );

    if (filteredLinks.length === 0) {
        linksContainer.innerHTML = '<p class="no-links">当前标签下没有找到链接。</p>';
        return;
    }

    // 生成链接卡片 HTML
    filteredLinks.forEach(item => {
        const card = document.createElement('a');
        card.href = item.url;
        card.target = "_blank";
        card.className = "link-card";
        
        // 使用 FontAwesome 图标和标题
        card.innerHTML = `
            <i class="${item.icon || 'fas fa-link'}"></i>
            <span>${item.title}</span>
        `;
        fragment.appendChild(card);
    });

    linksContainer.innerHTML = ''; 
    linksContainer.appendChild(fragment);
}


// ==================== 辅助功能 (时间/搜索) ====================

/**
 * 实时显示当前时间
 */
function updateTime() {
    const now = new Date();
    const options = { 
        year: 'numeric', month: 'long', day: 'numeric', 
        weekday: 'long', hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
    };
    const timeString = now.toLocaleTimeString('zh-CN', options);
    
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}


/**
 * Google 搜索功能
 */
function performSearch() {
    const inputElement = document.getElementById('searchInput');
    const query = inputElement ? inputElement.value.trim() : '';

    if (query) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        inputElement.value = '';
    }
}


// ==================== 初始化函数和事件监听 ====================

document.addEventListener('DOMContentLoaded', () => {
    // 渲染初始内容
    renderTags();
    renderLinks();
    
    // 启动时间更新
    setInterval(updateTime, 1000);
    updateTime(); 

    // 绑定搜索回车键事件
    const inputElement = document.getElementById('searchInput');
    if (inputElement) {
        inputElement.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});