import { bumperLeft, text } from '../controller'
import { knock, solid } from '../solid'

// Xbox 左肩键 LB
export default ({ radius }) => [
  bumperLeft,
  ...text('LB', [12, 12.75]),
]

// 实心：外形填实，挖出按键文字
export const fill = () => [solid(bumperLeft), knock(text('LB', [12, 12.75]))]
