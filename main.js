/**
 * ==========================================
 * 河童捕獲局 - Main Engine (Version 1.0)
 * ==========================================
 */

// --- 1. データベース定義 ---

// 河童図鑑データ（全20種類・レア度6段階）
const KAPPA_DATA = [
    // N (ノーマル)
    { id: 'k01', name: 'ノーマル河童', rarity: 'N', desc: 'どこにでもいる普通の河童。口癖は「〜かっぱ」。', area: '清流' },
    { id: 'k02', name: '寝坊河童', rarity: 'N', desc: 'いつも皿が乾きかけている。遅刻の常習犯。', area: '浅瀬' },
    { id: 'k03', name: '長靴河童', rarity: 'N', desc: '捨てられた長靴に入り込んで魚を待つ面倒くさがり。', area: '水たまり' },
    { id: 'k04', name: '日焼け河童', rarity: 'N', desc: '夏休みを満喫しすぎて皿まで黒く焦げた。', area: '岸辺' },

    // R (レア)
    { id: 'k05', name: 'ギャル河童', rarity: 'R', desc: '皿にハイライトを入れている。きゅうりよりタピオカ派。', area: '映えスポット' },
    { id: 'k06', name: 'ラーメン河童', rarity: 'R', desc: '頭の皿をラーメンの器代わりに使っている。熱くないの？', area: '屋台裏' },
    { id: 'k07', name: '花粉症河童', rarity: 'R', desc: 'くしゃみの勢いで頭の皿の水が飛ぶ。春先によく逃げる。', area: '杉林近く' },
    { id: 'k08', name: '夜勤河童', rarity: 'R', desc: '目の下にクマがある。缶コーヒー（微糖）を好む。', area: '深夜の川' },

    // SR (スーパーレア)
    { id: 'k09', name: '筋トレ河童', rarity: 'SR', desc: '皿の水でプロテインを溶かして飲む猛者。腹筋がバキバキ。', area: '滝壺' },
    { id: 'k10', name: '社長河童', rarity: 'SR', desc: 'きゅうり農園を経営している。いつもスーツが濡れている。', area: '高級料亭の裏' },
    { id: 'k11', name: '泳げない河童', rarity: 'SR', desc: 'カナヅチ。浮き輪がないと川に入れない。', area: '浅瀬' },
    { id: 'k12', name: '雨男河童', rarity: 'SR', desc: '現れると必ず雨が降る。皿の水が減らないので無敵。', area: '雨の川岸' },

    // SSR (ダブルスーパーレア)
    { id: 'k13', name: 'AI河童', rarity: 'SSR', desc: 'ディープラーニングで捕獲パターンを学習済みの最新型。', area: '電脳空間' },
    { id: 'k14', name: '透明河童', rarity: 'SSR', desc: '気配を消せるが、頭の皿の水面だけが見えてバレる。', area: '霧の川' },
    { id: 'k15', name: '巨大河童', rarity: 'SSR', desc: '川をせき止めるレベルでかい。捕まえるというより遭遇。', area: '川の最深部' },

    // UR (ウルトラレア)
    { id: 'k16', name: 'Wi-Fi河童', rarity: 'UR', desc: '頭の皿から5G電波を放つ。近くにいると動画が爆速で読み込める。', area: '基地局近く' },
    { id: 'k17', name: '黄金河童', rarity: 'UR', desc: '全身が金ピカ。拝むと金運が上がるらしい（諸説あり）。', area: '幻の池' },
    { id: 'k18', name: '深夜限定河童', rarity: 'UR', desc: '丑三つ時にしか姿を見せない都市伝説的存在。', area: '草むら' },

    // KR (河童レア)
    { id: 'k19', name: '人間っぽい河童', rarity: 'KR', desc: '服を着て普通に電車通勤している。誰も気づかない。', area: '市役所前' },
    { id: 'k20', name: '始祖河童', rarity: 'KR', desc: '数百年前から生きている河童の長。神々しいオーラを纏う。', area: '源流' }
];

