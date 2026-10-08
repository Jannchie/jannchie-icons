import { plain, center, centerScale } from '../book'
import { heart } from '../symbols'
import { danger } from '../tone'

// 书 + 爱心
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...danger(heart(center, centerScale, radius)),
]
