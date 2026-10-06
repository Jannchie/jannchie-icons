import { crisp, rounded } from '../geometry'

// 退出全屏：四个 45° 斜向箭头从四角往里指，箭翼一条水平一条竖直
const w = 3.5 // 箭翼长度
// 箭头：从 tail 指向 tip，(dx, dy) 是方向符号
const arrow = (tail, tip, dx, dy, radius) => [
  `M${tail.join(' ')}L${tip.join(' ')}`,
  rounded([[tip[0] - dx * w, tip[1]], tip, [tip[0], tip[1] - dy * w]], crisp(radius), false),
]

export default ({ radius }) => [
  ...arrow([20.5, 3.5], [14.5, 9.5], -1, 1, radius),
  ...arrow([3.5, 3.5], [9.5, 9.5], 1, 1, radius),
  ...arrow([3.5, 20.5], [9.5, 14.5], 1, -1, radius),
  ...arrow([20.5, 20.5], [14.5, 14.5], -1, -1, radius),
]
