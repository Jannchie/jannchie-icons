import { center, centerScale, fillParts, flap, page } from '../file'
import { rounded } from '../geometry'
import { star, visual } from '../symbols'
import { warning } from '../tone'
import { centerFill } from '../solid'

// 文件 + 收藏
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...warning(star(center, centerScale * visual.star, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...warning(star(center, centerScale * visual.star, radius)),
])
