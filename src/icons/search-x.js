import { knock } from '../solid'
import base, { fill as baseFill } from './search'
import { cross } from '../symbols'

// 搜索 + 镜片里的叉（清除）
export default ({ radius }) => [
  ...base(),
  ...cross([10.5, 10.5], 0.9, radius),
]

// 实心：search 的实心版，镜片挖掉叉
export const fill = ({ radius }) => [...baseFill(), knock(cross([10.5, 10.5], 0.9, radius))]
