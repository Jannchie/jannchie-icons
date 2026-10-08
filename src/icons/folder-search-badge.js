import { withBadge } from '../folder'
import { search } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右下角搜索
export default ({ radius, stroke }) => withBadge('search', search, info, radius, stroke)
