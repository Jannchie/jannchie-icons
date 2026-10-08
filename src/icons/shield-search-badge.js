import { withBadge } from '../shield'
import { search } from '../symbols'
import { info } from '../tone'

// 盾 + 右下角搜索
export default ({ radius, stroke }) => withBadge('search', search, info, radius, stroke)
