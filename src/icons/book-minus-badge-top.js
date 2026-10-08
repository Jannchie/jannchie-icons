import { withBadgeTop } from '../book'
import { minus } from '../symbols'
import { danger } from '../tone'

// 书 + 右上角减号
export default ({ radius, stroke }) => withBadgeTop('minus', minus, danger, radius, stroke)
