import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { arrowDown } from '../symbols'

// 文件夹 + 下箭头
export default ({ radius }) => [
  rounded(folder, radius),
  ...arrowDown(center, 1, radius),
]
