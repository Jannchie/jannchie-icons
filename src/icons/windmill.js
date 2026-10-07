import { crisp, rounded } from '../geometry'
import { GROUND, groundLine, opening } from '../scene'

// 风车：向上收分的塔身，塔顶上方四片叶片交叉成 X；下面两片挡在塔前，把塔顶两角切开；塔身的斜角不随全局圆角
const hub = [12, 8]
const reach = 6 // 叶尖到轮毂的水平 / 竖直距离
const knife = d => ({ d, cut: true, gap: 0.75 })

export default ({ radius }) => [
  groundLine,
  rounded([[7.5, GROUND], [9.5, 11.5, crisp(radius)], [14.5, 11.5, crisp(radius)], [16.5, GROUND]], radius, false),
  knife(`M${hub[0] - reach} ${hub[1] - reach}L${hub[0] + reach} ${hub[1] + reach}`),
  knife(`M${hub[0] + reach} ${hub[1] - reach}L${hub[0] - reach} ${hub[1] + reach}`),
  rounded(opening(12, 3, 4.5), radius, false),
]
