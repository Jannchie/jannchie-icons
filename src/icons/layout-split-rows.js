import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 上下分屏：外框 + 中间横线（外框高 16：4–20，横线落在 12 上），和左右分屏 layout-split 成对
export default ({ radius }) => [rounded([[3, 4], [21, 4], [21, 20], [3, 20]], Math.min(radius, 2.5)), 'M3 12H21']

// 实心：外框填实，中间横线挖开，分成上下两块
export const fill = ({ radius }) => [solid(rounded([[3, 4], [21, 4], [21, 20], [3, 20]], Math.min(radius, 2.5))), knock('M3 12H21')]
