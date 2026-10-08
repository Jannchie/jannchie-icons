import { rounded } from '../geometry'
import { center, folder, centerScale } from '../folder'
import { arrowRight, visual } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右箭头
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...info(arrowRight(center, centerScale * visual.arrowRight, radius)),
]
