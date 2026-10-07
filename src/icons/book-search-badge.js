import { place } from '../clearance'
import { aroundBase, badge } from '../book'
import { cornerScale, outlines, search } from '../symbols'
import { info } from '../tone'

// 书 + 右下角搜索
const k = cornerScale.search

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.search, badge, k), radius, stroke),
  ...info(search(badge, k, radius)),
]
