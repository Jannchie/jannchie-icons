import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { image } from '../symbols'
import { accent } from '../tone'

// 文件 + 图片
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...accent(image(center, 1, radius)),
]
