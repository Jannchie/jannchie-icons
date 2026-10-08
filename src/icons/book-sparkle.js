import { plain, center, centerScale } from '../book'
import { sparkle, visual } from '../symbols'
import { accent } from '../tone'

// 书 + 星芒
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(sparkle(center, centerScale * visual.sparkle, radius)),
]
