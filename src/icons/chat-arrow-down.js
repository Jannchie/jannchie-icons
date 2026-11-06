import { bubble, center, centerScale, fillParts } from '../chat'
import { rounded } from '../geometry'
import { arrowDown, visual } from '../symbols'
import { info } from '../tone'
import { centerFill } from '../solid'

// 对话 + 下箭头
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...info(arrowDown(center, centerScale * visual.arrowDown, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...info(arrowDown(center, centerScale * visual.arrowDown, radius)),
])
