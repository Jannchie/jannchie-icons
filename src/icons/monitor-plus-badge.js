import { withBadge } from '../monitor'
import { plus } from '../symbols'
import { success } from '../tone'

// 显示器 + 右下角加号
export default ({ radius, stroke }) => withBadge('plus', plus, success, radius, stroke)
