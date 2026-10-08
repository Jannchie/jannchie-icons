import { center, folder } from '../folder'
import { rounded } from '../geometry'
import { code } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 代码
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...accent(code(center, 1, radius)),
]
