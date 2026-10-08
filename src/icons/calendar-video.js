import { base, center, centerScale } from '../calendar'
import { video } from '../symbols'
import { accent } from '../tone'

// 日历 + 视频
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...accent(video(center, centerScale, radius)),
]
