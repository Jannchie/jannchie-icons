import { withBadgeTop } from '../chat'
import { minus } from '../symbols'
import { danger } from '../tone'

// 对话 + 右上角减号
export default ({ radius, stroke }) => withBadgeTop('minus', minus, danger, radius, stroke)
