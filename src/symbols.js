// 文件夹、列表等系列共用的符号；c 为中心，k 为缩放（1 = 文件夹里的尺寸）
import { inset } from './folder'
import { dot } from './scene'
import { circle, crisp, rounded } from './geometry'
import { triangle, triangleWidth } from './media'

// 放进角位（文件夹角标、列表右下）时各符号的缩放：先按视觉大小逐个调，再整体放大 BADGE_GROW
const BADGE_GROW = 1.15
const baseCornerScale = {
  plus: 1.2,
  minus: 1.2,
  cross: 1, // 实际取值见下方，按 inset 定
  check: 1,
  image: 1,
  music: 0.9,
  video: 1,
  assets: 1,
  ring: 1,
  star: 1,
  cloud: 1,
  shield: 1,
  ban: 1,
  arrowUp: 1,
  arrowDown: 1,
  arrowLeft: 1,
  arrowRight: 1,
  bookmark: 1,
  sparkle: 1,
  puzzle: 1,
  plug: 1,
  clock: 1,
  gauge: 1,
  lock: 1,
  code: 1,
  search: 1,
}
export const cornerScale = Object.fromEntries(Object.entries(baseCornerScale).map(([name, k]) => [name, k * BADGE_GROW]))
// 叉的半宽取 inset（cross 在 k = 1 时半宽为 2），端点正好落在右边线、底边线上
cornerScale.cross = inset / 2

// 各符号的外形（未缩放、相对中心），用来算角标和线条的间距；接近圆的按圆算
const tri = 6 / 2 / Math.tan(Math.PI / 6)
export const outlines = {
  plus: { box: [-2.5, -2.5, 2.5, 2.5] },
  // 减号只有一横，按真实外形会让旁边的线贴着它延伸、读成多一行；按加号的方块占位
  minus: { box: [-2.5, -2.5, 2.5, 2.5] },
  cross: { box: [-2, -2, 2, 2] },
  check: { box: [-3, -2, 3, 2] },
  image: { box: [-3.5, -3.5, 3.5, 3.5] },
  music: { box: [-2.75, -3.75, 2.75, 3.75] },
  video: { box: [-tri / 3, -3, tri * 2 / 3, 3] },
  assets: { box: [-3.5, -3.5, 3.5, 3.5] },
  ring: { circle: 3 },
  star: { circle: 3.45 },
  cloud: { box: [-3.65, -2.65, 3.6, 2.65] },
  shield: { box: [-3.01, -3.5, 3.01, 3.5] },
  ban: { circle: 3.25 },
  arrowUp: { box: [-3, -3.5, 3, 3.5] },
  arrowDown: { box: [-3, -3.5, 3, 3.5] },
  arrowLeft: { box: [-3.5, -3, 3.5, 3] },
  arrowRight: { box: [-3.5, -3, 3.5, 3] },
  bookmark: { box: [-2.5, -3.5, 2.5, 3.5] },
  // 四边内凹，按方框算会让线断得太远，取一个略小的圆
  sparkle: { circle: 3.2 },
  puzzle: { box: [-3.5, -3.5, 3.5, 3.5] },
  plug: { box: [-2.4, -3.5, 2.4, 3.5] },
  clock: { circle: 3.5 },
  gauge: { box: [-3.5, -3.5, 3.5, 3.5] },
  lock: { box: [-3, -3.5, 3, 3.5] },
  code: { box: [-3.5, -2.5, 3.5, 2.5] },
  search: { box: [-3.5, -3.5, 3.5, 3.5] },
}

// 符号缩小放进文件夹、列表时算作细节，预览里线宽封顶，粗线宽下也不糊；单独使用（k ≥ 2）时跟随全局
export const DETAIL_SCALE = 2
const symbol = draw => (c, k = 1, radius = 0) => {
  const paths = draw(c, k, radius)
  return k < DETAIL_SCALE ? paths.map(p => (typeof p === 'string' ? { d: p, detail: true } : { ...p, detail: true })) : paths
}

