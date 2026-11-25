import { rounded } from '../geometry'
import { solid } from '../solid'

// 油漆滚筒：顶上横着的滚筒（3.5–17.5 × 3.5–9.5）+ 从滚筒右端绕下来的支架（往右到 20.5，往下到 12.5，折回正中 12.5，再往下接手柄）
// + 底下的手柄（10.5–14.5 × 15.5–20.5）
const roller = radius => rounded([[3.5, 3.5], [17.5, 3.5], [17.5, 9.5], [3.5, 9.5]], Math.min(radius, 2))
const frame = radius => rounded([[17.5, 6.5], [20.5, 6.5], [20.5, 12.5], [12.5, 12.5], [12.5, 15.5]], Math.min(radius, 1), false)
const grip = radius => rounded([[10.5, 15.5], [14.5, 15.5], [14.5, 20.5], [10.5, 20.5]], Math.min(radius, 1.5))

export default ({ radius }) => [roller(radius), frame(radius), grip(radius)]

// 实心：滚筒、手柄各一块；支架照旧是线
export const fill = ({ radius }) => [solid([roller(radius), grip(radius)]), frame(radius)]
