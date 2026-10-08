import { withBadgeTop } from '../book'
import { clock } from '../symbols'
import { info } from '../tone'

// 书 + 右上角时钟
export default ({ radius, stroke }) => withBadgeTop('clock', clock, info, radius, stroke)
