import { plain, center, centerScale } from '../book'
import { ban } from '../symbols'
import { danger } from '../tone'

// 书 + 禁止
export default ({ radius }) => [
  ...plain(radius),
  ...danger(ban(center, centerScale, radius)),
]
