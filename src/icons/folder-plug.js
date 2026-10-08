import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { plug } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 插头
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...accent(plug(center, 1, radius)),
]