// 実績データ（全12種類）
const ACHIEVE_DATA = [
    { id: 'a01', title: '初捕獲', desc: '初めて河童を捕獲した。' },
    { id: 'a02', title: '100匹捕獲', desc: '河童を累計100匹捕獲した。' },
    { id: 'a03', title: '100回逃げられた', desc: '逃げられても諦めない強い心。' },
    { id: 'a04', title: '石しか押していない', desc: '石を50回調査した。川を愛する者。' },
    { id: 'a05', title: 'カエル博士', desc: 'カエルを10回見つけた。' },
    { id: 'a06', title: '河童に捕まった', desc: '逆に河童に調査された。' },
    { id: 'a07', title: '人間卒業', desc: '図鑑の半分以上を埋めた。' },
    { id: 'a08', title: 'きゅうりマスター', desc: 'きゅうりを累計100本集めた。' },
    { id: 'a09', title: 'タイトル連打魔', desc: 'タイトルロゴを5回連続でクリックした。' },
    { id: 'a10', title: '夜更かし調査員', desc: '深夜帯（23時〜4時）に遊んだ。' },
    { id: 'a11', title: 'ガチャ中毒', desc: 'きゅうり抽選会を10回引いた。' },
    { id: 'a12', title: '真の河童', desc: '図鑑をコンプリートした。' }
];

// 河童ニュース（ランダムテロップ用）
const NEWS_LIST = [
    "河童、自販機で涼む。",
    "河童、きゅうりを買い占める。",
    "河童、市役所へ行く。",
    "河童、花粉症になる。",
    "河童、泳げない。",
    "河童、フリーWi-Fiを開設。",
    "河童、プロテインの味で議論。",
    "河童、長靴をマイホームにする。",
    "河童、YouTubeチャンネルを開設。",
    "河童、人間観察日記を出版。"
];

// クリック時の通常調査テキスト一覧
const SEARCH_MESSAGES = [
    { text: "石だった。", type: "stone" },
    { text: "魚だった。すばしっこい！", type: "fish" },
    { text: "カエルだった。ケロケロ。", type: "frog" },
    { text: "長靴だった。片方だけ。", type: "boot" },
    { text: "靴下だった。湿っている…。", type: "sock" },
    { text: "きゅうりを獲得！新鮮！", type: "cucumber" },
    { text: "河童の足跡を発見！近いかも！", type: "trace" },
    { text: "皿の水が落ちている。生乾きだ。", type: "water" }
];

// きゅうり抽選会の景品アイテム
const LOTTERY_ITEMS = [
    { name: "🥒 きゅうり 3本", action: (state) => state.cucumbers += 3 },
    { name: "🥒 黄金のきゅうり (価値高)", action: (state) => state.cucumbers += 10 },
    { name: "👟 ボロボロの長靴", action: () => {} },
    { name: "🐸 カエルの置物", action: () => {} },
    { name: "✨ 信頼度アップ！(+10%)", action: (state) => state.trustLevel = Math.min(100, state.trustLevel + 10) }
];


// --- 2. ゲーム状態 (State) ---

let gameState = {
    cucumbers: 0,
    trustLevel: 0,       // 0〜100%
    pedia: {},           // { k01: 捕獲数, ... }
    achievements: {},    // { a01: true, ... }
    stats: {
        totalCaught: 0,
        totalEscaped: 0,
        stoneClicks: 0,
        frogFound: 0,
        lotteryCount: 0,
        playTime: 0
    },
    settings: {
        bgm: true,
        se: true
    },
    titleClickCount: 0
};


// --- 3. DOM要素キャプチャ ---

const screens = {
    title: document.getElementById('screen-title'),
    main: document.getElementById('screen-main'),
    pedia: document.getElementById('screen-pedia'),
    achieve: document.getElementById('screen-achieve'),
    lottery: document.getElementById('screen-lottery'),
    setting: document.getElementById('screen-setting')
};

const ui = {
    titleLogo: document.getElementById('title-logo'),
    newsText: document.getElementById('news-text'),
    cucumberCount: document.getElementById('cucumber-count'),
    trustLevel: document.getElementById('trust-level'),
    trustGaugeFill: document.getElementById('trust-gauge-fill'),
    logText: document.getElementById('log-text'),
    kappaTarget: document.getElementById('kappa-target'),
    kappaAvatar: document.getElementById('kappa-avatar'),
    pediaList: document.getElementById('pedia-list'),
    pediaCompletion: document.getElementById('pedia-completion'),
    achieveList: document.getElementById('achieve-list'),
    lotteryDisp: document.getElementById('lottery-disp'),
    btnDrawLottery: document.getElementById('btn-draw-lottery'),
    // 演出レイヤー
    overlayScary: document.getElementById('overlay-scary'),
    overlayCucumber: document.getElementById('overlay-cucumber'),
    overlayEnding: document.getElementById('overlay-ending'),
    endingMeeting: document.getElementById('ending-meeting'),
    endingFinal: document.getElementById('ending-final')
};


