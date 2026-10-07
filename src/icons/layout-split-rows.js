import { rounded } from '../geometry'

// 上下分屏：外框 + 中间横线（外框高 16：4.5–20.5，横线落在 12.5 上），和左右分屏 layout-split 成对
export default ({ radius }) => [rounded([[3.5, 4.5], [21.5, 4.5], [21.5, 20.5], [3.5, 20.5]], Math.min(radius, 2.5)), 'M3.5 12.5H21.5']
