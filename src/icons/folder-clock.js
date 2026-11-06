import { rounded } from '../geometry'
import { center, centerScale, fillParts, folder } from '../folder'
import { clock, visual } from '../symbols'
import { info } from '../tone'
import { centerFill } from '../solid'

// 文件夹 + 时钟
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...info(clock(center, centerScale * visual.clock, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...info(clock(center, centerScale * visual.clock, radius)),
])
