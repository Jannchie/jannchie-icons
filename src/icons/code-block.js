import { circle, crisp, rounded } from '../geometry'
import { code } from '../symbols'

// 代码块：圆角外框 + 中间的 </>
export default ({ radius, stroke }) => [
  rounded([[3, 4.5], [21, 4.5], [21, 19.5], [3, 19.5]], Math.min(radius, 2.5)),
  ...code([12, 12], 1.1, radius).map(p => p.d ?? p),
]
