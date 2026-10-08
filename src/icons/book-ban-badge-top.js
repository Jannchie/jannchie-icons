import { withBadgeTop } from '../book'
import { ban } from '../symbols'
import { danger } from '../tone'

// 书 + 右上角禁止
export default ({ radius, stroke }) => withBadgeTop('ban', ban, danger, radius, stroke)
