import { withBadge } from '../book'
import { heart } from '../symbols'
import { danger } from '../tone'

// 书 + 右下角爱心
export default ({ radius, stroke }) => withBadge('heart', heart, danger, radius, stroke)
