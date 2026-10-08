import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { video } from '../symbols'
import { accent } from '../tone'

// 文件 + 视频
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...accent(video(center, 1, radius)),
]
