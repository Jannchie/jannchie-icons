import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { puzzle } from '../symbols'

// 文件夹 + 拼图（模组）
export default ({ radius }) => [
  rounded(folder, radius),
  ...puzzle(center, 1, radius),
]
