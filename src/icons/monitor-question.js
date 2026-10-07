import { plain, center, centerScale } from '../monitor'
import { question } from '../symbols'
import { info } from '../tone'

// 显示器 + 问号
export default ({ radius }) => [
  ...plain(radius),
  ...info(question(center, centerScale, radius)),
]
