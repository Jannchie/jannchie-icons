// 搜索关键词：每个图标 3–8 个，英文为主（同义词、用途、常见别名），常用图标另补中文、日文。
// 名字本身已经能搜到的词不写（tagsOf 也会把名字里已有的词滤掉）。英文部分参考了 Lucide、Tabler 的 tags。
//
// 只有「单独的图标」手写在 TAGS 里；成百上千的组合（folder-*-badge、file-*、list-*、tag-a…z、平假名……）按规则生成，见 tagsOf：
//   1. TAGS 里有这个名字：只用手写的
//   2. 名字以 -badge-top / -badge / -off / -list / -half / -circle / -square 结尾：去掉后缀，取本体的词 + 后缀的词
//   3. 属于某个「封闭系列」（平假名、卦、分级标志、军标……）：系列的词 + 系列里这一项自己的词（字符、中文名）
//   4. 其余：把名字按 - 切开，从左往右取最长的已知片段（TAGS 或 PARTS），把各片段的词拼起来
//      （folder-arrow-down = folder 的词 + arrow-down 的词）
// 纯数据、不依赖 Vite：Node 里可以直接 import。
import { oldNamesOf } from '../aliases.js'


// 一行一个：名字: 词, 词, ……
const parse = raw => Object.fromEntries(raw.trim().split('\n').map((line) => {
  const i = line.indexOf(':')
  return [line.slice(0, i).trim(), line.slice(i + 1).split(',').map(s => s.trim()).filter(Boolean)]
}))