const at = ([cx, cy], k) => ([x, y]) => [cx + x * k, cy + y * k]

const drawPlus = ([x, y], k = 1) => [
  `M${x} ${y - 2.5 * k}V${y + 2.5 * k}`,
  `M${x - 2.5 * k} ${y}H${x + 2.5 * k}`,
]

const drawMinus = ([x, y], k = 1) => [
  `M${x - 2.5 * k} ${y}H${x + 2.5 * k}`,
]

// 45° 叉
const drawCross = ([x, y], k = 1) => [
  `M${x - 2 * k} ${y - 2 * k}L${x + 2 * k} ${y + 2 * k}`,
  `M${x + 2 * k} ${y - 2 * k}L${x - 2 * k} ${y + 2 * k}`,
]

// 45° 勾，按外框居中
const drawCheck = (c, k = 1) => {
  const p = at(c, k)
  const [a, b, d] = [p([-3, 0]), p([-1, 2]), p([3, -2])]
  return [`M${a[0]} ${a[1]}L${b[0]} ${b[1]}L${d[0]} ${d[1]}`]
}

// 相框：7×7 方框，右上太阳点，一座 45° 山从左边升起、落到底边
const drawImage = (c, k = 1, radius = 0) => {
  const p = at(c, k)
  const sun = p([1.75, -1.75])
  return [
    rounded([[-3.5, -3.5], [3.5, -3.5], [3.5, 3.5], [-3.5, 3.5]].map(p), Math.min(radius, k)),
    dot(sun[0], sun[1]),
    // 山形线两端都落在边框的直边上（左边 y = 2、底边 x = 2），避开圆角会切掉的角部，线头不会冒出框外
    rounded([[-3.5, 2], [-1.5, 0], [2, 3.5]].map(p), crisp(radius), false),
  ]
}

// 八分音符，符尾 45°
const drawMusic = (c, k = 1, radius = 0) => {
  const p = at(c, k)
  const head = p([-1.25, 2.25])
  return [
    circle(head[0], head[1], 1.5 * k),
    rounded([[0.25, 2.25], [0.25, -3.75], [2.75, -1.25]].map(p), crisp(radius), false),
  ]
}

// 播放三角，重心对齐中心
const drawVideo = ([x, y], k = 1, radius = 0) => {
  const h = 6 * k
  return [rounded(triangle(x - triangleWidth(h) / 3, h, 1, y), Math.min(radius, k))]
}

// 田字：7×7 方框 + 中间一横一竖
const drawAssets = ([x, y], k = 1, radius = 0) => {
  const s = 3.5 * k
  return [
    rounded([[x - s, y - s], [x + s, y - s], [x + s, y + s], [x - s, y + s]], Math.min(radius, k)),
    `M${x} ${y - s}V${y + s}`,
    `M${x - s} ${y}H${x + s}`,
  ]
}

// 圆形标记，直径 6
const drawRing = ([x, y], k = 1) => [circle(x, y, 3 * k)]

// 五角星：外半径 3.6，按外框垂直居中（星的上下不对称）
const drawStar = ([x, y], k = 1, radius = 0) => {
  const R = 3.6 * k
  const r = R * 0.48 // 比标准 0.382 胖，角更钝
  const dy = R * (1 - Math.cos(Math.PI / 5)) / 2
  const corner = Math.min(radius, k * 0.75)
  const points = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + i * Math.PI / 5
    const d = i % 2 ? r : R
    // 尖角是锐角，圆角会被自动压小，这里放宽一倍让角尖真正圆起来
    return [x + Math.cos(a) * d, y + dy + Math.sin(a) * d, i % 2 ? corner : corner * 2]
  })
  return [rounded(points, corner)]
}

