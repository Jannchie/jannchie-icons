import { crisp, rounded } from '../geometry'
import { GROUND, groundLine, opening } from '../scene'

// 商店：45° 梯形遮阳棚，中间两条竖线分出三片，左门右窗；棚两端的尖角不随全局圆角
const top = 5.5
const bottom = 9
const half = 8.5 // 棚底半宽
const rise = bottom - top

export default ({ radius }) => [
  groundLine,
  rounded([
    [12 - half, bottom, crisp(radius)],
    [12 - half + rise, top],
    [12 + half - rise, top],
    [12 + half, bottom, crisp(radius)],
  ], radius),
  `M10 ${top}V${bottom}`,
  `M14 ${top}V${bottom}`,
  `M5 ${bottom}V${GROUND}`,
  `M19 ${bottom}V${GROUND}`,
  rounded(opening(9.25, 3.5, 6), radius, false),
  rounded([[13.5, 13], [16.5, 13], [16.5, 16], [13.5, 16]], radius),
]
