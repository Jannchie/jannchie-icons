import { circle, rounded } from '../geometry'

// 标签：左上切出的五边形 + 穿孔
export default ({ radius }) => [
  rounded([[3.5, 3.5], [11.5, 3.5], [20.5, 12.5], [12.5, 20.5], [3.5, 11.5]], Math.min(radius, 2)),
  circle(8, 8, 1.25),
]
