import { rounded } from '../geometry'

// 立方体：30° 等距视角的六边形 + 三条内棱
// 中轴右移半格到 12.5，左右竖棱在 4.5 / 20.5 上（半宽 8），斜棱仍是 30°
const [cx, hw, top, bottom] = [12.5, 8, 3, 21]
const dy = hw * Math.tan(Math.PI / 6)
export default ({ radius }) => [
  rounded([[cx, top], [cx + hw, top + dy], [cx + hw, bottom - dy], [cx, bottom], [cx - hw, bottom - dy], [cx - hw, top + dy]], Math.min(radius, 1)),
  `M${cx - hw} ${top + dy}L${cx} ${top + 2 * dy}L${cx + hw} ${top + dy}`,
  `M${cx} ${top + 2 * dy}V${bottom}`,
]
