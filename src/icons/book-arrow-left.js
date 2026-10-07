import { plain, center, centerScale } from '../book'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 书 + 左箭头
export default ({ radius }) => [
  ...plain(radius),
  ...info(arrowLeft(center, centerScale, radius)),
]
