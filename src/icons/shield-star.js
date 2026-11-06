import { center, centerScale, fillParts, plain } from '../shield'
import { star, visual } from '../symbols'
import { warning } from '../tone'
import { centerFill } from '../solid'

// 盾 + 收藏；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...warning(star(center, centerScale * visual.star, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...warning(star(center, centerScale * visual.star, radius)),
])
