import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { clock } from '../symbols'

// 文件夹 + 时钟
export default ({ radius }) => [
  rounded(folder, radius),
  ...clock(center, 1, radius),
]
