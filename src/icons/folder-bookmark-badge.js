import { withBadge } from '../folder'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右下角书签
export default ({ radius, stroke }) => withBadge('bookmark', bookmark, accent, radius, stroke)
