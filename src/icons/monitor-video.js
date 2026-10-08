import { center, centerScale, plain } from '../monitor'
import { video, visual } from '../symbols'
import { accent } from '../tone'

// 显示器 + 视频
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(video(center, centerScale * visual.video, radius)),
]
