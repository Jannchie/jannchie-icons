import { rounded } from '../geometry'
import { center, centerScale, fillParts, folder } from '../folder'
import { plug, visual } from '../symbols'
import { accent } from '../tone'
import { centerFill } from '../solid'

// 文件夹 + 插头
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...accent(plug(center, centerScale * visual.plug, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...accent(plug(center, centerScale * visual.plug, radius)),
])
