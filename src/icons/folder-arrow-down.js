import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { arrowDown } from '../symbols'
import { info } from '../tone'

// 文件夹 + 下箭头
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...info(arrowDown(center, 1, radius)),
]
