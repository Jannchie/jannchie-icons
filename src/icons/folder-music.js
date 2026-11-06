import { rounded } from '../geometry'
import { center, centerScale, fillParts, folder } from '../folder'
import { music, visual } from '../symbols'
import { accent } from '../tone'
import { centerFill } from '../solid'

// 音乐文件夹
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...accent(music(center, centerScale * visual.music, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...accent(music(center, centerScale * visual.music, radius)),
])
