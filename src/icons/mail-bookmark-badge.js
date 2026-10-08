import { withBadge } from '../mail'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 邮件 + 右下角书签
export default ({ radius, stroke }) => withBadge('bookmark', bookmark, accent, radius, stroke)
