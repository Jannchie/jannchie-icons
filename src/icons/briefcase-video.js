import { plain, center, centerScale } from '../briefcase'
import { video } from '../symbols'

// 公文包 + 视频
export default ({ radius }) => [
  ...plain(radius),
  ...video(center, centerScale, radius),
]
