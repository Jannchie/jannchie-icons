import { rounded } from '../geometry'

// 三行：外框（和 layout-columns 同一个 3.5–21.5 × 4.5–19.5）+ 两道横线，三行等高
export default ({ radius }) => [rounded([[3.5, 4.5], [21.5, 4.5], [21.5, 19.5], [3.5, 19.5]], Math.min(radius, 2.5)), 'M3.5 9.5H21.5', 'M3.5 14.5H21.5']
