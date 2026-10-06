import { rounded } from '../geometry'

// 三栏：外框 + 两道竖线
export default ({ radius }) => [rounded([[3, 4], [21, 4], [21, 20], [3, 20]], Math.min(radius, 2.5)), 'M9 4V20', 'M15 4V20']
