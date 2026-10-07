import { plain, center, centerScale } from '../monitor'
import { clock } from '../symbols'
import { info } from '../tone'

// 显示器 + 时钟
export default ({ radius }) => [
  ...plain(radius),
  ...info(clock(center, centerScale, radius)),
]
