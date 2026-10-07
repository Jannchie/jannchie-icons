import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { lock } from '../symbols'
import { warning } from '../tone'

// 文件夹 + 锁
export default ({ radius }) => [
  rounded(folder, radius),
  ...warning(lock(center, 1, radius)),
]
