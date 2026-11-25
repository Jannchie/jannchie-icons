import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 领带：顶上的领带结（9.5–14.5 收到 10.5–13.5，3.5–7.5）+ 往下渐宽的带身（最宽 8–16 在 17.5）+ 底下的尖角（到 21.25）；
// 一条闭合轮廓，领带结底下一道横线把结和带身分开
const shape = radius => rounded([[9.5, 3.5], [14.5, 3.5], [13.5, 7.5, 0], [16, 17.5], [12, 21.25], [8, 17.5], [10.5, 7.5, 0]], Math.min(radius, 1))
const knot = 'M10.5 7.5H13.5'

export default ({ radius }) => [shape(radius), knot]

// 实心：领带一块，领带结底下的横线整条挖穿
export const fill = ({ radius }) => [solid(shape(radius)), knock('M8 7.5H16')]
