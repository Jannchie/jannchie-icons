import { withBadge } from '../pin'
import { check } from '../symbols'
import { success } from '../tone'

// 定位针 + 右下角对勾
export default ({ radius, stroke }) => withBadge('check', check, success, radius, stroke)

// 实心：小针填实，角标四周让出缝
export const fill = ({ radius, stroke }) => withBadge('check', check, success, radius, stroke, { fill: true })
