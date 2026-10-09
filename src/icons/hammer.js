import { rounded } from '../geometry'
import { rotate } from '../transform'

// 战锤：长柄 + 横放的长方锤头；竖着画（锤头 y 5.25–10.75、柄到 23.25，比居中位置整体下移 1.75）再逆时针转 45°，
// 转完后墨迹在对角线上居中
export default ({ radius }) => [
  rotate('M12 10.75V23.25', -45),
  rotate(rounded([[6.5, 5.25], [17.5, 5.25], [17.5, 10.75], [6.5, 10.75]], Math.min(radius, 1.5)), -45),
]
