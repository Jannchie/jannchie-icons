import { withBadge } from '../calendar'
import { cloud } from '../symbols'
import { info } from '../tone'

// 日历 + 右下角云
export default ({ radius, stroke }) => withBadge('cloud', cloud, info, radius, stroke)

export const fill = ({ radius, stroke }) => withBadge('cloud', cloud, info, radius, stroke, { fill: true })
