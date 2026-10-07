import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { cross } from '../symbols'
import { danger } from '../tone'

// 文件夹 + 叉
export default ({ radius }) => [
  rounded(folder, radius),
  ...danger(cross(center)),
]
