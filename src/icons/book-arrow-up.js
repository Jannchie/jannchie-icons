import { plain, center, centerScale } from '../book'
import { arrowUp } from '../symbols'
import { info } from '../tone'

// 书 + 上箭头
export default ({ radius }) => [
  ...plain(radius),
  ...info(arrowUp(center, centerScale, radius)),
]
