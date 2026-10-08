import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { star } from '../symbols'
import { warning } from '../tone'

// 文件夹 + 收藏
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...warning(star(center, 1, radius)),
]
