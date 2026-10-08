import { withBadge } from '../briefcase'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 公文包 + 右下角书签
export default ({ radius, stroke }) => withBadge('bookmark', bookmark, accent, radius, stroke)
