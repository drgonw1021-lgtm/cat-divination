/* 魔法学院测格 · 网页版（由 _build_web.py 从 dist 生成，不要直接改这个目录）
   基线 Chrome 61 / ES2017；经典脚本直接执行，不使用 ES 模块语法与顶层 await。 */
(function () {
  'use strict';

  /* ============ 四维轴 ============ */
  var AXES = [
    { key: 'a1', sym: '⚡', name: '面对世界', a: '闯', b: '守', desc: '先冲上去，还是先看清' },
    { key: 'a2', sym: '❤', name: '做决定', a: '心', b: '脑', desc: '凭直觉和感情，还是凭分析和道理' },
    { key: 'a3', sym: '👥', name: '人群里', a: '群', b: '单', desc: '越热闹越有电，还是人多了耗电' },
    { key: 'a4', sym: '✨', name: '表达', a: '闹', b: '稳', desc: '气氛担当，还是定海神针' }
  ];

  /* ============ 题库 4 轴 × 4 题 ============ */
  var BANK = [
    { s: '雨夜发现一条被禁止进入的走廊', o: [
      { t: '先进去看看，被抓了再说', v: '闯', h: 'gry' },
      { t: '先搞清楚为什么被禁止', v: '守', h: 'rav' }] },
    { s: '朋友被高年级欺负', o: [
      { t: '当场站出来怼回去', v: '闯', h: 'gry' },
      { t: '记下时间地点，找教授', v: '守', h: 'sly' }] },
    { s: '分院帽把你分错了学院', o: [
      { t: '无所谓，在哪里都能活好', v: '守', h: 'huf' },
      { t: '当场跟帽子辩论三百回合', v: '闯', h: 'rav' }] },
    { s: '魔药课考试，斯内普在监考', o: [
      { t: '提前三周开始准备', v: '守', h: 'rav' },
      { t: '先赌他会提问我，专攻问答', v: '闯', h: 'sly' }] },

    { s: '朋友被费尔奇抓住，正在求救', o: [
      { t: '先想想出去会不会连累自己', v: '脑', h: 'sly' },
      { t: '脑子还没想完，腿已经过去了', v: '心', h: 'gry' }] },
    { s: '有人送你一瓶没有标签的魔药', o: [
      { t: '先查配方和来源再说', v: '脑', h: 'rav' },
      { t: '直觉告诉我可以，就喝', v: '心', h: 'huf' }] },
    { s: '要在一群陌生人里选队友', o: [
      { t: '选看起来最靠谱、能力最强的', v: '脑', h: 'sly' },
      { t: '选第一个对我笑的人', v: '心', h: 'huf' }] },
    { s: '活点地图显示你讨厌的人在往这走', o: [
      { t: '先想清楚他找我干嘛', v: '脑', h: 'rav' },
      { t: '先把旁边打瞌睡的人拖走', v: '心', h: 'huf' }] },

    { s: '公共休息室的壁炉边坐满了人', o: [
      { t: '挤进去，热闹才是格兰芬多', v: '群', h: 'gry' },
      { t: '回寝室，图书馆角落也一样', v: '单', h: 'rav' }] },
    { s: '魁地奇决赛，你通常在', o: [
      { t: '球场人群里，喊到嗓子哑', v: '群', h: 'huf' },
      { t: '看台最高处，一个人看全局', v: '单', h: 'sly' }] },
    { s: '圣诞派对的安排', o: [
      { t: '组一个十人以上的大桌', v: '群', h: 'gry' },
      { t: '和两三个人待着最舒服', v: '单', h: 'huf' }] },
    { s: '在礼堂吃饭', o: [
      { t: '坐长桌中间，谁都能搭话', v: '群', h: 'huf' },
      { t: '坐桌子末端，观察全场', v: '单', h: 'sly' }] },

    { s: '你想对费尔奇的办公室做什么', o: [
      { t: '放一把会唱歌的烟火', v: '闹', h: 'gry' },
      { t: '不动，让他自己出丑', v: '稳', h: 'sly' }] },
    { s: '被教授当众表扬', o: [
      { t: '替全班多要一次加分', v: '闹', h: 'huf' },
      { t: '微微点头，回去继续做', v: '稳', h: 'rav' }] },
    { s: '拿到了活点地图', o: [
      { t: '立刻去整人，机会不等人', v: '闹', h: 'gry' },
      { t: '先研究三个月规律再用', v: '稳', h: 'rav' }] },
    { s: '韦斯莱双子的笑话店', o: [
      { t: '我是他们的供应商', v: '闹', h: 'gry' },
      { t: '我是他们的投资人', v: '稳', h: 'sly' }] }
  ];

  /* ============ 学院 ============ */
  var HOUSES = {
    gry: { name: '格兰芬多', color: '#ae0001', emoji: '🦁', line: '勇气与莽撞只隔一步，你选的那一步通常很快。' },
    sly: { name: '斯莱特林', color: '#2d4c3a', emoji: '🐍', line: '你清楚自己要什么，也愿意等一个最好的时机。' },
    rav: { name: '拉文克劳', color: '#222f50', emoji: '🦅', line: '先把世界想明白，再决定要不要参与。' },
    huf: { name: '赫奇帕奇', color: '#ecb939', emoji: '🦡', line: '不抢镜头，但所有人在关键时刻都会回头找你。' }
  };
  var HOUSE_ORDER = ['gry', 'sly', 'rav', 'huf'];

  /* ============ 16 角色：key = [a1,a2,a3,a4]，1 = 闯/心/群/闹 ============ */
  var CHARS = {
    '1111': { n: '韦斯莱双子', en: 'Fred & George', face: '🎭', tag: '全校的天花板，校规的地板',
      verdict: '四条轴全开。你负责让所有人笑，顺便把规矩拆了重建。',
      eyes: '有你在的地方就不会冷场', shade: '没人问过你不开玩笑的时候在干嘛',
      patronus: '狗 · 你逗乐所有人，但真正难过时只有彼此能懂', wand: '樱桃木 · 魔杖喜欢恶作剧，和主人一模一样', canon: '纯恶作剧浓度 6.25%' },
    '1110': { n: '哈利·波特', en: 'Harry Potter', face: '⚡', tag: '不是勇敢，是放不下别人',
      verdict: '冲得快、凭真心、需要伙伴、但关键时刻比谁都稳。你就是那个被命运推着走的人。',
      eyes: '好像很幸运，其实只是不肯退', shade: '你把“扛下来”当成默认设置，连求助都觉得是麻烦别人',
      patronus: '牡鹿 · 你守护的东西比你想的更具体', wand: '冬青木 · 注定要回击的那根', canon: '主角浓度 6.25%' },
    '1101': { n: '卢娜·洛夫古德', en: 'Luna Lovegood', face: '🌙', tag: '别人说她怪，她说你看不见而已',
      verdict: '敢闯、凭直觉、一个人也自在、还毫不掩饰地有趣。你是少数活得完全不怕尴尬的人。',
      eyes: '有点飘，但莫名安心', shade: '你用“不在乎”保护自己太熟练，熟练到别人忘了你也会受伤',
      patronus: '水兔 · 活在自己世界的人，反而最不容易被恐惧打倒', wand: '核桃木 · 有时专心得惊人，包括对别人', canon: '通透浓度 6.25%' },
    '1100': { n: '纳威·隆巴顿', en: 'Neville Longbottom', face: '🌱', tag: '最胆小的人，最后拔剑',
      verdict: '敢冲、凭真心、独处、稳。你不是天生勇敢，你是慢慢长出来的 —— 这种勇气更贵。',
      eyes: '慢半拍，但很可靠', shade: '你总等别人先肯定你，其实你早就够了',
      patronus: '没有固定形态 · 有些人的守护神要等他自己长大', wand: '樱桃木 · 适合草药学，也适合开窍晚的人', canon: '大器晚成浓度 6.25%' },
    '1011': { n: '赫敏·格兰杰', en: 'Hermione Granger', face: '📚', tag: '恐惧的解药是准备到十分',
      verdict: '敢闯、爱热闹、闲不住，但每一步都靠脑子。你是那种“我查过了，听我的”的人。',
      eyes: '聪明到有点吓人', shade: '你不允许自己不会，不会就焦虑',
      patronus: '水獭 · 聪明又爱玩，只是你不太允许自己玩', wand: '葡萄藤木 · 天生赢家，而且真的会赢', canon: '学霸浓度 6.25%' },
    '1010': { n: '麦格教授', en: 'Minerva McGonagall', face: '🐈', tag: '最硬的规矩，包着最软的心',
      verdict: '敢闯、讲道理、合群、稳。你是那种会为别人破例，但绝不承认破例的人。',
      eyes: '有点怕她，但出事第一个找她', shade: '你把责任当成身份，一放下就觉得自己没用了',
      patronus: '猫 · 你可以变成任何人，但没人变出你的休息日', wand: '紫杉木 · 能攻能守，全靠自己撑', canon: '靠谱浓度 6.25%' },
    '1001': { n: '秋·张', en: 'Cho Chang', face: '🕊', tag: '哭过，也真的重新站起来过',
      verdict: '敢闯、讲道理、喜欢热闹、表达直接。你不是脆弱，你只是不肯假装没事。',
      eyes: '很受欢迎，也很被误解', shade: '别人记住你哭的那次，没记住你站起来的那次',
      patronus: '天鹅 · 受过伤还愿意重新开始的类型', wand: '柳木 · 有时需要一根能带来好运的魔杖', canon: '韧性浓度 6.25%' },
    '1000': { n: '罗恩·韦斯莱', en: 'Ron Weasley', face: '♟', tag: '永远在主角旁边，永远是真的',
      verdict: '敢闯、讲道理、爱热闹、但稳。你是那个嘴上抱怨、身体却很诚实地跟上去的人。',
      eyes: '好笑、可靠、有点容易被忽略', shade: '你习惯把自己排后面，久了别人以为你不需要被排前面',
      patronus: '杰克罗素梗 · 忠诚、有点闹、永远跟着那头牡鹿', wand: '白蜡木 · 和主人一样，忠诚到一根筋', canon: '兄弟浓度 6.25%' },
    '0111': { n: '金妮·韦斯莱', en: 'Ginny Weasley', face: '🧹', tag: '最会开玩笑的人，下手也最准',
      verdict: '先看清、凭真心、爱热闹、气氛担当。你是那种笑着把蝙蝠咒塞进对方书包的人。',
      eyes: '好相处，但别惹', shade: '你把“我能扛”演得太自然，结果所有人都信了',
      patronus: '马 · 你需要的不是缰绳，是开阔地', wand: '紫杉木 · 攻击与防御兼具，一般主人也这样', canon: '反差浓度 6.25%' },
    '0110': { n: '塞德里克·迪戈里', en: 'Cedric Diggory', face: '🏆', tag: '强，而且真的公平',
      verdict: '先看清、凭真心、合群、稳。你是那种赢了比赛还会要求重赛的人。',
      eyes: '几乎挑不出毛病', shade: '你太在意“做得对不对”，常常轮到自己就犹豫',
      patronus: '没有记录 · 有些人的好，来不及被写下来', wand: '白蜡木 · 只选一个主人，选了就是一辈子', canon: '体面浓度 6.25%' },
    '0101': { n: '海格', en: 'Rubeus Hagrid', face: '🐗', tag: '被说废物的人，活成了最暖的人',
      verdict: '先看清、凭真心、独处、但外放。你只对“自己人”敞开，而且敞开得毫无保留。',
      eyes: '看着吓人，其实最好骗', shade: '你保护所有人，唯独不让自己需要被保护',
      patronus: '野猪 · 你护着的东西比你大十倍', wand: '橡木 · 适合农林和占卜，也适合守护', canon: '温柔浓度 6.25%' },
    '0100': { n: '多比', en: 'Dobby', face: '🧦', tag: '自由不是别人给的，是自己挣的',
      verdict: '先看清、凭真心、一个人、稳。你话不多，但答应过的事会做到，哪怕代价很大。',
      eyes: '有点怯，但异常坚定', shade: '你习惯先确认自己“配不配”，很多事就错过了',
      patronus: '没有 · 但一只袜子，比任何守护神都难得到', wand: '无 · 自由不是配给你的，是你自己拿的', canon: '自由浓度 6.25%' },
    '0011': { n: '卢修斯·马尔福', en: 'Lucius Malfoy', face: '🪶', tag: '一生都在选赢家',
      verdict: '先看清、讲道理、合群、外放。你最擅长的是场面 —— 场面里全是算计。',
      eyes: '优雅，但让人不敢靠近', shade: '你最该站队的那一次，你跑了。体面是信仰，也是牢笼',
      patronus: '雪貂 · 据说连守护神都怕主人', wand: '榆木 · 适合追求更高目标的人，你一直在追', canon: '体面浓度 6.25%' },
    '0010': { n: '邓布利多', en: 'Albus Dumbledore', face: '🔥', tag: '聪明人犯的错，代价最大',
      verdict: '先看清、讲道理、合群、稳。你是那种所有人都来找你，但你谁都不告诉的人。',
      eyes: '看不透，但莫名可信', shade: '你习惯当所有人的答案，包括别人的，唯独不是自己的',
      patronus: '凤凰 · 只有一个人能让它出现，他死后它就没了', wand: '接骨木 · 拿到它的人，都要先回答一个问题', canon: '秘密浓度 6.25%' },
    '0001': { n: '泰迪·卢平', en: 'Teddy Lupin', face: '🎨', tag: '出身不是判决书',
      verdict: '先看清、讲道理、独处、外放。你变来变去，但每一面都是自己选的。',
      eyes: '有点难捉摸，但很有想法', shade: '你太习惯“适应别人”，很少让人看到默认状态',
      patronus: '会变形的 · 混血狼人，形态由心情决定', wand: '没有固定 · 有些人的配置天生就不止一套', canon: '重生浓度 6.25%' },
    '0000': { n: '西弗勒斯·斯内普', en: 'Severus Snape', face: '🦌', tag: '演了一辈子反派，只有一个观众',
      verdict: '先看清、讲道理、独处、稳。你把所有情绪都锁在“专业”后面，锁得太好了。',
      eyes: '严厉，偏心，看不透', shade: '你用一句“Always”憋了一辈子 —— 有些真相不说出来，就只是惩罚自己',
      patronus: '母鹿 · 因为一个人，而且一辈子没变过', wand: '没有记录 · 有些人的故事不靠魔杖讲', canon: '隐忍浓度 6.25%' }
  };
  var CODES = Object.keys(CHARS).sort();

  /* 角色在原著里的学院，用于和分院结果对比 */
  var CANON_HOUSE = {
    '1111': 'gry', '1110': 'gry', '1101': 'rav', '1100': 'gry',
    '1011': 'gry', '1010': 'gry', '1001': 'rav', '1000': 'gry',
    '0111': 'gry', '0110': 'huf', '0101': 'gry', '0100': '',
    '0011': 'sly', '0010': 'gry', '0001': 'huf', '0000': 'sly'
  };

  var SPELLS = ['除你武器', '荧光闪烁', '呼神护卫', '恢复如初', '咧嘴呼啦啦', '阿拉霍洞开', '速速前来', '皮皮鬼走开'];

  /* ============ 端能力封装 ============ */
  var VER = { STORAGE: 9460, WINDOW: 9490, COMMENT: 9490, VIBRATE: 9500, SHARE: 9530, ALBUM: 9420 };
  var buildVersion = 0;
  /* 小工具容器里没有 window.xhs，网页版据此打开浏览器专属动作 */
  var IS_WEB = !(window.xhs && window.xhs.miniTool);

  function mt() {
    return (window.xhs && window.xhs.miniTool) || null;
  }
  function hasApi(name) {
    var m = mt();
    return !!(m && typeof m[name] === 'function');
  }
  function readBuildVersion(launchOptions) {
    var env = launchOptions && launchOptions.miniToolEnv;
    return Number(env && env.buildVersion) || 0;
  }
  function clientAtLeast(min) {
    return buildVersion > 0 && Math.floor(buildVersion / 1000) >= min;
  }
  function canUse(name, min) {
    return hasApi(name) && clientAtLeast(min);
  }
  function call(name, opts) {
    var m = mt();
    if (!m || typeof m[name] !== 'function') return Promise.reject(new Error('api-missing'));
    return Promise.resolve().then(function () { return m[name](opts || {}); });
  }
  function getBuildVersion() {
    var sync = readBuildVersion(window.xhs && window.xhs.launchOptions);
    if (sync) return Promise.resolve(sync);
    if (!hasApi('getLaunchOptions')) return Promise.resolve(0);
    return call('getLaunchOptions').then(readBuildVersion, function () { return 0; });
  }

  /* 触感反馈：不支持时静默跳过 */
  function buzz(strength) {
    if (!canUse('vibrateShort', VER.VIBRATE)) return;
    call('vibrateShort', { type: strength || 'light' }).catch(function () {});
  }

  /* ============ 本地缓存（9.46+ Storage，低版本回退浏览器存储） ============ */
  var STORE_KEY = 'hp_result_v1';

  function saveLocal(data) {
    var text;
    try { text = JSON.stringify(data); } catch (e) { return Promise.resolve(false); }
    if (typeof text !== 'string') return Promise.resolve(false);
    if (canUse('setStorage', VER.STORAGE)) {
      return call('setStorage', { key: STORE_KEY, data: text }).then(function () { return true; }, function () { return false; });
    }
    try { localStorage.setItem(STORE_KEY, text); return Promise.resolve(true); } catch (e) { /* 容器不保证可用 */ }
    return Promise.resolve(false);
  }

  function loadLocal() {
    function parse(text) {
      if (!text) return null;
      try {
        var obj = JSON.parse(text);
        return obj && CHARS[obj.code] ? obj : null;
      } catch (e) { return null; }
    }
    if (canUse('getStorage', VER.STORAGE)) {
      return call('getStorage', { key: STORE_KEY }).then(function (res) {
        return parse(res && res.data);
      }, function () { return null; });
    }
    var raw = null;
    try { raw = localStorage.getItem(STORE_KEY); } catch (e) { /* 忽略 */ }
    return Promise.resolve(parse(raw));
  }

  /* ============ 窗口信息：安全区与顶部原生按钮避让 ============ */
  function applyWindowInfo() {
    if (!canUse('getWindowInfo', VER.WINDOW)) { measureAppHeight(); return; }
    call('getWindowInfo').then(function (info) {
      var top = 0;
      var safe = info && info.safeArea;
      if (safe && typeof safe.top === 'number') top = safe.top;
      var buttons = (info && info.menuButtons) || null;
      if (buttons) {
        ['back', 'me', 'share'].forEach(function (k) {
          var r = buttons[k];
          if (r && typeof r.bottom === 'number' && r.bottom > top) top = r.bottom;
        });
      }
      if (top > 0) document.documentElement.style.setProperty('--safe-top', top + 'px');
      var bottom = safe && typeof safe.bottom === 'number' && info && typeof info.windowHeight === 'number'
        ? Math.max(0, info.windowHeight - safe.bottom) : 0;
      if (bottom > 0) document.documentElement.style.setProperty('--safe-bottom', bottom + 'px');
      measureAppHeight();
    }, measureAppHeight);
  }

  function measureAppHeight() {
    var set = function () {
      var h = window.innerHeight || document.documentElement.clientHeight;
      if (h) document.documentElement.style.setProperty('--app-height', h + 'px');
    };
    set();
    window.addEventListener('resize', set);
    window.addEventListener('orientationchange', set);
  }

  /* ============ 状态 ============ */
  var qi = 0;
  var votes = [0, 0, 0, 0];
  var lines = [null, null, null, null];
  var houseTally = { gry: 0, sly: 0, rav: 0, huf: 0 };
  var currentPair = [];
  var lastResult = null;
  var cardCache = { code: '', dataUrl: '', filePath: '', drawing: null };

  var $ = function (id) { return document.getElementById(id); };

  /* ============ 视图切换（单页，不做任何页面跳转） ============ */
  function show(id) {
    var screens = document.querySelectorAll('.screen');
    for (var i = 0; i < screens.length; i++) screens[i].classList.remove('on');
    var el = $(id);
    if (el) el.classList.add('on');
    window.scrollTo(0, 0);
  }

  var toastTimer = null;
  function toast(msg) {
    var el = $('toast');
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.hidden = true; }, 2400);
  }

  /* ============ 渲染 ============ */
  function charSrc(code) { return './images/chars/' + code + '.webp'; }
  /* 名单和 16 宫格只以 60 px 展示，用同目录的小图，避免一次解码 16 张 600 px 原图 */
  function charThumb(code) { return './images/chars/' + code + '_t.webp'; }

  function portrait(code) {
    var c = CHARS[code];
    return '<div class="char-portrait">' +
      '<img class="char-img" src="' + charSrc(code) + '" alt="' + c.n + ' 卡通形象" data-face="' + c.face + '">' +
      '</div>';
  }

  function renderRunes() {
    $('runebar').innerHTML = AXES.map(function (a, i) {
      return '<div class="rune' + (lines[i] !== null ? ' lit' : '') + '">' +
        '<span class="sym">' + a.sym + '</span><span class="lab">' + a.name + '</span></div>';
    }).join('');
  }

  function renderPips() {
    var ax = Math.floor(qi / 4);
    $('qPips').innerHTML = AXES.map(function (a, i) {
      return '<div class="pip' + (i < ax ? ' done' : (i === ax ? ' cur' : '')) + '"></div>';
    }).join('');
  }

  function shuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function renderQ() {
    if (qi >= 16) { doSelecting(); return; }
    var q = BANK[qi];
    var ax = AXES[Math.floor(qi / 4)];
    $('qProg').textContent = '第 ' + (qi + 1) + ' / 16 题 · ' + ax.name;
    $('qText').textContent = q.s;
    currentPair = shuffle(q.o);
    $('qOpts').innerHTML = currentPair.map(function (o, i) {
      return '<button class="opt" data-i="' + i + '">' + o.t + '</button>';
    }).join('');
    $('qHint').textContent = ax.desc;
    renderPips();
    renderRunes();
  }

  function pick(i) {
    var opts = document.querySelectorAll('#qOpts .opt');
    for (var k = 0; k < opts.length; k++) {
      opts[k].disabled = true;
      opts[k].classList.toggle('sel', k === i);
    }
    var chosen = currentPair[i];
    var ax = Math.floor(qi / 4);
    if (chosen.v === AXES[ax].a) votes[ax]++;
    houseTally[chosen.h]++;
    buzz('light');
    castSpell();

    setTimeout(function () {
      qi++;
      if (qi % 4 === 0) {
        var cnt = votes[ax];
        lines[ax] = { a: cnt >= 3, pure: (cnt === 4 || cnt === 0) };
        renderRunes();
        buzz('medium');
      }
      renderQ();
    }, 1150);
  }

  var sparkSeq = 0;
  function castSpell() {
    var word = SPELLS[Math.floor(Math.random() * SPELLS.length)];
    $('spellWord').textContent = word + '!';
    var sparks = '';
    for (var i = 0; i < 6; i++) {
      var dx = Math.round(Math.random() * 160 - 80);
      var dy = Math.round(Math.random() * -120 - 20);
      sparks += '<span class="spell-spark" style="--dx:' + dx + 'px;--dy:' + dy + 'px;left:' +
        (45 + Math.random() * 10).toFixed(1) + '%;top:' + (40 + Math.random() * 10).toFixed(1) + '%">✨</span>';
    }
    $('spellSparks').innerHTML = sparks;
    var ov = $('spell');
    ov.hidden = false;
    /* 重启动画 */
    var cat = ov.querySelector('.spell-cat');
    cat.style.animation = 'none';
    void cat.offsetWidth;
    cat.style.animation = '';
    var seq = ++sparkSeq;
    setTimeout(function () { if (seq === sparkSeq) ov.hidden = true; }, 1050);
  }

  function doSelecting() {
    show('s-select');
    buzz('heavy');
    setTimeout(function () {
      renderResult(compute());
      show('s-res');
    }, 2000);
  }

  function compute() {
    var code = lines.map(function (l) { return l.a ? '1' : '0'; }).join('');
    var total = HOUSE_ORDER.reduce(function (s, h) { return s + houseTally[h]; }, 0);
    var best = HOUSE_ORDER[0];
    HOUSE_ORDER.forEach(function (h) { if (houseTally[h] > houseTally[best]) best = h; });
    return {
      code: code,
      ch: CHARS[code],
      house: best,
      total: total || 1,
      pureCount: lines.filter(function (l) { return l.pure; }).length,
      votes: votes.slice(),
      tally: Object.assign({}, houseTally)
    };
  }

  function resultText(r) {
    var H = HOUSES[r.house];
    return '【魔法学院测格】我是：' + r.ch.n + '\n「' + r.ch.tag + '」\n' + r.ch.verdict +
      '\n分院结果：' + H.name + ' ' + H.emoji + '\n守护神：' + r.ch.patronus + '\n魔杖：' + r.ch.wand;
  }

  /* 先强制一次布局，再写入目标宽度，让 transition 从 0 开始；不依赖 requestAnimationFrame */
  function animateBars(scope) {
    var items = (scope || document).querySelectorAll('[data-w]');
    var i;
    for (i = 0; i < items.length; i++) void items[i].getBoundingClientRect().width;
    for (i = 0; i < items.length; i++) items[i].style.width = (items[i].getAttribute('data-w') || 0) + '%';
  }

  function renderResult(r) {
    var C = r.ch, H = HOUSES[r.house];
    var canonHouse = CANON_HOUSE[r.code] || '';
    var matchHouse = !!canonHouse && canonHouse === r.house;

    var pureBadge = r.pureCount >= 2
      ? '<span class="badge gold">纯度 ' + r.pureCount + '/4</span>约十六分之一'
      : r.pureCount === 1
        ? '<span class="badge rose">单轴拉满</span>约 6.25%'
        : '<span class="badge dim">均衡型</span>';

    $('s-res').innerHTML =
      '<div class="parch-card">' +
        '<div class="seal">' + H.emoji + '<br>分院</div>' +
        portrait(r.code) +
        '<div class="char-name">' + C.n + '</div>' +
        '<div class="char-en">' + C.en + '</div>' +
        '<div class="char-tag">「 ' + C.tag + ' 」</div>' +
        '<div class="char-verdict">' + C.verdict + '</div>' +
        '<div class="house-row">' +
          '<span class="house-dot" style="background:' + H.color + '"></span>' +
          '<span class="ht"><b>' + H.name + '</b> ' + H.emoji + '</span>' +
          '<span class="hs">' + (matchHouse ? '和原著学院一致！' : '你的选择比帽子更准') + '</span>' +
        '</div>' +
      '</div>' +

      '<div class="kv">' +
        row('分院词', H.line) + row('守护神', C.patronus) + row('魔杖', C.wand) +
        row('别人眼中', C.eyes) + row('阴影面', C.shade) + row('你的纯度', C.canon) +
      '</div>' +

      '<div class="block"><div class="bt-h">四 维 能 量</div><div class="panel">' +
        AXES.map(function (a, i) {
          var left = r.votes[i], right = 4 - left;
          return '<div class="hbar"><span class="nm">' + a.sym + ' ' + a.a + '</span>' +
            '<span class="tr"><i style="background:linear-gradient(90deg,var(--gold),var(--rose))" data-w="' + (left / 4 * 100) + '"></i></span>' +
            '<span class="pc">' + left + ':' + right + '</span>' +
            '<span class="nm end">' + a.b + '</span></div>';
        }).join('') +
        '<div style="margin-top:10px">' + pureBadge + '</div>' +
      '</div></div>' +

      '<div class="block"><div class="bt-h">分 院 细 节</div><div class="panel"><div>' +
        HOUSE_ORDER.map(function (h) {
          var x = HOUSES[h];
          var p = Math.round(r.tally[h] / r.total * 100);
          return '<div class="hbar"><span class="nm">' + x.emoji + ' ' + x.name.slice(0, 3) + '</span>' +
            '<span class="tr"><i style="background:' + x.color + '" data-w="' + p + '"></i></span>' +
            '<span class="pc">' + p + '%</span></div>';
        }).join('') +
        '</div><div class="small" style="margin-top:8px">分院帽按你 16 次选择的学院倾向加权。' +
        (matchHouse ? '这次它猜对了你的原著学院。' : '它把你分到了和原著不同的学院 —— 说明你现在的活法，和角色设定不太一样。') +
        '</div></div></div>' +

      '<div class="block"><div class="bt-h">和 谁 最 合 拍</div><div class="panel">' +
        '<div class="small">选一个好友的角色，看你们在故事里能不能活到最后一部。</div>' +
        '<div class="chips" id="pairChips">' + CODES.map(function (c) {
          return '<button class="chip" data-pair="' + c + '">' + CHARS[c].face + ' ' + shortName(c) + '</button>';
        }).join('') + '</div><div id="pairOut"></div>' +
      '</div></div>' +

      '<div class="block"><div class="bt-h">16 人 名 单</div>' +
        '<div class="grid16">' + CODES.map(function (c) {
          return '<div class="gcell' + (c === r.code ? ' me' : '') + '" data-peek="' + c + '">' +
            '<img src="' + charThumb(c) + '" alt="' + CHARS[c].n + '" data-face="' + CHARS[c].face + '">' +
            '<div class="n">' + shortName(c) + '</div></div>';
        }).join('') + '</div><div id="peekOut"></div></div>' +

      '<div class="block"><div class="bt-h">结 果 卡</div>' +
        '<div class="card-stage" id="cardStage">' +
          '<div class="small">生成一张带卡通形象的结果卡，可以存相册或发出去。</div>' +
          '<button class="btn" data-act="makecard">生成结果卡</button>' +
        '</div>' +
        '<div class="row2">' +
          '<button class="btn ghost mini" data-act="album" data-cap="album" hidden>存相册</button>' +
          '<button class="btn ghost mini" data-act="note" data-cap="note" hidden>发笔记</button>' +
        '</div>' +
        '<div class="row2">' +
          '<button class="btn ghost mini" data-act="comment" data-cap="comment" hidden>评论区找人 PK</button>' +
          '<button class="btn ghost mini" data-act="sharecard" data-cap="share" hidden>推荐给朋友</button>' +
        '</div>' +
        '<div class="row2">' +
          '<button class="btn ghost mini" data-act="copytext" data-cap="web" hidden>复制结果文案</button>' +
          '<button class="btn ghost mini" data-act="download" data-cap="web" hidden>下载结果卡</button>' +
        '</div>' +
      '</div>' +

      '<button class="btn" data-act="start">再 测 一 次</button>' +
      '<button class="btn ghost" data-act="roster">看 16 人名单</button>' +
      '<p class="disc">娱乐向测格。角色匹配基于四条性格轴的 16 种组合，与原著设定不完全一致。</p>';

    animateBars($('s-res'));

    cardCache.code = '';
    cardCache.dataUrl = '';
    cardCache.filePath = '';
    applyCapabilityButtons(r);
    lastResult = { code: r.code, house: r.house, votes: r.votes, tally: r.tally, pureCount: r.pureCount };
    saveLocal(lastResult);
  }

  function row(k, v) {
    return '<div class="row"><div class="k">' + k + '</div><div class="v">' + v + '</div></div>';
  }
  function shortName(code) { return CHARS[code].n.split('·')[0]; }

  /* 按客户端能力显示按钮，不支持就藏起来，不留死按钮 */
  function applyCapabilityButtons(r) {
    var caps = {
      album: canUse('saveImageToPhotosAlbum', VER.ALBUM),
      note: hasApi('postNote'),
      comment: canUse('interactionOpenApi', VER.COMMENT),
      share: canUse('share', VER.SHARE),
      web: IS_WEB
    };
    var btns = document.querySelectorAll('#s-res [data-cap]');
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i];
      b.hidden = !caps[b.getAttribute('data-cap')];
    }
    var any = caps.album || caps.note || caps.comment || caps.share || caps.web;
    if (!any) {
      var stage = $('cardStage');
      if (stage) stage.innerHTML = '<div class="small">当前客户端版本较低，生成结果卡后可直接截图保存。</div>' +
        '<button class="btn" data-act="makecard">生成结果卡</button>';
    }
  }

  /* ============ 配对 ============ */
  function pairText(myCode, otherCode) {
    var A = CHARS[myCode], B = CHARS[otherCode];
    var same = 0;
    for (var i = 0; i < 4; i++) if (myCode.charAt(i) === otherCode.charAt(i)) same++;
    var diff = 4 - same;
    if (same === 4) return { t: '同一个人', s: 95, d: '完全同轴。你们要么成为最好的搭档，要么成为最烦对方的镜子 —— 因为你们最看不惯对方的地方，自己身上也有。' };
    if (diff === 1) return { t: '高契合', s: 88, d: '只差一条轴。' + A.n + ' 和 ' + B.n + ' 在故事里通常是并肩出现的那种 —— 一个冲动的时候另一个刚好踩得住。' };
    if (diff === 2) return { t: '互补型', s: 74, d: '两条轴相反。你们的用法是“分工”：' + A.tag + ' × ' + B.tag + '。硬要干同一件事就会吵架。' };
    if (diff === 3) return { t: '需要翻译', s: 55, d: '三条轴不同。你们做同一个决定的路径完全相反 —— 能玩到一起靠的不是相似，是好奇。' };
    return { t: '镜像对', s: 42, d: '四条轴全反。你们几乎是同一个人的两个版本。故事里这种组合通常一个活到结尾，另一个死在第七部。' };
  }

  function doPair(otherCode) {
    if (!lastResult) return;
    var myCode = lastResult.code;
    var chips = document.querySelectorAll('#pairChips .chip');
    for (var i = 0; i < chips.length; i++) chips[i].classList.remove('on');
    var hit = document.querySelector('#pairChips .chip[data-pair="' + otherCode + '"]');
    if (hit) hit.classList.add('on');
    var rel = pairText(myCode, otherCode);
    $('pairOut').innerHTML =
      '<div style="margin-top:12px;padding-top:12px;border-top:1px dashed rgba(212,175,55,.25)">' +
        '<div style="font-size:14.5px;color:var(--parch)">' + CHARS[myCode].n + ' × ' + CHARS[otherCode].n +
        '<span class="badge gold" style="margin-left:6px">' + rel.t + '</span></div>' +
        '<div class="meter"><i data-w="' + rel.s + '"></i></div>' +
        '<div class="small hi">' + rel.d + '</div>' +
      '</div>';
    animateBars($('pairOut'));
    buzz('light');
  }

  function peek(code) {
    var x = CHARS[code];
    $('peekOut').innerHTML =
      '<div class="panel" style="margin-top:10px">' +
        '<div class="roster-item" style="border-bottom:none;padding-top:0">' +
          '<img src="' + charThumb(code) + '" alt="' + x.n + '" data-face="' + x.face + '">' +
          '<div class="meta"><div class="rn">' + x.n + '</div>' +
          '<div class="rx">' + x.en + ' · ' + code.split('').map(function (v, i) {
            return AXES[i][v === '1' ? 'a' : 'b'];
          }).join('/') + '</div>' +
          '<div class="rt">「' + x.tag + '」</div>' +
          '<div class="rv">' + x.verdict + '</div></div>' +
        '</div>' +
      '</div>';
  }

  /* ============ 名单 ============ */
  function renderRoster() {
    show('s-roster');
    $('s-roster').innerHTML =
      '<div class="bt-h" style="font-size:16px;letter-spacing:6px">16 人 名 单</div>' +
      '<div class="small" style="margin-bottom:14px">四条轴（闯/守 · 心/脑 · 群/单 · 闹/稳）各取一值，组合正好 16 个角色。</div>' +
      '<div class="panel">' + CODES.map(function (c) {
        var x = CHARS[c];
        return '<div class="roster-item"><img src="' + charThumb(c) + '" alt="' + x.n + ' 卡通形象" data-face="' + x.face + '">' +
          '<div class="meta"><div class="rn">' + x.n + '</div>' +
          '<div class="rx">' + x.en + ' · ' + c.split('').map(function (v, i) {
            return AXES[i][v === '1' ? 'a' : 'b'];
          }).join('/') + '</div>' +
          '<div class="rt">「' + x.tag + '」</div>' +
          '<div class="rv">' + x.verdict + '</div></div></div>';
      }).join('') + '</div>' +
      '<button class="btn" data-act="start">进入 大厅</button>' +
      '<button class="btn ghost" data-act="home">返回</button>';
  }

  /* ============ Canvas 结果卡 ============ */
  var CARD_W = 750, CARD_H = 1000;
  var FONT = '"Songti SC","STSong","Noto Serif CJK SC","Microsoft YaHei",sans-serif';

  function wrapText(g, text, maxWidth, maxLines) {
    var out = [];
    var line = '';
    for (var i = 0; i < text.length; i++) {
      var test = line + text.charAt(i);
      if (g.measureText(test).width > maxWidth && line) {
        out.push(line);
        line = text.charAt(i);
        if (out.length === maxLines) {
          out[maxLines - 1] = out[maxLines - 1].slice(0, -1) + '…';
          return out;
        }
      } else {
        line = test;
      }
    }
    if (line) out.push(line);
    if (out.length > maxLines) {
      out = out.slice(0, maxLines);
      out[maxLines - 1] = out[maxLines - 1].slice(0, -1) + '…';
    }
    return out;
  }

  function paintCard(canvas, r, faceImg) {
    var g = canvas.getContext('2d');
    var C = r.ch, H = HOUSES[r.house];

    var bg = g.createLinearGradient(0, 0, CARD_W, CARD_H);
    bg.addColorStop(0, '#f6eeda');
    bg.addColorStop(1, '#e3d2ab');
    g.fillStyle = bg;
    g.fillRect(0, 0, CARD_W, CARD_H);

    g.strokeStyle = 'rgba(58,47,31,.28)';
    g.lineWidth = 2;
    g.strokeRect(26, 26, CARD_W - 52, CARD_H - 52);

    g.textAlign = 'center';
    g.fillStyle = '#6b5d45';
    g.font = '26px ' + FONT;
    g.fillText('你 是 霍 格 沃 茨 的 谁', CARD_W / 2, 96);

    /* 圆形卡通形象 */
    var cx = CARD_W / 2, cy = 330, rad = 190;
    g.save();
    g.beginPath();
    g.arc(cx, cy, rad, 0, Math.PI * 2);
    g.closePath();
    g.clip();
    if (faceImg && faceImg.width) {
      g.drawImage(faceImg, cx - rad, cy - rad, rad * 2, rad * 2);
    } else {
      g.fillStyle = '#2a2145';
      g.fillRect(cx - rad, cy - rad, rad * 2, rad * 2);
      g.fillStyle = '#e8c96a';
      g.font = '120px ' + FONT;
      g.fillText(C.face, cx, cy + 44);
    }
    g.restore();

    g.strokeStyle = H.color;
    g.lineWidth = 10;
    g.beginPath();
    g.arc(cx, cy, rad + 6, 0, Math.PI * 2);
    g.stroke();

    g.fillStyle = '#3a2f1f';
    g.font = 'bold 62px ' + FONT;
    g.fillText(C.n, cx, 600);

    g.fillStyle = '#6b5d45';
    g.font = '26px ' + FONT;
    g.fillText(C.en.toUpperCase(), cx, 640);

    g.fillStyle = '#4a3d28';
    g.font = '32px ' + FONT;
    var tagLines = wrapText(g, '「 ' + C.tag + ' 」', CARD_W - 140, 2);
    tagLines.forEach(function (t, i) { g.fillText(t, cx, 700 + i * 44); });

    g.strokeStyle = 'rgba(58,47,31,.2)';
    g.lineWidth = 1;
    g.beginPath();
    g.moveTo(120, 800);
    g.lineTo(CARD_W - 120, 800);
    g.stroke();

    g.fillStyle = H.color;
    g.font = 'bold 34px ' + FONT;
    g.fillText('分院 · ' + H.name, cx, 856);

    g.fillStyle = '#5a4a33';
    g.font = '26px ' + FONT;
    var body = wrapText(g, C.verdict, CARD_W - 150, 3);
    body.forEach(function (t, i) { g.fillText(t, cx, 906 + i * 38); });

    g.fillStyle = '#9b8a6d';
    g.font = '22px ' + FONT;
    g.fillText('魔 法 测 格', cx, CARD_H - 46);
  }

  function exportCard(canvas) {
    /* 卡片不透明，用 JPEG 把跨桥字符串压到 PNG 的几分之一 */
    try {
      var url = canvas.toDataURL('image/jpeg', 0.9);
      if (url && url.indexOf('data:image/jpeg') === 0) return url;
      return canvas.toDataURL('image/png');
    } catch (e) {
      /* 包内图片可能污染画布，读不回时由调用方降级到无图片分享 */
      return '';
    }
  }

  function makeCard() {
    if (!lastResult) return Promise.resolve('');
    var code = lastResult.code;
    if (cardCache.code === code && cardCache.dataUrl) return Promise.resolve(cardCache.dataUrl);
    if (cardCache.drawing) return cardCache.drawing;

    var r = { ch: CHARS[code], house: lastResult.house };
    var canvas = document.createElement('canvas');
    canvas.width = CARD_W;
    canvas.height = CARD_H;

    cardCache.drawing = new Promise(function (resolve) {
      var settled = false;
      var finish = function (img) {
        if (settled) return;
        settled = true;
        paintCard(canvas, r, img);
        var url = exportCard(canvas);
        cardCache.code = code;
        cardCache.dataUrl = url;
        cardCache.drawing = null;
        var stage = $('cardStage');
        if (url && stage) {
          var caps = document.querySelectorAll('#s-res [data-cap]');
          var capReady = false;
          for (var ci = 0; ci < caps.length; ci++) if (!caps[ci].hidden) capReady = true;
          stage.innerHTML = '<img src="' + url + '" alt="我的结果卡">' +
            '<div class="tip">' + (IS_WEB ? '长按上面的图就能保存，或用下面的按钮。'
            : (capReady ? '用下面的按钮存相册或发成笔记。' : '把这一屏截图就能保存。')) + '</div>';
        } else if (stage) {
          stage.innerHTML = '<div class="small">当前环境不允许导出图片，直接截图这一页也能保存。</div>';
        }
        resolve(url);
      };
      var img = new Image();
      img.onload = function () { finish(img); };
      img.onerror = function () { finish(null); };
      img.src = charSrc(code);
      setTimeout(function () { finish(null); }, 4000);
    });
    return cardCache.drawing;
  }

  /* ============ 端能力动作 ============ */
  function tempFileFrom(dataUrl) {
    if (cardCache.filePath) return Promise.resolve(cardCache.filePath);
    if (!hasApi('writeTempFile')) return Promise.resolve('');
    return call('writeTempFile', { data: dataUrl }).then(function (res) {
      var p = res && res.filePath;
      if (p) cardCache.filePath = p;
      return p || '';
    }, function () { return ''; });
  }

  function actMakeCard() {
    makeCard().then(function (url) {
      if (!url) toast('这个环境导不出图片，截图这一页也能保存');
    });
  }

  function actAlbum() {
    makeCard().then(function (url) {
      if (!url) { toast('先截图这一页吧'); return; }
      tempFileFrom(url).then(function (path) {
        return call('saveImageToPhotosAlbum', { filePath: path || url });
      }).then(function () {
        toast('已存到相册');
      }, function (err) {
        toast(saveFailReason(err));
      });
    });
  }

  function saveFailReason(err) {
    var msg = (err && err.errMsg) || '';
    if (/deny|denied|auth|permission/i.test(msg)) return '相册权限被拒绝了';
    return '没能存进相册，再试一次';
  }

  function actNote() {
    makeCard().then(function (url) {
      if (!url) { toast('这个环境导不出图片，换个方式分享吧'); return; }
      tempFileFrom(url).then(function (path) {
        var ch = CHARS[lastResult.code];
        return call('postNote', {
          title: '我是' + ch.n,
          content: resultText({ ch: ch, house: lastResult.house }) + '\n你也来测测自己是霍格沃茨的谁。',
          pageType: 'photo_publish',
          mediaInfo: { image_resources: [{ url: path || url }] }
        });
      }).then(function () {
        toast('已带到发布页');
      }, function () {
        toast('发布页没能打开');
      });
    });
  }

  function actComment() {
    var snapshot = JSON.stringify({ v: 1, code: lastResult.code, house: lastResult.house });
    makeCard().then(function (url) {
      return url ? tempFileFrom(url) : '';
    }).then(function (path) {
      var payload = {
        action: 'post_comment',
        content: '我测出来是' + CHARS[lastResult.code].n + '，你是哪个？',
        miniToolSnapshotInfo: snapshot
      };
      if (path) payload.media_bean = [{ media_type: 'image', cover_image_url: path }];
      return call('interactionOpenApi', { payload: payload, saveToAlbum: false });
    }).then(function (res) {
      if (res && res.routed === false) toast('评论区没打开');
    }, function () {
      toast('评论区没打开');
    });
  }

  function actShareCard() {
    call('share', { type: 'card' }).then(function () {
      toast('已拉起分享');
    }, function (err) {
      var code = err && err.errCode;
      if (code === 15503) toast('今天分享次数用完啦');
      else if (code === 15502) toast('当前窗口形态不支持分享');
      else toast('分享没打开');
    });
  }

  /* ============ 网页版动作 ============ */
  function actCopyText() {
    var text = resultText({ ch: CHARS[lastResult.code], house: lastResult.house }) +
      '\n—— 你也来测：' + location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast('已复制，去评论区贴给好友。'); },
        function () { legacyCopy(text); });
    } else { legacyCopy(text); }
  }
  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    toast(ok ? '已复制，去评论区贴给好友。' : '复制没成功，长按下面文字复制。');
    showCopyBox(text);
  }
  function showCopyBox(text) {
    var stage = $('cardStage');
    if (!stage || stage.querySelector('.copy-box')) return;
    var box = document.createElement('textarea');
    box.className = 'copy-box';
    box.setAttribute('readonly', '');
    box.value = text;
    stage.appendChild(box);
    box.focus();
    box.select();
  }
  function actDownload() {
    makeCard().then(function (url) {
      if (!url) { toast('这个浏览器导不出图片，长按页面里的图试试'); return; }
      var a = document.createElement('a');
      a.href = url;
      a.download = 'magic-card-' + lastResult.code + '.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast('已下载结果卡');
    });
  }

  /* ============ 事件绑定（全部 addEventListener，无行内事件） ============ */
  var ACTIONS = {
    start: function () { startQuiz(); },
    roster: renderRoster,
    home: function () { show('s-intro'); },
    makecard: actMakeCard,
    album: actAlbum,
    note: actNote,
    comment: actComment,
    sharecard: actShareCard,
    copytext: actCopyText,
    download: actDownload
  };

  document.addEventListener('click', function (e) {
    var t = e.target;
    while (t && t.nodeType === 1) {
      if (t.hasAttribute('data-act')) { ACTIONS[t.getAttribute('data-act')](); return; }
      if (t.hasAttribute('data-i')) { pick(Number(t.getAttribute('data-i'))); return; }
      if (t.hasAttribute('data-pair')) { doPair(t.getAttribute('data-pair')); return; }
      if (t.hasAttribute('data-peek')) { peek(t.getAttribute('data-peek')); return; }
      t = t.parentNode;
    }
  });

  /* 形象图随主包下发，但仍可能被系统清理或解码失败，加载不到时用表情符号占位 */
  document.addEventListener('error', function (e) {
    var t = e.target;
    if (!t || t.tagName !== 'IMG' || !t.hasAttribute('data-face')) return;
    if (!t.parentNode) return;
    var holder = document.createElement('div');
    holder.className = 'face-fallback';
    holder.textContent = t.getAttribute('data-face');
    t.parentNode.replaceChild(holder, t);
  }, true);

  function startQuiz() {
    qi = 0;
    votes = [0, 0, 0, 0];
    lines = [null, null, null, null];
    houseTally = { gry: 0, sly: 0, rav: 0, huf: 0 };
    cardCache.code = '';
    cardCache.dataUrl = '';
    cardCache.filePath = '';
    show('s-quiz');
    renderRunes();
    renderQ();
  }

  /* ============ 首屏 ============ */
  function makeStars() {
    var box = $('stars');
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 40; i++) {
      var s = document.createElement('div');
      s.className = 'star';
      var sz = (Math.random() * 2 + 1).toFixed(1);
      s.style.width = sz + 'px';
      s.style.height = sz + 'px';
      s.style.left = (Math.random() * 100).toFixed(1) + '%';
      s.style.top = (Math.random() * 100).toFixed(1) + '%';
      s.style.animationDelay = (Math.random() * 3).toFixed(2) + 's';
      frag.appendChild(s);
    }
    box.appendChild(frag);
  }

  function renderLastResult(saved) {
    var box = $('lastResult');
    if (!saved) { box.hidden = true; return; }
    box.hidden = false;
    box.innerHTML = '上次你是 <b>' + CHARS[saved.code].n + '</b>，分进了 <b>' + HOUSES[saved.house].name + '</b>。' +
      '<div class="small" style="margin-top:6px">再测一次看看会不会变。</div>';
  }

  /* 从评论区回来时，容器可能带回 interactionOpenApi 写入的附加状态；取不到就用本地缓存 */
  function readSnapshot() {
    var lo = window.xhs && window.xhs.launchOptions;
    var raw = lo && lo.miniToolSnapshotInfo;
    if (typeof raw !== 'string' || !raw) return null;
    try {
      var obj = JSON.parse(raw);
      return obj && CHARS[obj.code] ? { code: obj.code, house: obj.house, votes: [2, 2, 2, 2], tally: null, pureCount: 0 } : null;
    } catch (e) { return null; }
  }

  function boot() {
    makeStars();
    measureAppHeight();
    var snapshot = readSnapshot();
    /* 版本号必须先解析出来，能力探测才有依据 */
    getBuildVersion().then(function (v) {
      buildVersion = v;
      applyWindowInfo();
      return loadLocal();
    }).then(function (saved) {
      var data = saved || snapshot;
      if (data) {
        lastResult = data;
        renderLastResult(data);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
