import { withBadge } from '../file'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 文件 + 右下角左箭头
export default ({ radius, stroke }) => withBadge('arrowLeft', arrowLeft, info, radius, stroke)
