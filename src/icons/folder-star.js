import { rounded } from '../geometry'
import { center, folder, centerScale } from '../folder'
import { star, visual } from '../symbols'
import { warning } from '../tone'

// 文件夹 + 收藏
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...warning(star(center, centerScale * visual.star, radius)),
]
