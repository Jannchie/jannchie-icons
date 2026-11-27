import { rounded } from '../geometry'
import { solid } from '../solid'
import { rotate } from '../transform'

// 打蛋器（球形打蛋器）：手柄在右上、钢丝球在左下的斜 45°。先竖着画（手柄在上），再顺时针转 45°：
// 圆头的手柄（10.5–13.5 × 0.25–8.5）+ 从手柄底下张开的两圈钢丝：外面一圈鼓成椭圆的球（最宽 7–17，底到 23.5），里面一圈窄的（最宽 9.75–14.25），两圈在球底汇到一起
// 一圈套一圈的钢丝球是打蛋器的记号：和 brush（刷毛）、broom（扫帚头）区分开
const tilt = d => rotate(d, 45)
const grip = radius => tilt(rounded([[10.5, 0.25], [13.5, 0.25], [13.5, 8.5], [10.5, 8.5]], Math.min(radius, 1.5)))
const wires = [
  'M10.5 8.5C8.5 10 7 13.5 7 17.25C7 20.75 9.25 23.5 12 23.5C14.75 23.5 17 20.75 17 17.25C17 13.5 15.5 10 13.5 8.5',
  'M11.25 8.5C10.25 11 9.75 14 9.75 17.25C9.75 20.75 10.75 23.5 12 23.5C13.25 23.5 14.25 20.75 14.25 17.25C14.25 14 13.75 11 12.75 8.5',
].map(tilt)

export default ({ radius }) => [grip(radius), ...wires]

// 实心：手柄一块；钢丝照旧是线
export const fill = ({ radius }) => [solid(grip(radius)), ...wires]
