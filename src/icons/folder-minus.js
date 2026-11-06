import { rounded } from '../geometry'
import { center, centerScale, fillParts, folder } from '../folder'
import { minus, visual } from '../symbols'
import { danger } from '../tone'
import { centerFill } from '../solid'

// 文件夹 + 减号
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...danger(minus(center, centerScale * visual.minus, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...danger(minus(center, centerScale * visual.minus, radius)),
])
