import { center, centerScale, fillParts, plain } from '../monitor'
import { question, visual } from '../symbols'
import { info } from '../tone'
import { centerFill } from '../solid'

// 显示器 + 问号
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(question(center, centerScale * visual.question, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...info(question(center, centerScale * visual.question, radius)),
])
