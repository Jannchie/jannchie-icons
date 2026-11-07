import { circle, rounded } from '../geometry'
import { cutout, hole, knock, solid, tile } from '../solid'

// 固态硬盘（M.2）：细长 PCB + 两颗颗粒 + 左端金手指 + 右端半圆螺丝口
export default ({ radius }) => [
  'M21.5 13.75A1.75 1.75 0 0 1 21.5 10.25',
  rounded([[2.5, 8.5], [21.5, 8.5], [21.5, 15.5], [2.5, 15.5]], Math.min(radius, 1)),
  rounded([[7.5, 10.5], [11.5, 10.5], [11.5, 13.5], [7.5, 13.5]], Math.min(radius, 0.5)),
  rounded([[13.5, 10.5], [17.5, 10.5], [17.5, 13.5], [13.5, 13.5]], Math.min(radius, 0.5)),
  'M2.5 10.5H5',
  'M2.5 13.5H5',
]

// 实心：PCB 一块，右端挖出半圆螺丝口（洞外扩半个线宽后正好是描边版圆弧的中心线）；两颗颗粒是实心块，四周挖开一圈 GAP 宽的缝
// （缝的外沿是颗粒轮廓中线往外 0.5，颗粒按墨迹范围原样画在中线往里 0.5，同 memory）——颗粒只有 3 高，用轮廓线去挖的话
// 粗字重下只剩一道细条；左端金手指穿出板边，成了左边开口的两道槽，不在槽和板边之间留一道细条
const chips = [7.5, 13.5]
export const fill = ({ radius, stroke }) => [
  solid(rounded([[2.5, 8.5], [21.5, 8.5], [21.5, 15.5], [2.5, 15.5]], Math.min(radius, 1))),
  hole(circle(21.5, 12, 1.75 - stroke / 2)),
  cutout(chips.map(x => rounded([[x - 0.5, 10], [x + 4.5, 10], [x + 4.5, 14], [x - 0.5, 14]], radius && Math.min(radius, 0.5) + 0.5))),
  ...chips.map(x => tile([x + 0.5, 11, x + 3.5, 13], Math.min(radius, 0.5))),
  knock([`M${2.5 - stroke} 10.5H5`, `M${2.5 - stroke} 13.5H5`]),
]
