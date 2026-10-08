import { base, center, centerScale } from '../calendar'
import { image } from '../symbols'
import { accent } from '../tone'

// 日历 + 图片
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...accent(image(center, centerScale, radius)),
]
