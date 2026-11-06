import { withBadgeTop } from '../book'
import { heart } from '../symbols'
import { danger } from '../tone'

// 书 + 右上角爱心
export default ({ radius, stroke }) => withBadgeTop('heart', heart, danger, radius, stroke)

export const fill = ({ radius, stroke }) => withBadgeTop('heart', heart, danger, radius, stroke, { fill: true })
