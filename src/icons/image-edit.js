import { rounded } from '../geometry'
import { image } from '../symbols'
import { rotate } from '../transform'


// 修图：相框往左上挪 + 右下角一支斜放的小铅笔；铅笔作为 cut，相框在附近断开
export default ({ radius }) => [
  ...image([10.5, 10.5], 2.1, radius).map(p => p.d ?? p),
  { d: rotate(rounded([[16.25, 13], [18.75, 13], [18.75, 20], [17.5, 22], [16.25, 20]], 0.5), 45, [17.5, 17.5]), cut: true, tone: 'accent' },
]
