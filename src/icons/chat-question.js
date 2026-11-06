import { bubble, center, centerScale, fillParts } from '../chat'
import { rounded } from '../geometry'
import { question, visual } from '../symbols'
import { info } from '../tone'
import { centerFill } from '../solid'

// 对话 + 问号
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...info(question(center, centerScale * visual.question, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...info(question(center, centerScale * visual.question, radius)),
])
