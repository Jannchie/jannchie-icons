import { circle, crisp, rounded } from '../geometry'
import { solid } from '../solid'

// 贝塞尔曲线：上方正中一个锚点小方块（3 见方，和控制点小圆一样大，10.5–13.5 × 4.5–7.5）+ 从它两侧水平伸出的手柄，两头是控制点小圆（圆心 (4.5, 6) / (19.5, 6)，半径 1.5）；
// 方块两侧下角各引一条弧，弯下去落到左下、右下两个锚点小方块（3.5–6.5 / 17.5–20.5 × 16.5–19.5）上——一条拱形路径经过三个锚点
// 方块锚点 + 圆形控制点 + 手柄是矢量编辑里「贝塞尔」的记号；pen-tool 是笔尖、curves 是方框里的色调曲线，和它们分开
// 手柄在 y 6（不在 .5 上）：锚点方块 3 见方、上下边要落在 4.5 / 7.5，中线只能是整数；整体墨迹 3.75–20.25 上下居中
// 曲线严格说应在锚点处和手柄相切，那样会和手柄重叠成一条粗线；这里让弧从方块下角斜着出来，手柄和曲线各自清楚
const anchor = (cx, cy, radius) => rounded([[cx - 1.5, cy - 1.5], [cx + 1.5, cy - 1.5], [cx + 1.5, cy + 1.5], [cx - 1.5, cy + 1.5]], crisp(radius))
const anchors = radius => [anchor(12, 6, radius), anchor(5, 18, radius), anchor(19, 18, radius)]
// 手柄用圆头：尖角模式下方头会从控制点小圆的线里戳出来
const handles = ['M6 6H10.5', 'M13.5 6H18'].map(d => ({ d, round: true }))
const arcs = ['M10.5 7C7.5 8 5 11.5 5 16.5', 'M13.5 7C16.5 8 19 11.5 19 16.5']

export default ({ radius }) => [...anchors(radius), ...handles, circle(4.5, 6, 1.5), circle(19.5, 6, 1.5), ...arcs]

// 实心：三个锚点方块填实，控制点是实心圆，手柄和曲线照旧是线
export const fill = ({ radius }) => [
  solid([...anchors(radius), circle(4.5, 6, 1.5), circle(19.5, 6, 1.5)]),
  ...handles,
  ...arcs,
]
