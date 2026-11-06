import { center, centerScale, fillParts, plain } from '../shield'
import { arrowLeft, visual } from '../symbols'
import { info } from '../tone'
import { centerFill } from '../solid'

// 盾 + 左箭头；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...info(arrowLeft(center, centerScale * visual.arrowLeft, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...info(arrowLeft(center, centerScale * visual.arrowLeft, radius)),
])
