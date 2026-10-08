import { plain, center, centerScale } from '../book'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 书 + 右箭头
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(arrowRight(center, centerScale, radius)),
]
