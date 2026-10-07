import { circle } from '../geometry'
import { dot } from '../scene'

// 八卦：中心太极（圆环半径 4，S 形分界 + 两个小点）+ 外圈先天八卦（伏羲八卦）
// 先天八卦按传统图的方位（上南下北）：乾上、坤下、离左、坎右；从上顺时针依次 乾 巽 坎 艮 坤 震 离 兑
// 每卦三爻沿半径排开，初爻（最下一爻）在最里面：半径 6.5、8.5、10.5（爻距 2），爻长 3.5，阴爻中间断开 1.3
// 爻用细线（外框的 0.7 倍）：一卦三爻挤在 4 格里，主线宽的爻会粘成一块
const [cx, cy] = [12, 12]
const RADII = [6.5, 8.5, 10.5]
const L = 3.5
const GAP = 1.3
// 卦象：初爻在前，1 为阳爻
const TRIGRAMS = [
  [1, 1, 1], // 乾
  [0, 1, 1], // 巽
  [0, 1, 0], // 坎
  [0, 0, 1], // 艮
  [0, 0, 0], // 坤
  [1, 0, 0], // 震
  [1, 0, 1], // 离
  [1, 1, 0], // 兑
]
const f = v => +v.toFixed(3)
// 太极圆环上角度 deg 处的点
const on = deg => `${f(cx + 4 * Math.cos(deg * Math.PI / 180))} ${f(cy + 4 * Math.sin(deg * Math.PI / 180))}`
function trigram(lines, k) {
  const a = (-90 + k * 45) * Math.PI / 180
  const [ux, uy] = [Math.cos(a), Math.sin(a)] // 径向
  const [tx, ty] = [-uy, ux] // 切向
  return lines.map((yang, i) => {
    const [mx, my] = [cx + ux * RADII[i], cy + uy * RADII[i]]
    const seg = (s0, s1) => `M${f(mx + tx * s0)} ${f(my + ty * s0)}L${f(mx + tx * s1)} ${f(my + ty * s1)}`
    return yang ? seg(-L / 2, L / 2) : seg(-L / 2, -GAP / 2) + seg(GAP / 2, L / 2)
  }).join('')
}
export default () => [
  // 太极：圆环（半径 4）+ S 形分界。S 线两端不停在和圆环相切的那一点，而是各沿圆环多走 20° 再停——
  // 线头落在圆环的描边里、顺着同一方向，尖角模式下不会冒出去
  circle(cx, cy, 4),
  `M${on(-110)}A4 4 0 0 1 12 8A2 2 0 0 1 12 12A2 2 0 0 0 12 16A4 4 0 0 0 ${on(70)}`,
  dot(12, 10, 1.25),
  dot(12, 14, 1.25),
  { d: TRIGRAMS.map(trigram).join(''), thin: true },
]
