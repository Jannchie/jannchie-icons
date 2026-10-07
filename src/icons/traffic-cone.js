import { crisp, rounded } from '../geometry'
import { GROUND } from '../scene'

// 路锥：底座是一块扁平的闭合底板（3.5–20.5 × 18.5–20.5），锥体是梯形（顶 10.5–13.5、底 6.5–17.5），
// 两道反光带画成横线，两端顺着锥体斜边——锥体用两段：上段到第一道反光带、中段到第二道、下段到底座，反光带是各段的闭合边
const side = y => 10.5 - (y - 3.5) * 4 / 15 // 左斜边在高度 y 处的 x
const band = (y0, y1, r) => rounded([[side(y0), y0], [24 - side(y0), y0], [24 - side(y1), y1], [side(y1), y1]], crisp(r))
export default ({ radius }) => [
  rounded([[3.5, 18.5], [20.5, 18.5], [20.5, GROUND], [3.5, GROUND]], Math.min(radius, 1)),
  band(3.5, 8.5, radius),
  band(12.5, 18.5, radius),
]
