import { bubble, center, centerScale, fillParts } from '../chat'
import { rounded } from '../geometry'
import { check, visual } from '../symbols'
import { success } from '../tone'
import { centerFill } from '../solid'

// 对话 + 勾
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...success(check(center, centerScale * visual.check, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...success(check(center, centerScale * visual.check, radius)),
])
