import { withBadgeTop } from '../monitor'
import { minus } from '../symbols'
import { danger } from '../tone'

// 显示器 + 右上角减号
export default ({ radius, stroke }) => withBadgeTop('minus', minus, danger, radius, stroke)
