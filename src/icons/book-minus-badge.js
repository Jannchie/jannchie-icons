import { withBadge } from '../book'
import { minus } from '../symbols'
import { danger } from '../tone'

// 书 + 右下角减号
export default ({ radius, stroke }) => withBadge('minus', minus, danger, radius, stroke)
