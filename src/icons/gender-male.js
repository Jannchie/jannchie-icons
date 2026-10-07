import { circle, crisp, rounded } from '../geometry'

// 男性 ♂：圆 + 右上 45° 箭头
export default ({ radius }) => [
  circle(10, 14, 5.5),
  'M13.89 10.11L20.5 3.5',
  rounded([[15.5, 3.5], [20.5, 3.5], [20.5, 8.5]], crisp(radius), false),
]
