import { withBadge } from '../monitor'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右下角书签
export default ({ radius, stroke }) => withBadge('bookmark', bookmark, accent, radius, stroke)
