import { withBadgeTop } from '../calendar'
import { search } from '../symbols'
import { info } from '../tone'

// 日历 + 右上角搜索
export default ({ radius, stroke }) => withBadgeTop('search', search, info, radius, stroke)
