import { bubble, center, centerScale, fillParts } from '../chat'
import { rounded } from '../geometry'
import { exclaim, visual } from '../symbols'
import { warning } from '../tone'
import { centerFill } from '../solid'

// 对话 + 感叹号
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...warning(exclaim(center, centerScale * visual.exclaim, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...warning(exclaim(center, centerScale * visual.exclaim, radius)),
])
