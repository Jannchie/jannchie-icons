import { withBadge } from '../briefcase'
import { heart } from '../symbols'
import { danger } from '../tone'

// 公文包 + 右下角爱心
export default ({ radius, stroke }) => withBadge('heart', heart, danger, radius, stroke)