// 云：平底 + 左中右三团鼓包，鼓包之间的凹口做圆角，看起来更软；外框约 7.25×5.3
const cloudCircles = [[-1.95, 0.95, 1.7], [0.1, -0.25, 2.4], [2, 1.05, 1.6]]
const cloudFillet = 0.5 // 凹口圆角在两段弧上各让出的弧长
function upperIntersection([x1, y1, r1], [x2, y2, r2]) {
  const d = Math.hypot(x2 - x1, y2 - y1)
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d)
  const h = Math.sqrt(r1 * r1 - a * a)
  const [mx, my] = [x1 + (x2 - x1) * a / d, y1 + (y2 - y1) * a / d]
  const p = [mx + h * (y2 - y1) / d, my - h * (x2 - x1) / d]
  const q = [mx - h * (y2 - y1) / d, my + h * (x2 - x1) / d]
  return p[1] < q[1] ? p : q
}
const angleOn = ([cx, cy], [x, y]) => Math.atan2(y - cy, x - cx)
const pointOn = ([cx, cy, r], t) => [cx + r * Math.cos(t), cy + r * Math.sin(t)]
// 顺时针从 from 到 to 的圆弧
function arcTo([cx, cy, r], from, to) {
  const a0 = Math.atan2(from[1] - cy, from[0] - cx)
  const a1 = Math.atan2(to[1] - cy, to[0] - cx)
  const delta = ((a1 - a0) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI)
  return `A${r} ${r} 0 ${delta > Math.PI ? 1 : 0} 1 ${to[0]} ${to[1]}`
}
// 云的上轮廓：从左鼓包底部顺时针绕到右鼓包底部（不含底边），返回路径片段和两端点
function cloudTop([x, y], k) {
  const cs = cloudCircles.map(([cx, cy, r]) => [x + cx * k, y + cy * k, r * k])
  const [left, mid, right] = cs
  const f = cloudFillet * k
  const p1 = upperIntersection(left, mid)
  const p2 = upperIntersection(mid, right)
  // 每个凹口两侧各退 f 的弧长，用以交点为控制点的曲线接上（顺时针 = 角度增大）
  const l1 = pointOn(left, angleOn(left, p1) - f / left[2])
  const m1 = pointOn(mid, angleOn(mid, p1) + f / mid[2])
  const m2 = pointOn(mid, angleOn(mid, p2) - f / mid[2])
  const r1 = pointOn(right, angleOn(right, p2) + f / right[2])
  const start = [left[0], left[1] + left[2]]
  const end = [right[0], right[1] + right[2]]
  const pt = p => `${p[0]} ${p[1]}`
  const arcs = `${arcTo(left, start, l1)}Q${pt(p1)} ${pt(m1)}${arcTo(mid, m1, m2)}`
    + `Q${pt(p2)} ${pt(r1)}${arcTo(right, r1, end)}`
  return { arcs, start, end }
}

const drawCloud = (c, k = 1) => {
  const { arcs, start } = cloudTop(c, k)
  return [`M${start[0]} ${start[1]}${arcs}Z`]
}

// 底边在 x 中心两侧各断开 gap（Infinity 表示不要底边），断口是正常的线端
export function cloudOpen(c, k, gap) {
  const { arcs, start, end } = cloudTop(c, k)
  if (gap === Infinity)
    return [`M${start[0]} ${start[1]}${arcs}`]
  const [cx, base] = [c[0], start[1]]
  return [`M${cx - gap} ${base}L${start[0]} ${base}${arcs}L${cx + gap} ${base}`]
}

// 盾：上沿微微鼓起，两侧直落后用平滑曲线收到底尖；原型 7×8.15 等比缩到 0.86，外框约 6×7
const drawShield = ([x, y], k = 1) => {
  k *= 0.86
  // 上沿鼓 0.75、底尖到 3.9，外框中心在 -0.175，整体往下补回来
  const p = at([x, y + 0.175 * k], k)
  const pt = q => p(q).join(' ')
  const w = 3.5 // 半宽
  const sag = 0.75
  const R = (w * w + sag * sag) / (2 * sag) * k
  return [
    `M${pt([-w, -3.5])}A${R} ${R} 0 0 1 ${pt([w, -3.5])}`
    + `L${pt([w, -0.5])}`
    + `C${pt([w, 1.8])} ${pt([w * 0.55, 3.1])} ${pt([0, 3.9])}`
    + `C${pt([-w * 0.55, 3.1])} ${pt([-w, 1.8])} ${pt([-w, -0.5])}Z`,
  ]
}

