import { circle, rounded } from '../geometry'
import { knock, solid } from '../solid'

// 手提音响（收录机）：横长的机身（墨迹 3–21 宽，线宽变粗往里长；上下 8.5–19.5）+ 左右两只喇叭（圆，半径 2.25，带中心点）
// + 机身顶上的提手（方圆的拱，6.5–17.5，顶到 4.5）
const body = (radius, stroke) => {
  const h = stroke / 2
  return rounded([[3 + h, 8.5], [21 - h, 8.5], [21 - h, 19.5], [3 + h, 19.5]], Math.min(radius, 2))
}
const speakers = [circle(8.25, 14, 2.25), circle(15.75, 14, 2.25)]
const handle = radius => rounded([[6.5, 8.5], [6.5, 4.5], [17.5, 4.5], [17.5, 8.5]], Math.min(radius, 2), false)

export default ({ radius, stroke }) => [body(radius, stroke), ...speakers, handle(radius)]

// 实心：机身一块，两只喇叭的圆圈挖空（喇叭留成实心）；提手照旧是线
export const fill = ({ radius, stroke }) => [solid(body(radius, stroke)), knock(speakers), handle(radius)]
