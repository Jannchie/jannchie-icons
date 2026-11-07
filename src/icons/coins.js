import { stacked } from '../solid'
// 一摞硬币：三层椭圆硬币叠起来（顶面完整，下面两层只露出下沿）
const [cx, rx, ry] = [12, 7.5, 2.5]
const top = 6
export default () => [
  `M${cx - rx} ${top}A${rx} ${ry} 0 0 1 ${cx + rx} ${top}A${rx} ${ry} 0 0 1 ${cx - rx} ${top}`,
  `M${cx - rx} ${top}V${top + 12}A${rx} ${ry} 0 0 0 ${cx + rx} ${top + 12}V${top}`,
  `M${cx - rx} ${top + 4}A${rx} ${ry} 0 0 0 ${cx + rx} ${top + 4}`,
  `M${cx - rx} ${top + 8}A${rx} ${ry} 0 0 0 ${cx + rx} ${top + 8}`,
]

// 实心：从下往上叠放的几块——两枚硬币的侧面（下沿是各自的弧）和完整的顶面椭圆，每块在下面一块上让出 GAP 的缝（见 solid.js 的 stacked）
const coin = (y0, y1) => `M${cx - rx} ${y0}V${y1}A${rx} ${ry} 0 0 0 ${cx + rx} ${y1}V${y0}A${rx} ${ry} 0 0 0 ${cx - rx} ${y0}Z`
export const fill = () => stacked(
  coin(top + 8, top + 12),
  coin(top + 4, top + 8),
  coin(top, top + 4),
  `M${cx - rx} ${top}A${rx} ${ry} 0 0 1 ${cx + rx} ${top}A${rx} ${ry} 0 0 1 ${cx - rx} ${top}Z`,
)
