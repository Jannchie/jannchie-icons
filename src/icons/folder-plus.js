import { rounded } from '../geometry'
import { center, centerScale, fillParts, folder } from '../folder'
import { plus, visual } from '../symbols'
import { success } from '../tone'
import { centerFill } from '../solid'

// 文件夹 + 加号
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...success(plus(center, centerScale * visual.plus, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...success(plus(center, centerScale * visual.plus, radius)),
])
