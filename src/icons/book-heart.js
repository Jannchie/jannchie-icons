import { plain, center, centerScale } from '../book'
import { heart, visual } from '../symbols'
import { danger } from '../tone'

// 书 + 爱心
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...danger(heart(center, centerScale * visual.heart, radius)),
]
