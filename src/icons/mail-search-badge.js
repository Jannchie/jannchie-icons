import { withBadge } from '../mail'
import { search } from '../symbols'
import { info } from '../tone'

// 邮件 + 右下角搜索
export default ({ radius, stroke }) => withBadge('search', search, info, radius, stroke)
