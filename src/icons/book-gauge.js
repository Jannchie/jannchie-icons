import { plain, center, centerScale } from '../book'
import { gauge, visual } from '../symbols'
import { info } from '../tone'

// 书 + 计速器
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(gauge(center, centerScale * visual.gauge, radius)),
]
