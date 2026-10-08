import { withBadgeTop } from '../monitor'
import { heart } from '../symbols'
import { danger } from '../tone'

// 显示器 + 右上角爱心
export default ({ radius, stroke }) => withBadgeTop('heart', heart, danger, radius, stroke)
