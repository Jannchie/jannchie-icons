import { circle, rounded } from '../geometry'

// 指南针：圆 + 菱形指针
export default ({ radius }) => [
  circle(12, 12, 9),
  rounded([[15.5, 8.5], [13.5, 13.5], [8.5, 15.5], [10.5, 10.5]], Math.min(radius, 0.75)),
]
