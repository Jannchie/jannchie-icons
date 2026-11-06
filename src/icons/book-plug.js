import { center, centerScale, fillParts, plain } from '../book'
import { plug, visual } from '../symbols'
import { accent } from '../tone'
import { centerFill } from '../solid'

// 书 + 插头
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(plug(center, centerScale * visual.plug, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...accent(plug(center, centerScale * visual.plug, radius)),
])
