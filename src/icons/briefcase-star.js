import { center, centerScale, fillParts, plain } from '../briefcase'
import { star, visual } from '../symbols'
import { warning } from '../tone'
import { centerFill } from '../solid'

// 公文包 + 收藏
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...warning(star(center, centerScale * visual.star, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...warning(star(center, centerScale * visual.star, radius)),
])
