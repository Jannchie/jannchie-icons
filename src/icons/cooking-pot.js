import { GAP } from '../clearance'
import { rounded } from '../geometry'
import { clear, solid } from '../solid'

// 汤锅（侧视）：锅身是开口朝上的 U（4.5–18.5，底在 19.5）；口沿一条横线两头伸出锅身（2.5–20.5 在 9.5）；
// 两侧把手是口沿下 3 的两小段横线（锅身外侧）；锅盖是口沿上的一道弧（7.5–15.5，离锅身两壁各 3，粗字重下不糊），顶到 5.5，正中竖一个短提钮（x 11.5，到 3.5）
const body = [[4.5, 9.5], [4.5, 19.5], [18.5, 19.5], [18.5, 9.5]]
const rim = 'M2.5 9.5H20.5'
const handles = ['M2.5 12.5H4.5', 'M18.5 12.5H20.5']
const lid = 'M7.5 9.5C7.5 7 9 5.5 11.5 5.5C14 5.5 15.5 7 15.5 9.5'
const knob = 'M11.5 5.5V3.5'

export default ({ radius }) => [
  rounded(body, Math.min(radius, 2.5), false),
  rim,
  ...handles,
  lid,
  knob,
]

// 实心：锅盖沿口沿封口成一块，口沿四周让出 GAP 的缝（锅盖完整地浮在口沿上）；锅身封口成一块，和口沿连成一体，
// 把手、提钮照旧是线
export const fill = ({ radius }) => [
  solid(`${lid}Z`),
  clear(rim, GAP),
  solid(rounded([[4.5, 9.5, 0], ...body.slice(1, -1), [18.5, 9.5, 0]], Math.min(radius, 2.5))),
  rim,
  ...handles,
  knob,
]
