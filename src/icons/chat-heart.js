import { bubble, center, centerScale, fillParts } from '../chat'
import { rounded } from '../geometry'
import { heart, visual } from '../symbols'
import { danger } from '../tone'
import { centerFill } from '../solid'

// 对话 + 爱心
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...danger(heart(center, centerScale * visual.heart, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...danger(heart(center, centerScale * visual.heart, radius)),
])
