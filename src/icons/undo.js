import { crisp, rounded } from '../geometry'

// 撤销：向左的 45° 箭头 + 从箭头往右再绕回来的弯
export default ({ radius }) => [
  rounded([[9, 4.5], [4, 9.5], [9, 14.5]], crisp(radius), false),
  'M4 9.5H14.5A5.5 5.5 0 0 1 14.5 20.5H11',
]
