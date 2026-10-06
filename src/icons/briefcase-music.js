import { plain, center, centerScale } from '../briefcase'
import { music } from '../symbols'

// 公文包 + 音乐
export default ({ radius }) => [
  ...plain(radius),
  ...music(center, centerScale, radius),
]