// 禁止：圆 + 45° 斜线
const drawBan = ([x, y], k = 1) => {
  const r = 3.25 * k
  const d = r * Math.SQRT1_2
  return [circle(x, y, r), `M${x - d} ${y - d}L${x + d} ${y + d}`]
}

// 箭头：8 个方向。正向时两翼各往后 45°（回退 s、侧开 s）；斜向时两翼一条水平一条竖直（长 w），与箭杆各成 45°
const DIRS = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
  upRight: [1, -1],
  upLeft: [-1, -1],
  downRight: [1, 1],
  downLeft: [-1, 1],
}
const WING = 3 // 正向箭翼的回退和侧开
const DIAGONAL_WING = 4.25 // 斜向箭翼长度 ≈ 正向箭翼的斜长 3√2
function head([x, y], [dx, dy], k) {
  if (dx && dy) {
    const w = DIAGONAL_WING * k
    return [[x - dx * w, y], [x, y], [x, y - dy * w]]
  }
  const s = WING * k
  const [sx, sy] = dx ? [0, s] : [s, 0]
  return [[x - dx * s - sx, y - dy * s - sy], [x, y], [x - dx * s + sx, y - dy * s + sy]]
}

// 带杆的箭头：正向外框 6×7，斜向外框约 6×6
const pointer = dir => ([x, y], k = 1, radius = 0) => {
  const [dx, dy] = DIRS[dir]
  const half = (dx && dy ? 3 : 3.5) * k
  const tip = [x + dx * half, y + dy * half]
  return [
    `M${x - dx * half} ${y - dy * half}L${tip[0]} ${tip[1]}`,
    rounded(head(tip, [dx, dy], k), crisp(radius), false),
  ]
}

// 只有箭头：按外框居中（正向深 3、斜向深约 4.25 的一半往尖端方向挪）
const chevron = dir => ([x, y], k = 1, radius = 0) => {
  const [dx, dy] = DIRS[dir]
  const shift = (dx && dy ? DIAGONAL_WING / 2 : WING / 2) * k
  return [rounded(head([x + dx * shift, y + dy * shift], [dx, dy], k), crisp(radius), false)]
}

// 半边箭头：只留方向左手边（方向逆时针转 90°）的那片翼，和杆连成一条折线
const halfPointer = dir => ([x, y], k = 1, radius = 0) => {
  const [dx, dy] = DIRS[dir]
  const half = (dx && dy ? 3 : 3.5) * k
  const tip = [x + dx * half, y + dy * half]
  const [perpX, perpY] = [dy, -dx]
  const wing = head(tip, [dx, dy], k)
    .filter((_, i) => i !== 1)
    .find(([wx, wy]) => (wx - tip[0]) * perpX + (wy - tip[1]) * perpY > 0)
  return [rounded([[x - dx * half, y - dy * half], [...tip, crisp(radius)], wing], crisp(radius), false)]
}

const drawArrowUp = pointer('up')
const drawArrowDown = pointer('down')
const drawArrowLeft = pointer('left')
const drawArrowRight = pointer('right')

// 书签：平顶丝带，底部 45° V 形缺口，外框 5×7
const drawBookmark = (c, k = 1, radius = 0) => {
  const p = at(c, k)
  const notch = [...p([0, 1]), crisp(radius)]
  return [rounded([p([-2.5, -3.5]), p([2.5, -3.5]), p([2.5, 3.5]), notch, p([-2.5, 3.5])], Math.min(radius, k))]
}

