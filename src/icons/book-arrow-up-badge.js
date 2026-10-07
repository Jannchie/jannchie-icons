import { place } from '../clearance'
import { aroundBase, badge } from '../book'
import { cornerScale, outlines, arrowUp } from '../symbols'
import { info } from '../tone'

// 书 + 右下角上箭头
const k = cornerScale.arrowUp

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.arrowUp, badge, k), radius, stroke),
  ...info(arrowUp(badge, k, radius)),
]
