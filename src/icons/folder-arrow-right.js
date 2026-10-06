import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { arrowRight } from '../symbols'

// 文件夹 + 右箭头
export default ({ radius }) => [
  rounded(folder, radius),
  ...arrowRight(center, 1, radius),
]
