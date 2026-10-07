import { crisp, rounded } from '../geometry'
import { GROUND, groundLine, opening } from '../scene'

// 商店：45° 梯形遮阳棚，中间两条竖线分出三等片（横竖线都落在 .5 上），左门右窗；棚两端的尖角不随全局圆角
const top = 5.5
const bottom = 9.5
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
  `M10.5 ${top}V${bottom}`,
  `M13.5 ${top}V${bottom}`,
  `M5.5 ${bottom}V${GROUND}`,
  `M18.5 ${bottom}V${GROUND}`,
  rounded(opening(9.5, 4, 6.5), radius, false),
  rounded([[13.5, 13.5], [16.5, 13.5], [16.5, 16.5], [13.5, 16.5]], radius),
]
