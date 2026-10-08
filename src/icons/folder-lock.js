import { rounded } from '../geometry'
import { center, folder, centerScale } from '../folder'
import { lock, visual } from '../symbols'
import { warning } from '../tone'

// 文件夹 + 锁
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...warning(lock(center, centerScale * visual.lock, radius)),
]
