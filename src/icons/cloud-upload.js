import { GAP } from '../clearance'
import { crisp, rounded } from '../geometry'
import { arrow } from '../media'
import { clear, solid } from '../solid'
import { cloud, cloudOpen } from '../symbols'

// 云端上传：箭头从云底下方往上穿进云里；云底在箭杆两侧断开，留出 GAP 的可见空隙
// 云心略下移，让平底（中心下方 2.65k）落在 17.5 上
const center = [12, 17.5 - 2.65 * 2.6]
const up = radius => ['M12 21V11', rounded(arrow(12, 11, 'up', 3), crisp(radius), false)]

export default ({ radius, stroke }) => [
  ...cloudOpen(center, 2.6, GAP + stroke),
  ...up(radius),
]

// 实心：整朵云填实（补上云底），箭头四周让出 GAP 的缝（圆角外扩：尖角模式下斜接会在箭尖外拉出尖刺、只剩一道细桥）（箭杆那道缝从云底穿出去），再把箭头画回去
export const fill = ({ radius }) => [
  solid(cloud(center, 2.6, radius)),
  ...clear(up(radius), GAP).map(p => ({ ...p, round: true })),
  ...up(radius),
]
