import { circle, rounded } from '../geometry'
import { solid } from '../solid'

// 女性人形（同 restroom 里女性的画法，放大成单个人）：没有五官的圆头 + 梯形裙 + 两条腿
// 不画收腰、胯部曲线，也不在两腿之间画分线：只是一个通用的「女性」指示符号
const head = circle(12, 4.25, 1.75)
const dress = radius => rounded([[9.5, 8.5], [14.5, 8.5], [17.5, 16.5], [6.5, 16.5]], Math.min(radius, 1))
// 脚底的外缘固定在 22，线宽变粗往里长
const legs = b => [`M10.5 16.5V${b}`, `M13.5 16.5V${b}`]

export default ({ radius, stroke }) => [head, dress(radius), ...legs(22 - stroke / 2)]

// 实心：头、裙子各一块，腿照旧是线
export const fill = ({ radius, stroke }) => [solid(head), solid(dress(radius)), ...legs(22 - stroke / 2)]
