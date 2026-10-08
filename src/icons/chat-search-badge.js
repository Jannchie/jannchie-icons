import { withBadge } from '../chat'
import { search } from '../symbols'
import { info } from '../tone'

// 对话 + 右下角搜索
export default ({ radius, stroke }) => withBadge('search', search, info, radius, stroke)
