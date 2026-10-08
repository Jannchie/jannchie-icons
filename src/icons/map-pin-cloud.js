import { withBadge } from '../pin'
import { cloud } from '../symbols'
import { info } from '../tone'

// 定位针 + 右下角云
export default ({ radius, stroke }) => withBadge('cloud', cloud, info, radius, stroke)
