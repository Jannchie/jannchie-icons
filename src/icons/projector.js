import { circle, rounded } from '../geometry'
import { knock, solid } from '../solid'

// 投影仪（正面）：扁长的机身（墨迹 3–21 宽，线宽变粗往里长；上下 7.5–17.5）+ 左边一只大镜头（圆心 (9, 12.5)、半径 2.75）
// + 右边两道散热格栅（11.5 / 13.5）+ 机身底下两只脚
const body = (radius, stroke) => {
  const h = stroke / 2
  return rounded([[3 + h, 7.5], [21 - h, 7.5], [21 - h, 17.5], [3 + h, 17.5]], Math.min(radius, 2))
}
const lens = circle(9, 12.5, 2.75)
const vents = ['M14.5 11.5H18', 'M14.5 13.5H18']
const feet = ['M6.5 17.5V19.5', 'M17.5 17.5V19.5']

export default ({ radius, stroke }) => [body(radius, stroke), lens, ...vents, ...feet]

// 实心：机身一块，镜头的圆圈和格栅挖空（镜头留成实心）；两只脚照旧是线
export const fill = ({ radius, stroke }) => [solid(body(radius, stroke)), knock([lens, ...vents]), ...feet]
