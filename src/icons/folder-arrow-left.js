import { rounded } from '../geometry'
import { center, folder, centerScale } from '../folder'
import { arrowLeft, visual } from '../symbols'
import { info } from '../tone'

// 文件夹 + 左箭头
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...info(arrowLeft(center, centerScale * visual.arrowLeft, radius)),
]
