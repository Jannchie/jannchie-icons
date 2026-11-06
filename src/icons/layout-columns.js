import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 三栏：外框 + 两道竖线，三栏等宽
export default ({ radius }) => [rounded([[3, 4.5], [21, 4.5], [21, 19.5], [3, 19.5]], Math.min(radius, 2.5)), 'M9 4.5V19.5', 'M15 4.5V19.5']

// 实心：外框填实，两道竖线挖开，分成三栏
export const fill = ({ radius }) => [solid(rounded([[3, 4.5], [21, 4.5], [21, 19.5], [3, 19.5]], Math.min(radius, 2.5))), knock(['M9 4.5V19.5', 'M15 4.5V19.5'])]
