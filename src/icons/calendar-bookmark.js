import { base, center, centerScale } from '../calendar'
import { bookmark } from '../symbols'

// 日历 + 书签
export default ({ radius }) => [
  ...base(radius),
  ...bookmark(center, centerScale, radius),
]
