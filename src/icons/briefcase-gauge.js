import { plain, center, centerScale } from '../briefcase'
import { gauge } from '../symbols'

// 公文包 + 计速器
export default ({ radius }) => [
  ...plain(radius),
  ...gauge(center, centerScale, radius),
]
