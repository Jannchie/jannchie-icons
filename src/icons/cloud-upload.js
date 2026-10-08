import { GAP } from '../clearance'
import { crisp, rounded } from '../geometry'
import { arrow } from '../media'
import { cloudOpen } from '../symbols'

// 云端上传：箭头从云底下方往上穿进云里；云底在箭杆两侧断开，留出 GAP 的可见空隙
export default ({ radius, stroke }) => [
  // 云心略下移，让平底（中心下方 2.65k）落在 17.5 上
  ...cloudOpen([12, 17.5 - 2.65 * 2.6], 2.6, GAP + stroke),
  'M12 21V11',
  rounded(arrow(12, 11, 'up', 3), crisp(radius), false),
]
