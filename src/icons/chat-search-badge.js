import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { cornerScale, outlines, search } from '../symbols'
import { info } from '../tone'

// 对话 + 右下角搜索
const k = cornerScale.search

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.search, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...info(search(badge, k, radius)),
]
