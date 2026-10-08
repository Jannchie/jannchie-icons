import { withBadge } from '../book'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 书 + 右下角书签
export default ({ radius, stroke }) => withBadge('bookmark', bookmark, accent, radius, stroke)
