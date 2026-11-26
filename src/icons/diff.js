import { frame } from '../geometry'
import { knock, solid } from '../solid'

// 代码差异（diff）：上下两条圆角行带（墨迹 3–21 × 3–11 和 3–21 × 13–21，中间隔 2，线宽变粗往里长），
// 上面一条是删掉的行：左边一个 −、右边一段行线；下面一条是加上的行：左边一个 +、右边一段行线；符号和行线都用细线（thin），符号臂长只有 1（粗字重下 + 的竖画离带子内缘还留 0.3）
// 「整行被框出来的 − / + 行」是 diff 视图的记号：和不带框的 plus-minus（±）、加减号列表 plus-list / minus-list、左右分屏的 compare 区分开
const bands = (radius, stroke) => [frame(stroke, Math.min(radius, 2), [3, 3, 21, 11]), frame(stroke, Math.min(radius, 2), [3, 13, 21, 21])]
const marks = [
  'M7 7H9',
  'M12 7H17.5',
  'M7 17H9',
  'M8 16V18',
  'M12 17H17.5',
].map(d => ({ d, thin: true }))

export default ({ radius, stroke }) => [...bands(radius, stroke), ...marks]

// 实心：两条带子各一块，符号和行线挖空
export const fill = ({ radius, stroke }) => [solid(bands(radius, stroke)), knock(marks)]
