import { center, centerScale, fillParts, plain } from '../monitor'
import { arrowLeft, visual } from '../symbols'
import { info } from '../tone'
import { centerFill } from '../solid'

// 显示器 + 左箭头
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(arrowLeft(center, centerScale * visual.arrowLeft, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...info(arrowLeft(center, centerScale * visual.arrowLeft, radius)),
])
