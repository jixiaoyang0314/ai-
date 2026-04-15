const allFaces = [
    { id: 1,  name: '老人 001', image: 'elderly-images/0093_c6s1_015076_00.jpg' },
    { id: 2,  name: '老人 002', image: 'elderly-images/0111_c5s1_019376_00.jpg' },
    { id: 3,  name: '老人 003', image: 'elderly-images/0113_c6s1_019426_00.jpg' },
    { id: 4,  name: '老人 004', image: 'elderly-images/0297_c6s1_066676_00.jpg' },
    { id: 5,  name: '老人 005', image: 'elderly-images/0534_c3s1_152058_00.jpg' },
    { id: 6,  name: '老人 006', image: 'elderly-images/0821_c3s2_102203_00.jpg' },
    { id: 7,  name: '老人 007', image: 'elderly-images/0908_c3s2_111303_00.jpg' },
    { id: 8,  name: '老人 008', image: 'elderly-images/1298_3.jpg' },
    { id: 9,  name: '老人 009', image: 'elderly-images/1313_c5s3_034390_00.jpg' },
    { id: 10, name: '老人 010', image: 'elderly-images/175_2.jpg' },
    { id: 11, name: '老人 011', image: 'elderly-images/386_1.jpg' },
    { id: 12, name: '老人 012', image: 'elderly-images/3DDE6CBA97D75FC3944D6ABA34EA4F1D.png' },
    { id: 13, name: '老人 013', image: 'elderly-images/96F2ACF0D7E6C73CD5BF5F1E523ADDF6.png' },
    { id: 14, name: '老人 014', image: 'elderly-images/屏幕截图 2026-03-26 215710.png' },
    { id: 15, name: '老人 015', image: 'elderly-images/屏幕截图 2026-03-29 224944.png' },
    { id: 16, name: '老人 016', image: 'elderly-images/BE28DB47704274288B0B0234BE2C65F2.png' },
    { id: 17, name: '老人 017', image: 'elderly-images/DA3A6F4C8BCCF5DB04F5451C14028719.png' },
    { id: 18, name: '老人 018', image: 'elderly-images/F3DAC2D360F2E52C6D2E06519ED8D93A.png' },
    { id: 19, name: '老人 019', image: 'elderly-images/白头发1.png' },
    { id: 20, name: '老人 020', image: 'elderly-images/白头发2.png' },
    { id: 21, name: '老人 021', image: 'elderly-images/白头发3.png' },
    { id: 22, name: '老人 022', image: 'elderly-images/白头发4.png' },
];

// 特征关键词映射：keyword -> 对应的图片 ID 列表
const featureMapping = {
    '白头发': [19, 20, 21, 22],
    '眼镜': [19, 20, 21, 22],
    '帽子': [9, 10, 11, 12],
    '口罩': [13, 14, 15, 16],
    '蓝色': [1, 5, 9, 13],
    '红色': [2, 6, 10, 14],
    '黑色': [3, 7, 11, 15],
    '灰色': [4, 8, 12, 16],
};

// 箭头指向坐标：keyword -> 每张图片对应的箭头 {startX%, startY%, endX%, endY%, label}
// startX/Y: 箭头起点（图片外），endX/Y: 箭头终点（指向特征）
const arrowPointers = {
    '白头发': [
        { startX: 90, startY: 35, endX: 50, endY: 38, label: '白头发' },
        { startX: 90, startY: 5, endX: 55, endY: 8, label: '白头发' },
        { startX: 90, startY: 5, endX: 60, endY: 8, label: '白头发' },
        { startX: 90, startY: 15, endX: 60, endY: 18, label: '白头发' },
    ],
    '眼镜': [
        { startX: 90, startY: 55, endX: 60, endY: 58, label: '眼镜' },
        null,
        null,
        null,
    ],
    '帽子': [
        { startX: 90, startY: 12, endX: 50, endY: 22, label: '帽子' },
        { startX: 90, startY: 12, endX: 50, endY: 22, label: '帽子' },
        { startX: 90, startY: 12, endX: 50, endY: 22, label: '帽子' },
        { startX: 90, startY: 12, endX: 50, endY: 22, label: '帽子' },
    ],
    '口罩': [
        { startX: 90, startY: 52, endX: 50, endY: 58, label: '口罩' },
        { startX: 90, startY: 52, endX: 50, endY: 58, label: '口罩' },
        { startX: 90, startY: 52, endX: 50, endY: 58, label: '口罩' },
        { startX: 90, startY: 52, endX: 50, endY: 58, label: '口罩' },
    ],
    '外套': [
        { startX: 90, startY: 75, endX: 50, endY: 80, label: '外套' },
        { startX: 90, startY: 75, endX: 50, endY: 80, label: '外套' },
        { startX: 90, startY: 75, endX: 50, endY: 80, label: '外套' },
        { startX: 90, startY: 75, endX: 50, endY: 80, label: '外套' },
    ],
};

