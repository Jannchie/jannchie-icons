import { circle } from '../geometry'
import { knock, solid } from '../solid'

// Hugging Face 任务：任意到任意（全模态）。圆环里一个星号：通配符 *，表示「什么都行」——任何模态进、任何模态出
// 库里的 asterisk 只有星号、没有圆环
// 圆环外缘 3–21（线宽变粗时往里长）；星号三道线过圆心，各长 9（竖的一道 + 两道 ±60° 的），连线帽离圆环内缘 2.25
const ring = stroke => `${circle(12, 12, 9 - stroke / 2)}Z`
const [dx, dy] = [+(4.5 * Math.cos(Math.PI / 6)).toFixed(3), 2.25]
const asterisk = ['M12 7.5V16.5', `M${12 - dx} ${12 - dy}L${12 + dx} ${12 + dy}`, `M${12 - dx} ${12 + dy}L${12 + dx} ${12 - dy}`]

export default ({ stroke }) => [ring(stroke), ...asterisk]

// 实心：圆一块，星号挖空
export const fill = ({ stroke }) => [solid(ring(stroke)), knock(asterisk)]
