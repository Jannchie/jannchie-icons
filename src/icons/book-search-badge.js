import { withBadge } from '../book'
import { search } from '../symbols'
import { info } from '../tone'

// 书 + 右下角搜索
export default ({ radius, stroke }) => withBadge('search', search, info, radius, stroke)
