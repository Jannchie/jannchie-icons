import { base, center, centerScale } from '../calendar'
import { video, visual } from '../symbols'
import { accent } from '../tone'

// 日历 + 视频
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...accent(video(center, centerScale * visual.video, radius)),
]
