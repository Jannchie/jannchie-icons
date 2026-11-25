import { rounded } from '../geometry'
import { solid } from '../solid'

// 薯条：上宽下窄的纸盒（6–18 收到 7.5–16.5，11.5–20.5）+ 从盒口竖直冒出来的四根薯条（间距 3，高矮错落，最高到 3.5）
const box = radius => rounded([[6, 11.5, 0], [18, 11.5, 0], [16.5, 20.5], [7.5, 20.5]], Math.min(radius, 1.5))
const fries = [[7.5, 6.5], [10.5, 3.5], [13.5, 4.5], [16.5, 7.5]].map(([x, top]) => `M${x} 11.5V${top}`)

export default ({ radius }) => [box(radius), ...fries]

// 实心：纸盒一块；薯条照旧是线
export const fill = ({ radius }) => [solid(box(radius)), ...fries]
