import { withBadgeTop } from '../book'
import { search } from '../symbols'
import { info } from '../tone'

// 书 + 右上角搜索
export default ({ radius, stroke }) => withBadgeTop('search', search, info, radius, stroke)
