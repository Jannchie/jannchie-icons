import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { arrowLeft } from '../symbols'

// 文件夹 + 左箭头
export default ({ radius }) => [
  rounded(folder, radius),
  ...arrowLeft(center, 1, radius),
]
