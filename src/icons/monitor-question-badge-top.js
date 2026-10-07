import { place } from '../clearance'
import { aroundTop, badgeTop } from '../monitor'
import { cornerScale, outlines, question } from '../symbols'
import { info } from '../tone'

// 显示器 + 右上角问号
const k = cornerScale.question

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.question, badgeTop, k), radius, stroke),
  ...info(question(badgeTop, k, radius)),
]
