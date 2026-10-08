import { withBadgeTop } from '../folder'
import { image } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右上角图片
export default ({ radius, stroke }) => withBadgeTop('image', image, accent, radius, stroke)
