import { circle } from '../geometry'
import { hole, solid } from '../solid'
import hexagon from './hexagon'

// 螺母（六角螺母）：尖顶朝上的六边形（同 hexagon）+ 正中的螺孔（半径 3.5）
const hex = radius => hexagon({ radius })[0]

export default ({ radius }) => [hex(radius), circle(12, 12, 3.5)]

// 实心：六边形一块，螺孔挖成洞（开到螺孔的中心线）
export const fill = ({ radius, stroke }) => [solid(hex(radius)), hole(circle(12, 12, 3.5 - stroke / 2))]
