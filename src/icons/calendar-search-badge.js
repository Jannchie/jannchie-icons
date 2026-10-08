import { withBadge } from '../calendar'
import { search } from '../symbols'
import { info } from '../tone'

// 日历 + 右下角搜索
export default ({ radius, stroke }) => withBadge('search', search, info, radius, stroke)
