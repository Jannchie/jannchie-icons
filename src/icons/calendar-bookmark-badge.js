import { withBadge } from '../calendar'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 日历 + 右下角书签
export default ({ radius, stroke }) => withBadge('bookmark', bookmark, accent, radius, stroke)
