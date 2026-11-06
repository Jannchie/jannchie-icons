import { circle } from '../geometry'
import { solid } from '../solid'

// 提交：节点 + 左右两段线
export default () => [
  circle(12, 12, 3),
  'M3 12H9',
  'M15 12H21',
]

// 实心：节点填实，左右两段照旧是线
export const fill = () => [solid(circle(12, 12, 3)), 'M3 12H9', 'M15 12H21']
