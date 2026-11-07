import { GAP } from '../clearance'
import { rounded } from '../geometry'
import { dot } from '../scene'
import { cutout, solid } from '../solid'

// 投屏：左下角开口的屏幕 + 以左下角为圆心的两道弧和一个点
const corner = [3.5, 19.5]
const waves = [
  'M3.5 10.5A9 9 0 0 1 12.5 19.5',
  'M3.5 14.5A5 5 0 0 1 8.5 19.5',
  dot(...corner),
]

export default ({ radius }) => [
  rounded([[3.5, 8.5], [3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [14.5, 19.5]], Math.min(radius, 2.5), false),
  ...waves,
]

// 实心：屏幕填实成一整块，左下角以弧心为圆心挖掉一个扇形（半径 = 外弧墨迹外缘 + GAP，一直挖出屏幕外缘），
// 扇形里画回两道弧和点；扇形边是圆弧，和屏幕左边、底边都接近垂直相交，不留尖角
export const fill = ({ radius, stroke }) => {
  const R = 9 + stroke / 2 + GAP
  const [cx, cy] = corner
  return [
    solid(rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], Math.min(radius, 2.5))),
    cutout(`M${cx - 5} ${cy - R}H${cx}A${R} ${R} 0 0 1 ${cx + R} ${cy}V${cy + 5}H${cx - 5}Z`),
    ...waves,
  ]
}
