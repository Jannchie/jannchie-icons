import { plain, center, centerScale } from '../monitor'
import { arrowDown } from '../symbols'
import { info } from '../tone'

// 显示器 + 下箭头
export default ({ radius }) => [
  ...plain(radius),
  ...info(arrowDown(center, centerScale, radius)),
]
