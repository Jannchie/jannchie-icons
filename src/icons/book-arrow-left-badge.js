import { place } from '../clearance'
import { aroundBase, badge } from '../book'
import { cornerScale, outlines, arrowLeft } from '../symbols'
import { info } from '../tone'

// 书 + 右下角左箭头
const k = cornerScale.arrowLeft

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.arrowLeft, badge, k), radius, stroke),
  ...info(arrowLeft(badge, k, radius)),
]
