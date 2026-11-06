import { withBadge } from '../calendar'
import { assets } from '../symbols'
import { accent } from '../tone'

// 日历 + 右下角素材
export default ({ radius, stroke }) => withBadge('assets', assets, accent, radius, stroke)

export const fill = ({ radius, stroke }) => withBadge('assets', assets, accent, radius, stroke, { fill: true })
