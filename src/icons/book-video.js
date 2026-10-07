import { plain, center, centerScale } from '../book'
import { video } from '../symbols'
import { accent } from '../tone'

// 书 + 视频
export default ({ radius }) => [
  ...plain(radius),
  ...accent(video(center, centerScale, radius)),
]
