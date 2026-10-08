import { withBadge } from '../shield'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 盾 + 右下角书签
export default ({ radius, stroke }) => withBadge('bookmark', bookmark, accent, radius, stroke)
