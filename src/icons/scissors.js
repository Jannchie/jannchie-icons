import { circle } from '../geometry'

// 剪切：左侧两个圆环，两片刀刃从圆环边缘以 45° 交叉伸向右侧
const r = 2.75
const edge = r * Math.SQRT1_2
export default () => [
  circle(6.5, 6.5, r),
  circle(6.5, 17.5, r),
  `M${6.5 + edge} ${6.5 + edge}L20 20`,
  `M${6.5 + edge} ${17.5 - edge}L20 4`,
]
