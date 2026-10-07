import { plain, center, centerScale } from '../monitor'
import { video } from '../symbols'
import { accent } from '../tone'

// 显示器 + 视频
export default ({ radius }) => [
  ...plain(radius),
  ...accent(video(center, centerScale, radius)),
]
