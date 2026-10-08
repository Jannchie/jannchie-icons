import { withBadgeTop } from '../monitor'
import { search } from '../symbols'
import { info } from '../tone'

// 显示器 + 右上角搜索
export default ({ radius, stroke }) => withBadgeTop('search', search, info, radius, stroke)
