import { withBadgeTop } from '../book'
import { ring } from '../symbols'
import { accent } from '../tone'

// 书 + 右上角圆
export default ({ radius, stroke }) => withBadgeTop('ring', ring, accent, radius, stroke)
