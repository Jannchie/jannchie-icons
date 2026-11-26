import { rounded } from '../geometry'
import { knock, stacked } from '../solid'

// 三明治（切成三角的一块，斜着看）：前面一片直角三角形的面包（直角在左下，3.5–15.5 × 8.5–20.5）；
// 斜边后面是一条斜带（馅 + 后面那片面包，后沿在 x − y = 6 上，右上到 21），带子正中一道波浪的生菜。
// 三角的切面 + 斜边上夹着一层馅是三明治的记号，和三层横放的汉堡、楔形带孔的奶酪区分开
const front = radius => rounded([[3.5, 8.5], [15.5, 20.5], [3.5, 20.5]], Math.min(radius, 1.5))
const BAND = [[3.5, 8.5], [9, 3], [21, 15], [15.5, 20.5]]
// 生菜：沿带子的中线 x − y = 0.5，从一头的中点 (6.25, 5.75) 到另一头的中点 (18.25, 17.75)，六个小波（垂直于带子各鼓 0.9 × √2）
const f = v => +v.toFixed(3)
const at = t => [t + 0.25, t - 0.25]
const lettuce = `M${at(6).join(' ')}${[...Array(6).keys()].map((i) => {
  const [mx, my] = at(6 + (i + 0.5) * 2)
  const s = i % 2 ? 1 : -1
  return `Q${f(mx + s * 0.9)} ${f(my - s * 0.9)} ${at(8 + i * 2).join(' ')}`
}).join('')}`

export default ({ radius }) => [front(radius), rounded(BAND, Math.min(radius, 1.5), false), lettuce]

// 实心：斜带一块，前面那片面包是完整的一块、斜带在它四周让出缝；生菜两头穿出带子挖开
export const fill = ({ radius, stroke }) => [
  ...stacked(rounded(BAND, Math.min(radius, 1.5)), front(radius)),
  knock([lettuce, `M6.25 5.75l${-stroke * 2} ${-stroke * 2}`, `M18.25 17.75l${stroke * 2} ${stroke * 2}`]),
]
