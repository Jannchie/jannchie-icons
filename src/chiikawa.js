// chiikawa 系列共用：只画头部
// 脸是上圆下宽、下巴略平的大福形，由四段三次曲线围成（右上、右下、左下、左上），最宽处在偏下的位置；
// 耳朵和脸是同一条路径：在右上 / 左上两段曲线上截出耳根，中间换成耳朵，耳朵底下没有线
import { bezierAt, bezierSub } from './clip'
import { eye } from './scene'

// 三次曲线取点、截段：复用 clip.js 的 de Casteljau
const at = bezierAt
const sub = bezierSub
const fmt = p => p.map(v => +v.toFixed(2)).join(' ')
const curve = c => `C${fmt(c[1])} ${fmt(c[2])} ${fmt(c[3])}`

// 脸：top 头顶 y，bottom 下巴 y，half 半宽，waist 最宽处 y
// 上半两段曲线 k = 0.6、下半 k = 0.68：比正圆（0.55）更饱满，下巴更平
export function quads({ top, bottom, half, waist }) {
  const [l, r] = [12 - half, 12 + half]
  const [kt, kb] = [0.6, 0.68]
  return {
    tr: [[12, top], [12 + half * kt, top], [r, waist - (waist - top) * kt], [r, waist]],
    rb: [[r, waist], [r, waist + (bottom - waist) * kb], [12 + half * kb, bottom], [12, bottom]],
    bl: [[12, bottom], [12 - half * kb, bottom], [l, waist + (bottom - waist) * kb], [l, waist]],
    lt: [[l, waist], [l, waist - (waist - top) * kt], [12 - half * kt, top], [12, top]],
  }
}
export const pointOn = (shape, quad, t) => at(quads(shape)[quad], t)

// face(shape, ears)：ears.right / ears.left = { from, to, draw }，from、to 是耳根在右上 / 左上曲线上的参数，
// draw(p0, p1) 返回从 p0 画到 p1 的耳朵路径段（右耳顺着右上曲线的方向，即从头顶往右）
export function face(shape, { left, right }) {
  const q = quads(shape)
  const rFrom = at(q.tr, right.from)
  const rTo = at(q.tr, right.to)
  // 左上曲线是从左腰往头顶走的：左耳先遇到 from（外侧）再到 to（内侧）
  const lFrom = at(q.lt, left.from)
  const lTo = at(q.lt, left.to)
  return [
    `M${fmt(q.tr[0])}`,
    curve(sub(q.tr, 0, right.from)),
    right.draw(rFrom, rTo),
    curve(sub(q.tr, right.to, 1)),
    curve(q.rb),
    curve(q.bl),
    curve(sub(q.lt, 0, left.from)),
    left.draw(lFrom, lTo),
    curve(sub(q.lt, left.to, 1)),
    'Z',
  ].join('')
}

// 圆耳：耳根两点之间往外鼓的一段大圆弧
export const roundEar = r => (p0, p1) => `A${r} ${r} 0 1 1 ${fmt(p1)}`
// 尖耳：两条边都往外微鼓地收到耳尖（控制点放在边的中点、往外推 bulge）
export const pointedEar = (tip, bulge = 0.9) => (p0, p1) => {
  const side = (a, b, sign) => {
    const [mx, my] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
    const [dx, dy] = [b[0] - a[0], b[1] - a[1]]
    const len = Math.hypot(dx, dy)
    return [mx + sign * dy / len * bulge, my - sign * dx / len * bulge]
  }
  return `Q${fmt(side(p0, tip, 1))} ${fmt(tip)}Q${fmt(side(tip, p1, 1))} ${fmt(p1)}`
}
// 长耳：从耳根笔直竖起，顶端圆头
export const longEar = top => (p0, p1) => {
  const mid = (p0[0] + p1[0]) / 2
  const w = (p1[0] - p0[0]) / 2
  return `C${fmt([p0[0] - 0.2, top + 4])} ${fmt([mid - w, top])} ${fmt([mid, top])}C${fmt([mid + w, top])} ${fmt([p1[0] + 0.2, top + 4])} ${fmt(p1)}`
}

// 圆豆豆眼
// 用 eye：尖角模式下也是圆点、粗字重下不放大
export const eyes = (y, dx) => [eye(12 - dx, y, 2.25), eye(12 + dx, y, 2.25)]
// 内部线条（眉、嘴、腮红、花纹）都用细线
export const thin = d => ({ d, thin: true })
// 短眉：眼睛上方一小段微弯的线（外低内略高）
export const brows = (y, dx) => [
  thin(`M${12 - dx - 0.7} ${y + 0.2}Q${12 - dx} ${y - 0.1} ${12 - dx + 0.7} ${y}`),
  thin(`M${12 + dx + 0.7} ${y + 0.2}Q${12 + dx} ${y - 0.1} ${12 + dx - 0.7} ${y}`),
]
// ω 嘴：两瓣圆鼓的半椭圆，外端和中间都竖直起笔；中间两瓣汇成往上挑的小尖（比外端略高）
// 控制点取 4/3 倍深度：每瓣近似半个椭圆，底部是圆弧而不是 V 形
export const mouth = (y, w = 1.6) => {
  const [end, tip, depth] = [y - 0.2, y - 0.5, 0.9]
  const low = (end + depth * 4 / 3 + (tip - end) / 3)
  return thin(`M${12 - w} ${end}C${12 - w} ${low} 12 ${low} 12 ${tip}C12 ${low} ${12 + w} ${low} ${12 + w} ${end}`)
}
// 腮红：两侧各两道短斜线；两道的中心隔 1.75（垂直距离约 1.55），常规线宽（细线 1.05）下中间还留 0.5 的缝，不会并成一块；
// 拉开后整组往里收 0.3，外侧那道不贴脸的轮廓
const BLUSH = 0.875
export const blush = (y, dx) => [-1, 1].flatMap(side => [-1, 1].map((k) => {
  const cx = 12 + side * (dx - 0.3) + k * BLUSH
  return thin(`M${cx - 0.225} ${y + 0.5}L${cx + 0.225} ${y - 0.4}`)
}))
