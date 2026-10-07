import { plain, center, centerScale } from '../briefcase'
import { gauge } from '../symbols'
import { info } from '../tone'

// 公文包 + 计速器
export default ({ radius }) => [
  ...plain(radius),
  ...info(gauge(center, centerScale, radius)),
]
