import { crisp, rounded } from '../geometry'
import { cloud } from '../symbols'

// 雷：云 + 45° 折线闪电；闪电作为 cut，穿过云底的地方断开
export default ({ radius }) => [
  ...cloud([12, 9.5], 2.2),
  { d: rounded([[13.5, 13.5], [10.5, 16.5], [13.5, 16.5], [10.5, 19.5]], crisp(radius), false), cut: true },
]
