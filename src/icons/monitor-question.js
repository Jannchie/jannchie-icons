import { center, centerScale, plain } from '../monitor'
import { question } from '../symbols'
import { info } from '../tone'

// 显示器 + 问号
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...info(question(center, centerScale, radius)),
]
