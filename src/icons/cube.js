import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 立方体：30° 等距视角的六边形 + 三条内棱
// 中轴在 12，左右竖棱在 4 / 20 上（半宽 8），斜棱是 30°
const [cx, hw, top, bottom] = [12, 8, 3, 21]
const dy = hw * Math.tan(Math.PI / 6)
export default ({ radius }) => [
  rounded([[cx, top], [cx + hw, top + dy], [cx + hw, bottom - dy], [cx, bottom], [cx - hw, bottom - dy], [cx - hw, top + dy]], Math.min(radius, 1)),
  `M${cx - hw} ${top + dy}L${cx} ${top + 2 * dy}L${cx + hw} ${top + dy}`,
  `M${cx} ${top + 2 * dy}V${bottom}`,
]

// 实心：六边形一块，挖掉三条内棱；内棱在离外轮廓一个线宽处停下，三个面在外圈连着
export const fill = ({ radius, stroke }) => {
  const c = [cx, top + 2 * dy]
  // c → p 这一段，p 那头缩 stroke
  const toward = ([px, py]) => {
    const l = Math.hypot(px - c[0], py - c[1])
    return `M${c[0]} ${c[1]}L${px - (px - c[0]) / l * stroke} ${py - (py - c[1]) / l * stroke}`
  }
  return [
    solid(rounded([[cx, top], [cx + hw, top + dy], [cx + hw, bottom - dy], [cx, bottom], [cx - hw, bottom - dy], [cx - hw, top + dy]], Math.min(radius, 1))),
    knock([toward([cx - hw, top + dy]), toward([cx + hw, top + dy]), toward([cx, bottom])]),
  ]
}
