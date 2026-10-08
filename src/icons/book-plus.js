import { plain, center, centerScale } from '../book'
import { plus, visual } from '../symbols'
import { success } from '../tone'

// 书 + 加号
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...success(plus(center, centerScale * visual.plus, radius)),
]
