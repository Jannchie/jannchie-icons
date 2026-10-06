import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { plug } from '../symbols'

// 文件夹 + 插头
export default ({ radius }) => [
  rounded(folder, radius),
  ...plug(center, 1, radius),
]
