import { withBadge } from '../calendar'
import { cloud } from '../symbols'
import { info } from '../tone'

// 日历 + 右下角云
export default ({ radius, stroke }) => withBadge('cloud', cloud, info, radius, stroke)
