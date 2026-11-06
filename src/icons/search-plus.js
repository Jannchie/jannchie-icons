import { knock } from '../solid'
import base, { fill as baseFill } from './search'
import { plus } from '../symbols'

// 搜索 + 镜片里的加号（放大）
export default ({ radius }) => [
  ...base(),
  ...plus([10.5, 10.5], 0.85, radius),
]

// 实心：search 的实心版，镜片挖掉加号
export const fill = ({ radius }) => [...baseFill(), knock(plus([10.5, 10.5], 0.85, radius))]
