import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { question } from '../symbols'
import { info } from '../tone'

// 对话 + 问号
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...info(question(center, 1, radius)),
]
