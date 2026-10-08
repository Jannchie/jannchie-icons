import { flap, page } from '../file'
import { rounded } from '../geometry'

// 文件：纸张 + 右上折角
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
]
