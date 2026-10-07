import { crisp, rounded } from '../geometry'

// 电阻：两端引线 + 中间锯齿（引线落在 .5 上，整体偏上半格）
export default ({ radius }) => [
  rounded([[2.5, 11.5], [6, 11.5], [7.5, 8.5], [10.5, 14.5], [13.5, 8.5], [16.5, 14.5], [18, 11.5], [21.5, 11.5]], crisp(radius), false),
]
