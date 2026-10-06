import { circle } from '../geometry'

// 提交：节点 + 左右两段线
export default () => [
  circle(12, 12, 3),
  'M3 12H9',
  'M15 12H21',
]
