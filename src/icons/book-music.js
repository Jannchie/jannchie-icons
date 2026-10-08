import { plain, center, centerScale } from '../book'
import { music, visual } from '../symbols'
import { accent } from '../tone'

// 书 + 音乐
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(music(center, centerScale * visual.music, radius)),
]
