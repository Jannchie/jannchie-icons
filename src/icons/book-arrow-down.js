import { plain, center, centerScale } from '../book'
import { arrowDown } from '../symbols'
import { info } from '../tone'

// 书 + 下箭头
export default ({ radius }) => [
  ...plain(radius),
  ...info(arrowDown(center, centerScale, radius)),
]
