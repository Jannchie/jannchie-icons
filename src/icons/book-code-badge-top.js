import { withBadgeTop } from '../book'
import { code } from '../symbols'
import { accent } from '../tone'

// 书 + 右上角代码
export default ({ radius, stroke }) => withBadgeTop('code', code, accent, radius, stroke)
