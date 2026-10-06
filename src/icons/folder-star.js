import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { star } from '../symbols'

// 文件夹 + 收藏
export default ({ radius }) => [
  rounded(folder, radius),
  ...star(center, 1, radius),
]
