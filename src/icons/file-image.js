import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { image, visual } from '../symbols'
import { accent } from '../tone'

// 文件 + 图片
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...accent(image(center, centerScale * visual.image, radius)),
]
