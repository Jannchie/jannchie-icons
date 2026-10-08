import { withBadge } from '../pin'
import { heart } from '../symbols'
import { danger } from '../tone'

// 定位针 + 右下角爱心
export default ({ radius, stroke }) => withBadge('heart', heart, danger, radius, stroke)
