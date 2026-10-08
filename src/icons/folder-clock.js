import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { clock } from '../symbols'
import { info } from '../tone'

// 文件夹 + 时钟
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...info(clock(center, 1, radius)),
]
