import { withBadgeTop } from '../monitor'
import { question } from '../symbols'
import { info } from '../tone'

// 显示器 + 右上角问号
export default ({ radius, stroke }) => withBadgeTop('question', question, info, radius, stroke)
