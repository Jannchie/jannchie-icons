import { rounded } from '../geometry'

// 上下分屏：外框 + 中间横线（外框高 16：4–20，横线落在 12 上），和左右分屏 layout-split 成对
export default ({ radius }) => [rounded([[3, 4], [21, 4], [21, 20], [3, 20]], Math.min(radius, 2.5)), 'M3 12H21']
