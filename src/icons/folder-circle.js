import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { ring } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 圆
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...accent(ring(center)),
]
