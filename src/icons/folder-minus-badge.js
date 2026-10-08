import { withBadge } from '../folder'
import { minus } from '../symbols'
import { danger } from '../tone'

// 文件夹 + 右下角减号
export default ({ radius, stroke }) => withBadge('minus', minus, danger, radius, stroke)