function getSearchResults(query) {
    // 查找匹配的关键词
    const keywords = Object.keys(featureMapping);
    const matched = keywords.find(k => query.includes(k));
    
    if (matched) {
        const ids = featureMapping[matched];
        const base = [98, 91, 83, 74];
        return ids.map((id, i) => {
            const face = allFaces.find(f => f.id === id);
            return {
                ...face,
                match: base[i] + Math.floor(Math.random() * 3) - 1
            };
        });
    }
    
    // 没有匹配关键词时，返回最后4张
    const base = [97, 89, 81, 73];
    return allFaces.slice(-4).map((face, i) => ({
        ...face,
        match: base[i] + Math.floor(Math.random() * 3) - 1
    }));
}

let currentMode = 'all';
let currentQuery = '';

const gallery     = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');
const searchBtn   = document.getElementById('searchBtn');
const loading     = document.getElementById('loading');
const loadingProgressBar = document.getElementById('loadingProgressBar');
const loadingProgressText = document.getElementById('loadingProgressText');
const loadingFlashImage = document.getElementById('loadingFlashImage');
const resultCount = document.getElementById('resultCount');
const detailModal = document.getElementById('detailModal');
const detailClose = document.getElementById('detailClose');
const detailImg   = document.getElementById('detailImg');
const detailName  = document.getElementById('detailName');
const detailMatch = document.getElementById('detailMatch');
const detailId    = document.getElementById('detailId');

document.addEventListener('DOMContentLoaded', () => {
    renderGallery(allFaces);
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', e => { if (e.key === 'Enter') handleSearch(); });
    detailClose.addEventListener('click', closeModal);
    detailModal.addEventListener('click', e => { if (e.target === detailModal) closeModal(); });
});

function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        currentMode = 'all';
        currentQuery = '';
        gallery.classList.remove('search-mode');
        renderGallery(allFaces);
        resultCount.textContent = '显示全部';
        return;
    }
    currentMode = 'search';
    currentQuery = query;
    gallery.classList.add('search-mode');

    playSearchLoading(allFaces, 1800, () => {
        const results = getSearchResults(query);
        renderGallery(results);
        resultCount.textContent = `找到 ${results.length} 个匹配结果`;
    });
}

function playSearchLoading(sourceImages, duration, onComplete) {
    const images = sourceImages.map(item => item.image);
    let progress = 0;
    let imageIndex = 0;

    loading.classList.add('active');
    loadingProgressBar.style.width = '0%';
    loadingProgressText.textContent = '0%';
    loadingFlashImage.src = images[0] || '';

    const progressStep = 100 / (duration / 50);
    const progressTimer = setInterval(() => {
        progress = Math.min(100, progress + progressStep);
        loadingProgressBar.style.width = `${progress}%`;
        loadingProgressText.textContent = `${Math.round(progress)}%`;
    }, 50);

    const flashTimer = setInterval(() => {
        imageIndex = (imageIndex + 1) % images.length;
        loadingFlashImage.src = images[imageIndex];
    }, 120);

    setTimeout(() => {
        clearInterval(progressTimer);
        clearInterval(flashTimer);
        loadingProgressBar.style.width = '100%';
        loadingProgressText.textContent = '100%';
        setTimeout(() => {
            loading.classList.remove('active');
            onComplete();
        }, 120);
    }, duration);
}

