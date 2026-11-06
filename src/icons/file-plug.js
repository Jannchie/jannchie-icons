import { center, centerScale, fillParts, flap, page } from '../file'
import { rounded } from '../geometry'
import { plug, visual } from '../symbols'
import { accent } from '../tone'
import { centerFill } from '../solid'

// 文件 + 插头
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...accent(plug(center, centerScale * visual.plug, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...accent(plug(center, centerScale * visual.plug, radius)),
])
