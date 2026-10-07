import { plain, center, centerScale } from '../briefcase'
import { music } from '../symbols'
import { accent } from '../tone'

// 公文包 + 音乐
export default ({ radius }) => [
  ...plain(radius),
  ...accent(music(center, centerScale, radius)),
]
