import { plain, center, centerScale } from '../book'
import { image, visual } from '../symbols'
import { accent } from '../tone'

// 书 + 图片
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(image(center, centerScale * visual.image, radius)),
]
