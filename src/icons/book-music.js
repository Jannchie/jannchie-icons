import { plain, center, centerScale } from '../book'
import { music } from '../symbols'
import { accent } from '../tone'

// 书 + 音乐
export default ({ radius }) => [
  ...plain(radius),
  ...accent(music(center, centerScale, radius)),
]
