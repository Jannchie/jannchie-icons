import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { video } from '../symbols'

// 文件 + 视频
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...video(center, 1, radius),
]
