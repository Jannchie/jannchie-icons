import { withBadge } from '../chat'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 对话 + 右下角书签
export default ({ radius, stroke }) => withBadge('bookmark', bookmark, accent, radius, stroke)
