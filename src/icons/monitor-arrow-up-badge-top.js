import { withBadgeTop } from '../monitor'
import { arrowUp } from '../symbols'
import { info } from '../tone'

// 显示器 + 右上角上箭头
export default ({ radius, stroke }) => withBadgeTop('arrowUp', arrowUp, info, radius, stroke)
