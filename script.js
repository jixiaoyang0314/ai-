const regionData = {
    '北京市': {
        '北京市': ['海淀区', '朝阳区', '西城区']
    },
    '上海市': {
        '上海市': ['浦东新区', '黄浦区']
    },
    '广东省': {
        '广州市': ['天河区', '越秀区'],
        '深圳市': ['南山区', '福田区']
    }
};

const haidianVideos = [
    {
        id: 1,
        title: '海淀区 · 中关村西区 01 号点位',
        time: '2026-04-14 10:21:33',
        cameraId: 'CAM-HD-001',
        video: 'video/Browse4.webm'
    },
    {
        id: 2,
        title: '海淀区 · 五道口地铁口 02 号点位',
        time: '2026-04-14 10:22:07',
        cameraId: 'CAM-HD-002',
        video: 'video/EnterExitCrossingPaths2cor.webm'
    },
    {
        id: 3,
        title: '海淀区 · 苏州街路口 03 号点位',
        time: '2026-04-14 10:22:40',
        cameraId: 'CAM-HD-003',
        video: 'video/WalkByShop1cor.webm'
    },
    {
        id: 4,
        title: '海淀区 · 海淀黄庄东侧 04 号点位',
        time: '2026-04-14 10:23:02',
        cameraId: 'CAM-HD-004',
        video: 'video/WalkByShop1front.webm'
    }
];

const featureMapping = {
    '眼镜': [24, 12, 26, 2],
    '背包': [24, 12, 26, 2],
    '黑色外套': [24, 12, 26, 2],
};

const allFaces = [
    { id: 1,  name: '目标人物 001', image: 'criminal-images/131_1.jpg' },
    { id: 2,  name: '目标人物 002', image: 'criminal-images/135_1.jpg' },
    { id: 3,  name: '目标人物 003', image: 'criminal-images/407_3.jpg' },
    { id: 4,  name: '目标人物 004', image: 'criminal-images/420_1.jpg' },
    { id: 5,  name: '目标人物 005', image: 'criminal-images/439_4.jpg' },
    { id: 6,  name: '目标人物 006', image: 'criminal-images/492_3.jpg' },
    { id: 7,  name: '目标人物 007', image: 'criminal-images/492_4.jpg' },
    { id: 8,  name: '目标人物 008', image: 'criminal-images/499_1.jpg' },
    { id: 9,  name: '目标人物 009', image: 'criminal-images/587_2.jpg' },
    { id: 10, name: '目标人物 010', image: 'criminal-images/619_3.jpg' },
    { id: 11, name: '目标人物 011', image: 'criminal-images/690_3.jpg' },
    { id: 12, name: '目标人物 012', image: 'criminal-images/698_1.jpg' },
    { id: 13, name: '目标人物 013', image: 'criminal-images/735_3.jpg' },
    { id: 14, name: '目标人物 014', image: 'criminal-images/736_2.jpg' },
    { id: 15, name: '目标人物 015', image: 'criminal-images/79_2.jpg' },
    { id: 16, name: '目标人物 016', image: 'criminal-images/819_1.jpg' },
    { id: 17, name: '目标人物 017', image: 'criminal-images/84_4.jpg' },
    { id: 18, name: '目标人物 018', image: 'criminal-images/857_1.jpg' },
    { id: 19, name: '目标人物 019', image: 'criminal-images/859_3.jpg' },
    { id: 20, name: '目标人物 020', image: 'criminal-images/862_4.jpg' },
    { id: 21, name: '目标人物 021', image: 'criminal-images/883_3.jpg' },
    { id: 22, name: '目标人物 022', image: 'criminal-images/919_3.jpg' },
    { id: 23, name: '目标人物 023', image: 'criminal-images/8e26419388f2d323433fefffc7fbbbce_720.jpg' },
    { id: 24, name: '目标人物 024', image: 'criminal-images/96_2.jpg' },
    { id: 25, name: '目标人物 025', image: 'criminal-images/97_4.jpg' },
    { id: 26, name: '目标人物 026', image: 'criminal-images/922_4.jpg' }
];

