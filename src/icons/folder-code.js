import { center, folder } from '../folder'
import { rounded } from '../geometry'
import { code } from '../symbols'

// 文件夹 + 代码
export default ({ radius }) => [
  rounded(folder, radius),
  ...code(center, 1, radius),
]
