import { withBadgeTop } from '../monitor'
import { code } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右上角代码
export default ({ radius, stroke }) => withBadgeTop('code', code, accent, radius, stroke)
