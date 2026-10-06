import { base, center, centerScale } from '../calendar'
import { image } from '../symbols'

// 日历 + 图片
export default ({ radius }) => [
  ...base(radius),
  ...image(center, centerScale, radius),
]
