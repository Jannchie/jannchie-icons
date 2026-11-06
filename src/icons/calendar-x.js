import { base, center, centerScale, fillParts } from '../calendar'
import { cross, visual } from '../symbols'
import { danger } from '../tone'
import { centerFill } from '../solid'

// 日历 + 叉
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...danger(cross(center, centerScale * visual.cross, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...danger(cross(center, centerScale * visual.cross, radius)),
])
