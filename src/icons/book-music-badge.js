import { place } from '../clearance'
import { aroundBase, badge } from '../book'
import { cornerScale, outlines, music } from '../symbols'
import { accent } from '../tone'

// 书 + 右下角音乐
const k = cornerScale.music

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.music, badge, k), radius, stroke),
  ...accent(music(badge, k, radius)),
]
