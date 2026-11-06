import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 左右分屏：外框 + 中间竖线（竖线落在 12 上）
export default ({ radius }) => [rounded([[3, 4.5], [21, 4.5], [21, 19.5], [3, 19.5]], Math.min(radius, 2.5)), 'M12 4.5V19.5']

// 实心：外框填实，中间竖线挖开，分成左右两块
export const fill = ({ radius }) => [solid(rounded([[3, 4.5], [21, 4.5], [21, 19.5], [3, 19.5]], Math.min(radius, 2.5))), knock('M12 4.5V19.5')]
