import { crisp, rounded } from '../geometry'

// 下降趋势：上升趋势的上下镜像
export default ({ radius }) => [
  rounded([[3, 7], [9, 13], [13, 9], [20, 16]], Math.min(radius, 1), false),
  rounded([[15.75, 16], [20, 16], [20, 11.75]], crisp(radius), false),
]
