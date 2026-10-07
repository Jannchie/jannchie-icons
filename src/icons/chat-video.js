import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { video } from '../symbols'
import { accent } from '../tone'

// 对话 + 视频
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...accent(video(center, 1, radius)),
]
