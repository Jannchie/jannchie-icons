import { withBadge } from '../chat'
import { assets } from '../symbols'
import { accent } from '../tone'

// 对话 + 右下角素材
export default ({ radius, stroke }) => withBadge('assets', assets, accent, radius, stroke)

export const fill = ({ radius, stroke }) => withBadge('assets', assets, accent, radius, stroke, { fill: true })
