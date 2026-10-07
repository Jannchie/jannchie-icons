import { rounded } from '../geometry'

// 左右分屏：外框 + 中间竖线（外框整体右移半格，竖线落在 12.5 上）
export default ({ radius }) => [rounded([[3.5, 4.5], [21.5, 4.5], [21.5, 19.5], [3.5, 19.5]], Math.min(radius, 2.5)), 'M12.5 4.5V19.5']
