import { sparkle } from '../symbols'
import { rotate } from '../transform'

// 魔法棒：棒身先竖直画再顺时针转 30°；棒头和握柄之间断开一小段（像一道白环）；
// 棒头左侧一颗星芒、右侧一颗更小的星芒。星芒不跟着转（避免变形），只把位置放在旋转后的棒头两侧
export default ({ radius }) => [
  rotate('M12 21.5V11.5', 30),
  rotate('M12 9.25V5', 30),
  ...sparkle([10.75, 4.75], 0.8, radius).map(p => p.d ?? p),
  ...sparkle([19.25, 10.25], 0.55, radius).map(p => p.d ?? p),
]
