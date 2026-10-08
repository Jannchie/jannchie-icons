import { withBadge } from '../folder'
import { ban } from '../symbols'
import { danger } from '../tone'

// 文件夹 + 右下角禁止
export default ({ radius, stroke }) => withBadge('ban', ban, danger, radius, stroke)
