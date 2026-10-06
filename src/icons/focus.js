import { rounded } from '../geometry'
import { dot } from '../scene'

// 对焦：四角取景框 + 中心一个点（截图是中心一个圆，靠这个区分）
const r = 3.5
const corner = ([x, y], dx, dy, radius) => rounded([[x, y + dy * r], [x, y], [x + dx * r, y]], Math.min(radius, 2), false)

export default ({ radius }) => [
  corner([3.5, 3.5], 1, 1, radius),
  corner([20.5, 3.5], -1, 1, radius),
  corner([20.5, 20.5], -1, -1, radius),
  corner([3.5, 20.5], 1, -1, radius),
  dot(12, 12, 3),
]
