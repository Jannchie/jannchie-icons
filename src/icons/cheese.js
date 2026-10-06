import { circle, rounded } from '../geometry'

// 奶酪：楔形块（顶面 + 侧面）+ 两个孔
export default ({ radius }) => [
  rounded([[3, 10], [18, 5.5], [21, 10], [21, 19], [3, 19]], Math.min(radius, 1.5)),
  'M3 10H21',
  circle(8, 14.5, 1.5),
  circle(15, 14.5, 2),
]