// 星芒：一竖一横两个椭圆交叉取外轮廓，尖端是椭圆两头（自然圆钝），四个交点处做圆角，外框 7×7
const drawSparkle = (c, k = 1) => {
  const p = at(c, k)
  const pt = q => p(q).join(' ')
  const R = 3.5 // 长半轴
  const b = 1.2 // 短半轴：越小越扁、越尖细
  const fillet = 0.6 // 交点圆角在两条弧上各让出的弧长
  // 第一象限（右上）的交点：x = |y| = s
  const s = 1 / Math.sqrt(1 / (b * b) + 1 / (R * R))
  // 竖椭圆 (b cosθ, -R sinθ) 上从交点往顶端走；横椭圆 (R cosφ, -b sinφ) 上从交点往右端走
  const tp = Math.acos(s / b)
  const fp = Math.acos(s / R)
  const t = tp + fillet / Math.hypot(b * Math.sin(tp), R * Math.cos(tp))
  const f = fp - fillet / Math.hypot(R * Math.sin(fp), b * Math.cos(fp))
  // 右上象限的两个切点（取正值），其他象限按符号翻转；sy = -1 是上半
  const v = [b * Math.cos(t), R * Math.sin(t)] // 竖椭圆上
  const h = [R * Math.cos(f), b * Math.sin(f)] // 横椭圆上
  const q = ([x, y], sx, sy) => pt([x * sx, y * sy])
  const arc = (rx, ry, sx, sy, to) => `A${rx * k} ${ry * k} 0 0 1 ${q(to, sx, sy)}`
  const corner = (sx, sy, to) => `Q${q([s, s], sx, sy)} ${q(to, sx, sy)}`
  // 顺时针：顶端 → 右上交点 → 右端 → 右下交点 → 底端 → 左下交点 → 左端 → 左上交点
  return [
    `M${q(v, -1, -1)}`
    + `${arc(b, R, 1, -1, v)}${corner(1, -1, h)}`
    + `${arc(R, b, 1, 1, h)}${corner(1, 1, v)}`
    + `${arc(b, R, -1, 1, v)}${corner(-1, 1, h)}`
    + `${arc(R, b, -1, -1, h)}${corner(-1, -1, v)}Z`,
  ]
}

// 拼图（模组）：方块 + 顶边、左边各一个圆形榫头；颈口两侧做圆滑过渡，榫头像从边里长出来；外框 7×7
// 下面按「榫头在顶边、右边」来写，再左右镜像：这样划掉的斜线正好穿过方块的左上、右下两个角，不会切到榫头
const drawPuzzle = (c, k = 1, radius = 0) => {
  const mirror = at(c, k)
  const p = ([x, y]) => mirror([-x, y])
  const pt = q => p(q).join(' ')
  // 榫头半径 1.3、圆心离边 0.55：颈口宽约 2.4；榫头伸出 0.55 + 1.3 = 1.85，方块边长 7 − 1.85
  const r = 1.3
  const out = 0.55
  const f = 0.5 // 颈口圆滑过渡在边和圆弧上各让出的长度
  const [x0, x1, y0, y1] = [-3.5, 3.5 - out - r, -3.5 + out + r, 3.5] // 方块
  const neck = Math.sqrt(r * r - out * out) // 颈口半宽
  const [tx, ry] = [(x0 + x1) / 2, (y0 + y1) / 2] // 顶边、右边的中点
  const corner = Math.min(radius, k)
  // 榫头：圆心 o，从颈口 from 沿圆往外绕到颈口 to（未镜像时顺时针），两端各退 f 的弧长
  const knob = (o, from, to) => {
    const ang = q => Math.atan2(q[1] - o[1], q[0] - o[0])
    const on = t => [o[0] + r * Math.cos(t), o[1] + r * Math.sin(t)]
    const [a, b] = [on(ang(from) + f / r), on(ang(to) - f / r)]
    // 镜像后绕向反过来
    return `Q${pt(from)} ${pt(a)}A${r * k} ${r * k} 0 1 0 ${pt(b)}Q${pt(to)} `
  }
  const top = [tx, y0 - out]
  const right = [x1 + out, ry]
  const a = rounded([[tx + neck + f, y0], [x1, y0], [x1, ry - neck - f]].map(p), corner, false)
  const b = rounded([[x1, ry + neck + f], [x1, y1], [x0, y1], [x0, y0], [tx - neck - f, y0]].map(p), corner, false)
  return [
    `${a}${knob(right, [x1, ry - neck], [x1, ry + neck])}${b.replace(/^M/, '')}`
    + `${knob(top, [tx - neck, y0], [tx + neck, y0])}${pt([tx + neck + f, y0])}Z`,
  ]
}

