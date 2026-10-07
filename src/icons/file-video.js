import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { video } from '../symbols'
import { accent } from '../tone'

// 文件 + 视频
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...accent(video(center, 1, radius)),
]
