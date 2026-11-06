import { bubble, center, centerScale, fillParts } from '../chat'
import { rounded } from '../geometry'
import { plus, visual } from '../symbols'
import { success } from '../tone'
import { centerFill } from '../solid'

// 对话 + 加号
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...success(plus(center, centerScale * visual.plus, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...success(plus(center, centerScale * visual.plus, radius)),
])
