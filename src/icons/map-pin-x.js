import { withBadge } from '../pin'
import { cross } from '../symbols'
import { danger } from '../tone'

// 定位针 + 右下角叉
export default ({ radius, stroke }) => withBadge('cross', cross, danger, radius, stroke)

// 实心：小针填实，角标四周让出缝
export const fill = ({ radius, stroke }) => withBadge('cross', cross, danger, radius, stroke, { fill: true })
