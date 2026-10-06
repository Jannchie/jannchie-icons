import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { cornerScale, outlines, puzzle } from '../symbols'

// 显示器 + 右下角拼图（模组）
const k = cornerScale.puzzle

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.puzzle, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...puzzle(badge, k, radius)]
}
