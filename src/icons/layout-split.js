import { rounded } from '../geometry'

// 左右分屏：外框 + 中间竖线
export default ({ radius }) => [rounded([[3, 4], [21, 4], [21, 20], [3, 20]], Math.min(radius, 2.5)), 'M12 4V20']
