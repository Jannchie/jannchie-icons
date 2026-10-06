import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { shield } from '../symbols'

// 文件夹 + 盾
export default ({ radius }) => [
  rounded(folder, radius),
  ...shield(center, 1, radius),
]
