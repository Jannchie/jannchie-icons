import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 文件 + 左箭头
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...info(arrowLeft(center, 1, radius)),
]
