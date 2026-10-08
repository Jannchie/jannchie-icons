import { rounded } from '../geometry'
import { center, folder, centerScale } from '../folder'
import { clock, visual } from '../symbols'
import { info } from '../tone'

// 文件夹 + 时钟
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...info(clock(center, centerScale * visual.clock, radius)),
]
