// 洗涤护理标志（ISO 3758 / GINETEX），键按 水洗 → 漂白 → 干燥 → 熨烫 → 专业清洗 的顺序，预览页据此排序
// 「禁止」是穿过整个图形的两条对角线，直接压在原图形上（和标签上的画法一致，不挖空）
import { circle, rounded } from './geometry'
import { glyph, LABEL, line, snap } from './letters'
import { ring, square } from './marks'
import { dot } from './scene'
import { danger } from './tone'

// 「禁止」的大叉是划掉记号：双色时为 danger，其余部分 primary
const cross = danger(['M3.5 3.5L20.5 20.5', 'M20.5 3.5L3.5 20.5'])

// 洗衣盆：两侧斜壁 + 平底，盆口下方一条水波纹；top 是盆壁上端，盆高 12
// 柔和洗涤在盆下加横线，整组上移保持居中；盆底和横线要落在 .5 上，top 取不超过居中位置的 n.5
function tub(radius, bars = 0) {
  const top = Math.floor(6 - bars * 1.5 - 0.5) + 0.5
  const bottom = top + 12
  const at = y => 3 + 2.5 * (y - top) / 12 // 左壁在高度 y 处的 x
  const wy = top + 2.5
  const [x0, x1] = [at(wy), 24 - at(wy)]
  // 波纹：四个半周期，每段用三次贝塞尔近似半个正弦
  const L = (x1 - x0) / 4
  const a = 0.75 * 4 / 3
  let wave = `M${x0} ${wy}`
  for (let i = 0; i < 4; i++) {
    const s = x0 + i * L
    const k = i % 2 ? a : -a
    wave += `C${s + L / 3} ${wy + k} ${s + 2 * L / 3} ${wy + k} ${s + L} ${wy}`
  }
  const paths = [rounded([[3, top], [5.5, bottom], [18.5, bottom], [21, top]], Math.min(radius, 2), false), wave]
  for (let i = 0; i < bars; i++)
    paths.push(`M5.5 ${bottom + 3 * (i + 1)}H18.5`)
  return paths
}
// 盆里的温度数字
const temp = t => r => [...tub(r), ...snap(line(t, [12, 12.75], 0.8, 1.5, 0.8, LABEL)).map(d => ({ d, thin: true }))]

// 漂白三角：底边在 19.5，落在 .5 上
const triangle = radius => rounded([[12, 3], [21.5, 19.5], [2.5, 19.5]], Math.min(radius, 2))

// 熨斗：平底、尖头朝左、背部竖直，上方一根把手
function iron(radius) {
  const r = Math.min(radius, 2)
  return [
    `${rounded([[9.5, 10.5], [20.5, 10.5], [20.5, 17.5], [3, 17.5]], r, false)}C4 13.25 6 10.5 9.5 10.5Z`,
    rounded([[18.5, 10.5], [18.5, 6.5], [9, 6.5]], r, false),
  ]
}
const ironDots = xs => r => [...iron(r), ...xs.map(x => dot(x, 14))]

// 干燥方框
const tumble = radius => [square(Math.min(radius, 2)), circle(12, 12, 6)]
// 专业清洗：圆环里一个 1.5 倍字母
const letter = c => () => [ring(), { d: glyph(c, 12 - 2.625, 7.5, 1.5), detail: true }]

