import { GAP } from '../clearance'
import { circle } from '../geometry'
import { clear, knock, solid } from '../solid'

// 珍珠：张开的贝壳里一颗珍珠。上面那片壳立着，是一把扇子——五个扇贝边（端点在半径 8.6 的圆上，圆心 (12, 13.5)），四道从凹口往中心收的放射线；
// 下面那片壳是一个光滑的浅碗（到 21.25）；两片壳在 13.5 这条线上分开，珍珠（半径 2.5）坐在正中
// 扇贝边和放射线是为了和「圆 + 横线 + 中间一个圆」的精灵球区分开
const [CX, CY, R, BUMP] = [12, 13.5, 8.6, 3]
const at = (deg, r = R) => `${+(CX + r * Math.cos(deg * Math.PI / 180)).toFixed(3)} ${+(CY - r * Math.sin(deg * Math.PI / 180)).toFixed(3)}`
const fan = `M${at(180)}${[144, 108, 72, 36, 0].map(a => `A${BUMP} ${BUMP} 0 0 1 ${at(a)}`).join('')}`
const ribs = [144, 108, 72, 36].map(a => `M${at(a, 5.25)}L${at(a)}`)
const bowl = `M${at(180)}C3.4 18 7.5 21.25 12 21.25C16.5 21.25 20.6 18 20.6 13.5`
const rim = [`M${at(180)}H7`, `M17 13.5H${CX + R}`]
const pearl = circle(CX, CY, 2.5)

export default () => [fan, ...ribs, bowl, ...rim, pearl]

// 实心：上下两片壳各一块，中间那条线挖穿；上片的放射线挖空；珍珠是完整的一块，两片壳沿着它让出 GAP 的缝
export const fill = () => [solid(`${fan}Z`), knock(ribs), solid(`${bowl}Z`), knock('M0 13.5H24'), clear(pearl, GAP), solid(pearl)]
