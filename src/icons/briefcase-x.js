import { center, centerScale, fillParts, plain } from '../briefcase'
import { cross, visual } from '../symbols'
import { danger } from '../tone'
import { centerFill } from '../solid'

// 公文包 + 叉
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...danger(cross(center, centerScale * visual.cross, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...danger(cross(center, centerScale * visual.cross, radius)),
])
