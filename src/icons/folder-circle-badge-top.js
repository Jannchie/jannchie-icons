import { withBadgeTop } from '../folder'
import { ring } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右上角圆
export default ({ radius, stroke }) => withBadgeTop('ring', ring, accent, radius, stroke)
