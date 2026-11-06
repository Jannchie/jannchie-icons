import { withBadge } from '../pin'
import { minus } from '../symbols'
import { danger } from '../tone'

// 定位针 + 右下角减号
export default ({ radius, stroke }) => withBadge('minus', minus, danger, radius, stroke)

// 实心：小针填实，角标四周让出缝
export const fill = ({ radius, stroke }) => withBadge('minus', minus, danger, radius, stroke, { fill: true })
