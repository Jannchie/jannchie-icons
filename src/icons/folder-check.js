import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { check } from '../symbols'

// 文件夹 + 勾
export default ({ radius }) => [
  rounded(folder, radius),
  ...check(center),
]
