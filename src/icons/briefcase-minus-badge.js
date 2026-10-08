import { withBadge } from '../briefcase'
import { minus } from '../symbols'
import { danger } from '../tone'

// 公文包 + 右下角减号
export default ({ radius, stroke }) => withBadge('minus', minus, danger, radius, stroke)
