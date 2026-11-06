import { center, centerScale, fillParts, plain } from '../shield'
import { cross, visual } from '../symbols'
import { danger } from '../tone'
import { centerFill } from '../solid'

// 盾 + 叉；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...danger(cross(center, centerScale * visual.cross, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...danger(cross(center, centerScale * visual.cross, radius)),
])
