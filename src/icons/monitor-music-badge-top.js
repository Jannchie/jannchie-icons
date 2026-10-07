import { place } from '../clearance'
import { aroundTop, badgeTop } from '../monitor'
import { cornerScale, music, outlines } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右上角音乐
const k = cornerScale.music

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.music, badgeTop, k), radius, stroke),
  ...accent(music(badgeTop, k, radius)),
]
