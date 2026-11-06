import { GAP } from '../clearance'
import { circle } from '../geometry'
import { solid } from '../solid'

// 围棋子：右上一颗黑子（实心）、左下一颗白子（圆圈）叠在前面
// 黑子直接画成月牙：减掉以白子圆心为心、半径 5.5 + 线宽 + GAP 的圆，两颗子的墨迹之间正好隔 GAP
// （用遮挡刀切的话，黑子描边在断口处会留下两个圆头）
const R = 5.5
const B = [14.75, 9.25]
const W = [9.25, 14.75]
const white = circle(...W, R)

function black(stroke) {
  const cut = R + stroke + GAP
  // 两圆交点：沿圆心连线方向 a，垂直方向 ±b
  const [dx, dy] = [W[0] - B[0], W[1] - B[1]]
  const d = Math.hypot(dx, dy)
  const a = (d * d + R * R - cut * cut) / (2 * d)
  const b = Math.sqrt(R * R - a * a)
  const [ux, uy] = [dx / d, dy / d]
  const [mx, my] = [B[0] + ux * a, B[1] + uy * a]
  const p = [mx - uy * b, my + ux * b]
  const q = [mx + uy * b, my - ux * b]
  return `M${p[0]} ${p[1]}A${R} ${R} 0 1 1 ${q[0]} ${q[1]}A${cut} ${cut} 0 0 0 ${p[0]} ${p[1]}Z`
}

export default ({ stroke }) => [{ d: black(stroke), fill: true }, white]

// 实心版和描边版一样：黑子本来就是实心，白子要靠圆圈和黑子区分
export const fill = ({ stroke }) => [solid(black(stroke)), white]