const provinceSelect = document.getElementById('provinceSelect');
const citySelect = document.getElementById('citySelect');
const districtSelect = document.getElementById('districtSelect');
const regionSummary = document.getElementById('regionSummary');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const loading = document.getElementById('loading');
const loadingProgressBar = document.getElementById('loadingProgressBar');
const loadingProgressText = document.getElementById('loadingProgressText');
const loadingFlashImage = document.getElementById('loadingFlashImage');
const resultCount = document.getElementById('resultCount');
const imageResultCount = document.getElementById('imageResultCount');
const videoGrid = document.getElementById('videoGrid');
const gallery = document.getElementById('gallery');
const emptyState = document.getElementById('emptyState');
const imageEmptyState = document.getElementById('imageEmptyState');

const loadingImages = [
    'criminal-images/131_1.jpg',
    'criminal-images/420_1.jpg',
    'criminal-images/698_1.jpg',
    'criminal-images/862_4.jpg',
    'criminal-images/96_2.jpg'
];

document.addEventListener('DOMContentLoaded', () => {
    populateCities();
    updateRegionSummary();
    initUser();
    renderImages([]);
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    provinceSelect.addEventListener('change', handleProvinceChange);
    citySelect.addEventListener('change', handleCityChange);
    districtSelect.addEventListener('change', updateRegionSummary);
});

function handleProvinceChange() {
    populateCities();
    populateDistricts();
    updateRegionSummary();
}

function handleCityChange() {
    populateDistricts();
    updateRegionSummary();
}

