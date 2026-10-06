import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { cornerScale, music, outlines } from '../symbols'

// 文件 + 右下角音乐
const k = cornerScale.music

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.music, badge, k), stroke, radius), radius, false),
  flap,
  ...music(badge, k, radius),
]
