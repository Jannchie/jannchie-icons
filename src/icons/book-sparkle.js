import { plain, center, centerScale } from '../book'
import { sparkle } from '../symbols'
import { accent } from '../tone'

// 书 + 星芒
export default ({ radius }) => [
  ...plain(radius),
  ...accent(sparkle(center, centerScale, radius)),
]
