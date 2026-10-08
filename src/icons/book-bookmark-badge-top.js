import { withBadgeTop } from '../book'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 书 + 右上角书签
export default ({ radius, stroke }) => withBadgeTop('bookmark', bookmark, accent, radius, stroke)
