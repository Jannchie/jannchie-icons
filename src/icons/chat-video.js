import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { video } from '../symbols'

// 对话 + 视频
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...video(center, 1, radius),
]
