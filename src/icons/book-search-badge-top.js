import { place } from '../clearance'
import { aroundTop, badgeTop } from '../book'
import { cornerScale, outlines, search } from '../symbols'
import { info } from '../tone'

// 书 + 右上角搜索
const k = cornerScale.search

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.search, badgeTop, k), radius, stroke),
  ...info(search(badgeTop, k, radius)),
]
