import { rounded } from '../geometry'

// 底部面板：外框 + 下方横线
export default ({ radius }) => [rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], Math.min(radius, 2.5)), 'M3.5 15.5H20.5']
