import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { gauge, visual } from '../symbols'
import { info } from '../tone'

// 文件 + 计速器
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...info(gauge(center, centerScale * visual.gauge, radius)),
]
