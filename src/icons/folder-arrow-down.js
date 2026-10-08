import { rounded } from '../geometry'
import { center, folder, centerScale } from '../folder'
import { arrowDown, visual } from '../symbols'
import { info } from '../tone'

// 文件夹 + 下箭头
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...info(arrowDown(center, centerScale * visual.arrowDown, radius)),
]
