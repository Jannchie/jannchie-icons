import { rounded } from '../geometry'
import { center, centerScale, folder } from '../folder'
import { cross, visual } from '../symbols'
import { danger } from '../tone'

// 文件夹 + 叉
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...danger(cross(center, centerScale * visual.cross, radius)),
]
