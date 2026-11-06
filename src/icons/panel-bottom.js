import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 底部面板：外框 + 下方横线
export default ({ radius }) => [rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], Math.min(radius, 2.5)), 'M3.5 15.5H20.5']

// 实心：外框填实，下方横线挖开，分出底部面板
export const fill = ({ radius }) => [solid(rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], Math.min(radius, 2.5))), knock('M3.5 15.5H20.5')]
