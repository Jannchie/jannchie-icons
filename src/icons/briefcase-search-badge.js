import { withBadge } from '../briefcase'
import { search } from '../symbols'
import { info } from '../tone'

// 公文包 + 右下角搜索
export default ({ radius, stroke }) => withBadge('search', search, info, radius, stroke)
