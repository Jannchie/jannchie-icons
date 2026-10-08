import { rounded } from '../geometry'
import { center, folder, centerScale } from '../folder'
import { heart, visual } from '../symbols'
import { danger } from '../tone'

// 文件夹 + 爱心
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...danger(heart(center, centerScale * visual.heart, radius)),
]
