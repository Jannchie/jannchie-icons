import { withBadge } from '../monitor'
import { question } from '../symbols'
import { info } from '../tone'

// 显示器 + 右下角问号
export default ({ radius, stroke }) => withBadge('question', question, info, radius, stroke)
