import { plain, center, centerScale } from '../book'
import { video, visual } from '../symbols'
import { accent } from '../tone'

// 书 + 视频
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(video(center, centerScale * visual.video, radius)),
]
