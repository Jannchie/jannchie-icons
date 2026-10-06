import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { cornerScale, outlines, search } from '../symbols'

// 文件 + 右下角搜索
const k = cornerScale.search

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.search, badge, k), stroke, radius), radius, false),
  flap,
  ...search(badge, k, radius),
]
