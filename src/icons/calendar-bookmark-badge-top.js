import { withBadgeTop } from '../calendar'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 日历 + 右上角书签
export default ({ radius, stroke }) => withBadgeTop('bookmark', bookmark, accent, radius, stroke)
