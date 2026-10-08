import { withBadgeTop } from '../folder'
import { minus } from '../symbols'
import { danger } from '../tone'

// 文件夹 + 右上角减号
export default ({ radius, stroke }) => withBadgeTop('minus', minus, danger, radius, stroke)
