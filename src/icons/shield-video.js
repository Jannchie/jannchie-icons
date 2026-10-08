import { center, centerScale, plain } from '../shield'
import { video } from '../symbols'
import { accent } from '../tone'

// 盾 + 视频；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...accent(video(center, centerScale, radius)),
]
