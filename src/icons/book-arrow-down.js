import { plain, center, centerScale } from '../book'
import { arrowDown } from '../symbols'
import { info } from '../tone'

// 书 + 下箭头
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(arrowDown(center, centerScale, radius)),
]
