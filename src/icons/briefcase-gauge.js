import { plain, center, centerScale } from '../briefcase'
import { gauge, visual } from '../symbols'
import { info } from '../tone'

// 公文包 + 计速器
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(gauge(center, centerScale * visual.gauge, radius)),
]
