import { crisp, rounded } from '../geometry'

// 外部链接：右上角开口的方框 + 往右上 45° 伸出的箭头
export default ({ radius }) => [
  rounded([[11, 4.5], [4.5, 4.5], [4.5, 19.5], [19.5, 19.5], [19.5, 13]], Math.min(radius, 2), false),
  'M11.5 12.5L20.5 3.5',
  rounded([[15.5, 3.5], [20.5, 3.5], [20.5, 8.5]], crisp(radius), false),
]
