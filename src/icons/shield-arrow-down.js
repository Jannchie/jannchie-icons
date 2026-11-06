import { center, centerScale, fillParts, plain } from '../shield'
import { arrowDown, visual } from '../symbols'
import { info } from '../tone'
import { centerFill } from '../solid'

// 盾 + 下箭头；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...info(arrowDown(center, centerScale * visual.arrowDown, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...info(arrowDown(center, centerScale * visual.arrowDown, radius)),
])
