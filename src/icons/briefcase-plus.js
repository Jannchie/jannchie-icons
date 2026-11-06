import { center, centerScale, fillParts, plain } from '../briefcase'
import { plus, visual } from '../symbols'
import { success } from '../tone'
import { centerFill } from '../solid'

// 公文包 + 加号
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...success(plus(center, centerScale * visual.plus, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...success(plus(center, centerScale * visual.plus, radius)),
])
