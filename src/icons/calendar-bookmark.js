import { base, center, centerScale } from '../calendar'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 日历 + 书签
export default ({ radius }) => [
  ...base(radius),
  ...accent(bookmark(center, centerScale, radius)),
]