export const LAUNDRY = {
  // ---------- 水洗 ----------
  'wash': { group: 'wash', zh: '可水洗', paths: r => tub(r) },
  'wash-30': { group: 'wash', zh: '水洗 30℃', paths: temp('30') },
  'wash-40': { group: 'wash', zh: '水洗 40℃', paths: temp('40') },
  'wash-60': { group: 'wash', zh: '水洗 60℃', paths: temp('60') },
  'wash-95': { group: 'wash', zh: '水洗 95℃', paths: temp('95') },
  // 手洗：一只手从上方伸进盆里，手掌挡住水波纹
  'wash-hand': {
    group: 'wash',
    zh: '手洗',
    paths: (r) => {
      const hand = 'M10.5 2.5V7.75L8.5 9.75C7.9 10.35 8.6 11.4 9.4 10.9L10.5 10.25V11.5A2.5 2.5 0 0 0 15.5 11.5V2.5'
      return [...tub(r), { d: hand, cut: true }, { d: `${hand}Z`, cut: true, hidden: true, occlude: true }]
    },
  },
  'wash-gentle': { group: 'wash', zh: '柔和水洗', paths: r => tub(r, 1) },
  'wash-very-gentle': { group: 'wash', zh: '非常柔和水洗', paths: r => tub(r, 2) },
  'wash-off': { group: 'wash', zh: '不可水洗', paths: r => [...tub(r), ...cross] },
  // ---------- 漂白 ----------
  'bleach': { group: 'bleach', zh: '可漂白', paths: r => [triangle(r)] },
  // 两条和左边平行的斜线
  'bleach-non-chlorine': { group: 'bleach', zh: '仅非氯漂白', paths: r => [triangle(r), 'M7.5 17.5L10.95 11.5', 'M11 17.5L14.45 11.5'] },
  'bleach-off': { group: 'bleach', zh: '不可漂白', paths: r => [triangle(r), ...cross] },
  // ---------- 干燥 ----------
  'tumble-dry': { group: 'dry', zh: '可转笼烘干', paths: tumble },
  'tumble-dry-low': { group: 'dry', zh: '低温转笼烘干', paths: r => [...tumble(r), dot(12, 12)] },
  'tumble-dry-high': { group: 'dry', zh: '高温转笼烘干', paths: r => [...tumble(r), dot(10.5, 12), dot(13.5, 12)] },
  'tumble-dry-off': { group: 'dry', zh: '不可转笼烘干', paths: r => [...tumble(r), ...cross] },
  // 晾挂：方框上沿一条下垂的弧线
  'dry-line': { group: 'dry', zh: '悬挂晾干', paths: r => [square(Math.min(r, 2)), 'M3.5 6.5Q12 13 20.5 6.5'] },
  'dry-flat': { group: 'dry', zh: '平摊晾干', paths: r => [square(Math.min(r, 2)), 'M7 11.5H17'] },
  // 三根竖等距 4，以中轴对称
  'dry-drip': { group: 'dry', zh: '滴干', paths: r => [square(Math.min(r, 2)), 'M8 7.5V16.5', 'M12 7.5V16.5', 'M16 7.5V16.5'] },
  'dry-shade': { group: 'dry', zh: '阴干', paths: r => [square(Math.min(r, 2)), 'M4 7L7 4', 'M4 10.5L10.5 4'] },
  // ---------- 熨烫 ----------
  'iron': { group: 'iron', zh: '可熨烫', paths: iron },
  'iron-low': { group: 'iron', zh: '低温熨烫', paths: ironDots([13.5]) },
  'iron-medium': { group: 'iron', zh: '中温熨烫', paths: ironDots([12, 15]) },
  'iron-high': { group: 'iron', zh: '高温熨烫', paths: ironDots([10.5, 13.5, 16.5]) },
  'iron-off': { group: 'iron', zh: '不可熨烫', paths: r => [...iron(r), ...cross] },
  // ---------- 专业清洗 ----------
  'dry-clean': { group: 'clean', zh: '可干洗', paths: () => [ring()] },
  'dry-clean-p': { group: 'clean', zh: '干洗 P（四氯乙烯）', paths: letter('P') },
  'dry-clean-f': { group: 'clean', zh: '干洗 F（石油溶剂）', paths: letter('F') },
  'wet-clean-w': { group: 'clean', zh: '专业湿洗 W', paths: letter('W') },
  'dry-clean-off': { group: 'clean', zh: '不可干洗', paths: () => [ring(), ...cross] },
}

export const LAUNDRY_GROUPS = ['wash', 'bleach', 'dry', 'iron', 'clean']
