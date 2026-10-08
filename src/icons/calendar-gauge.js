import { base, center, centerScale } from '../calendar'
import { gauge } from '../symbols'
import { info } from '../tone'

// 日历 + 计速器
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...info(gauge(center, centerScale, radius)),
]
