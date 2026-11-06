import { withBadge } from '../pin'
import { lock } from '../symbols'
import { warning } from '../tone'

// 定位针 + 右下角锁
export default ({ radius, stroke }) => withBadge('lock', lock, warning, radius, stroke)

// 实心：小针填实，角标四周让出缝
export const fill = ({ radius, stroke }) => withBadge('lock', lock, warning, radius, stroke, { fill: true })
