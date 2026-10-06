import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { gauge } from '../symbols'

// 文件夹 + 计速器
export default ({ radius }) => [
  rounded(folder, radius),
  ...gauge(center, 1, radius),
]
