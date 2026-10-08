import { withBadgeTop } from '../folder'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右上角书签
export default ({ radius, stroke }) => withBadgeTop('bookmark', bookmark, accent, radius, stroke)
