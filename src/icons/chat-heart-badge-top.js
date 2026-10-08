import { withBadgeTop } from '../chat'
import { heart } from '../symbols'
import { danger } from '../tone'

// 对话 + 右上角爱心
export default ({ radius, stroke }) => withBadgeTop('heart', heart, danger, radius, stroke)
