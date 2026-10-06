import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { plus } from '../symbols'

// 文件夹 + 加号
export default ({ radius }) => [
  rounded(folder, radius),
  ...plus(center),
]
