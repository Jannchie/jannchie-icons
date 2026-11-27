import { rounded } from '../geometry'
import { knock, solid } from '../solid'
import { rotate } from '../transform'

// 锅铲（漏铲）：手柄在右上、铲头在左下的斜 45°（和 whisk 同向）。先竖着画（手柄在上），再顺时针转 45°：
// 圆头的手柄（10.5–13.5 × 0–7）+ 一截细铲颈（12，从 7 到 12）+ 往下略微张开的铲头（顶 8–16、底 7.5–16.5，12–21）+ 铲头上两道竖的漏缝（10.5 / 13.5）
// 带漏缝的方铲头是锅铲的记号：和 knife（刀身）、brush（刷毛）、shovel（尖头铁锹）区分开
const tilt = d => rotate(d, 45)
const grip = radius => tilt(rounded([[10.5, 0], [13.5, 0], [13.5, 7], [10.5, 7]], Math.min(radius, 1.5)))
const head = radius => tilt(rounded([[8, 12, 1], [16, 12, 1], [16.5, 21], [7.5, 21]], Math.min(radius, 1.5)))
const slots = ['M10.5 14.5V18.5', 'M13.5 14.5V18.5'].map(tilt)
const neck = tilt('M12 7V12')

export default ({ radius }) => [grip(radius), head(radius), ...slots, neck]

// 实心：手柄、铲头各一块，漏缝挖空；铲颈照旧是线
export const fill = ({ radius }) => [solid([grip(radius), head(radius)]), knock(slots), neck]
