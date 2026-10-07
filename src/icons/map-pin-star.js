import { withBadge } from '../pin'
import { star } from '../symbols'
import { warning } from '../tone'

// 定位针 + 右下角星标
export default ({ radius }) => withBadge('star', star, warning, radius)
