import { rounded } from '../geometry'

// 三栏：外框 + 两道竖线，三栏等宽
export default ({ radius }) => [rounded([[3, 4.5], [21, 4.5], [21, 19.5], [3, 19.5]], Math.min(radius, 2.5)), 'M9 4.5V19.5', 'M15 4.5V19.5']
