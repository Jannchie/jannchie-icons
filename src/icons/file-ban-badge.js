import { withBadge } from '../file'
import { ban } from '../symbols'
import { danger } from '../tone'

// 文件 + 右下角禁止
export default ({ radius, stroke }) => withBadge('ban', ban, danger, radius, stroke)
