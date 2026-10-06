import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { ring } from '../symbols'

// 文件夹 + 圆
export default ({ radius }) => [
  rounded(folder, radius),
  ...ring(center),
]
