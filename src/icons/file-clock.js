import { center, centerScale, fillParts, flap, page } from '../file'
import { rounded } from '../geometry'
import { clock, visual } from '../symbols'
import { info } from '../tone'
import { centerFill } from '../solid'

// 文件 + 时钟
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...info(clock(center, centerScale * visual.clock, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...info(clock(center, centerScale * visual.clock, radius)),
])