// 单独的图标（以及系列里用作「本体」「角标符号」的图标）
export const TAGS = parse(`
2k: qhd, 1440p, video quality, resolution
4k: uhd, 2160p, ultra hd, video quality, resolution
8k: 4320p, ultra hd, video quality, resolution
ac-source: alternating current, power supply, sine, circuit, electronics, 交流电
accessibility: a11y, disability, wheelchair, inclusive, 无障碍, アクセシビリティ
activity: pulse, heartbeat, vitals, ecg, health, waveform, 心电图
address-book: contacts, phonebook, directory, people, 通讯录, 連絡先
air-conditioner: ac, aircon, cooling, climate, hvac, 空调, エアコン
airplay: cast, stream, mirroring, screen, apple tv
alarm-clock: alarm, wake up, timer, reminder, morning, 闹钟, 目覚まし
alert-circle: warning, error, exclamation, attention, caution, notice, 警告, 注意
alert-triangle: warning, caution, danger, exclamation, hazard, risk, 警告, 注意
align-center-both: center, middle, alignment, layout, 居中
align-center: text align, centered, paragraph, typography, 居中
align-justify: justified, text align, paragraph, typography, 两端对齐
align-left: text align, flush left, paragraph, typography, 左对齐
align-right: text align, flush right, paragraph, typography, 右对齐
ambulance: emergency, medical, hospital, rescue, vehicle, 救护车, 救急車
angle: degree, geometry, corner, measure, protractor, 角度
antenna: signal, broadcast, radio, tv, reception, 天线
apartment: building, flats, housing, residential, condo, 公寓, マンション
apc: armored personnel carrier, military vehicle, armored car, 装甲车
aperture: camera, lens, iris, shutter, photography, 光圈, 絞り
api: interface, endpoint, rest, integration, developer, sdk
apple: fruit, food, healthy, 苹果, りんご
approx: approximately, almost equal, ≈, math, 约等于
archive: box, storage, backup, archived, store, 归档, アーカイブ
armchair: chair, sofa, seat, furniture, lounge, 椅子
arrow-down: download, south, descend, bottom, direction, 向下, 下
arrow-up: upload, north, ascend, top, direction, 向上, 上
arrow-left: back, previous, west, return, direction, 向左, 戻る
arrow-right: next, forward, east, continue, go, direction, 向右, 次へ
arrow-down-left: southwest, diagonal, direction, 左下
arrow-down-right: southeast, diagonal, direction, 右下
arrow-up-left: northwest, diagonal, direction, 左上
arrow-up-right: northeast, diagonal, external, trend, direction, 右上
arrows-left-right: horizontal, width, resize, expand, swap
arrows-up-down: vertical, sort, swap, height, resize, exchange
aspect-ratio: crop, resize, dimensions, proportion, 16:9, 宽高比
asterisk: star, wildcard, required, footnote, symbol, *
at: email, mention, at sign, @, address, handle
atom: physics, science, nuclear, electron, react, 原子
award: rosette, prize, badge, achievement, winner, ribbon, 奖章
axe: hatchet, chop, lumberjack, tool, weapon, 斧头, 斧
backpack: bag, school, travel, hiking, rucksack, 背包, リュック
bacon: food, breakfast, meat, pork, 培根, ベーコン
badminton: shuttlecock, sport, racket, 羽毛球, バドミントン
bagua: eight trigrams, taoism, yin yang, i ching, feng shui, 八卦
ban: forbidden, prohibited, block, no, cancel, not allowed, 禁止
banana: fruit, food, 香蕉, バナナ
bandage: band-aid, plaster, first aid, wound, injury, 创可贴, 絆創膏
bank: finance, money, building, institution, 银行, 銀行
banknote: money, cash, bill, currency, payment, 钞票, お札
barcode: scan, product, retail, checkout, upc, ean, 条形码, バーコード
barn: farm, agriculture, building, rural, 谷仓, 農場
baseball: ball, sport, mlb, 棒球, 野球
basket: shopping, ecommerce, cart, buy, store, 购物篮, かご
basketball: ball, sport, nba, hoop, 篮球, バスケ
bathtub: bath, bathroom, tub, wash, relax, 浴缸, お風呂
battery: power, energy, charge, level, 电池, 電池
battery-charging: charging, power, energy, recharge, 充电, 充電
battery-full: power, charged, 100%, energy, 满电
battery-low: power, low battery, empty, energy, 低电量
battery-medium: power, half, energy
battery-warning: power, low battery, alert, energy
beaker: lab, chemistry, experiment, science, glassware, 烧杯, ビーカー
because: math, logic, symbol, ∵, 因为
bed: sleep, hotel, bedroom, rest, night, 床, ベッド
bee: insect, honey, bug, nature, 蜜蜂, ハチ
beer: alcohol, drink, pub, mug, bar, 啤酒, ビール
bell: notification, alert, alarm, reminder, ring, subscribe, 通知, 铃铛, ベル
bike: bicycle, cycling, ride, transport, 自行车, 自転車
billiards: pool, 8 ball, snooker, cue, game, 台球, ビリヤード
bingo: lottery, ball, game, number, 宾果, ビンゴ
binoculars: explore, observe, look, zoom, field glasses, 望远镜, 双眼鏡
biohazard: toxic, virus, biological, danger, hazard, 生物危害
bird: animal, tweet, fly, wing, 鸟, 鳥
blu-ray: bd, disc, blu ray disc, video quality, 蓝光
bluetooth: wireless, pairing, connection, bt, 蓝牙
bold: text, strong, format, typography, font weight, 加粗, 太字
bomb: explosive, explosion, danger, boom, mine, 炸弹, 爆弾
bone: skeleton, dog, pet, anatomy, 骨头, 骨
book: reading, library, read, novel, ebook, 书, 本
book-open: reading, read, pages, library, 阅读, 読書
bookmark: save, favorite, read later, ribbon, 书签, ブックマーク
books: library, reading, bookshelf, study, 书籍, 本棚
bow: archery, arrow, weapon, hunting, 弓
bowling: pins, strike, sport, game, 保龄球, ボウリング
braille: blind, accessibility, tactile, dots, 盲文, 点字
brain: mind, think, intelligence, ai, idea, 大脑, 脳
brain-circuit: ai, artificial intelligence, machine learning, neural, 人工智能
brain-cyborg: ai, cyborg, artificial intelligence, machine, 人工智能
bread: bakery, food, toast, loaf, 面包, パン
briefcase: work, business, job, portfolio, office, bag, 公文包, 工作, 仕事
brightness: sun, light, display, screen, luminance, 亮度, 明るさ
arrange-bring-forward: layer, arrange, order, move up, z-index, 上移一层
arrange-bring-to-front: layer, arrange, order, top, z-index, 置于顶层
broom: clean, sweep, clear, housekeeping, 扫帚, ほうき
brush: paint, art, draw, design, 画笔, 筆
bug: insect, debug, error, issue, defect, 虫子, バグ
building: office, company, city, architecture, organization, 建筑, ビル
burger: hamburger, fast food, food, sandwich, 汉堡, ハンバーガー
bus: transport, transit, public transport, travel, 公交, バス
butterfly: insect, nature, wings, moth, 蝴蝶, 蝶
butterfly-small: insect, nature, wings, moth, small, tiny, 小蝴蝶, 蝴蝶, 蝶, ちょう
butterfly-swallowtail: insect, nature, wings, swallowtail, papilio, 凤蝶, 燕尾蝶, 蝴蝶, アゲハチョウ
c: c language, programming, code
cactus: plant, desert, succulent, 仙人掌, サボテン
cake: birthday, celebration, party, dessert, 蛋糕, ケーキ
calculator: math, calculate, arithmetic, accounting, 计算器, 電卓
calendar: date, schedule, event, month, day, planner, 日历, 日程, カレンダー
calendar-days: date, schedule, month, days, event, 日历
calendar-range: date range, period, schedule, event, 日期范围
captions: subtitles, closed captions, transcription, accessibility, 字幕
camera: photo, photography, capture, picture, lens, 相机, 拍照, カメラ
camera-action: gopro, action cam, sports camera, 运动相机
camera-body: photography, camera body, 机身
camera-compact: point and shoot, compact camera, 卡片机
camera-dslr: dslr, slr, single lens reflex, 单反, 一眼レフ
camera-film: film camera, analog, 35mm, 胶片, フィルム
camera-instant: polaroid, instant camera, instax, 拍立得, チェキ
camera-lens: lens, optics, objective, 镜头, レンズ
camera-lens-pancake: pancake lens, prime lens, 饼干头
camera-lens-telephoto: telephoto, long lens, zoom, 长焦, 望遠
camera-lens-zoom: zoom lens, lens, optics, 变焦, 镜头
camera-mirrorless: mirrorless, milc, 无反, ミラーレス
camera-rotate: switch camera, selfie, front camera, flip camera, 切换镜头
candlestick-chart: stock, trading, finance, ohlc, market, k线, ローソク足
candy: sweet, sugar, dessert, treat, 糖果, キャンディ
cap: baseball cap, hat, headwear, clothing, 帽子
capacitor: circuit, electronics, component, 电容
car: vehicle, automobile, drive, transport, 汽车, 車
playing-cards: playing cards, deck, poker, card game, 扑克, トランプ
caret-down: triangle, dropdown, expand, arrow
caret-up: triangle, collapse, arrow
carrot: vegetable, food, 胡萝卜, にんじん
cart: shopping, ecommerce, buy, checkout, store, 购物车, カート
cart-check: added to cart, in cart, purchased
cart-minus: remove from cart, shopping, ecommerce, 购物车
cart-plus: add to cart, buy, shopping, ecommerce, 加入购物车
cart-x: empty cart, clear cart, remove from cart
cast: chromecast, stream, screen, broadcast, 投屏
castle: fortress, palace, kingdom, medieval, 城堡, 城
cat: animal, pet, kitten, meow, 猫, ねこ
cc: creative commons, license, copyright, 知识共享
cctv: surveillance, security camera, monitoring, 监控, 防犯カメラ
cell: battery, circuit, electronics, dc, 电池
celsius: temperature, degree, ℃, weather, 摄氏度
chat: message, conversation, comment, speech bubble, talk, 聊天, 消息, チャット
chats: messages, conversation, discussion, forum, 聊天
check: done, ok, tick, yes, confirm, success, complete, 完成, 确认, チェック
check-circle: done, ok, success, verified, approved, complete, 完成
check-double: read, seen, delivered, done, 已读, 既読
check-square: checkbox, checked, done, task, todo
checkbox: checked, todo, task, form, select, 复选框
cheese: food, dairy, 奶酪, チーズ
cherry: fruit, food, 樱桃, さくらんぼ
chessboard: chess, board game, checkers, 棋盘
chevron-down: dropdown, expand, arrow, more, open
chevron-up: collapse, arrow, less, close
chevron-left: back, previous, arrow, prev
chevron-right: next, forward, arrow, more
chevron-down-left: arrow, diagonal, southwest
chevron-down-right: arrow, diagonal, southeast
chevron-up-left: arrow, diagonal, northwest
chevron-up-right: arrow, diagonal, northeast
chevrons-up-down: expand, sort, select, unfold, dropdown
chiikawa: character, anime, kawaii, cute, ちいかわ, 吉伊
chip: microchip, processor, cpu, semiconductor, hardware, 芯片, チップ
church: christian, religion, chapel, building, 教堂, 教会
circle: shape, round, ring, dot, ellipse, record, 圆, 円
circuit-switch: switch, open circuit, electronics, 开关
clipboard: paste, copy, notes, checklist, board, 剪贴板
clock: time, hour, watch, schedule, history, 时钟, 时间, 時計
clock-edit: reschedule, change time, edit time
clock-refresh: update time, sync, history, recent
cloud: weather, storage, online, server, sync, 云, 雲, クラウド
cloud-download: download, sync, backup, storage
cloud-upload: upload, backup, sync, storage, publish
cloud-drizzle: weather, rain, drizzle, 小雨
cloud-hail: weather, hail, storm, 冰雹
cloud-lightning: weather, thunderstorm, storm, thunder, 雷雨
cloud-moon: weather, night, partly cloudy
cloud-rain: weather, rain, rainy, umbrella, 雨
cloud-snow: weather, snow, winter, 雪
cloud-sun: weather, partly cloudy, 多云
cloud-sync: sync, synchronize, backup, refresh, 同步
clover: luck, lucky, four leaf, shamrock, plant, 四叶草
cocktail: drink, alcohol, bar, martini, glass, 鸡尾酒, カクテル
code: programming, developer, html, brackets, source, embed, 代码, コード
code-block: code snippet, pre, programming, markdown, 代码块
code-braces: curly braces, json, object, programming, {}
coffee: drink, cup, cafe, espresso, tea, hot, 咖啡, コーヒー
coins: money, cash, savings, finance, currency, 硬币, 金币, コイン
collaborate: team, people, users, group, cooperation, 协作
color-filter: rgb, colour, channels, blend, overlay, 滤镜
compare: before after, diff, slider, split, comparison, 对比, 比較
compass: navigation, direction, north, explore, 指南针, コンパス
compass-rose: wind rose, navigation, direction, north, map, 罗盘
container: docker, box, shipping, devops, package, 容器, コンテナ
continent: land, island, map, geography, world, 大陆
contrast: theme, dark mode, brightness, high contrast, a11y, 对比度
controller-home: home button, gamepad, console, guide button
cookie: biscuit, privacy, tracking, consent, snack, 饼干, クッキー
copy: duplicate, clone, clipboard, paste, 复制, コピー
copyleft: license, gpl, open source, free software, ↄ
copyright: ©, rights, legal, license, trademark, 版权, 著作権
corner-down-left: return, enter, reply, turn, 回车
corner-up-left: undo, reply, back, turn
corner-up-right: redo, share, forward, turn
corner-radius: border radius, rounded corner, round, css, 圆角
cow: animal, farm, cattle, milk, beef, 牛
cpp: c++, cplusplus, programming, code
cpu: processor, chip, hardware, computer, 处理器
credit-card: payment, card, bank, debit, purchase, checkout, 信用卡, クレジットカード
crop: cut, trim, resize, image, edit, 裁剪, トリミング
crossword: puzzle, word game, grid, 填字游戏
crown: king, queen, royal, premium, vip, winner, 皇冠, 王冠
csharp: c#, dotnet, .net, programming, code
cube: 3d, box, object, block, geometry, 立方体
cupcake: dessert, muffin, sweet, bakery, 纸杯蛋糕
cursor: pointer, mouse, arrow, click, select, 光标, 鼠标, カーソル
cursor-click: click, mouse, tap, select, 点击
cursor-crosshair: crosshair, precise, target, select
cursor-move: move, drag, pan, arrows, 移动
cursor-text: i-beam, caret, text cursor, typing, input
curves: tone curve, color grading, photo editing, levels, 曲线
cyclone: storm, hurricane, typhoon, spiral, weather, vortex, 气旋
dagger: knife, blade, weapon, sword, 匕首, 短剣
darts: dartboard, target, bullseye, game, aim, 飞镖, ダーツ
dashed-circle: dotted, draft, pending, placeholder, progress
database: storage, sql, db, data, server, 数据库, データベース
devices: responsive, multi-device, phone, laptop, tablet, desktop, 多设备
diamond: gem, jewel, premium, rhombus, 钻石, ダイヤ
dice-pair: dices, two dice, random, roll, game, board game, gambling, 骰子, サイコロ
diode: circuit, electronics, component, rectifier, 二极管
diorama: terrain, isometric, landscape, model, map, 3d, 沙盘
disc: cd, dvd, album, media, music, 光盘
discount: sale, coupon, percent, promo, deal, offer, 折扣, 割引
distribute-horizontal: align, spacing, layout, arrange, 水平均分
distribute-vertical: align, spacing, layout, arrange, 垂直均分
divide: division, math, ÷, operator, 除
dna: gene, genetics, biology, helix, 基因
dog: animal, pet, puppy, 狗, 犬
domino: tile, game, dominoes, 多米诺
donut: doughnut, dessert, sweet, food, 甜甜圈, ドーナツ
door: entrance, exit, room, enter, 门, ドア
dot: point, bullet, period, record, 点
dots: more, ellipsis, menu, options, overflow, meatballs, 更多
dots-vertical: more, kebab, menu, options, overflow, 更多
double-circle: very good, grade, mark, concentric, ◎, 二重丸, 双圆圈, 非常好
arrow-down-to-line: scroll to bottom, end, last, bottom, 到底部
download: save, get, import, arrow down, 下载, ダウンロード
dpad: d-pad, directional pad, controller, gamepad, cross key, 十字键
dress: clothing, fashion, skirt, apparel, 连衣裙, ワンピース
drill: power tool, tool, construction, diy, 电钻, ドリル
droplet: water, drop, liquid, rain, humidity, 水滴
drum: music, instrument, percussion, beat, 鼓, ドラム
dumbbell: gym, fitness, workout, weight, exercise, 哑铃
dustpan: clean, sweep, housekeeping, 簸箕, ちりとり
earbuds: earphones, headphones, airpods, audio, music, 耳机, イヤホン
edit: pencil, write, modify, change, rename, compose, 编辑, 編集
egg: food, breakfast, chicken, easter, 鸡蛋, 卵
egg-fried: fried egg, sunny side up, breakfast, food, 煎蛋, 目玉焼き
element: periodic table, chemistry, science, 元素
element-of: ∈, set, member, math, belongs to, 属于
empty-set: ∅, null set, set, math, 空集
equal: =, equals, math, same, 等于
eraser: rubber, delete, clear, erase, 橡皮, 消しゴム
ethernet: rj45, network, lan, cable, port, 网线, 网口
ev-charger: electric vehicle, charging station, electric car, 充电桩
exists: ∃, there exists, logic, math, quantifier, 存在
export: share, send out, output, external, 导出, エクスポート
exposure: ev, exposure compensation, brightness, photography, 曝光
external-link: open in new, new tab, link, outbound, launch, 外链
eye: view, see, visible, show, watch, preview, 查看, 显示, 目
eye-off: hide, hidden, invisible, private, 隐藏, 非表示
f-stop: aperture, f-number, ƒ, photography, lens, 光圈值
factory: industry, manufacturing, plant, building, 工厂, 工場
fahrenheit: temperature, degree, ℉, weather, 华氏度
fan: air, cooling, ventilation, wind, 风扇, 扇風機
fast-forward: forward, skip, media, player, speed, 快进, 早送り
fax: fax machine, office, print, 传真, ファックス
feather: quill, light, write, bird, 羽毛
fhd: full hd, 1080p, video quality, resolution, 全高清
file: document, page, paper, doc, 文件, ファイル
file-text: document, text, txt, article, page, notes, 文档
file-type-aep: after effects, adobe, motion graphics
file-type-ai: illustrator, adobe, vector
file-type-arw: sony raw, raw, camera, photo
file-type-cr3: canon raw, raw, camera, photo
file-type-csv: spreadsheet, data, table, comma separated values
file-type-dng: raw, digital negative, adobe, photo
file-type-doc: word, microsoft word, document, office
file-type-docx: word, microsoft word, document, office
file-type-gif: animation, image, animated, picture
file-type-html: web page, website, markup, browser
file-type-indd: indesign, adobe, layout, publishing
file-type-jpg: jpeg, image, photo, picture
file-type-md: markdown, readme, text, document, notes
file-type-mp3: audio, music, sound, song
file-type-mp4: video, movie, media
file-type-nef: nikon raw, raw, camera, photo
file-type-pdf: adobe acrobat, document, print, portable document format
file-type-png: image, picture, graphic, transparent
file-type-pptx: powerpoint, slides, presentation, office
file-type-psd: photoshop, adobe, image, layers
file-type-raf: fujifilm raw, raw, camera, photo
file-type-svg: vector, graphic, image, icon
file-type-txt: text, plain text, notes, document
file-type-xd: adobe xd, design, prototype
file-type-xls: excel, spreadsheet, table, office
file-type-xlsx: excel, spreadsheet, table, office
file-type-zip: archive, compressed, compression, rar, 7z, 压缩包
filter: funnel, sort, refine, narrow, 筛选, 过滤, フィルター
fingerprint: biometric, touch id, identity, security, auth, 指纹, 指紋
fire-station: firefighter, fire department, emergency, building, 消防站, 消防署
first-aid: medical kit, health, emergency, medicine, 急救箱, 救急箱
fish: animal, seafood, sea, pet, 鱼, 魚
fit-to-screen: fit, zoom to fit, viewport, scale, 适应屏幕
flag: report, marker, milestone, goal, country, 旗帜, 旗
flag-banner: banner, ribbon, title, label, 横幅
flag-checkered: finish, race, goal, end, racing, 终点
flag-pennant: triangle flag, banner, marker, 三角旗
flame: fire, hot, burn, trending, heat, 火, 炎
flashlight: torch, light, beam, 手电筒, 懐中電灯
flask: lab, chemistry, experiment, science, potion, 烧瓶, フラスコ
flip: mirror, reflect, symmetry, transform, 翻转, 反転
flip-vertical: mirror, reflect, symmetry, transform, 垂直翻转
flower: nature, plant, blossom, spring, garden, 花
flute: music, instrument, woodwind, 长笛, フルート
focus: autofocus, target, aim, center, camera, 对焦, フォーカス
fog: weather, mist, haze, cloud, 雾, 霧
fold-vertical: collapse, fold, compress, 折叠
folder: directory, files, archive, project, 文件夹, フォルダ
folder-open: directory, open, browse, explore, 打开文件夹
for-all: ∀, logic, math, quantifier, universal, 任意
four-in-a-row: connect four, board game, game, 四子棋
fuel: gas station, petrol, gasoline, fuel pump, 加油站, ガソリン
fullscreen: expand, maximize, zoom, enlarge, 全屏, 全画面
fullscreen-exit: minimize, collapse, shrink, exit, 退出全屏
function: fx, formula, math, equation, 函数
game-handheld: game boy, handheld console, gaming, portable, 掌机, 携帯ゲーム機
gamepad: controller, game, console, joystick, gaming, 手柄, ゲーム
garage: car, parking, building, house, 车库, ガレージ
gauge: dashboard, speedometer, meter, performance, speed, 仪表盘, メーター
ghost: spooky, halloween, spirit, phantom, 幽灵, おばけ
gift: present, birthday, surprise, reward, box, 礼物, プレゼント
git-pull-request: pr, merge request, code review, 合并请求
github: git, octocat, repository, code, logo
glasses: spectacles, eyewear, reading, vision, 眼镜, メガネ
globe: world, earth, internet, international, language, web, 地球, 世界
globe-search: web search, internet, browse, explore, 网络搜索
go-board: go, baduk, weiqi, board game, 围棋, 囲碁
goggles: safety glasses, eye protection, ski, swim, 护目镜, ゴーグル
golang: go, go language, programming, gopher
golf: sport, flag, hole, course, 高尔夫, ゴルフ
gpu: graphics card, video card, hardware, 显卡, グラボ
graduation-cap: education, school, university, academic, degree, student, 学位帽, 卒業
grapes: fruit, food, wine, 葡萄, ぶどう
greater-equal: ≥, math, comparison, 大于等于
greater-than: >, math, comparison, 大于
grip-vertical: drag handle, grab, reorder, move, sortable, dots
ground: earth, gnd, circuit, electronics, 接地
group: grouping, collection, objects, layers, combine, 编组
guitar: music, instrument, acoustic, band, 吉他, ギター
hachiware: character, anime, kawaii, cute, cat, ハチワレ, 小八
hammer: tool, build, construction, repair, diy, 锤子, ハンマー
hanamaru: 花丸, はなまる, great job, well done, excellent, grade, stamp, spiral, 很棒
hanamaru-stem: 花丸, はなまる, great job, well done, excellent, grade, flower, leaves, 很棒
hand: wave, stop, palm, grab, hello, raise hand, 手
hanger: clothes, wardrobe, closet, fashion, 衣架, ハンガー
hard-drive: hdd, disk, storage, hardware, 硬盘, ハードディスク
harmonica: music, instrument, mouth organ, 口琴, ハーモニカ
hash: hashtag, number, pound, #, channel, 井号
haskell: programming, functional, lambda, code
hat: fedora, clothing, headwear, fashion, 帽子
hd: high definition, 720p, video quality, resolution, 高清
hdmi: port, cable, video, display, connector, 接口
hdr: high dynamic range, photo, video, camera
heading: h1, title, header, markdown, typography, 标题
headphones: music, audio, listen, headset, 耳机, ヘッドホン
hearing: ear, listen, audio, hearing aid, deaf, 听力, 耳
heart: love, like, favorite, favourite, wishlist, valentine, 爱心, 喜欢, 收藏, ハート, いいね
heart-crack: heartbreak, broken heart, sad, breakup, 心碎, 失恋
heart-organ: cardiac, anatomy, cardiology, medical, organ, 心脏, 心臓
heart-pulse: heartbeat, health, cardio, pulse, medical, 心跳
heart-off: unlike, unfavorite, dislike, 取消收藏
helm: ship wheel, steering wheel, nautical, sailing, captain, 船舵, 舵
help: question, support, faq, info, assistance, 帮助, ヘルプ
hexagon: shape, polygon, six sided, honeycomb, 六边形
hexagram: star of david, six-pointed star, star, shape, 六芒星
highlighter: marker, highlight, text, pen, 荧光笔, 蛍光ペン
histogram: chart, distribution, statistics, levels, exposure, 直方图
history: recent, time, past, undo, log, revision, 历史, 履歴
hologram: projection, 3d, sci-fi, ar, 全息
home: house, homepage, main, start, dashboard, 首页, 主页, ホーム
horse: animal, equestrian, riding, pony, 马, 馬
hospital: medical, clinic, health, building, emergency, 医院, 病院
hotel: building, lodging, inn, travel, accommodation, 酒店, ホテル
hourglass: timer, time, wait, loading, sand, 沙漏, 砂時計
html: html5, web, markup, code, tag
ice-cream: dessert, gelato, sweet, summer, cone, 冰淇淋, アイス
id-card: identity, badge, license, profile, credentials, 身份证, 名札
identical: ≡, equivalent, congruent, math, 恒等于
image: picture, photo, gallery, img, media, 图片, 画像
import: inbox, download, load, input, 导入, インポート
inbox: mail, email, messages, tray, received, 收件箱, 受信箱
indent: increase indent, text, paragraph, tab, 缩进
inductor: coil, circuit, electronics, component, 电感
infinity: unlimited, forever, loop, endless, ∞, 无限, 無限
info: information, about, details, help, notice, 信息, 情報
integral: ∫, calculus, math, 积分
intersection: ∩, set, math, intersect, 交集
iso: sensitivity, film speed, camera, exposure, photography, 感光度
italic: oblique, emphasis, text, typography, 斜体
japanese-castle: castle, tenshu, japan, building, 天守阁, 城
java: coffee, programming, jvm, code
javascript: js, programming, code, web, ecmascript
joystick: arcade, game, controller, stick, 摇杆
json: data, object, file, api, config
kanban: board, tasks, project, agile, columns, 看板
key: password, unlock, access, security, auth, 钥匙, 鍵
keyboard: typing, input, keys, hardware, 键盘, キーボード
kotlin: programming, android, code
label: tag, sticker, badge, text label, 标签
label-ctr: contractor, employment type, text label
label-fte: full-time employee, employment type, text label
label-int: intern, employment type, text label
label-pt: part-time, employment type, text label
label-on: text label, enabled, active, switch
lamp: light, desk lamp, bulb, furniture, 灯
lamp-desk: desk lamp, light, study, office, 台灯
language-hiragana: japanese, translate, i18n, kana, 日语
languages: translate, translation, i18n, localization, language, 翻译, 多语言, 翻訳
languages-sparkle: ai translate, ai translation, machine translation, translate, ai, AI 翻译, 机器翻译, AI翻訳
laptop: computer, notebook, device, macbook, 笔记本电脑, ノートPC
layers: stack, layer, arrange, levels, 图层, レイヤー
leaf: nature, plant, eco, green, environment, 叶子, 葉
led: light emitting diode, light, circuit, electronics, 发光二极管
lemon: fruit, citrus, sour, lime, 柠檬, レモン
less-equal: ≤, math, comparison, 小于等于
less-than: <, math, comparison, 小于
letter-spacing: tracking, kerning, typography, text, 字间距
library: books, reading, study, education, bookshelf, 图书馆, 図書館
license: certificate, legal, agreement, document, terms, 许可证
lightbulb: idea, light, tip, hint, insight, 灯泡, 想法, アイデア
lighthouse: beacon, coast, sea, navigation, maritime, 灯塔
line-height: leading, line spacing, typography, text, 行高
line-segment: line, segment, geometry, draw, vector, 线段
link: chain, url, hyperlink, connect, attach, 链接, リンク
list: bullets, items, menu, todo, unordered, 列表, リスト
list-ordered: numbered list, ordered, ol, numbers, 有序列表
live-photo: motion photo, camera, photography, 实况照片
loader: loading, spinner, busy, wait, progress, 加载
locate: gps, location, crosshair, find me, position, 定位
lock: secure, security, password, private, padlock, protected, 锁, 鍵
lock-open: unlock, unlocked, open, access, 解锁
login: sign in, log in, enter, authentication, 登录, ログイン
logout: sign out, log out, exit, leave, 退出, ログアウト
lollipop: candy, sweet, sugar, dessert, 棒棒糖
lua: programming, code, script, moon
magnet: magnetic, attract, physics, snap, 磁铁, 磁石
mahjong: tile, game, mah-jongg, 麻将, 麻雀
mail: email, envelope, message, letter, inbox, 邮件, 邮箱, メール
map: navigation, location, atlas, geography, travel, 地图, 地図
map-pin: location, marker, place, gps, poi, destination, 定位, 位置, ピン
map-search: find location, search map, explore
mark-you-circle: 优, excellent, grade, a plus, teacher, stamp, 优秀
mark-you-square: 优, excellent, grade, a plus, teacher, stamp, 优秀
mark-yue-circle: 阅, 批阅, 已阅, reviewed, read, grade, stamp, 审阅
mark-yue-square: 阅, 批阅, 已阅, reviewed, read, grade, stamp, 审阅
mark-zhun-circle: 准, approved, approval, permit, stamp, 批准, 同意
mark-zhun-square: 准, approved, approval, permit, stamp, 批准, 同意
mcp: model context protocol, ai, agent, llm, protocol
meat: food, beef, bbq, protein, meat on bone, 肉
medal: award, prize, achievement, winner, 奖牌, メダル
medal-1: gold, first place, winner, champion, 金牌
medal-2: silver, second place, 银牌
medal-3: bronze, third place, 铜牌
memory: ram, memory card, chip, hardware, 内存, メモリ
menu: hamburger, navigation, nav, bars, options, 菜单, メニュー
menu-close: close menu, x, hamburger
menu-left: hamburger, navigation, align left
metronome: tempo, rhythm, beat, bpm, music, 节拍器
mic: microphone, record, voice, audio, podcast, 麦克风, マイク
mic-handheld: karaoke, singing, stage, microphone, 卡拉OK
mic-studio: studio, recording, podcast, microphone, 录音
mic-vintage: retro, radio, microphone, broadcast
microscope: science, lab, biology, research, 显微镜, 顕微鏡
microwave: oven, kitchen, appliance, cooking, 微波炉, 電子レンジ
milestone: signpost, roadmap, progress, goal, 里程碑
milk: dairy, drink, bottle, carton, 牛奶, 牛乳
minesweeper: mine, bomb, game, 扫雷, マインスイーパ
minus: subtract, remove, decrease, negative, collapse, 减号, マイナス
minus-circle: remove, subtract, decrease, delete
missile: rocket, weapon, military, projectile, 导弹, ミサイル
molecule: chemistry, atoms, bond, science, 分子
monitor: screen, display, desktop, computer, tv, 显示器, モニター
moon: night, dark mode, crescent, sleep, lunar, 月亮, 夜, 月
moon-star: night, sleep, dark, bedtime, 晚安
mosque: islam, muslim, masjid, building, religion, 清真寺, モスク
motorcycle: motorbike, bike, vehicle, ride, 摩托车, バイク
mountain: hill, peak, nature, landscape, hiking, 山
movie: film, cinema, clapperboard, video, 电影, 映画
mushroom: fungus, food, forest, 蘑菇, キノコ
music: note, song, audio, sound, melody, 音乐, 音楽
nabla: ∇, gradient, del, math, 梯度
navigation: gps, direction, location, arrow, compass, 导航, ナビ
network: lan, connection, nodes, topology, 网络, ネットワーク
neural-network: ai, deep learning, machine learning, nodes, 神经网络
nfc: contactless, tap, payment, wireless, rfid
not-equal: ≠, unequal, math, 不等于
notebook-pen: notes, notepad, diary, journal, write, 笔记本, ノート
octagon-x: stop, error, cancel, close, sign
onigiri: rice ball, japanese food, food, 饭团, おにぎり
outdent: decrease indent, text, paragraph, 减少缩进
package: box, delivery, shipping, parcel, product, 包裹, 荷物
pagoda: tower, temple, asia, buddhist, building, 塔, 五重塔
paint-bucket: fill, color, paint, bucket, 油漆桶
palette: color, colors, paint, theme, art, design, 调色板, パレット
panel-bottom: drawer, dock, layout, footer, panel
pants: trousers, jeans, clothing, apparel, 裤子, ズボン
paperclip: attachment, attach, clip, file, 附件, クリップ
paperclip-diagonal: attachment, attach, clip, 附件
parallel: ∥, math, geometry, lines, 平行
parking: car, parking lot, garage, 停车, 駐車場
partial: ∂, derivative, calculus, math, 偏导
pause: media, player, stop, wait, 暂停, 一時停止
paw: pet, animal, dog, cat, footprint, 爪印, 肉球
peace: peace sign, symbol, harmony, anti-war, 和平
pen: write, edit, draw, pencil, compose, 笔, ペン
pentagon: shape, polygon, five sided, 五边形
pentagram: star, five-pointed star, magic, occult, 五芒星
percent: percentage, %, discount, ratio, 百分比
perpendicular: ⊥, math, geometry, right angle, 垂直
perspective: 3d, transform, skew, distort, 透视
phone: call, telephone, contact, ring, 电话, 電話
phone-call: calling, ringing, telephone, 通话
phone-incoming: incoming call, receive, telephone, 来电
phone-missed: missed call, telephone, 未接来电
phone-outgoing: outgoing call, dial, telephone, 拨出
phone-off: hang up, no calls, mute, telephone, 挂断
image-edit: edit image, retouch, image editing, 修图
php: programming, web, code, server
piano: music, instrument, keys, keyboard, 钢琴, ピアノ
picture-in-picture: pip, floating video, overlay, window, 画中画
pig: animal, farm, pork, 猪, ブタ
piggy-bank: savings, money, save, finance, 存钱罐, 貯金箱
pilcrow: paragraph, ¶, text, typography, 段落
pill: medicine, drug, capsule, pharmacy, 药, 薬
pin: pushpin, thumbtack, pinned, attach, sticky, 图钉, 置顶
pin-diagonal: pushpin, thumbtack, pinned, 图钉
ping-pong: table tennis, paddle, sport, 乒乓球, 卓球
pistol: gun, weapon, firearm, 手枪, 拳銃
pizza: food, fast food, slice, italian, 披萨, ピザ
plane: airplane, flight, travel, airport, 飞机, 飛行機
plane-landing: arrival, arrive, airport, flight, 降落
plane-takeoff: departure, depart, airport, flight, 起飞
play: start, media, video, run, player, 播放, 再生
play-circle: start, video, media, player, 播放
playing-card: card, deck, poker, game, 扑克牌
plug: power, electricity, socket, connect, plugin, 插头, プラグ
plus: add, new, create, increase, positive, 加号, 新建, 追加
plus-circle: add, new, create, 添加
plus-minus: ±, tolerance, math
podcast: broadcast, audio, radio, show, 播客, ポッドキャスト
podium: ranking, winner, leaderboard, award, 领奖台, 表彰台
poker-chip: casino, gambling, token, bet, 筹码
police-station: police, law, building, security, 警察局, 警察署
popcorn: movie, cinema, snack, 爆米花, ポップコーン
post-office: mail, postal, building, letter, 邮局, 郵便局
power: on off, shutdown, switch, button, 电源, 電源
power-state-off: power off, shutdown, turn off, iec o, 关机
power-state-on: power on, switch on, turn on, iec i, 开机
power-toggle: power button, on off, switch, 开关
presentation: slides, whiteboard, meeting, lecture, keynote, 演示, プレゼン
printer: print, office, paper, device, 打印机, プリンター
product: ∏, product, math, multiplication, 连乘
proportional: ∝, proportional to, math, 正比
public-domain: pd, cc0, copyright free, no rights, 公有领域
puzzle: jigsaw, plugin, extension, addon, piece, 拼图, パズル
puzzle-cube: rubik's cube, cube, toy, 魔方
python: programming, code, snake, py
qr-code: qr, barcode, scan, link, 二维码, QRコード
quote: quotation, blockquote, citation, 引用
rabbit: bunny, animal, fast, speed, hare, 兔子, うさぎ
radar: scan, detect, sonar, search, 雷达, レーダー
radar-dish: radar, antenna, military, air defense, 雷达站
radio: broadcast, fm, am, music, tuner, 收音机, ラジオ
radio-checked: radio button, option, selected, form, 单选
radio-tower: broadcast, signal, antenna, transmitter, 广播塔
radioactive: radiation, nuclear, hazard, danger, 辐射
rainbow: colors, spectrum, weather, pride, 彩虹, 虹
receipt: bill, invoice, purchase, payment, 收据, レシート
recycle: recycling, reuse, eco, green, environment, 回收, リサイクル
redo: repeat, forward, arrow, 重做, やり直し
refresh: reload, sync, update, retry, 刷新, 更新
refrigerator: fridge, freezer, kitchen, appliance, 冰箱, 冷蔵庫
region: area, polygon, selection, shape, vector, 区域
registered: ®, trademark, brand, legal, 注册商标
repeat: loop, replay, cycle, again, 循环, リピート
repeat-one: loop one, repeat single, 单曲循环
replace: find and replace, substitute, swap, 替换
reset: restore, undo, refresh, revert, 重置
resistor: circuit, electronics, component, ohm, 电阻
rewind: back, media, player, 快退, 巻き戻し
rice: bowl, food, asian, meal, 米饭, ご飯
robot: bot, ai, android, automation, machine, 机器人, ロボット
rocket: launch, space, startup, deploy, fast, 火箭, ロケット
rotate: rotation, turn, clockwise, spin, 旋转, 回転
rotate-ccw: counterclockwise, rotate left, undo, 逆时针
route: path, journey, directions, navigation, map, 路线, ルート
router: wifi, network, modem, internet, 路由器, ルーター
rss: feed, subscribe, news, blog, 订阅
ruby: programming, gem, rails, code
rugby: american football, ball, sport, football, 橄榄球, ラグビー
ruler: measure, length, scale, 尺子, 定規
run: running, jog, exercise, sport, fitness, 跑步, ランニング
rust: programming, crab, ferris, code
sailboat: boat, sailing, yacht, sea, 帆船, ヨット
sake: japanese, alcohol, tokkuri, drink, 清酒, 日本酒
sakura-stamp: cherry blossom, よくできました, well done, great job, grade, seal, 樱花, 桜, 很棒
sam: surface to air missile, air defense, military vehicle, 防空导弹
satellite: space, orbit, gps, communication, 卫星, 衛星
save: floppy disk, disk, store, 保存
saw: tool, cut, wood, carpentry, 锯子, のこぎり
saxophone: sax, music, instrument, jazz, 萨克斯
scale: weight, measure, weigh, kitchen scale, 秤
scale-balance: justice, law, legal, compare, 天平, 天秤
scan-face: face id, face recognition, biometric, unlock, 人脸识别, 顔認証
school: education, building, learn, student, 学校
scissors: cut, snip, clip, tool, 剪刀, はさみ
scooter: vespa, moped, vehicle, ride, 小型摩托, スクーター
screen-record: record, screencast, capture, 录屏
screen-share: share screen, cast, present, meeting, 共享屏幕, 画面共有
screenshot: capture, snapshot, screen capture, print screen, 截图, スクショ
screwdriver: tool, repair, fix, diy, 螺丝刀, ドライバー
sd: standard definition, video quality, 480p, 标清
sd-card: memory card, storage, camera, 存储卡, SDカード
search: find, magnifier, magnifying glass, lookup, zoom, 搜索, 查找, 検索
search-plus: zoom in, magnify, enlarge, 放大
search-minus: zoom out, shrink, 缩小
send: paper plane, submit, message, email, 发送, 送信
arrange-send-backward: layer, arrange, order, move down, z-index, 下移一层
arrange-send-to-back: layer, arrange, order, bottom, z-index, 置于底层
separator-horizontal: divider, split, line, rule, hr, 分隔线
separator-vertical: divider, split, line, column, 分隔线
sequence: play in order, sequential, playlist, order, 顺序播放
server: hosting, backend, rack, data center, 服务器, サーバー
server-cog: server settings, configuration, admin, 服务器设置
settings: cog, gear, preferences, configuration, options, setup, 设置, 设定, 設定, 歯車
shapes: geometry, triangle, square, circle, objects, 形状, 図形
share: social, send, network, connect, distribute, 分享, 共有
share-arrow: forward, send, export, 转发
shield: security, protection, safe, guard, defense, 安全, 盾牌, 盾
shield-alert: warning, security alert, threat, 安全警告
ship: boat, cargo, ferry, sea, shipping, 船
shoe: footwear, sneaker, fashion, 鞋, 靴
shoe-boot: boots, footwear, 靴子, ブーツ
shoe-formal: leather shoes, dress shoes, oxford, 皮鞋, 革靴
shoe-heel: high heels, pumps, stiletto, 高跟鞋, ハイヒール
shoe-sandal: flip flops, sandals, beach, 拖鞋, ビーチサンダル
shopping-bag: shopping, bag, store, purchase, 购物袋
shovel: dig, spade, garden, tool, 铲子, スコップ
shower: bath, bathroom, wash, water, 淋浴, シャワー
shrine: shinto, jinja, japan, 神社
shuffle: random, mix, shuffle play, 随机播放, シャッフル
shutter-speed: exposure time, stopwatch, camera, photography, 快门速度
sidebar: panel, layout, navigation, drawer, 侧边栏, サイドバー
sidebar-right: panel, layout, inspector, drawer, 右侧栏
sigma: Σ, sum, summation, math, 求和
signal: cellular, bars, reception, strength, network, 信号, 電波
signpost: direction, sign, road, way, 路标, 道標
sinan: compass, ancient china, spoon, navigation, 司南
skip-back: previous, prev track, media, 上一首
skip-forward: next, next track, media, 下一首
ski: skiing, snow, winter, sport, 滑雪, スキー
skull-crossbones: poison, toxic, danger, death, pirate, 骷髅, 毒
skyscraper: building, tower, city, high-rise, 摩天楼, 高層ビル
slash: divide, separator, /, stroke, 斜杠
sliders: settings, adjust, controls, filter, equalizer, preferences, 调节, 设置
smartphone: phone, mobile, iphone, android, device, 手机, スマホ
smile: smiley, happy, emoji, face, 笑脸, 笑顔
snail: slow, animal, 蜗牛, カタツムリ
snowflake: snow, winter, cold, freeze, 雪花, 雪
soccer: football, ball, sport, 足球, サッカー
sock: socks, clothing, 袜子, 靴下
soda: drink, cup, straw, soft drink, cola, 饮料, ジュース
sofa: couch, furniture, living room, 沙发, ソファ
sort-ascending: a-z, ascending order, sort, 升序
sort-descending: z-a, descending order, sort, 降序
spaag: self-propelled anti-aircraft gun, air defense, military vehicle, 自行高炮
sparkle: ai, magic, shine, new, stars, effect, 闪光, キラキラ
speaker: audio, sound, loudspeaker, music, 音箱, スピーカー
spear: lance, weapon, javelin, 长矛, 槍
sprout: plant, seedling, grow, growth, eco, 发芽, 芽
sqrt: square root, √, radical, math, 根号
square: shape, box, rectangle, stop, 方形, 四角
ssd: solid state drive, m.2, nvme, storage, 固态硬盘
stadium: arena, sports, venue, 体育场, スタジアム
stamp: seal, approved, mark, 印章, ハンコ
stamp-approved: seal, certified, ok, 批准, 承認
star: favorite, rating, bookmark, like, featured, 星, 收藏, お気に入り
steak: meat, beef, food, 牛排, ステーキ
stethoscope: doctor, medical, health, diagnosis, 听诊器
stop: media, square, halt, end, 停止
stopwatch: timer, time, chronometer, lap, 秒表, ストップウォッチ
store: shop, market, retail, storefront, 商店, 店
strawberry: fruit, berry, food, 草莓, いちご
strikethrough: strike, cross out, text, format, 删除线
subscript: text, typography, index, math, 下标
subset: ⊂, set, math, contained in, 子集
sudoku: puzzle, number, game, grid, 数独
sun: day, light mode, brightness, sunny, weather, 太阳, 晴, 太陽
sundial: time, clock, ancient, 日晷, 日時計
sunglasses: shades, summer, cool, eyewear, 墨镜, サングラス
sunrise: morning, dawn, sun, 日出, 日の出
sunset: evening, dusk, sun, 日落, 夕日
superscript: exponent, power, text, math, 上标
surf: surfing, wave, beach, sport, 冲浪, サーフィン
swift: programming, apple, ios, code
swim: swimming, pool, sport, 游泳, 水泳
sword: weapon, blade, knight, 剑, 剣
swords: battle, fight, combat, crossed swords, pvp, 战斗
syringe: injection, vaccine, medical, needle, 注射器, 注射
t-shirt: tee, shirt, clothing, apparel, 衬衫, Tシャツ
table: grid, spreadsheet, rows, columns, data, 表格, テーブル
tablet: ipad, device, tab, 平板
tada: party popper, celebration, confetti, congratulations, 庆祝, クラッカー
tag: label, price, category, tagging, 标签, タグ
tag-horizontal: label, price, tagging, 标签
tags: labels, categories, tagging, 标签
target: goal, aim, bullseye, focus, objective, 目标, ターゲット
task: todo, clipboard, checklist, done, assignment, 任务, タスク
taxi: cab, car, transport, ride, 出租车, タクシー
teapot: tea, kettle, kitchen, drink, 茶壶, 急須
telescope: astronomy, space, observe, star, 望远镜, 望遠鏡
temple: buddhist temple, building, religion, japan, 寺庙, 寺
tennis: ball, sport, racket, 网球, テニス
tent: camping, outdoor, camp, 帐篷, テント
terminal: console, command line, shell, cli, bash, 终端, ターミナル
test-tube: lab, chemistry, science, experiment, 试管, 試験管
tetromino: tetris, block, game, puzzle, 俄罗斯方块, テトリス
text: type, font, typography, 文本, テキスト
theme: dark mode, light mode, day night, appearance, 主题, 深色模式, テーマ
therefore: ∴, math, logic, 所以
thermometer: temperature, weather, heat, fever, 温度计, 温度計
thumbs-up: like, approve, good, ok, agree, 点赞, いいね
thumbs-down: dislike, disapprove, bad, 踩
tic-tac-toe: noughts and crosses, game, xo, 井字棋, 三目並べ
ticket: pass, admission, event, coupon, 门票, チケット
timeline: history, chronology, steps, events, 时间线, タイムライン
timer: countdown, stopwatch, time, 计时器, タイマー
toggle-on: switch, enable, enabled, active, 开关, スイッチ
toggle-off: switch, disable, disabled, inactive, 开关, スイッチ
toilet: wc, restroom, bathroom, lavatory, 厕所, トイレ
toolbox: tools, kit, repair, maintenance, 工具箱
tools: wrench, screwdriver, settings, repair, maintenance, 工具
tooth: dental, dentist, teeth, molar, 牙齿, 歯
torii: shinto, shrine, gate, japan, 鸟居, 鳥居
tornado: twister, storm, weather, wind, 龙卷风, 竜巻
trademark: ™, brand, legal, 商标
traffic-cone: construction, warning, road, under construction, 路锥
traffic-light: signal, stoplight, road, traffic, 红绿灯, 信号機
train-station: station, railway, train, transit, 车站, 駅
transistor: npn, circuit, electronics, component, 晶体管
trash: delete, remove, bin, garbage, rubbish, discard, 删除, 垃圾桶, ゴミ箱
trash-restore: restore, undelete, recover, recycle bin, 恢复
trash-x: delete permanently, empty trash, remove, 彻底删除
tree: nature, forest, plant, wood, 树, 木
tree-palm: palm, beach, tropical, island, summer, 椰子树
tree-pine: pine, christmas tree, forest, conifer, evergreen, 松树
tree-view: hierarchy, file tree, outline, nested, structure, 树状
trending-up: growth, increase, rise, chart, stock, 上升
trending-down: decline, decrease, fall, chart, loss, 下降
triangle: shape, delta, warning, geometry, 三角形
trophy: award, winner, cup, champion, prize, achievement, 奖杯, トロフィー
truck: delivery, shipping, lorry, transport, vehicle, 卡车, トラック
trumpet: music, instrument, brass, horn, 小号, トランペット
tulip: flower, macro, spring, plant, 郁金香, チューリップ
turntable: record player, vinyl, dj, music, 唱机
turtle: tortoise, slow, animal, 乌龟, カメ
tv: television, screen, monitor, display, 电视, テレビ
typescript: ts, programming, code, javascript
typhoon: hurricane, cyclone, storm, weather, 台风, 台風
typography: font, text, type, letter, 字体, 文字
uhd: ultra hd, 4k, video quality, resolution, 超高清
umbrella: rain, weather, protection, insurance, 雨伞, 傘
underline: text, format, typography, 下划线
undo: back, revert, history, arrow, 撤销, 元に戻す
ungroup: ungrouping, separate, objects, layers, 取消编组
union: ∪, set, math, 并集
unlink: broken link, disconnect, remove link, 取消链接
arrow-up-to-line: scroll to top, back to top, top, first, 回到顶部
upgrade: update, level up, improve, arrow up, 升级, アップグレード
upload: send, export, arrow up, 上传, アップロード
usagi: character, anime, rabbit, kawaii, cute, うさぎ, 乌萨奇
usb: port, connector, cable, 接口
usb-a: usb port, connector, port
usb-c: type-c, usb port, connector, charging
usb-drive: flash drive, thumb drive, usb stick, storage, u盘, USBメモリ
user: person, account, profile, avatar, member, 用户, ユーザー
user-admin: administrator, manager, superuser, 管理员
user-check: verified user, approved, confirmed
user-circle: avatar, profile, account
user-cog: user settings, account settings, 用户设置
user-commenter: reviewer, role, person, comment
user-contractor: freelance, employment, person, worker
user-editor: writer, role, person, edit
user-freelancer: self-employed, employment, person, independent
user-full-time: employee, full-time, staff, employment
user-guest: visitor, anonymous, person, 访客
user-intern: intern, trainee, student, employment
user-minus: remove user, unfollow, person, account
user-owner: owner, admin, crown, role
user-part-time: employment, staff, person, 兼职
user-plus: add user, invite, follow, new user, 添加用户
user-remote: remote work, work from home, wfh
user-temp: temporary, contractor, employment
user-viewer: read only, role, person, watcher
user-x: remove user, block, ban user
users: people, group, team, members, community, 团队, ユーザー
utensils: fork, knife, restaurant, food, dining, 餐具, カトラリー
video: camera, movie, film, record, media, 视频, 動画
vignette: photo editing, darkening, effect, filter, 暗角
vinyl: record, lp, music, album, 黑胶, レコード
violin: music, instrument, strings, fiddle, 小提琴, バイオリン
voicemail: voice message, phone, answering machine, 语音信箱
volleyball: ball, sport, beach, 排球, バレー
volume: sound, audio, speaker, loud, 音量
volume-low: quiet, sound, speaker
volume-x: mute, silent, no sound, speaker, 静音, ミュート
vr-headset: virtual reality, vr, oculus, headset, 3d, 虚拟现实
wallet: money, payment, purse, finance, 钱包, 財布
wand: magic, wizard, effect, auto, 魔杖, 魔法
warehouse: storage, inventory, logistics, building, 仓库, 倉庫
washing-machine: laundry, washer, appliance, 洗衣机, 洗濯機
watermelon: fruit, summer, food, 西瓜, スイカ
wave-sine: sine wave, oscillation, signal, frequency, 正弦波
waves: water, sea, ocean, wave, 波浪, 波
webcam: camera, video call, web camera, 摄像头, ウェブカメラ
webhook: integration, api, callback, hook
wheelchair: accessibility, disability, a11y, 轮椅, 車椅子
wifi: wireless, internet, network, connection, signal, 无线网络, ワイファイ
wind: weather, air, breeze, windy, 风, 風
windmill: wind turbine, energy, farm, 风车, 風車
window: browser, app, ui, frame, 窗口, ウィンドウ
wine: alcohol, glass, drink, bar, 红酒, ワイン
wrench: tool, settings, repair, fix, spanner, 扳手, レンチ
arrow-down-a-z: sort ascending, alphabetical, a-z, 升序
arrow-down-z-a: sort descending, reverse alphabetical, z-a, 降序
audio-lines: waveform, sound, voice, equalizer, audio, 音频
badge-check: verified, certified, approved, official, 认证
bell-ring: notification, ringing, alarm, alert, 响铃
chevron-first: first page, start, beginning, skip back, 第一页
chevron-last: last page, end, skip forward, 最后一页
chevrons-down-up: collapse, fold, shrink, 收起
chevrons-left: rewind, back, double arrow, previous
chevrons-right: fast forward, next, double arrow, skip
clipboard-check: task done, checklist, copied, 已复制
clipboard-paste: insert, paste from clipboard, copy paste, 粘贴, 貼り付け
copy-check: copied, duplicate done, 已复制
eject: media, eject disc, disc tray, 弹出
eye-closed: hide, hidden, invisible, sleep, 隐藏
files: documents, multiple files, copy, stack, 多个文件
forward: share, send, next, mail forward, 转发
grid-3x3: grid, table, tiles, layout, 九宫格
grip: drag handle, grab, move, dots
grip-horizontal: drag handle, grab, reorder, move, dots
hand-grab: grab, drag, pan, move, 抓取
handshake: agreement, deal, partnership, cooperation, 握手
heading-1: h1, title, header, markdown, 一级标题
heading-2: h2, subtitle, header, markdown, 二级标题
heading-3: h3, header, markdown, 三级标题
layout-dashboard: dashboard, widgets, panels, overview, 仪表盘
list-filter: filter, funnel, sort, refine, 筛选
mail-open: read, opened, email, envelope, 已读
megaphone: announcement, broadcast, marketing, loudspeaker, 喇叭, 公告
mouse: computer mouse, pointer, click, input, 鼠标, マウス
newspaper: news, article, press, journal, 报纸, 新聞
panel-left-close: collapse sidebar, hide sidebar, 收起侧栏
panel-left-open: expand sidebar, show sidebar, 展开侧栏
panel-right-close: collapse sidebar, hide panel, 收起侧栏
panel-right-open: expand sidebar, show panel, 展开侧栏
pen-tool: vector, bezier, path, design, 钢笔工具
pin-off: unpin, unpinned, 取消置顶
pipette: eyedropper, color picker, pick color, 取色器, スポイト
rectangle-horizontal: shape, landscape, box, 矩形
rectangle-vertical: shape, portrait, box, 矩形
regex: regular expression, pattern, match, search, 正则
remove-formatting: clear formatting, text, eraser, 清除格式
reply: respond, answer, message, mail, 回复, 返信
reply-all: respond all, message, mail, 全部回复
smile-plus: add reaction, emoji, react, 表情回应
star-half: rating, half star, review, 评分
sticky-note: note, post-it, memo, reminder, 便签, 付箋
user-search: find user, lookup, people search, 查找用户
virus: covid, germ, bacteria, infection, malware, 病毒, ウイルス
watch: smartwatch, wristwatch, time, wearable, 手表, 腕時計
workflow: flow, process, automation, pipeline, diagram, 工作流
x: close, cancel, delete, remove, clear, exit, 关闭, 取消, 閉じる
x-circle: close, cancel, error, remove
x-square: close, cancel, remove
yin-yang: taoism, balance, harmony, tai chi, 阴阳, 太极
zap: lightning, bolt, electric, flash, power, fast, 闪电, 雷
`)

