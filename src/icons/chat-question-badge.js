import { withBadge } from '../chat'
import { question } from '../symbols'
import { info } from '../tone'

// 对话 + 右下角问号
export default ({ radius, stroke }) => withBadge('question', question, info, radius, stroke)
