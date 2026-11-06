import { center, centerScale, fillParts, plain } from '../briefcase'
import { arrowRight, visual } from '../symbols'
import { info } from '../tone'
import { centerFill } from '../solid'

// 公文包 + 右箭头
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(arrowRight(center, centerScale * visual.arrowRight, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...info(arrowRight(center, centerScale * visual.arrowRight, radius)),
])
