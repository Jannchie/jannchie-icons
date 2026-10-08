import { withBadge } from '../file'
import { search } from '../symbols'
import { info } from '../tone'

// 文件 + 右下角搜索
export default ({ radius, stroke }) => withBadge('search', search, info, radius, stroke)
