import { knock } from '../solid'
import base, { fill as baseFill } from './search'
import { minus } from '../symbols'

// 搜索 + 镜片里的减号（缩小）
export default ({ radius }) => [
  ...base(),
  ...minus([10.5, 10.5], 0.85, radius),
]

// 实心：search 的实心版，镜片挖掉减号
export const fill = ({ radius }) => [...baseFill(), knock(minus([10.5, 10.5], 0.85, radius))]
