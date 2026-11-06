import { center, centerScale, fillParts, plain } from '../monitor'
import { sparkle, visual } from '../symbols'
import { accent } from '../tone'
import { centerFill } from '../solid'

// 显示器 + 星芒
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(sparkle(center, centerScale * visual.sparkle, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...accent(sparkle(center, centerScale * visual.sparkle, radius)),
])
