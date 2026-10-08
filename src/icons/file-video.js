import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { video, visual } from '../symbols'
import { accent } from '../tone'

// 文件 + 视频
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...accent(video(center, centerScale * visual.video, radius)),
]
