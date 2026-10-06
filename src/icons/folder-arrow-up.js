import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { arrowUp } from '../symbols'

// 文件夹 + 上箭头
export default ({ radius }) => [
  rounded(folder, radius),
  ...arrowUp(center, 1, radius),
]
