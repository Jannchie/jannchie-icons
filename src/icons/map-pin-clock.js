import { withBadge } from '../pin'
import { clock } from '../symbols'
import { info } from '../tone'

// 定位针 + 右下角时钟
export default ({ radius, stroke }) => withBadge('clock', clock, info, radius, stroke)

// 实心：小针填实，角标四周让出缝
export const fill = ({ radius, stroke }) => withBadge('clock', clock, info, radius, stroke, { fill: true })
