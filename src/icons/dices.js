import { rounded } from '../geometry'
import { dot } from '../scene'

// 两颗骰子：前面一颗完整（三点斜排），后面一颗只画露出的左上部分（三个点）
export default ({ radius }) => [
  rounded([[9, 9], [20.5, 9], [20.5, 20.5], [9, 20.5]], Math.min(radius, 2)),
  dot(12, 12, 2.5),
  dot(14.75, 14.75, 2.5),
  dot(17.5, 17.5, 2.5),
  rounded([[15, 6.5], [15, 3.5], [3.5, 3.5], [3.5, 15], [6.5, 15]], Math.min(radius, 2), false),
  dot(6.5, 6.5, 2.5),
  dot(11.75, 6.5, 2.5),
  dot(6.5, 11.75, 2.5),
]
