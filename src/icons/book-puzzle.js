import { plain, center, centerScale } from '../book'
import { puzzle } from '../symbols'
import { accent } from '../tone'

// 书 + 拼图（模组）
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(puzzle(center, centerScale, radius)),
]
