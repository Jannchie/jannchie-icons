import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { ban } from '../symbols'

// 文件夹 + 禁止
export default ({ radius }) => [
  rounded(folder, radius),
  ...ban(center, 1, radius),
]
