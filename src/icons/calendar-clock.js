import { base, center, centerScale, fillParts } from '../calendar'
import { clock, visual } from '../symbols'
import { info } from '../tone'
import { centerFill } from '../solid'

// 日历 + 时钟
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...info(clock(center, centerScale * visual.clock, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...info(clock(center, centerScale * visual.clock, radius)),
])