// 不是单独图标、但会出现在名字里的片段（角标符号、系列前缀）
export const PARTS = parse(`
assets: media, resources, files, library, 素材
ellipsis: typing, more, pending, …, 输入中
exclaim: alert, warning, important, !, 注意
question: help, faq, unknown, ?, 问题
chart: graph, statistics, analytics, data, visualization, 图表, グラフ
layout: ui, grid, panel, template, 布局, レイアウト
git: version control, vcs, source control, repository, github
file-type: file format, extension, document, 文件类型
align-objects: alignment, arrange, layout, design, 对齐
resize: scale, stretch, drag, 调整大小
corner: turn, bend, arrow
close: dismiss, exit, x, 关闭
maximize: enlarge, fullscreen, 最大化
minimize: collapse, hide, 最小化
restore: unmaximize, windowed, 还原
terrain: landscape, landform, ground, sculpt, 地形
off: disabled, disable, turn off, hidden, none, 关闭, オフ
half: simplified, compact, minimal
`)

// 封闭系列：系列的词 + 这一项自己的词（item(rest) 返回，rest 是去掉系列前缀后的部分）
const table = raw => parse(raw)
const KANA = table(`
a: あ, ア
i: い, イ
u: う, ウ
e: え, エ
o: お, オ
ka: か, カ
ki: き, キ
ku: く, ク
ke: け, ケ
ko: こ, コ
sa: さ, サ
shi: し, シ
su: す, ス
se: せ, セ
so: そ, ソ
ta: た, タ
chi: ち, チ
tsu: つ, ツ
te: て, テ
to: と, ト
na: な, ナ
ni: に, ニ
nu: ぬ, ヌ
ne: ね, ネ
no: の, ノ
ha: は, ハ
hi: ひ, ヒ
fu: ふ, フ
he: へ, ヘ
ho: ほ, ホ
ma: ま, マ
mi: み, ミ
mu: む, ム
me: め, メ
mo: も, モ
ya: や, ヤ
yu: ゆ, ユ
yo: よ, ヨ
ra: ら, ラ
ri: り, リ
ru: る, ル
re: れ, レ
ro: ろ, ロ
wa: わ, ワ
wo: を, ヲ
n: ん, ン
`)
const GREEK = 'alpha α Α|beta β Β|gamma γ Γ|delta δ Δ|epsilon ε Ε|zeta ζ Ζ|eta η Η|theta θ Θ|iota ι Ι|kappa κ Κ|lambda λ Λ|mu μ Μ|nu ν Ν|xi ξ Ξ|omicron ο Ο|pi π Π|rho ρ Ρ|sigma σ Σ|tau τ Τ|upsilon υ Υ|phi φ Φ|chi χ Χ|psi ψ Ψ|omega ω Ω'
  .split('|').map(s => s.split(' '))
