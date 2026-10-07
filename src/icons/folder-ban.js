import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { ban } from '../symbols'
import { danger } from '../tone'

// 文件夹 + 禁止
export default ({ radius }) => [
  rounded(folder, radius),
  ...danger(ban(center, 1, radius)),
]
