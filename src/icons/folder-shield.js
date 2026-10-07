import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { shield } from '../symbols'
import { success } from '../tone'

// 文件夹 + 盾
export default ({ radius }) => [
  rounded(folder, radius),
  ...success(shield(center, 1, radius)),
]
