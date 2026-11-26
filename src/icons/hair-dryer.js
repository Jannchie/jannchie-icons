import { circle, rounded } from '../geometry'
import { solid } from '../solid'

// 吹风机（侧视，出风口朝左）：右上一个圆形机身（圆心 (15, 9)、半径 4.5）+ 从机身左侧伸出的短风筒（7.5–，6.5–11.5，
// 两端落在机身圆周上）+ 机身下方往后斜的把手（底 14.5–17.5 在 19.5，两端落在圆周 118° / 72° 处）
// + 风筒口外两道风线。圆机身 + 风筒 + 斜把手 + 吹出的风是吹风机的记号
const [cx, cy, r] = [15, 9, 4.5]
const f = v => +v.toFixed(3)
// 圆周上纵坐标为 y 的左侧点、角度为 deg 的点
const left = y => f(cx - Math.sqrt(r * r - (y - cy) ** 2))
const at = deg => [f(cx + r * Math.cos(deg * Math.PI / 180)), f(cy + r * Math.sin(deg * Math.PI / 180))]
const body = circle(cx, cy, r)
const nozzle = radius => rounded([[left(6.5), 6.5], [7.5, 6.5], [7.5, 11.5], [left(11.5), 11.5]], Math.min(radius, 1), false)
const grip = radius => rounded([at(118), [14.5, 19.5], [17.5, 19.5], at(72)], Math.min(radius, 1.5), false)
const air = ['M2.75 7.5H5', 'M2.75 10.5H5']

export default ({ radius }) => [body, nozzle(radius), grip(radius), ...air]

// 实心：机身、风筒、把手连成一块；风线照旧是线
export const fill = ({ radius }) => [solid([body, `${nozzle(radius)}Z`, `${grip(radius)}Z`]), ...air]
