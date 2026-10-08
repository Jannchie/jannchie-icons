import { withBadgeTop } from '../chat'
import { question } from '../symbols'
import { info } from '../tone'

// 对话 + 右上角问号
export default ({ radius, stroke }) => withBadgeTop('question', question, info, radius, stroke)
