import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { minus } from '../symbols'

// 文件夹 + 减号
export default ({ radius }) => [
  rounded(folder, radius),
  ...minus(center),
]
