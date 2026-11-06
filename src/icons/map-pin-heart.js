import { withBadge } from '../pin'
import { heart } from '../symbols'
import { danger } from '../tone'

// 定位针 + 右下角爱心
export default ({ radius, stroke }) => withBadge('heart', heart, danger, radius, stroke)

// 实心：小针填实，角标四周让出缝
export const fill = ({ radius, stroke }) => withBadge('heart', heart, danger, radius, stroke, { fill: true })
