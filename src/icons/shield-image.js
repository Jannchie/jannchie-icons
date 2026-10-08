import { center, centerScale, plain } from '../shield'
import { image, visual } from '../symbols'
import { accent } from '../tone'

// 盾 + 图片；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...accent(image(center, centerScale * visual.image, radius)),
]
