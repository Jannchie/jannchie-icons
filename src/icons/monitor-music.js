import { plain, center, centerScale } from '../monitor'
import { music } from '../symbols'
import { accent } from '../tone'

// 显示器 + 音乐
export default ({ radius }) => [
  ...plain(radius),
  ...accent(music(center, centerScale, radius)),
]
