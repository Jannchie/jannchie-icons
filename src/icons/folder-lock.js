import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { lock } from '../symbols'
import { warning } from '../tone'

// 文件夹 + 锁
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...warning(lock(center, 1, radius)),
]
