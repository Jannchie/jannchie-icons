import { center, centerScale, plain } from '../shield'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 盾 + 书签；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...accent(bookmark(center, centerScale, radius)),
]
