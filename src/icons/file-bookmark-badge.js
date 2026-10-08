import { withBadge } from '../file'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 文件 + 右下角书签
export default ({ radius, stroke }) => withBadge('bookmark', bookmark, accent, radius, stroke)
