import { withBadgeTop } from '../monitor'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右上角书签
export default ({ radius, stroke }) => withBadgeTop('bookmark', bookmark, accent, radius, stroke)