// 插头：两根插脚 + 平顶主体，两侧竖直落下后用曲线收成窄颈，颈下接电线；外框 4.8×7
// 电线和主体画成一条路径：从电线底端上到颈口，绕主体一圈回到颈口中点。
// 这样颈口处是拐角而不是线端，圆头不会伸进主体里
const drawPlug = (c, k = 1, radius = 0) => {
  const p = at(c, k)
  const pt = q => p(q).join(' ')
  const [w, top, shoulder, neck, neckW, bottom] = [2.4, -1.75, -0.25, 2.25, 0.8, 3.5]
  const rc = Math.min(radius, 1) // 顶角圆角（未缩放单位）
  const prong = x => `M${pt([x, -3.5])}L${pt([x, top])}`
  return [
    prong(-1),
    prong(1),
    `M${pt([0, bottom])}L${pt([0, neck])}L${pt([-neckW, neck])}`
    + `C${pt([-w * 0.65, neck])} ${pt([-w, 1.25])} ${pt([-w, shoulder])}`
    + `L${pt([-w, top + rc])}`
    + (rc ? `A${rc * k} ${rc * k} 0 0 1 ${pt([-w + rc, top])}` : '')
    + `L${pt([w - rc, top])}`
    + (rc ? `A${rc * k} ${rc * k} 0 0 1 ${pt([w, top + rc])}` : '')
    + `L${pt([w, shoulder])}`
    + `C${pt([w, 1.25])} ${pt([w * 0.65, neck])} ${pt([neckW, neck])}`
    + `L${pt([0, neck])}`,
  ]
}

// 时钟：圆 + 朝上的分针、45° 指向左下的时针；外框 7×7
// 时针不指右下，是为了不和「划掉」的斜线重合
const drawClock = ([x, y], k = 1) => [
  circle(x, y, 3.5 * k),
  `M${x} ${y - 2 * k}V${y}L${x - 1.5 * k} ${y + 1.5 * k}`,
]

// 计速器：底部开口的 270° 圆弧 + 45° 指向右上的指针；按外框垂直居中
const drawGauge = ([x, y], k = 1) => {
  const r = 3.5 * k
  const d = r * Math.SQRT1_2 // 圆弧两端在 ±45° 处
  const cy = y + (r - d) / 2 // 外框上沿是 -r、下沿是 +d，圆心往下补回来
  const n = 2.25 * k * Math.SQRT1_2
  return [
    `M${x - d} ${cy + d}A${r} ${r} 0 1 1 ${x + d} ${cy + d}`,
    `M${x} ${cy}L${x + n} ${cy - n}`,
  ]
}

// 锁：锁身 + U 形锁梁 + 一道锁孔；外框 6×7
const drawLock = (c, k = 1, radius = 0) => {
  const p = at(c, k)
  const pt = q => p(q).join(' ')
  const r = 1.75 * k // 锁梁半径
  return [
    rounded([[-3, -0.5], [3, -0.5], [3, 3.5], [-3, 3.5]].map(p), Math.min(radius, k)),
    `M${pt([-1.75, -0.5])}L${pt([-1.75, -1.75])}A${r} ${r} 0 0 1 ${pt([1.75, -1.75])}L${pt([1.75, -0.5])}`,
    `M${pt([0, 1])}L${pt([0, 2])}`,
  ]
}

