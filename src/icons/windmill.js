import { GAP } from '../clearance'
import { crisp, rounded } from '../geometry'
import { GROUND, groundLine, opening } from '../scene'
import { clear, hole, solid } from '../solid'

// 风车：向上收分的塔身，塔顶上方四片叶片交叉成 X；下面两片挡在塔前，把塔顶两角切开；塔身的斜角不随全局圆角
const hub = [12, 8]
const reach = 6 // 叶尖到轮毂的水平 / 竖直距离
const knife = d => ({ d, cut: true, gap: 0.75 })
const tower = radius => [[7.5, GROUND], [9.5, 11.5, crisp(radius)], [14.5, 11.5, crisp(radius)], [16.5, GROUND]]
const blades = [
  `M${hub[0] - reach} ${hub[1] - reach}L${hub[0] + reach} ${hub[1] + reach}`,
  `M${hub[0] + reach} ${hub[1] - reach}L${hub[0] - reach} ${hub[1] + reach}`,
]

export default ({ radius }) => [
  groundLine,
  rounded(tower(radius), radius, false),
  ...blades.map(knife),
  rounded(opening(12, 3, 4.5), radius, false),
]

// 实心：塔身填实，门挖空（洞外扩半个线宽后正好是描边版门框的中心线）；叶片在前面、四周在塔身上让出 GAP 的缝，
// 地平线最后画，门洞不切断它
export const fill = ({ radius, stroke }) => [
  solid(rounded(tower(radius), radius)),
  hole(rounded(opening(12, 3 - stroke, 4.5 - stroke / 2), Math.max(0, radius - stroke / 2), false)),
  clear(blades, GAP),
  ...blades,
  groundLine,
]
