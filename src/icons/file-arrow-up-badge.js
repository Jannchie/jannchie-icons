import { withBadge } from '../file'
import { arrowUp } from '../symbols'
import { info } from '../tone'

// 文件 + 右下角上箭头
export default ({ radius, stroke }) => withBadge('arrowUp', arrowUp, info, radius, stroke)
