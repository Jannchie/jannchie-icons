import { rounded } from '../geometry'
import { center, centerScale, folder } from '../folder'
import { ring, visual } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 圆
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...accent(ring(center, centerScale * visual.ring, radius)),
]
