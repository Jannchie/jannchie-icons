import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { image } from '../symbols'
import { accent } from '../tone'

// 文件 + 图片
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...accent(image(center, 1, radius)),
]
