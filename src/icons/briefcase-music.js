import { plain, center, centerScale } from '../briefcase'
import { music, visual } from '../symbols'
import { accent } from '../tone'

// 公文包 + 音乐
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(music(center, centerScale * visual.music, radius)),
]
