import { center, centerScale, fillParts, plain } from '../book'
import { arrowUp, visual } from '../symbols'
import { info } from '../tone'
import { centerFill } from '../solid'

// 书 + 上箭头
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(arrowUp(center, centerScale * visual.arrowUp, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...info(arrowUp(center, centerScale * visual.arrowUp, radius)),
])
