import { rounded } from '../geometry'
import { dot } from '../scene'

// 计算器：竖长机身（4.5–19.5 × 2.5–21.5）+ 顶部显示屏（7.5–16.5 × 5.5–9.5）+ 下面 3 × 2 个按键点
export default ({ radius }) => [
  rounded([[4.5, 2.5], [19.5, 2.5], [19.5, 21.5], [4.5, 21.5]], Math.min(radius, 2.5)),
  rounded([[7.5, 5.5], [16.5, 5.5], [16.5, 9.5], [7.5, 9.5]], Math.min(radius, 1)),
  ...[8, 12, 16].flatMap(x => [13.5, 17.5].map(y => dot(x, y))),
]
