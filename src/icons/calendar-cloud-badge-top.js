import { withBadgeTop } from '../calendar'
import { cloud } from '../symbols'
import { info } from '../tone'

// 日历 + 右上角云
export default ({ radius, stroke }) => withBadgeTop('cloud', cloud, info, radius, stroke)
