import { center, centerScale, fillParts, flap, page } from '../file'
import { rounded } from '../geometry'
import { cross, visual } from '../symbols'
import { danger } from '../tone'
import { centerFill } from '../solid'

// 文件 + 叉
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...danger(cross(center, centerScale * visual.cross, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...danger(cross(center, centerScale * visual.cross, radius)),
])
