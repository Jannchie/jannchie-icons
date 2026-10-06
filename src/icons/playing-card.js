import { rounded } from '../geometry'
import { SPADE } from '../suits'
import { scale } from '../transform'

// 扑克牌：竖长的圆角牌面 + 中间缩小的黑桃
export default ({ radius }) => [
  rounded([[5.5, 2.5], [18.5, 2.5], [18.5, 21.5], [5.5, 21.5]], Math.min(radius, 2)),
  scale(SPADE, 0.45),
]