// --- 4. 初期化 & イベントバインド ---

function init() {
    loadGame();
    setupEventListeners();
    startNewsTicker();
    startPlayTimer();
    updateUI();
}

function setupEventListeners() {
    // タイトルロゴ隠しクリック
    ui.titleLogo.addEventListener('click', () => {
        gameState.titleClickCount++;
        if (gameState.titleClickCount >= 5) {
            unlockAchievement('a09');
            ui.logText.textContent = "【隠し要素】タイトルを連打した！";
        }
    });

    // 画面遷移ボタン
    document.getElementById('btn-start').addEventListener('click', () => switchScreen(screens.main));
    document.getElementById('btn-pedia').addEventListener('click', () => {
        renderPedia('ALL');
        switchScreen(screens.pedia);
    });
    document.getElementById('btn-achieve').addEventListener('click', () => {
        renderAchievements();
        switchScreen(screens.achieve);
    });
    document.getElementById('btn-lottery').addEventListener('click', () => switchScreen(screens.lottery));
    document.getElementById('btn-setting').addEventListener('click', () => switchScreen(screens.setting));

    document.getElementById('btn-back-title').addEventListener('click', () => switchScreen(screens.title));
    document.querySelectorAll('.btn-back').forEach(btn => {
        btn.addEventListener('click', () => switchScreen(screens.title));
    });

    // 川のフィールドクリック（調査）
    document.querySelectorAll('.field-item').forEach(item => {
        item.addEventListener('click', (e) => handleFieldClick(e.currentTarget.dataset.type));
    });

    // 河童クリック（捕獲判定）
    ui.kappaTarget.addEventListener('click', catchKappa);

    // 図鑑フィルター
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            renderPedia(e.currentTarget.dataset.rarity);
        });
    });

    // きゅうり抽選会ボタン
    ui.btnDrawLottery.addEventListener('click', drawLottery);

    // 設定ボタン関係
    document.getElementById('btn-save-game').addEventListener('click', () => {
        saveGame();
        alert('データを保存しました！');
    });
    document.getElementById('btn-reset-game').addEventListener('click', resetGame);

    // エンディング再開ボタン
    document.getElementById('btn-ending-restart').addEventListener('click', () => {
        ui.overlayEnding.classList.add('hidden');
        document.getElementById('page-title').textContent = "人間捕獲ゲーム";
        document.getElementById('title-logo').textContent = "人間捕獲局";
        document.getElementById('title-catchphrase').textContent = "人間はいます。問題は、きゅうりを渡すとすぐ油断することです。";
        switchScreen(screens.title);
    });
}


// --- 5. ゲーム進行 ＆ 調査ロジック ---

// 画面切り替え
function switchScreen(targetScreen) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    targetScreen.classList.add('active');
}

// ニュース更新
function startNewsTicker() {
    const changeNews = () => {
        const randomNews = NEWS_LIST[Math.floor(Math.random() * NEWS_LIST.length)];
        ui.newsText.textContent = randomNews;
    };
    changeNews();
    setInterval(changeNews, 12000);
}

// フィールド調査メイン関数
function handleFieldClick(type) {
    // 1. 超低確率ホラーイベント（約0.5%）
    if (Math.random() < 0.005) {
        triggerScaryEvent();
        return;
    }

    // 2. 超低確率きゅうり埋め尽くしイベント（約0.3%）
    if (Math.random() < 0.003) {
        triggerCucumberEvent();
        return;
    }

    // 3. 統計チェック
    if (type === 'stone') {
        gameState.stats.stoneClicks++;
        if (gameState.stats.stoneClicks >= 50) unlockAchievement('a04');
    }

    // 4. 河童出現判定（信頼度が高いほど確率上昇）
    const spawnRate = 0.15 + (gameState.trustLevel * 0.005);
    if (Math.random() < spawnRate && ui.kappaTarget.classList.contains('hidden')) {
        spawnKappa();
        return;
    }

    // 5. 通常ランダム調査イベント
    const result = SEARCH_MESSAGES[Math.floor(Math.random() * SEARCH_MESSAGES.length)];
    ui.logText.textContent = result.text;

    if (result.type === 'cucumber') {
        gameState.cucumbers++;
        if (gameState.cucumbers >= 100) unlockAchievement('a08');
    } else if (result.type === 'frog') {
        gameState.stats.frogFound++;
        if (gameState.stats.frogFound >= 10) unlockAchievement('a05');
    }

    updateUI();
    saveGame();
}

