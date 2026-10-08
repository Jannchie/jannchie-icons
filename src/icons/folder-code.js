import { center, folder, centerScale } from '../folder'
import { rounded } from '../geometry'
import { code, visual } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 代码
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...accent(code(center, centerScale * visual.code, radius)),
]
