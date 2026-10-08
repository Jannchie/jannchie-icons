import { rounded } from '../geometry'
import { center, centerScale, folder } from '../folder'
import { plus, visual } from '../symbols'
import { success } from '../tone'

// 文件夹 + 加号
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...success(plus(center, centerScale * visual.plus, radius)),
]