function populateCities() {
    const province = provinceSelect.value;
    citySelect.innerHTML = '<option value="">请选择城市</option>';
    districtSelect.innerHTML = '<option value="">请选择区县</option>';

    if (!province || !regionData[province]) return;

    Object.keys(regionData[province]).forEach((city) => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
}

function populateDistricts() {
    const province = provinceSelect.value;
    const city = citySelect.value;
    districtSelect.innerHTML = '<option value="">请选择区县</option>';

    if (!province || !city || !regionData[province] || !regionData[province][city]) return;

    regionData[province][city].forEach((district) => {
        const option = document.createElement('option');
        option.value = district;
        option.textContent = district;
        districtSelect.appendChild(option);
    });
}

function updateRegionSummary() {
    const province = provinceSelect.value;
    const city = citySelect.value;
    const district = districtSelect.value;

    if (!province || !city || !district) {
        regionSummary.textContent = '当前未选择有效区域';
        return;
    }

    regionSummary.textContent = `当前区域：${province} / ${city} / ${district}`;
}

function handleSearch() {
    const province = provinceSelect.value;
    const city = citySelect.value;
    const district = districtSelect.value;
    const query = searchInput.value.trim();

    playSearchLoading(loadingImages, 1800, () => {
        if (province && city && district) {
            const videos = getVideoResults(province, city, district);
            renderVideos(videos);
            resultCount.textContent = videos.length ? `已调取 ${videos.length} 路视频` : '暂无相关视频';
        } else {
            renderVideos([]);
            resultCount.textContent = '请选择完整地区';
        }

        if (query) {
            const imageResults = getImageResults(query);
            renderImages(imageResults);
            imageResultCount.textContent = imageResults.length ? `找到 ${imageResults.length} 个匹配结果` : '暂无人物结果';
        } else {
            renderImages([]);
            imageResultCount.textContent = '等待特征检索';
        }
    });
}

function getImageResults(query) {
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

    const base = [98, 91, 83, 74];
    return allFaces.slice(-4).map((face, i) => ({
        ...face,
        match: base[i] + Math.floor(Math.random() * 3) - 1
    }));
}

function getVideoResults(province, city, district) {
    if (province === '北京市' && city === '北京市' && district === '海淀区') {
        return haidianVideos;
    }
    return [];
}

function playSearchLoading(sourceImages, duration, onComplete) {
    let progress = 0;
    let imageIndex = 0;

    loading.classList.add('active');
    loadingProgressBar.style.width = '0%';
    loadingProgressText.textContent = '0%';
    loadingFlashImage.src = sourceImages[0] || '';

    const progressStep = 100 / (duration / 50);
    const progressTimer = setInterval(() => {
        progress = Math.min(100, progress + progressStep);
        loadingProgressBar.style.width = `${progress}%`;
        loadingProgressText.textContent = `${Math.round(progress)}%`;
    }, 50);

    const flashTimer = setInterval(() => {
        imageIndex = (imageIndex + 1) % sourceImages.length;
        loadingFlashImage.src = sourceImages[imageIndex];
    }, 180);

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

function renderImages(items) {
    gallery.innerHTML = '';

    if (!items.length) {
        imageEmptyState.style.display = 'flex';
        gallery.style.display = 'none';
        return;
    }

    imageEmptyState.style.display = 'none';
    gallery.style.display = 'grid';

    items.forEach((item, index) => {
        const el = document.createElement('div');
        el.className = 'gallery-item';
        el.style.animationDelay = `${index * 0.06}s`;
        el.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="gallery-item-image">
            <div class="gallery-item-info">
                <div class="gallery-item-name">${item.name}</div>
                <div class="gallery-item-match"><span class="match-badge">匹配度 ${item.match}%</span></div>
            </div>`;
        gallery.appendChild(el);
    });
}

function renderVideos(items) {
    videoGrid.innerHTML = '';

    if (!items.length) {
        emptyState.style.display = 'flex';
        videoGrid.style.display = 'none';
        return;
    }

    emptyState.style.display = 'none';
    videoGrid.style.display = 'grid';

    items.forEach((item, index) => {
        const card = document.createElement('article');
        card.className = 'video-card';
        card.style.animationDelay = `${index * 0.08}s`;
        card.innerHTML = `
            <div class="video-frame">
                <video class="monitor-video" src="${item.video}" autoplay muted loop playsinline preload="auto"></video>
                <span class="video-live-badge">LIVE</span>
            </div>
            <div class="video-card-body">
                <div class="video-card-title">${item.title}</div>
                <div class="video-card-meta">
                    <span>${item.time}</span>
                    <span class="video-camera-id">${item.cameraId}</span>
                </div>
            </div>
        `;
        videoGrid.appendChild(card);

        const video = card.querySelector('.monitor-video');
        if (video) {
            const startPlayback = () => {
                const jumpAndPlay = () => {
                    try {
                        if (video.duration && video.duration > 3) {
                            video.currentTime = 3;
                        }
                    } catch (e) {}
                    video.play().catch(() => {});
                };

                if (video.readyState >= 2) {
                    jumpAndPlay();
                } else {
                    video.addEventListener('loadeddata', jumpAndPlay, { once: true });
                }

                setTimeout(() => {
                    if (video.paused) {
                        jumpAndPlay();
                    }
                }, 500);
            };

            video.muted = true;
            video.defaultMuted = true;
            video.autoplay = true;
            video.playsInline = true;
            video.loop = true;

            video.addEventListener('canplay', startPlayback, { once: true });
            video.load();
        }
    });
}

function initUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    const container = document.getElementById('userContainer');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    const logoutBtn = document.getElementById('logoutBtn');
    if (!container) return;
    container.innerHTML = '';

    if (user) {
        const avatar = document.createElement('div');
        avatar.className = 'user-avatar';
        avatar.innerHTML = `<img src="${user.avatar}" alt="${user.username}">`;
        avatar.onclick = (e) => {
            e.stopPropagation();
            userMenu.classList.toggle('active');
        };
        container.appendChild(avatar);
        userName.textContent = user.username;
        logoutBtn.onclick = () => {
            localStorage.removeItem('user');
            window.location.href = 'login.html';
        };
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-avatar') && !e.target.closest('.user-menu')) {
                userMenu.classList.remove('active');
            }
        });
    } else {
        const loginBtn = document.createElement('a');
        loginBtn.href = 'login.html';
        loginBtn.className = 'nav-login';
        loginBtn.textContent = '登录';
        container.appendChild(loginBtn);
    }
}
