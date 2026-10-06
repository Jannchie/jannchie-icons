import { circle, crisp, rounded } from '../geometry'

// 男性 ♂：圆 + 右上 45° 箭头
export default ({ radius }) => [
  circle(10, 14, 5.5),
  'M13.9 10.1L20 4',
  rounded([[15, 4], [20, 4], [20, 9]], crisp(radius), false),
]