const GREEK_EXTRA = table(`
capital-delta: change, difference, 变化量
capital-sigma: sum, summation, 求和
capital-omega: ohm, resistance, 欧姆
capital-pi: product, 连乘
mu: micro, 微
pi: 3.14, circle constant, 圆周率
lambda: function, anonymous function, wavelength
theta: angle, 角度
`)
const HEXAGRAMS = '乾 坤 屯 蒙 需 讼 师 比 小畜 履 泰 否 同人 大有 谦 豫 随 蛊 临 观 噬嗑 贲 剥 复 无妄 大畜 颐 大过 坎 离 咸 恒 遁 大壮 晋 明夷 家人 睽 蹇 解 损 益 夬 姤 萃 升 困 井 革 鼎 震 艮 渐 归妹 丰 旅 巽 兑 涣 节 中孚 小过 既济 未济'.split(' ')
const TRIGRAMS = table(`
qian: 乾, ☰, heaven, 天
kun: 坤, ☷, earth, 地
zhen: 震, ☳, thunder, 雷
xun: 巽, ☴, wind, 风
kan: 坎, ☵, water, 水
li: 离, ☲, fire, 火
gen: 艮, ☶, mountain, 山
dui: 兑, ☱, lake, 泽
`)
const RUNES = table(`
fehu: ᚠ, cattle, wealth
uruz: ᚢ, aurochs, strength
thurisaz: ᚦ, thorn, giant
ansuz: ᚨ, god, odin
raidho: ᚱ, ride, journey
kaunan: ᚲ, torch, ulcer
gebo: ᚷ, gift
wunjo: ᚹ, joy
hagalaz: ᚺ, hail
naudiz: ᚾ, need
isa: ᛁ, ice
jera: ᛃ, year, harvest
eihwaz: ᛇ, yew
perthro: ᛈ, fate
algiz: ᛉ, elk, protection
sowilo: ᛊ, sun
tiwaz: ᛏ, tyr
berkana: ᛒ, birch
ehwaz: ᛖ, horse
mannaz: ᛗ, man
laguz: ᛚ, water, lake
ingwaz: ᛜ, ing
dagaz: ᛞ, day
othala: ᛟ, heritage
`)
const BRANCHES = table(`
zi: 子, rat
chou: 丑, ox
yin: 寅, tiger
mao: 卯, rabbit
chen: 辰, dragon
si: 巳, snake
wu: 午, horse
wei: 未, goat
shen: 申, monkey
you: 酉, rooster
xu: 戌, dog
hai: 亥, pig
`)
const STEMS = table(`
jia: 甲
yi: 乙
bing: 丙
ding: 丁
wu: 戊
ji: 己
geng: 庚
xin: 辛
ren: 壬
gui: 癸
`)
const CHINESE_ZODIAC = table(`
rat: 鼠, 子, ねずみ, mouse
ox: 牛, 丑, うし, cow
tiger: 虎, 寅, とら
rabbit: 兔, 卯, うさぎ
dragon: 龙, 辰, たつ
snake: 蛇, 巳, へび
horse: 马, 午, うま
goat: 羊, 未, ひつじ, sheep
monkey: 猴, 申, さる
rooster: 鸡, 酉, とり, chicken
dog: 狗, 戌, いぬ
pig: 猪, 亥, いのしし, boar
`)
const ZODIAC = table(`
aries: ♈, ram, 白羊座, おひつじ座
taurus: ♉, bull, 金牛座, おうし座
gemini: ♊, twins, 双子座, ふたご座
cancer: ♋, crab, 巨蟹座, かに座
leo: ♌, lion, 狮子座, しし座
virgo: ♍, maiden, 处女座, おとめ座
libra: ♎, scales, 天秤座, てんびん座
scorpio: ♏, scorpion, 天蝎座, さそり座
sagittarius: ♐, archer, 射手座, いて座
capricorn: ♑, sea goat, 摩羯座, やぎ座
aquarius: ♒, water bearer, 水瓶座, みずがめ座
pisces: ♓, fish, 双鱼座, うお座
`)
const ASTRO = table(`
sun: ☉, 太阳
moon: ☽, 月亮
mercury: ☿, 水星
venus: ♀, 金星
earth: ⊕, 地球
mars: ♂, 火星
jupiter: ♃, 木星
saturn: ♄, 土星
uranus: ♅, 天王星
neptune: ♆, 海王星
pluto: ♇, 冥王星
`)
const ALCHEMY = table(`
air: element, 风
fire: element, 火
water: element, 水
earth: element, 土
gold: sun, 金
silver: moon, 银
copper: venus, 铜
iron: mars, 铁
lead: saturn, 铅
tin: jupiter, 锡
mercury: quicksilver, 汞
sulfur: brimstone, 硫
salt: 盐
antimony: 锑
nitre: saltpeter, niter, 硝石
philosophers-stone: philosopher's stone, 贤者之石, 賢者の石
`)
const XIANGQI = table(`
bing: 兵, soldier, pawn
zu: 卒, soldier, pawn
che: 车, chariot, rook
ma: 马, horse, knight
pao: 炮, cannon
xiang: 象, elephant, bishop
xiang-mu: 相, minister, elephant
shi: 士, advisor, guard
shi-ren: 仕, advisor, guard
jiang: 将, general, king
shuai: 帅, general, king
`)
const SHOGI = table(`
fu: 歩, pawn
gin: 銀, silver general
gyoku: 玉, king
hisha: 飛車, rook
kaku: 角行, bishop
keima: 桂馬, knight
kin: 金, gold general
kyousha: 香車, lance
ou: 王, king
`)
const CHESS = table(`
king: 王, crown, キング
queen: 后, queen, クイーン
rook: castle, 车, ルーク
bishop: 象, ビショップ
knight: horse, 马, ナイト
pawn: 兵, ポーン
`)
const NUMBER_WORDS = 'zero 零|one 一|two 二|three 三|four 四|five 五|six 六|seven 七|eight 八|nine 九'.split('|').map(s => s.split(' '))
const ROMAN = 'Ⅰ Ⅱ Ⅲ Ⅳ Ⅴ Ⅵ Ⅶ Ⅷ Ⅸ Ⅹ Ⅺ Ⅻ'.split(' ')
const RESIN = 'pet|hdpe|pvc|ldpe|pp|ps|other'.split('|')
const RATING = table(`
mpa: film rating, movie, mpaa, 电影分级
esrb: video game, game rating, 游戏分级
pegi: video game, game rating, europe
bbfc: film rating, uk, british
acb: australia, classification
eirin: 映倫, film rating, japan, 映画
cero: video game, japan, ゲーム
kmrb: korea, film rating
usk: germany, video game
cadpa: 适龄提示, china, video game
sensitivity: image rating, nsfw, safe, booru
`)
const LAUNDRY = table(`
wash: washing, washer, 水洗
bleach: bleaching, 漂白
iron: ironing, 熨烫, アイロン
dry-clean: dry cleaning, 干洗, ドライクリーニング
tumble-dry: dryer, tumble dryer, 烘干, 乾燥機
dry: drying, line dry, 晾干, 干す
wet-clean: wet cleaning, professional
`)
const UNIT = table(`
air-defense: anti-aircraft, 防空
airborne: paratrooper, parachute, 空降
amphibious: marines, 两栖
anti-tank: 反坦克
armor: tank, armored, 装甲
armored-recon: cavalry, reconnaissance, 装甲侦察
artillery: cannon, 炮兵
aviation: helicopter, aircraft, 航空兵
echelon-army: 集团军
echelon-battalion: 营
echelon-brigade: 旅
echelon-company: 连
echelon-corps: 军
echelon-division: 师
echelon-platoon: 排
echelon-regiment: 团
echelon-section: 班
echelon-squad: 班组
electronic-warfare: ew, jamming, 电子战
engineer: sapper, 工兵
frame-friendly: friend, ally, 友军
frame-hostile: enemy, 敌军
frame-neutral: 中立
frame-unknown: 不明
headquarters: hq, command, 指挥部
infantry: soldier, 步兵
maintenance: repair, 维修
mechanized: 机械化
medical: medic, 医疗
military-police: mp, 宪兵
missile: rocket, 导弹
mortar: 迫击炮
mountain: alpine, 山地
recon: reconnaissance, scout, 侦察
self-propelled-artillery: spg, 自行火炮
signal: communications, radio, 通信
special-forces: commando, 特种部队
supply: logistics, 补给
transport: logistics, truck, 运输
`)
const RANK = table(`
private: 列兵
corporal: 下士
sergeant: 中士
staff-sergeant: 上士
master-sergeant: 军士长
sergeant-major: 军士长
second-lieutenant: 少尉
first-lieutenant: 中尉
captain: 上尉
major: 少校
lieutenant-colonel: 中校
colonel: 上校
major-general: 少将
lieutenant-general: 中将
general: 上将
`)
const NAVY = table(`
battleship: 战列舰
carrier: aircraft carrier, 航母
cruiser: 巡洋舰
destroyer: 驱逐舰
frigate: 护卫舰
submarine: sub, 潜艇
`)
const TANK = table(`
destroyer: tank destroyer, 坦克歼击车
heavy: 重型坦克
light: 轻型坦克
medium: 中型坦克
spg: self-propelled gun, artillery, 自行火炮
`)
const AIRCRAFT = table(`
attack: ground attack, 攻击机
awacs: early warning, radar, 预警机
bomber: 轰炸机
drone: uav, unmanned, 无人机, ドローン
fighter: fighter jet, jet, 战斗机
helicopter: chopper, 直升机, ヘリ
stealth-bomber: stealth, 隐形轰炸机
transport: cargo, airlift, 运输机
`)
const HAZARD = table(`
biohazard: biological, virus, 生物危害
cold: low temperature, freezing, 低温
corrosive: acid, 腐蚀
electric: high voltage, shock, electricity, 高压电, 感電
explosive: explosion, 爆炸
flammable: fire, 易燃
hot: hot surface, high temperature, 高温
laser: radiation, 激光
magnetic: magnet, 磁场
radiation: radioactive, nuclear, 辐射
toxic: poison, 有毒
`)
const GHS = table(`
corrosive: acid, 腐蚀
environment: aquatic toxicity, pollution, 环境危害
explosive: explosion, 爆炸
flammable: fire, 易燃
gas-cylinder: compressed gas, 高压气体
harmful: irritant, exclamation, 有害
health-hazard: carcinogen, 健康危害
oxidizing: oxidizer, 氧化
toxic: poison, skull, 剧毒
`)
const RELIGION = table(`
buddhism: dharma wheel, buddhist, 佛教
catholicism: cross, catholic, christian, 天主教
confucianism: confucius, 儒教
hinduism: om, hindu, 印度教
islam: crescent, muslim, 伊斯兰教
judaism: star of david, jewish, 犹太教
orthodoxy: orthodox cross, christian, 东正教
protestantism: cross, christian, 新教
shinto: torii, 神道
sikhism: khanda, sikh, 锡克教
taoism: yin yang, tao, 道教
zoroastrianism: faravahar, 拜火教
`)
const NOTATION = table(`
alto-clef: c clef, 中音谱号
bass-clef: f clef, 低音谱号
treble-clef: g clef, 高音谱号
coda: 尾声
segno: sign, dal segno
crescendo: louder, 渐强
decrescendo: diminuendo, softer, 渐弱
flat: ♭, 降号
sharp: ♯, 升号
natural: ♮, 还原号
double-flat: 𝄫, 重降号
double-sharp: 𝄪, 重升号
fermata: hold, 延长记号
repeat-start: repeat, 反复记号
repeat-end: repeat, 反复记号
staff: stave, lines, 五线谱
whole-note: semibreve, 全音符
half-note: minim, 二分音符
quarter-note: crotchet, ♩, 四分音符
eighth-note: quaver, ♪, 八分音符
sixteenth-note: semiquaver, 十六分音符
beamed-eighth-notes: quavers, ♫, 八分音符
whole-rest: 全休止符
half-rest: 二分休止符
quarter-rest: 四分休止符
eighth-rest: 八分休止符
`)
const LICENSE = table(`
mit: permissive
apache: apache 2.0, permissive
bsd: permissive
gpl: gnu, copyleft
lgpl: gnu, lesser gpl, copyleft
agpl: gnu, affero, copyleft
isc: permissive
mpl: mozilla public license
`)
const CC = table(`
by: attribution, 署名
nc: non-commercial, noncommercial, 非商业
nc-eu: non-commercial, €, 非商业
nc-jp: non-commercial, ¥, 非商业
nd: no derivatives, 禁止演绎
sa: share alike, 相同方式共享
zero: cc0, public domain, 公有领域
`)
const KBD = table(`
backspace: ⌫, delete, 退格
caps-lock: ⇪, uppercase, 大写锁定
command: ⌘, cmd, mac
control: ⌃, ctrl
delete: ⌦, del
enter: ⏎, return, 回车
escape: esc, ⎋
option: ⌥, alt, mac
shift: ⇧
space: spacebar, 空格
tab: ⇥, indent
`)
const PS = table(`
cross: ✕, x button, 叉
circle: ○, 圈
square: □, 方块
triangle: △, 三角
l1: bumper, shoulder
r1: bumper, shoulder
l2: trigger
r2: trigger
l3: stick, thumbstick
r3: stick, thumbstick
options: start, menu
create: share
touchpad: trackpad
`)
const XBOX = table(`
lb: bumper, shoulder
rb: bumper, shoulder
lt: trigger
rt: trigger
ls: stick, thumbstick
rs: stick, thumbstick
menu: start
view: back, select
share: capture
`)
const CAMERA_MODE = table(`
a: aperture priority, av
s: shutter priority, tv
m: manual
p: program auto
macro: close-up, flower, 微距
`)
const SENSOR = table(`
aps-c: crop sensor, apsc
full-frame: 35mm, ff, 全画幅, フルサイズ
medium-format: mf, 中画幅
mft: micro four thirds, m43, m4/3
one-inch: 1 inch, 1 英寸
`)
const MOON_PHASE = table(`
new: new moon, 新月
full: full moon, 满月, 満月
first-quarter: first quarter, 上弦月
last-quarter: last quarter, third quarter, 下弦月
waxing-crescent: crescent, 娥眉月
waning-crescent: crescent, 残月
waxing-gibbous: gibbous, 盈凸月
waning-gibbous: gibbous, 亏凸月
`)
const STATUS = table(`
approved: accepted, done, 已批准
backlog: icebox, later, 待办池
blocked: stuck, impediment, 阻塞
cancelled: canceled, won't do, 已取消
draft: wip, 草稿
in-progress: doing, wip, started, 进行中
in-review: review, pending review, 审核中
on-hold: paused, waiting, 搁置
pending: waiting, queued, 待定
rejected: declined, denied, 已拒绝
todo: to do, open, 待办
`)
const SIZE = table(`
xs: extra small
s: small
m: medium
l: large
xl: extra large
xxl: 2xl, extra extra large
`)
const MOOD = table(`
angry: mad, rage, 生气
empty: neutral, expressionless, meh, 面无表情
happy: smile, joy, 开心
laugh: lol, grin, haha, 笑
sad: unhappy, frown, 难过
surprised: shocked, wow, 惊讶
wink: playful, 眨眼
`)
const GENDER = table(`
female: ♀, woman, venus, 女
male: ♂, man, mars, 男
neuter: ⚲, neutral
nonbinary: enby, non-binary, lgbtq
transgender: ⚧, trans, lgbtq
`)
const SUIT = table(`
club: ♣, clubs, 梅花
diamond: ♦, diamonds, 方块
heart: ♥, hearts, 红心
spade: ♠, spades, 黑桃
`)
const CURRENCY = table(`
bitcoin: ₿, btc, crypto, cryptocurrency, 比特币
dollar: $, usd, 美元
euro: €, eur, 欧元
pound: £, gbp, sterling, 英镑
ruble: ₽, rub, 卢布
rupee: ₹, inr, 卢比
won: ₩, krw, 韩元
yen: ¥, jpy, 日元, 円
`)
const CARD = table(`
plus-four: draw four, wild draw four, +4
plus-two: draw two, +2
reverse: reverse, swap direction
skip: skip turn, block
wild: wild card, joker, change color
`)
const MANGA = table(`
exclaim: !, exclamation
question: ?, question mark
interrobang: ‽, ?!
ellipsis: …, silence, speechless
music: singing, song, ♪
`)
const TALLY = table(`
dot: dot tally, dots and lines
five: tally marks, 卌
rod: counting rods, 算筹
square: box tally
zheng: 正, 正字计数
`)

