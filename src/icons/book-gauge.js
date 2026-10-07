import { plain, center, centerScale } from '../book'
import { gauge } from '../symbols'
import { info } from '../tone'

// 书 + 计速器
export default ({ radius }) => [
  ...plain(radius),
  ...info(gauge(center, centerScale, radius)),
]
