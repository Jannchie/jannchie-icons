import { center, centerScale, fillParts, plain } from '../briefcase'
import { heart, visual } from '../symbols'
import { danger } from '../tone'
import { centerFill } from '../solid'

// 公文包 + 爱心
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...danger(heart(center, centerScale * visual.heart, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...danger(heart(center, centerScale * visual.heart, radius)),
])