// 代码 </>：两个 45° 尖括号 + 一道与竖直约成 15° 的斜杠；外框 7×5
const drawCode = (c, k = 1, radius = 0) => {
  const p = at(c, k)
  const slash = 2.5 * Math.tan(Math.PI / 12)
  return [
    rounded([[-1.5, -2], [-3.5, 0], [-1.5, 2]].map(p), crisp(radius), false),
    rounded([[1.5, -2], [3.5, 0], [1.5, 2]].map(p), crisp(radius), false),
    `M${p([slash, -2.5]).join(' ')}L${p([-slash, 2.5]).join(' ')}`,
  ]
}

// 搜索：镜片在左上 + 45° 手柄伸向右下；外框 7×7
const drawSearch = ([x, y], k = 1) => {
  const r = 2.5 * k
  const [cx, cy] = [x - 1 * k, y - 1 * k]
  const d = r * Math.SQRT1_2
  return [circle(cx, cy, r), `M${cx + d} ${cy + d}L${x + 3.5 * k} ${y + 3.5 * k}`]
}

export const plus = symbol(drawPlus)
export const minus = symbol(drawMinus)
export const cross = symbol(drawCross)
export const check = symbol(drawCheck)
export const image = symbol(drawImage)
export const music = symbol(drawMusic)
export const video = symbol(drawVideo)
export const assets = symbol(drawAssets)
export const ring = symbol(drawRing)
export const star = symbol(drawStar)
export const cloud = symbol(drawCloud)
export const shield = symbol(drawShield)
export const ban = symbol(drawBan)
export const arrowUp = symbol(drawArrowUp)
export const arrowDown = symbol(drawArrowDown)
export const arrowLeft = symbol(drawArrowLeft)
export const arrowRight = symbol(drawArrowRight)
export const bookmark = symbol(drawBookmark)
export const sparkle = symbol(drawSparkle)
export const puzzle = symbol(drawPuzzle)
export const plug = symbol(drawPlug)
export const clock = symbol(drawClock)
export const gauge = symbol(drawGauge)
export const lock = symbol(drawLock)
export const arrowUpRight = symbol(pointer('upRight'))
export const arrowUpLeft = symbol(pointer('upLeft'))
export const arrowDownRight = symbol(pointer('downRight'))
export const arrowDownLeft = symbol(pointer('downLeft'))
export const chevronUp = symbol(chevron('up'))
export const chevronDown = symbol(chevron('down'))
export const chevronLeft = symbol(chevron('left'))
export const chevronRight = symbol(chevron('right'))
export const chevronUpRight = symbol(chevron('upRight'))
export const chevronUpLeft = symbol(chevron('upLeft'))
export const chevronDownRight = symbol(chevron('downRight'))
export const chevronDownLeft = symbol(chevron('downLeft'))
export const arrowUpHalf = symbol(halfPointer('up'))
export const arrowDownHalf = symbol(halfPointer('down'))
export const arrowLeftHalf = symbol(halfPointer('left'))
export const arrowRightHalf = symbol(halfPointer('right'))
export const arrowUpRightHalf = symbol(halfPointer('upRight'))
export const arrowUpLeftHalf = symbol(halfPointer('upLeft'))
export const arrowDownRightHalf = symbol(halfPointer('downRight'))
export const arrowDownLeftHalf = symbol(halfPointer('downLeft'))
export const code = symbol(drawCode)
export const search = symbol(drawSearch)

// 放大镜当刀用：镜框和手柄让底图在附近断开；镜框是遮挡刀，镜片内部的底图也一并清空
export const searchCut = (c, k, radius) => search(c, k, radius).map(p => ({ d: p.d ?? p, cut: true, occlude: true }))
