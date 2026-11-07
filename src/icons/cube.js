import { GAP } from '../clearance'
import { crisp, rounded } from '../geometry'
import { clear, cutout, solid } from '../solid'

// 立方体：30° 等距视角的六边形 + 三条内棱
// 中轴在 12，左右竖棱在 4 / 20 上（半宽 8），斜棱是 30°
const [cx, hw, top, bottom] = [12, 8, 3, 21]
const dy = hw * Math.tan(Math.PI / 6)
export default ({ radius }) => [
  rounded([[cx, top], [cx + hw, top + dy], [cx + hw, bottom - dy], [cx, bottom], [cx - hw, bottom - dy], [cx - hw, top + dy]], Math.min(radius, 1)),
  `M${cx - hw} ${top + dy}L${cx} ${top + 2 * dy}L${cx + hw} ${top + dy}`,
  `M${cx} ${top + 2 * dy}V${bottom}`,
]

// 实心：顶面菱形整块画在前面，六边形在它四周让出 GAP 的缝（见 solid.js 的 stacked，和 dice-d8 一样）；
// 左右两个侧面之间沿竖棱挖开一道 GAP 宽的直缝，从中心一直穿出底部顶点——三个面各自独立，没有停在实心里的槽和细桥
export const fill = ({ radius }) => {
  const c = [cx, top + 2 * dy]
  const r = Math.min(radius, 1)
  const face = rounded([[cx, top], [cx + hw, top + dy], [...c, crisp(radius)], [cx - hw, top + dy]], r)
  return [
    solid(rounded([[cx, top], [cx + hw, top + dy], [cx + hw, bottom - dy], [cx, bottom], [cx - hw, bottom - dy], [cx - hw, top + dy]], r)),
    cutout(`M${cx - GAP / 2} ${c[1]}H${cx + GAP / 2}V24H${cx - GAP / 2}Z`),
    clear(face, GAP),
    solid(face),
  ]
}
