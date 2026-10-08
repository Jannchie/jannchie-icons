import { rounded } from '../geometry'

// 左右分屏：外框 + 中间竖线（竖线落在 12 上）
export default ({ radius }) => [rounded([[3, 4.5], [21, 4.5], [21, 19.5], [3, 19.5]], Math.min(radius, 2.5)), 'M12 4.5V19.5']
