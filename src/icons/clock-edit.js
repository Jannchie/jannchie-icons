import { rounded } from '../geometry'
import { clock } from '../symbols'
import { rotate } from '../transform'

// 编辑时间：时钟往左上挪 + 右下角一支斜放的小铅笔（和 image-edit 同一支）；铅笔作为 cut，表盘在附近断开
export default ({ radius }) => [
  ...clock([10.5, 10.5], 2.1, radius),
  { d: rotate(rounded([[16.25, 13], [18.75, 13], [18.75, 20], [17.5, 22], [16.25, 20]], 0.5), 45, [17.5, 17.5]), cut: true, tone: 'accent' },
]
