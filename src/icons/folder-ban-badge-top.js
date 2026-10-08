import { withBadgeTop } from '../folder'
import { ban } from '../symbols'
import { danger } from '../tone'

// 文件夹 + 右上角禁止
export default ({ radius, stroke }) => withBadgeTop('ban', ban, danger, radius, stroke)
