import { plain, center, centerScale } from '../book'
import { clock } from '../symbols'
import { info } from '../tone'

// 书 + 时钟
export default ({ radius }) => [
  ...plain(radius),
  ...info(clock(center, centerScale, radius)),
]
