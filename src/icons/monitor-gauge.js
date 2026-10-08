import { center, centerScale, plain } from '../monitor'
import { gauge, visual } from '../symbols'
import { info } from '../tone'

// 显示器 + 计速器
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(gauge(center, centerScale * visual.gauge, radius)),
]
