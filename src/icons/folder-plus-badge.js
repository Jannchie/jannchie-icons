import { withBadge } from '../folder'
import { plus } from '../symbols'
import { success } from '../tone'

// 文件夹 + 右下角加号
export default ({ radius, stroke }) => withBadge('plus', plus, success, radius, stroke)
