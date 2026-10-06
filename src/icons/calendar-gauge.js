import { base, center, centerScale } from '../calendar'
import { gauge } from '../symbols'

// 日历 + 计速器
export default ({ radius }) => [
  ...base(radius),
  ...gauge(center, centerScale, radius),
]
