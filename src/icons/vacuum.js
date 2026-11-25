import { circle, rounded } from '../geometry'
import { hole, solid } from '../solid'

// 吸尘器（卧式）：右下一个大圆轮似的机身（圆心 (16.5, 16)、半径 4.5，正中一个轮毂）+ 从机身顶上拱到左边的软管，接着一根竖直的吸管（5.5）
// + 吸管底下贴地的扁吸头（2.5–8.5 × 17.5–20.5）。机身、软管、吸头三件套是吸尘器的记号
const [cx, cy] = [16.5, 16]
const drum = circle(cx, cy, 4.5)
const hub = circle(cx, cy, 1.5)
const hose = 'M16.5 11.5C16.5 6.5 14 3.5 10.5 3.5C7.5 3.5 5.5 5.25 5.5 8V17.5'
const head = radius => rounded([[2.5, 17.5], [8.5, 17.5], [8.5, 20.5], [2.5, 20.5]], Math.min(radius, 1.5))

export default ({ radius }) => [drum, hub, hose, head(radius)]

// 实心：机身、吸头各一块，轮毂挖成小孔（开到轮毂的中心线）；软管照旧是线
export const fill = ({ radius, stroke }) => [solid([drum, head(radius)]), hole(circle(cx, cy, 1.5 - stroke / 2)), hose]
