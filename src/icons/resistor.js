import { crisp, rounded } from '../geometry'

// 电阻：两端引线 + 中间锯齿，引线在中线上
export default ({ radius }) => [
  rounded([[2.5, 12], [6, 12], [7.5, 9], [10.5, 15], [13.5, 9], [16.5, 15], [18, 12], [21.5, 12]], crisp(radius), false),
]
