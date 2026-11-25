import { circle, rounded } from '../geometry'
import { solid } from '../solid'

// 无痕（隐身）：一顶宽檐帽压在一副圆眼镜上——帽身是上窄下宽的梯形（顶角圆润），帽檐是一道横线（3–21 在 10.5）；
// 帽檐下两片圆镜片（圆心 y = 16.5、半径 3）+ 中间一道鼻梁弧（两头落在镜片内上侧 −25° 的位置，沿径向接上去，和镜框垂直）
const crown = radius => rounded([[7, 10.5], [8.5, 4.5], [15.5, 4.5], [17, 10.5]], Math.min(radius, 1.5), false)
const brim = 'M3 10.5H21'
const lenses = [circle(7.5, 16.5, 3), circle(16.5, 16.5, 3)]
const bridge = 'M10.219 15.232A4.213 4.213 0 0 1 13.781 15.232'

export default ({ radius }) => [crown(radius), brim, ...lenses, bridge]

// 实心：帽身（底边封口）、两片镜片各一块；帽檐、鼻梁照旧是线
export const fill = ({ radius }) => [solid([`${crown(radius)}Z`, ...lenses]), brim, bridge]
