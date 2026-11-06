import { knock } from '../solid'
import base, { fill as baseFill } from './search'
import { check } from '../symbols'

// 搜索 + 镜片里的勾
export default ({ radius }) => [
  ...base(),
  ...check([10.5, 10.5], 0.75, radius),
]

// 实心：search 的实心版，镜片挖掉勾
export const fill = ({ radius }) => [...baseFill(), knock(check([10.5, 10.5], 0.75, radius))]
