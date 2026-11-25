import { knock, stacked } from '../solid'
import { rotate } from '../transform'

// 热狗（俯视，斜放：左下到右上）：上下两瓣面包夹着一根长香肠，香肠两头各探出面包 4.5；香肠上一道波浪形的芥末酱（细节线）
// 先横着画（香肠 0.5–23.5 × 9.25–14.75，面包 5–19 × 6–18），再绕画布中心逆时针转 45°。两头探出来的香肠是热狗的记号
const tilt = d => rotate(d, -45, [12, 12])
const sausage = tilt('M3.25 9.25H20.75A2.75 2.75 0 0 1 20.75 14.75H3.25A2.75 2.75 0 0 1 3.25 9.25Z')
// 面包的上下两瓣：各是一道两端落在香肠边上的拱
const TOP = 'M5 9.25C5 7.25 6.5 6 8.5 6H15.5C17.5 6 19 7.25 19 9.25'
const BOTTOM = 'C19 16.75 17.5 18 15.5 18H8.5C6.5 18 5 16.75 5 14.75'
const lips = [tilt(TOP), tilt(`M19 14.75${BOTTOM}`)]
const mustard = { d: tilt('M7 12Q8.25 10.7 9.5 12Q10.75 13.3 12 12Q13.25 10.7 14.5 12Q15.75 13.3 17 12'), detail: true }

export default () => [sausage, ...lips, mustard]

// 实心：面包一整块，香肠在前，面包在香肠四周让出缝；芥末酱挖空
export const fill = () => [...stacked(tilt(`${TOP}V14.75${BOTTOM}Z`), sausage), knock(mustard)]