// Hugging Face 任务图标
const HF = table(`
any-to-any: multimodal, omni
audio-classification: sound classification, audio tagging, 音频分类
audio-text-to-text: audio llm, speech understanding
audio-to-audio: speech enhancement, source separation, voice conversion
automatic-speech-recognition: asr, speech to text, transcription, 语音识别
depth-estimation: depth map, monocular depth, 深度估计
document-question-answering: docqa, document ai, 文档问答
feature-extraction: embedding, vector, 特征提取
fill-mask: masked language model, bert, mlm, 完形填空
graph-machine-learning: gnn, graph neural network, 图学习
image-classification: image recognition, 图像分类
image-feature-extraction: image embedding, vision encoder
image-segmentation: segmentation, mask, 图像分割
image-text-to-image: image editing, inpainting
image-text-to-text: vlm, vision language model, multimodal
image-text-to-video: video generation
image-to-3d: 3d reconstruction, mesh
image-to-image: image translation, style transfer, super resolution, 图生图
image-to-text: captioning, ocr, 图生文
image-to-video: video generation, animate, 图生视频
keypoint-detection: pose estimation, landmarks, 关键点
mask-generation: segment anything, sam, 掩码
object-detection: yolo, bounding box, detection, 目标检测
question-answering: qa, extractive qa, 问答
reinforcement-learning: rl, agent, reward, 强化学习
robotics: robot arm, manipulation, 机器人
sentence-similarity: embedding, semantic similarity, 句子相似度
summarization: summary, abstract, 摘要
table-question-answering: table qa, 表格问答
tabular-classification: tabular data, 表格分类
tabular-regression: tabular data, regression, 表格回归
text-classification: sentiment analysis, classifier, 文本分类
text-generation: llm, gpt, chat, language model, 文本生成
text-ranking: reranker, rerank, retrieval, 排序
text-to-3d: 3d generation
text-to-audio: audio generation, music generation
text-to-image: diffusion, image generation, stable diffusion, 文生图
text-to-speech: tts, speech synthesis, voice, 语音合成
text-to-video: video generation, 文生视频
time-series-forecasting: forecast, prediction, time series, 时间序列
token-classification: ner, named entity recognition, pos tagging, 命名实体识别
translation: translate, machine translation, 翻译
unconditional-image-generation: gan, image generation
video-classification: action recognition, 视频分类
video-text-to-text: video llm, video understanding
video-to-video: video editing, video translation
visual-document-retrieval: document retrieval, colpali, rag
visual-question-answering: vqa, 视觉问答
voice-activity-detection: vad, speech detection, 语音活动检测
zero-shot-classification: zero shot, nli, 零样本
zero-shot-image-classification: clip, zero shot, 零样本
zero-shot-object-detection: open vocabulary, grounding dino, 零样本
`)

