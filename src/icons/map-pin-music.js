import { withBadge } from '../pin'
import { music } from '../symbols'
import { accent } from '../tone'

// 定位针 + 右下角音符
export default ({ radius, stroke }) => withBadge('music', music, accent, radius, stroke)

// 实心：小针填实，角标四周让出缝
export const fill = ({ radius, stroke }) => withBadge('music', music, accent, radius, stroke, { fill: true })
