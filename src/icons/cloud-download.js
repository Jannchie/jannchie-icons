import { GAP } from '../clearance'
import { crisp, rounded } from '../geometry'
import { arrow } from '../media'
import { clear, solid } from '../solid'
import { cloud, cloudOpen } from '../symbols'

// 云端下载：箭头两翼宽，会落在云底附近，干脆不画云底，只留上轮廓，箭头从下方伸出
const center = [12, 10.5]
const down = radius => ['M12 10V21', rounded(arrow(12, 21, 'down', 3), crisp(radius), false)]

export default ({ radius }) => [
  ...cloudOpen(center, 2.6, Infinity),
  ...down(radius),
]

// 实心：整朵云填实（补上云底），箭头四周让出 GAP 的缝（圆角外扩：尖角模式下斜接会在箭尖外拉出尖刺、只剩一道细桥），再把箭头画回去
export const fill = ({ radius }) => [
  solid(cloud(center, 2.6, radius)),
  ...clear(down(radius), GAP).map(p => ({ ...p, round: true })),
  ...down(radius),
]
