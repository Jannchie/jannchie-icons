import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { lock } from '../symbols'

// 文件夹 + 锁
export default ({ radius }) => [
  rounded(folder, radius),
  ...lock(center, 1, radius),
]
