import { center, centerScale, plain } from '../shield'
import { gauge } from '../symbols'
import { info } from '../tone'

// 盾 + 计速器；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...info(gauge(center, centerScale, radius)),
]
