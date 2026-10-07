import { plain, center, centerScale } from '../monitor'
import { gauge } from '../symbols'
import { info } from '../tone'

// 显示器 + 计速器
export default ({ radius }) => [
  ...plain(radius),
  ...info(gauge(center, centerScale, radius)),
]
