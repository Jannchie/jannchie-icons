import { withBadgeTop } from '../chat'
import { search } from '../symbols'
import { info } from '../tone'

// 对话 + 右上角搜索
export default ({ radius, stroke }) => withBadgeTop('search', search, info, radius, stroke)
