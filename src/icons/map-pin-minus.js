import { withBadge } from '../pin'
import { minus } from '../symbols'
import { danger } from '../tone'

// 定位针 + 右下角减号
export default ({ radius }) => withBadge('minus', minus, danger, radius)
