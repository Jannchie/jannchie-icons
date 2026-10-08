import { rounded } from '../geometry'
import { clock } from '../symbols'
import { rotate } from '../transform'

// 编辑时间：时钟往左上挪 + 右下角一支斜放的小铅笔（和 image-edit 同一支）；铅笔作为 cut，表盘在附近断开
export default ({ radius }) => [
  ...clock([10.5, 10.5], 2.1, radius),
  { d: rotate(rounded([[16.75, 12.5], [19.25, 12.5], [19.25, 19.5], [18, 21.5], [16.75, 19.5]], 0.5), 45, [18, 17]), cut: true, tone: 'accent' },
]
