import { plain, center, centerScale } from '../book'
import { arrowUp, visual } from '../symbols'
import { info } from '../tone'

// 书 + 上箭头
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(arrowUp(center, centerScale * visual.arrowUp, radius)),
]
