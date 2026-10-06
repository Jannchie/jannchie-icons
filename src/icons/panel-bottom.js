import { rounded } from '../geometry'

// 底部面板：外框 + 下方横线
export default ({ radius }) => [rounded([[3, 4], [21, 4], [21, 20], [3, 20]], Math.min(radius, 2.5)), 'M3 15H21']
