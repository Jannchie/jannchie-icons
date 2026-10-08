import { rounded } from '../geometry'

// 三行：外框（和 layout-columns 同一个 3–21 × 4.5–19.5）+ 两道横线，三行等高
export default ({ radius }) => [rounded([[3, 4.5], [21, 4.5], [21, 19.5], [3, 19.5]], Math.min(radius, 2.5)), 'M3 9.5H21', 'M3 14.5H21']
