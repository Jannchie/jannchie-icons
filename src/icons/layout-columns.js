import { rounded } from '../geometry'

// 三栏：外框 + 两道竖线（三栏等宽又要都落在 .5 上，外框整体右移半格）
export default ({ radius }) => [rounded([[3.5, 4.5], [21.5, 4.5], [21.5, 19.5], [3.5, 19.5]], Math.min(radius, 2.5)), 'M9.5 4.5V19.5', 'M15.5 4.5V19.5']
