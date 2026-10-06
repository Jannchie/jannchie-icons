import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { sparkle } from '../symbols'

// 文件夹 + 星芒
export default ({ radius }) => [
  rounded(folder, radius),
  ...sparkle(center, 1, radius),
]
