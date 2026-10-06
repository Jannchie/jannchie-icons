import { rounded } from '../geometry'

// 筛选：漏斗
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [14, 12.5], [14, 19.5], [10, 17.5], [10, 12.5]], Math.min(radius, 1.5)),
]
