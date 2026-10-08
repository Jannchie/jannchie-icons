import { rounded } from '../geometry'
import { center, folder, centerScale } from '../folder'
import { arrowUp, visual } from '../symbols'
import { info } from '../tone'

// 文件夹 + 上箭头
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...info(arrowUp(center, centerScale * visual.arrowUp, radius)),
]
