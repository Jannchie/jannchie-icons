import { plain, center, centerScale } from '../briefcase'
import { video } from '../symbols'
import { accent } from '../tone'

// 公文包 + 视频
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(video(center, centerScale, radius)),
]
