import { bubble, center, centerScale, fillParts } from '../chat'
import { rounded } from '../geometry'
import { star, visual } from '../symbols'
import { warning } from '../tone'
import { centerFill } from '../solid'

// 对话 + 收藏
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...warning(star(center, centerScale * visual.star, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...warning(star(center, centerScale * visual.star, radius)),
])
