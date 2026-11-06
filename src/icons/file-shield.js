import { center, centerScale, fillParts, flap, page } from '../file'
import { rounded } from '../geometry'
import { shield, visual } from '../symbols'
import { success } from '../tone'
import { centerFill } from '../solid'

// 文件 + 盾
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...success(shield(center, centerScale * visual.shield, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...success(shield(center, centerScale * visual.shield, radius)),
])
