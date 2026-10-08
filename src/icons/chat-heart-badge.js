import { withBadge } from '../chat'
import { heart } from '../symbols'
import { danger } from '../tone'

// 对话 + 右下角爱心
export default ({ radius, stroke }) => withBadge('heart', heart, danger, radius, stroke)
