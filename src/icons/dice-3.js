import { square } from '../marks'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 骰子 3 点：圆角方块 + 3 个点（点位间距 4.25）
const PIPS = [dot(7.75, 7.75, 3), dot(12.0, 12.0, 3), dot(16.25, 16.25, 3)]

export default ({ radius }) => [
  square(radius),
  ...PIPS,
]

// 实心：方块一块，挖掉点；点的大小停在常规字重那一档（eye），粗字重下点距只有 4.25，跟着变大会连成竖条
export const fill = ({ radius }) => [solid(square(radius)), knock(PIPS.map(p => ({ ...p, eye: true })))]