// 系列：[匹配, 系列的词, 这一项的词 (rest, name) => [...]]，按顺序找第一个匹配的
const prefix = p => name => (name.startsWith(`${p}-`) ? name.slice(p.length + 1) : null)
const from = map => rest => map[rest] ?? []
const FAMILIES = [
  [name => (name in HF ? name : null), ['hugging face', 'ml task', 'machine learning', 'ai', 'model'], from(HF)],
  [prefix('hiragana'), ['kana', 'japanese', 'ひらがな', '平假名'], rest => [KANA[rest]?.[0]]],
  [prefix('katakana'), ['kana', 'japanese', 'カタカナ', '片假名'], rest => [KANA[rest]?.[1]]],
  [prefix('greek'), ['greek letter', 'alphabet', 'math', '希腊字母', 'ギリシャ文字'], (rest) => {
    const capital = rest.startsWith('capital-')
    const g = GREEK.find(([n]) => n === rest.replace(/^capital-/, ''))
    return [g?.[capital ? 2 : 1], ...(GREEK_EXTRA[rest] ?? [])]
  }],
  [name => name.match(/^hexagram-(\d\d)-/)?.[1], ['i ching', 'yijing', 'hexagram', '易经', '卦', '六十四卦'], rest => [HEXAGRAMS[Number(rest) - 1]]],
  [prefix('trigram'), ['i ching', 'bagua', 'eight trigrams', '八卦', '卦'], from(TRIGRAMS)],
  [prefix('rune'), ['elder futhark', 'norse', 'viking', 'runic', '卢恩', 'ルーン'], from(RUNES)],
  [prefix('branch'), ['earthly branch', 'chinese calendar', '地支', '十二支'], from(BRANCHES)],
  [prefix('stem'), ['heavenly stem', 'chinese calendar', '天干', '十干'], from(STEMS)],
  [prefix('chinese-zodiac'), ['shengxiao', 'chinese new year', 'animal', '生肖', '干支'], from(CHINESE_ZODIAC)],
  [prefix('zodiac'), ['astrology', 'horoscope', 'star sign', '星座'], from(ZODIAC)],
  [prefix('astro'), ['planet', 'astronomical symbol', 'astrology', 'space', '天文符号'], from(ASTRO)],
  [prefix('alchemy'), ['alchemical symbol', 'chemistry', 'occult', '炼金术', '錬金術'], from(ALCHEMY)],
  [prefix('xiangqi'), ['chinese chess', 'board game', 'piece', '象棋', '中国象棋'], from(XIANGQI)],
  [prefix('shogi'), ['japanese chess', 'board game', 'piece', '将棋', '日本象棋'], from(SHOGI)],
  [prefix('chess'), ['chess piece', 'board game', 'strategy', '国际象棋', 'チェス'], from(CHESS)],
  [prefix('maya'), ['mayan numeral', 'number', 'numeral', 'mesoamerica', '玛雅数字'], () => []],
  [prefix('roman'), ['roman numeral', 'number', 'numeral', '罗马数字', 'ローマ数字'], rest => [ROMAN[Number(rest) - 1]]],
  [prefix('tally'), ['tally marks', 'count', 'counting', '计数'], rest => TALLY[rest.split('-')[0]] ?? []],
  [prefix('okta'), ['cloud cover', 'sky cover', 'weather', 'meteorology', '云量'], () => []],
  [prefix('resin'), ['resin identification code', 'recycling', 'plastic', '塑料回收标志'], rest => [RESIN[Number(rest) - 1]]],
  [prefix('dice'), ['die', 'random', 'roll', 'board game', 'tabletop', '骰子', 'サイコロ'], rest => (rest.startsWith('d') ? ['polyhedral', 'rpg', 'dnd'] : [])],
  [prefix('letter'), ['alphabet', 'character', 'initial', 'latin', '字母'], () => []],
  [prefix('number'), ['digit', 'numeral', '数字'], (rest) => {
    const w = NUMBER_WORDS[Number(rest.split('-')[0])]
    return w ?? []
  }],
  [name => (/^tag-[a-z0-9]$/.test(name) ? name.slice(4) : null), ['label', 'price tag', 'tagging', '标签', 'タグ'], () => []],
  [prefix('rating'), ['age rating', 'content rating', 'parental guidance', '分级', 'レーティング'], rest => RATING[rest.split('-')[0]] ?? []],
  [prefix('laundry'), ['care label', 'laundry symbol', 'clothing care', '洗涤标志', '洗濯表示'], rest => LAUNDRY[['dry-clean', 'tumble-dry', 'wet-clean'].find(k => rest.startsWith(k)) ?? rest.split('-')[0]] ?? []],
  [prefix('unit'), ['military symbol', 'nato', 'app-6', 'map symbol', '军标'], from(UNIT)],
  [prefix('rank'), ['military rank', 'insignia', 'army', '军衔'], from(RANK)],
  [prefix('navy'), ['warship', 'ship', 'naval', 'military', '军舰'], from(NAVY)],
  [prefix('tank'), ['armored vehicle', 'military', 'army', '坦克', '戦車'], from(TANK)],
  [prefix('aircraft'), ['military aircraft', 'airplane', 'air force', '军机'], from(AIRCRAFT)],
  [prefix('hazard'), ['warning sign', 'danger', 'safety', '警告标志'], from(HAZARD)],
  [prefix('ghs'), ['ghs pictogram', 'chemical', 'hazard', 'safety', '危险品'], from(GHS)],
  [prefix('religion'), ['faith', 'religious symbol', 'belief', '宗教'], from(RELIGION)],
  [prefix('notation'), ['music notation', 'sheet music', 'score', 'music', '乐谱', '楽譜'], from(NOTATION)],
  [prefix('license'), ['open source license', 'software license', 'legal', '开源协议'], from(LICENSE)],
  [prefix('cc'), ['creative commons', 'license', 'copyright', '知识共享'], from(CC)],
  [prefix('keyboard'), ['keyboard key', 'key', 'kbd', 'shortcut', 'hotkey', '按键'], from(KBD)],
  [prefix('playstation'), ['ps', 'ps5', 'controller button', 'gamepad', 'console'], from(PS)],
  [prefix('xbox'), ['controller button', 'gamepad', 'console'], from(XBOX)],
  [prefix('camera-mode'), ['shooting mode', 'exposure mode', 'mode dial', 'photography', '拍摄模式'], from(CAMERA_MODE)],
  [prefix('sensor'), ['camera sensor', 'image sensor', 'sensor size', 'photography', '画幅'], from(SENSOR)],
  [prefix('moon-phase'), ['lunar', 'moon', 'astronomy', '月相'], from(MOON_PHASE)],
  [prefix('status'), ['state', 'workflow', 'issue', 'progress', '状态'], from(STATUS)],
  [prefix('loading'), ['loader', 'spinner', 'progress', 'busy', 'wait', '加载'], () => []],
  [prefix('rate'), ['playback speed', 'speed', 'multiplier', '倍速'], rest => [`${rest.slice(1).replace('-', '.')}x`]],
  [prefix('size'), ['clothing size', 't-shirt size', 'apparel', '尺码'], from(SIZE)],
  [prefix('mood'), ['face', 'emoji', 'emotion', 'smiley', 'feeling', '表情'], from(MOOD)],
  [prefix('gender'), ['sex', 'symbol', 'identity', '性别'], from(GENDER)],
  [prefix('suit'), ['playing card suit', 'poker', 'cards', '花色', 'トランプ'], from(SUIT)],
  [prefix('coin'), ['money', 'currency', 'cash', 'finance', '硬币'], from(CURRENCY)],
  [prefix('currency'), ['money', 'currency symbol', 'cash', 'finance', '货币'], from(CURRENCY)],
  [prefix('game-card'), ['uno', 'card game', 'action card', '功能牌'], from(CARD)],
  [name => (name.startsWith('manga-') ? name : null), ['manga', 'comic', 'speech bubble', '漫画', 'マンガ', '吹き出し'], name => [
    ...(name.includes('shout') ? ['shout', 'yell', '喊叫'] : []),
    ...(MANGA[name.split('-').pop()] ?? []),
  ]],
  [prefix('terrain'), PARTS.terrain, () => []],
]

