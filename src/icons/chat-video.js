import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { video, visual } from '../symbols'
import { accent } from '../tone'

// 对话 + 视频
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...accent(video(center, centerScale * visual.video, radius)),
]
