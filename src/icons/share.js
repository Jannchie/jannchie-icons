import { circle } from '../geometry'

// 分享（节点）：三个节点 + 两条连线
export default ({ radius }) => [
  circle(18, 5.5, 2.75),
  circle(6, 12, 2.75),
  circle(18, 18.5, 2.75),
  'M8.4 10.65L15.6 6.85',
  'M8.4 13.35L15.6 17.15',
]