// 组合时每个部分只取前几个词（3 个英文 + 2 个中日文），免得组合图标的词太多
const CJK = /[぀-ヿ㐀-鿿]/
const brief = tags => [...tags.filter(t => !CJK.test(t)).slice(0, 3), ...tags.filter(t => CJK.test(t)).slice(0, 2)]

// 去掉后缀，取本体的词 + 后缀的词
const SUFFIXES = [
  ['-badge-top', []],
  ['-badge', []],
  ['-off', PARTS.off],
  ['-list', TAGS.list],
  ['-half', PARTS.half],
  ['-circle', ['round']],
  ['-square', ['box']],
]

function family(name) {
  for (const [match, tags, item] of FAMILIES) {
    const rest = match(name)
    if (rest != null)
      return [...tags, ...item(rest, name)]
  }
  return null
}

// 从左往右取最长的已知片段；单个字母只认 x（file-x、search-x）
function segments(name) {
  const tokens = name.split('-')
  const out = []
  let i = 0
  while (i < tokens.length) {
    let j = tokens.length
    for (; j > i; j--) {
      const seg = tokens.slice(i, j).join('-')
      if (seg === name || (seg.length === 1 && seg !== 'x'))
        continue
      const tags = PARTS[seg] ?? TAGS[seg]
      if (tags) {
        out.push(...brief(tags))
        break
      }
    }
    i = j > i ? j : i + 1
  }
  return out
}

function compute(name) {
  if (TAGS[name])
    return TAGS[name]
  const fam = family(name)
  for (const [suffix, tags] of SUFFIXES) {
    if (!name.endsWith(suffix) || name.length <= suffix.length)
      continue
    const stem = name.slice(0, -suffix.length)
    // 系列里的项本身就以这些词结尾（playstation-circle、playstation-square）：本体不认识时按系列算
    if (fam && !TAGS[stem] && !family(stem))
      break
    return [...compute(stem), ...brief(tags)]
  }
  return fam ?? segments(name)
}

// 名字 → 搜索关键词（去重，去掉名字里已经有的词）；匹配时请自己转小写（个别词带大写，如 QRコード、Δ）
// 改名前的旧名（aliases.js）也算关键词：站点、./meta、Iconify metadata 用的都是这一份，搜 volume-mute 能找到 volume-x
const cache = new Map()
export function tagsOf(name) {
  let tags = cache.get(name)
  if (!tags) {
    tags = [...new Set([...compute(name), ...oldNamesOf(name)].filter(Boolean))].filter(t => !name.includes(t.toLowerCase()))
    cache.set(name, tags)
  }
  return tags
}
