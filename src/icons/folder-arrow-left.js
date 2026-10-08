import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 文件夹 + 左箭头
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...info(arrowLeft(center, 1, radius)),
]
