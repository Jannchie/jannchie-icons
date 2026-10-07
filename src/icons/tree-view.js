import { circle, crisp, rounded } from '../geometry'

// 树状视图：根节点 + 竖线 + 两条分支 + 两个子节点
export default ({ radius, stroke }) => [
  rounded([[3.5, 3.5], [9.5, 3.5], [9.5, 7.5], [3.5, 7.5]], Math.min(radius, 1)),
  'M6.5 7.5V17.5',
  'M6.5 11.5H12.5',
  'M6.5 17.5H12.5',
  rounded([[12.5, 9.5], [20.5, 9.5], [20.5, 13.5], [12.5, 13.5]], Math.min(radius, 1)),
  rounded([[12.5, 15.5], [20.5, 15.5], [20.5, 19.5], [12.5, 19.5]], Math.min(radius, 1)),
]
