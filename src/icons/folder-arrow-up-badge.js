import { withBadge } from '../folder'
import { arrowUp } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右下角上箭头
export default ({ radius, stroke }) => withBadge('arrowUp', arrowUp, info, radius, stroke)
