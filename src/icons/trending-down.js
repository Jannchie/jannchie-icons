import { crisp, rounded } from '../geometry'

// 下降趋势：上升趋势的上下镜像
export default ({ radius }) => [
  rounded([[3, 7], [9, 13], [13, 9], [20.5, 16.5]], Math.min(radius, 1), false),
  rounded([[16.25, 16.5], [20.5, 16.5], [20.5, 12.25]], crisp(radius), false),
]
