import { withBadge } from '../pin'
import { sparkle } from '../symbols'
import { accent } from '../tone'

// 定位针 + 右下角闪光
export default ({ radius, stroke }) => withBadge('sparkle', sparkle, accent, radius, stroke)

// 实心：小针填实，角标四周让出缝
export const fill = ({ radius, stroke }) => withBadge('sparkle', sparkle, accent, radius, stroke, { fill: true })
