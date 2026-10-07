import { place } from '../clearance'
import { aroundBase, badge } from '../book'
import { cornerScale, outlines, arrowDown } from '../symbols'
import { info } from '../tone'

// 书 + 右下角下箭头
const k = cornerScale.arrowDown

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.arrowDown, badge, k), radius, stroke),
  ...info(arrowDown(badge, k, radius)),
]
