import { place } from '../clearance'
import { aroundTop, badgeTop } from '../folder'
import { cornerScale, outlines, search } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右上角搜索
const k = cornerScale.search

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.search, badgeTop, k), radius, stroke),
  ...info(search(badgeTop, k, radius)),
]
