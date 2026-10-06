import { rounded } from '../geometry'
import { rotate } from '../transform'

// 战锤：长柄 + 横放的长方锤头；竖着画再逆时针转 45°
export default ({ radius }) => [
  rotate('M12 9V21.5', -45),
  rotate(rounded([[6.5, 3.5], [17.5, 3.5], [17.5, 9], [6.5, 9]], Math.min(radius, 1.5)), -45),
]
