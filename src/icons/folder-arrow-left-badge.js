import { withBadge } from '../folder'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右下角左箭头
export default ({ radius, stroke }) => withBadge('arrowLeft', arrowLeft, info, radius, stroke)
