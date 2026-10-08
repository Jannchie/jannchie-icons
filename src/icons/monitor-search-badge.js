import { withBadge } from '../monitor'
import { search } from '../symbols'
import { info } from '../tone'

// 显示器 + 右下角搜索
export default ({ radius, stroke }) => withBadge('search', search, info, radius, stroke)
