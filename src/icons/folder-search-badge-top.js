import { withBadgeTop } from '../folder'
import { search } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右上角搜索
export default ({ radius, stroke }) => withBadgeTop('search', search, info, radius, stroke)
