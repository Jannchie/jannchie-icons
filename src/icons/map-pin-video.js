import { withBadge } from '../pin'
import { video } from '../symbols'
import { accent } from '../tone'

// 定位针 + 右下角视频
export default ({ radius, stroke }) => withBadge('video', video, accent, radius, stroke)

// 实心：小针填实，角标四周让出缝
export const fill = ({ radius, stroke }) => withBadge('video', video, accent, radius, stroke, { fill: true })
