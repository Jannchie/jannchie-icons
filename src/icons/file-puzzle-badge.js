import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { cornerScale, outlines, puzzle } from '../symbols'

// 文件 + 右下角拼图（模组）
const k = cornerScale.puzzle

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.puzzle, badge, k), stroke, radius), radius, false),
  flap,
  ...puzzle(badge, k, radius),
]
