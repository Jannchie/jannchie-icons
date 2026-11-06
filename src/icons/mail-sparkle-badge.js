import { withBadge } from '../mail'
import { sparkle } from '../symbols'
import { accent } from '../tone'

// 邮件 + 右下角星芒
export default ({ radius, stroke }) => withBadge('sparkle', sparkle, accent, radius, stroke)

export const fill = ({ radius, stroke }) => withBadge('sparkle', sparkle, accent, radius, stroke, { fill: true })
