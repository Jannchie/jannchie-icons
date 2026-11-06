import { center, centerScale, fillParts, plain } from '../monitor'
import { minus, visual } from '../symbols'
import { danger } from '../tone'
import { centerFill } from '../solid'

// 显示器 + 减号
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...danger(minus(center, centerScale * visual.minus, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...danger(minus(center, centerScale * visual.minus, radius)),
])
