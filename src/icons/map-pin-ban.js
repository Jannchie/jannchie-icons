import { withBadge } from '../pin'
import { ban } from '../symbols'
import { danger } from '../tone'

// 定位针 + 右下角禁止
export default ({ radius, stroke }) => withBadge('ban', ban, danger, radius, stroke)

// 实心：小针填实，角标四周让出缝
export const fill = ({ radius, stroke }) => withBadge('ban', ban, danger, radius, stroke, { fill: true })
