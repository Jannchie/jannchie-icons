import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { cornerScale, outlines, question } from '../symbols'
import { info } from '../tone'

// 显示器 + 右下角问号
const k = cornerScale.question

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.question, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...info(question(badge, k, radius))]
}
