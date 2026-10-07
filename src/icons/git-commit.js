import { circle } from '../geometry'

// 提交：节点 + 左右两段线
export default () => [
  circle(12, 11.5, 3),
  'M3 11.5H9',
  'M15 11.5H21',
]
