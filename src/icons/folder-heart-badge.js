import { withBadge } from '../folder'
import { heart } from '../symbols'
import { danger } from '../tone'

// 文件夹 + 右下角爱心
export default ({ radius, stroke }) => withBadge('heart', heart, danger, radius, stroke)
