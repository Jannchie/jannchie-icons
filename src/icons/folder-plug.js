import { rounded } from '../geometry'
import { center, folder, centerScale } from '../folder'
import { plug, visual } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 插头
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...accent(plug(center, centerScale * visual.plug, radius)),
]
