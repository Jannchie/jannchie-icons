import { rounded } from '../geometry'
import { center, centerScale, folder } from '../folder'
import { minus, visual } from '../symbols'
import { danger } from '../tone'

// 文件夹 + 减号
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...danger(minus(center, centerScale * visual.minus, radius)),
]
