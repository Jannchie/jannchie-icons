import { circle, crisp, rounded } from '../geometry'
import { code } from '../symbols'
import { knock, solid } from '../solid'

// 代码块：圆角外框 + 中间的 </>
export default ({ radius, stroke }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], Math.min(radius, 2.5)),
  ...code([12, 12], 1.1, radius).map(p => p.d ?? p),
]

// 实心：外框一块，挖掉 </>
export const fill = ({ radius }) => [
  solid(rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], Math.min(radius, 2.5))),
  knock(code([12, 12], 1.1, radius).map(p => p.d ?? p)),
]
