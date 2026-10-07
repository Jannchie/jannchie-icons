import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { cornerScale, outlines, question } from '../symbols'
import { info } from '../tone'

// 对话 + 右下角问号
const k = cornerScale.question

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.question, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...info(question(badge, k, radius)),
]
