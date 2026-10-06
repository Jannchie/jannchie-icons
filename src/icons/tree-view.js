import { circle, crisp, rounded } from '../geometry'

// 树状视图：根节点 + 竖线 + 两条分支 + 两个子节点
export default ({ radius, stroke }) => [
  rounded([[3, 3], [10, 3], [10, 7.5], [3, 7.5]], Math.min(radius, 1)),
  'M6.5 7.5V18',
  'M6.5 12H13',
  'M6.5 18H13',
  rounded([[13, 9.75], [21, 9.75], [21, 14.25], [13, 14.25]], Math.min(radius, 1)),
  rounded([[13, 15.75], [21, 15.75], [21, 20.25], [13, 20.25]], Math.min(radius, 1)),
]
