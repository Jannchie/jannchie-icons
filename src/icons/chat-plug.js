import { bubble, center, centerScale, fillParts } from '../chat'
import { rounded } from '../geometry'
import { plug, visual } from '../symbols'
import { accent } from '../tone'
import { centerFill } from '../solid'

// 对话 + 插头
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...accent(plug(center, centerScale * visual.plug, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...accent(plug(center, centerScale * visual.plug, radius)),
])
