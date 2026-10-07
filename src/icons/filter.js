import { rounded } from '../geometry'

// 筛选：漏斗
export default ({ radius }) => [
  // 漏斗颈的两条竖边落在 10.5 / 13.5 上
  rounded([[3.5, 4.5], [20.5, 4.5], [13.5, 12.5], [13.5, 19.5], [10.5, 18], [10.5, 12.5]], Math.min(radius, 1.5)),
]
