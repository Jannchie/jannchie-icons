import { withBadgeTop } from '../folder'
import { plug } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右上角插头
export default ({ radius, stroke }) => withBadgeTop('plug', plug, accent, radius, stroke)
