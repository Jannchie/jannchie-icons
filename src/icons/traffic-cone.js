import { crisp, rounded } from '../geometry'
import { GROUND } from '../scene'
import { knock, solid } from '../solid'

// 路锥：底座是一块扁平的闭合底板（3.5–20.5 × 18.5–20.5），锥体是一整个梯形（顶 10.5–13.5、底 6.5–17.5），
// 中间一道反光带：梯形里两条横线（8.5、12.5），两端顶到斜边
const side = y => 10.5 - (y - 3.5) * 4 / 15 // 左斜边在高度 y 处的 x
const line = y => `M${side(y)} ${y}H${24 - side(y)}`
export default ({ radius }) => [
  rounded([[3.5, 18.5], [20.5, 18.5], [20.5, GROUND], [3.5, GROUND]], Math.min(radius, 1)),
  rounded([[side(3.5), 3.5], [24 - side(3.5), 3.5], [24 - side(18.5), 18.5], [side(18.5), 18.5]], crisp(radius)),
  line(8.5),
  line(12.5),
]

// 实心：底板、锥体各一块，中间挖开一道缝；反光带的两条横线挖空（锥体分成三段）
export const fill = ({ radius, stroke }) => [
  solid(rounded([[3.5, 18.5], [20.5, 18.5], [20.5, GROUND], [3.5, GROUND]], Math.min(radius, 1))),
  solid(rounded([[side(3.5), 3.5], [24 - side(3.5), 3.5], [24 - side(18.5), 18.5], [side(18.5), 18.5]], crisp(radius))),
  // 两端各多伸一个线宽，把锥体切干净，不留连着的细丝
  knock([18.5, 8.5, 12.5].map(y => `M${side(y) - stroke} ${y}H${24 - side(y) + stroke}`)),
]
