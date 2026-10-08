import { withBadgeTop } from '../monitor'
import { ring } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右上角圆
export default ({ radius, stroke }) => withBadgeTop('ring', ring, accent, radius, stroke)
