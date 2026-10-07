import { circle, rounded } from '../geometry'

// 红绿灯：竖长的灯箱（7.5–16.5 × 2.5–21.5）里三盏圆灯（半径 1.75，灯与灯中心距 5.5，粗字重下也分得开；圆心 x = 12，y = 6.5 / 12 / 17.5）
export default ({ radius }) => [
  rounded([[7.5, 2.5], [16.5, 2.5], [16.5, 21.5], [7.5, 21.5]], Math.min(radius, 2.5)),
  circle(12, 6.5, 1.75),
  circle(12, 12, 1.75),
  circle(12, 17.5, 1.75),
]