// 河童出現処理
function spawnKappa() {
    ui.logText.textContent = "あ！ 水面から怪しい影がとびだしてきた！";
    
    // ランダムな位置へ配置
    const top = Math.floor(Math.random() * 65) + 15;
    const left = Math.floor(Math.random() * 65) + 15;
    ui.kappaTarget.style.top = `${top}%`;
    ui.kappaTarget.style.left = `${left}%`;

    // 動きをつける
    ui.kappaAvatar.textContent = "🥒 (・∀・)";
    ui.kappaTarget.classList.remove('hidden');

    // 3秒後に逃走チェック
    setTimeout(() => {
        if (!ui.kappaTarget.classList.contains('hidden')) {
            if (Math.random() < 0.4) {
                ui.kappaTarget.classList.add('hidden');
                ui.logText.textContent = "スッ… 河童は速すぎる逃げ足で逃げ去った！";
                gameState.stats.totalEscaped++;
                if (gameState.stats.totalEscaped >= 100) unlockAchievement('a03');
                saveGame();
            }
        }
    }, 3000);
}

// 河童捕獲処理
function catchKappa() {
    ui.kappaTarget.classList.add('hidden');

    // 時間帯チェック (深夜判定: 23時〜4時)
    const hour = new Date().getHours();
    let availableKappas = KAPPA_DATA;
    if (hour >= 23 || hour < 4) {
        unlockAchievement('a10');
    }

    // ランダム選出 (レア度に応じた簡易重み付け)
    const selectedKappa = availableKappas[Math.floor(Math.random() * availableKappas.length)];

    // 図鑑・統計更新
    gameState.pedia[selectedKappa.id] = (gameState.pedia[selectedKappa.id] || 0) + 1;
    gameState.stats.totalCaught++;
    gameState.trustLevel = Math.min(100, gameState.trustLevel + 3);

    ui.logText.textContent = `【捕獲成功！】「${selectedKappa.name}（${selectedKappa.rarity}）」を捕まえた！`;

    // 実績判定
    unlockAchievement('a01');
    if (gameState.stats.totalCaught >= 100) unlockAchievement('a02');
    
    const caughtUniqueCount = Object.keys(gameState.pedia).length;
    if (caughtUniqueCount >= Math.floor(KAPPA_DATA.length / 2)) unlockAchievement('a07');
    if (caughtUniqueCount >= KAPPA_DATA.length) {
        unlockAchievement('a12');
        triggerEnding(); // コンプリートエンディング発動！
    }

    updateUI();
    saveGame();
}


// --- 6. 抽選会（ガチャ）---

function drawLottery() {
    if (gameState.cucumbers < 5) {
        alert('きゅうりが足りません！（5本必要です）');
        return;
    }

    gameState.cucumbers -= 5;
    gameState.stats.lotteryCount++;
    if (gameState.stats.lotteryCount >= 10) unlockAchievement('a11');

    ui.lotteryDisp.textContent = "🌀 ガラガラ…";
    
    setTimeout(() => {
        const item = LOTTERY_ITEMS[Math.floor(Math.random() * LOTTERY_ITEMS.length)];
        item.action(gameState);
        ui.lotteryDisp.textContent = item.name;
        updateUI();
        saveGame();
    }, 1000);
}


// --- 7. ドッキリ＆エンディング演出 ---

// ホラー「後ろ。」演出
function triggerScaryEvent() {
    ui.overlayScary.classList.remove('hidden');
    setTimeout(() => {
        ui.overlayScary.classList.add('hidden');
        ui.logText.textContent = "……気のせいだったようだ。";
    }, 1500);
}

// きゅうり埋め尽くし演出
function triggerCucumberEvent() {
    ui.overlayCucumber.classList.remove('hidden');
    ui.logText.textContent = "画面全体がきゅうりで埋め尽くされた！！";
    setTimeout(() => {
        ui.overlayCucumber.classList.add('hidden');
        gameState.cucumbers += 20;
        updateUI();
    }, 2000);
}

