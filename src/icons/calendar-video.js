import { base, center, centerScale } from '../calendar'
import { video } from '../symbols'

// 日历 + 视频
export default ({ radius }) => [
  ...base(radius),
  ...video(center, centerScale, radius),
]
