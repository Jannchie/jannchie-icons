import { withBadge } from '../pin'
import { plus } from '../symbols'
import { success } from '../tone'

// 定位针 + 右下角加号
export default ({ radius }) => withBadge('plus', plus, success, radius)
