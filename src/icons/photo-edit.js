import { rounded } from '../geometry'
import { image } from '../symbols'
import { rotate } from '../transform'

// 修图：相框往左上挪 + 右下角一支斜放的小铅笔；铅笔作为 cut，相框在附近断开
export default ({ radius }) => [
  ...image([10.5, 10.5], 2.1, radius).map(p => p.d ?? p),
  { d: rotate(rounded([[16.75, 12.5], [19.25, 12.5], [19.25, 19.5], [18, 21.5], [16.75, 19.5]], 0.5), 45, [18, 17]), cut: true },
]
