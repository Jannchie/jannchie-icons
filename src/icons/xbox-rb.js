import { bumperRight, text } from '../controller'
import { knock, solid } from '../solid'

// Xbox 右肩键 RB
export default ({ radius }) => [
  bumperRight,
  ...text('RB', [12, 12.75]),
]

// 实心：外形填实，挖出按键文字
export const fill = () => [solid(bumperRight), knock(text('RB', [12, 12.75]))]
