import { withBadge } from '../pin'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 定位针 + 右下角书签
export default ({ radius }) => withBadge('bookmark', bookmark, accent, radius)
