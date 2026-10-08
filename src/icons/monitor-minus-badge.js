import { withBadge } from '../monitor'
import { minus } from '../symbols'
import { danger } from '../tone'

// 显示器 + 右下角减号
export default ({ radius, stroke }) => withBadge('minus', minus, danger, radius, stroke)