function renderGallery(items) {
    gallery.innerHTML = '';
    const list = currentMode === 'search'
        ? [...items].sort((a, b) => b.match - a.match)
        : items;
    list.forEach((item, i) => {
        const el = document.createElement('div');
        el.className = 'gallery-item';
        el.style.animationDelay = `${i * 0.06}s`;
        el.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="gallery-item-image">
            <div class="gallery-item-info">
                <div class="gallery-item-name">${item.name}</div>
                ${item.match !== undefined
                    ? `<div class="gallery-item-match"><span class="match-badge">匹配度 ${item.match}%</span></div>`
                    : ''}
            </div>`;
        el.addEventListener('click', () => openModal(item, i));
        gallery.appendChild(el);
    });
}

function openModal(item, index) {
    detailImg.src  = item.image;
    detailImg.alt  = item.name;
    detailName.textContent  = item.name;
    detailMatch.textContent = item.match !== undefined ? `匹配度：${item.match}%` : '';
    detailId.textContent    = `ID: ${String(item.id).padStart(3, '0')}`;

    const oldArrows = detailModal.querySelectorAll('.arrow-pointer');
    oldArrows.forEach(a => a.remove());

    detailModal.classList.add('active');

    if (currentMode === 'search') {
        const keywords = Object.keys(arrowPointers);
        const matchedKeywords = keywords.filter(k => currentQuery.includes(k));
        const drawAll = () => {
            detailModal.querySelectorAll('.arrow-pointer').forEach(a => a.remove());
            matchedKeywords.forEach(keyword => {
                if (arrowPointers[keyword] && arrowPointers[keyword][index]) {
                    drawArrow(arrowPointers[keyword][index]);
                }
            });
        };

        if (detailImg.complete) {
            drawAll();
        } else {
            detailImg.onload = drawAll;
        }
    }
}

function drawArrow(arrow) {
    const container = detailImg.parentElement;
    container.style.position = 'relative';

    // 计算箭头坐标（相对于图片）
    const imgW = detailImg.offsetWidth;
    const imgH = detailImg.offsetHeight;
    const imgL = detailImg.offsetLeft;
    const imgT = detailImg.offsetTop;

    const startX = imgL + imgW * arrow.startX / 100;
    const startY = imgT + imgH * arrow.startY / 100;
    const endX = imgL + imgW * arrow.endX / 100;
    const endY = imgT + imgH * arrow.endY / 100;

    // 创建 SVG 箭头
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'arrow-pointer');
    svg.setAttribute('width', container.offsetWidth);
    svg.setAttribute('height', container.offsetHeight);
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.pointerEvents = 'none';
    svg.style.zIndex = '20';

    // 绘制折线箭头（从起点到终点，中间有折点）
    const midX = (startX + endX) / 2;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    line.setAttribute('class', 'arrow-line');
    line.setAttribute('points', `${startX},${startY} ${midX},${startY} ${endX},${endY}`);
    line.setAttribute('stroke', '#ff8c3c');
    line.setAttribute('stroke-width', '3');
    line.setAttribute('fill', 'none');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('stroke-linejoin', 'round');

    // 绘制箭头头部
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const arrowMarker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    arrowMarker.setAttribute('id', `arrowhead-${arrow.label}`);
    arrowMarker.setAttribute('markerWidth', '10');
    arrowMarker.setAttribute('markerHeight', '10');
    arrowMarker.setAttribute('refX', '9');
    arrowMarker.setAttribute('refY', '3');
    arrowMarker.setAttribute('orient', 'auto');
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', '0 0, 10 3, 0 6');
    polygon.setAttribute('fill', '#ff8c3c');
    arrowMarker.appendChild(polygon);
    marker.appendChild(arrowMarker);
    svg.appendChild(marker);

    line.setAttribute('marker-end', `url(#arrowhead-${arrow.label})`);
    svg.appendChild(line);

    // 添加标签（深黑色）
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', startX + 8);
    text.setAttribute('y', startY - 8);
    text.setAttribute('font-size', '14');
    text.setAttribute('font-weight', '700');
    text.setAttribute('fill', '#1a1a1a');
    text.textContent = arrow.label;
    svg.appendChild(text);

    container.appendChild(svg);
}

function closeModal() {
    detailModal.classList.remove('active');
    const oldArrows = detailModal.querySelectorAll('.arrow-pointer');
    oldArrows.forEach(a => a.remove());
}
