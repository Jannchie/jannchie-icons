import { withBadge } from '../pin'
import { search } from '../symbols'
import { info } from '../tone'

// 定位针 + 右下角搜索
export default ({ radius }) => withBadge('search', search, info, radius)
