import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 布丁（焦糖布丁）：扣在盘子上的一个上窄下宽的梯形（顶 7.25–16.75 在 4.5，底 4.5–19.5 落在盘子上；顶上两个角是半径 2 的圆角）
// + 从顶上流下来的焦糖：一道横贯布丁的波浪线，中间垂下两滴（两头落在布丁的斜边上）+ 底下一条盘子线（19.5）
// 梯形 + 往下淌的焦糖是布丁的记号：和三层的 cake、带纸托的 cupcake 区分开
const body = rounded([[4.5, 19.5, 0], [7.25, 4.5, 2], [16.75, 4.5, 2], [19.5, 19.5, 0]], 2, false)
const DRIP = 'C7.25 10.5 9.5 10.75 10 8.75C10.4 7.5 12 7.5 12.25 9C12.75 12 15.5 12 15.75 9.25C15.9 8 17 7.5 17.4 8'
const caramel = `M6.6 8${DRIP}`
const plate = 'M2.5 19.5H21.5'

export default () => [body, caramel, plate]

// 实心：布丁一块，沿焦糖的波浪线整条挖穿（两头接一段横线伸到布丁外），焦糖和布丁身各成一块；盘子照旧是线
export const fill = () => [solid(`${body}Z`), knock(`M4 8H6.6${DRIP}H20`), plate]
