import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { gauge } from '../symbols'
import { info } from '../tone'

// 文件 + 计速器
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...info(gauge(center, 1, radius)),
]
