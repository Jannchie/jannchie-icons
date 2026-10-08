import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { cross } from '../symbols'
import { danger } from '../tone'

// 文件夹 + 叉
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...danger(cross(center)),
]
