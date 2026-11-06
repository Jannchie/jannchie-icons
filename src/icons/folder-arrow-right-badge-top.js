import { withBadgeTop } from '../folder'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右上角右箭头
export default ({ radius, stroke }) => withBadgeTop('arrowRight', arrowRight, info, radius, stroke)

export const fill = ({ radius, stroke }) => withBadgeTop('arrowRight', arrowRight, info, radius, stroke, { fill: true })
