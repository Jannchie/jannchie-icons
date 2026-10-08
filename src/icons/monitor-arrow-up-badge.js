import { withBadge } from '../monitor'
import { arrowUp } from '../symbols'
import { info } from '../tone'

// 显示器 + 右下角上箭头
export default ({ radius, stroke }) => withBadge('arrowUp', arrowUp, info, radius, stroke)