// コンプリートエンディング演出
function triggerEnding() {
    ui.overlayEnding.classList.remove('hidden');
    ui.endingMeeting.classList.remove('hidden');
    ui.endingFinal.classList.add('hidden');

    setTimeout(() => {
        ui.endingMeeting.innerHTML = "<p>「あの人間、全員捕まえちゃったよ…」</p>";
    }, 2500);

    setTimeout(() => {
        ui.endingMeeting.innerHTML = "<p>「もう仲間にするしかないんじゃないか？」</p>";
    }, 5000);

    setTimeout(() => {
        ui.endingMeeting.classList.add('hidden');
        ui.endingFinal.classList.remove('hidden');
    }, 7500);
}


// --- 8. UI描画 ＆ 実績・図鑑更新 ---

function updateUI() {
    ui.cucumberCount.textContent = gameState.cucumbers;
    ui.trustLevel.textContent = gameState.trustLevel;
    ui.trustGaugeFill.style.width = `${gameState.trustLevel}%`;
}

// 図鑑描画
function renderPedia(rarityFilter = 'ALL') {
    ui.pediaList.innerHTML = '';
    let caughtCount = 0;

    KAPPA_DATA.forEach(kappa => {
        const count = gameState.pedia[kappa.id] || 0;
        if (count > 0) caughtCount++;

        // フィルター処理
        if (rarityFilter !== 'ALL' && kappa.rarity !== rarityFilter) return;

        const card = document.createElement('div');
        card.className = `pedia-card ${count === 0 ? 'locked' : ''}`;
        
        if (count > 0) {
            card.innerHTML = `
                <span class="rarity-badge rarity-${kappa.rarity}">${kappa.rarity}</span>
                <h3 style="margin-top:12px;">${kappa.name}</h3>
                <p style="font-size:0.75rem; color:#666; margin:4px 0;">${kappa.desc}</p>
                <p style="font-size:0.7rem; color:#888;">発見場所: ${kappa.area}</p>
                <p style="font-size:0.75rem; font-weight:bold; margin-top:4px;">捕獲数: ${count}</p>
            `;
        } else {
            card.innerHTML = `
                <span class="rarity-badge">${kappa.rarity}</span>
                <h3 style="margin-top:12px; color:#aaa;">？？？</h3>
                <p style="font-size:0.75rem; color:#aaa; margin:4px 0;">未発見の河童</p>
            `;
        }
        ui.pediaList.appendChild(card);
    });

    ui.pediaCompletion.textContent = `発見率: ${caughtCount} / ${KAPPA_DATA.length}`;
}

// 実績描画
function renderAchievements() {
    ui.achieveList.innerHTML = '';
    
    ACHIEVE_DATA.forEach(achieve => {
        const isUnlocked = gameState.achievements[achieve.id];
        const item = document.createElement('div');
        item.className = 'achieve-item';
        item.style.opacity = isUnlocked ? '1' : '0.5';

        item.innerHTML = `
            <div>
                <h4 style="color:${isUnlocked ? '#4f8029' : '#666'};">${isUnlocked ? '🏆 ' : '🔒 '}${achieve.title}</h4>
                <p style="font-size:0.75rem; color:#666;">${achieve.desc}</p>
            </div>
            <span>${isUnlocked ? '達成！' : '未達成'}</span>
        `;
        ui.achieveList.appendChild(item);
    });
}

// 実績解除判定関数
function unlockAchievement(id) {
    if (!gameState.achievements[id]) {
        gameState.achievements[id] = true;
        const achieve = ACHIEVE_DATA.find(a => a.id === id);
        if (achieve) {
            ui.logText.textContent = `🏆 実績解除！【${achieve.title}】`;
        }
        saveGame();
    }
}


// --- 9. セーブ・ロード・タイマー ---

function startPlayTimer() {
    setInterval(() => {
        gameState.stats.playTime++;
        // 100時間 = 360000秒プレイ実績（デモ用チェック）
        if (gameState.stats.playTime >= 360000) unlockAchievement('a12');
    }, 1000);
}

function saveGame() {
    localStorage.setItem('kappa_capture_game_v1', JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem('kappa_capture_game_v1');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            gameState = { ...gameState, ...parsed };
        } catch (e) {
            console.error('Save data load error:', e);
        }
    }
}

function resetGame() {
    if (confirm('本当に対策データを消去してリセットしますか？')) {
        localStorage.removeItem('kappa_capture_game_v1');
        location.reload();
    }
}

// ゲーム起動
window.addEventListener('DOMContentLoaded', init);
