import { bumperRight, text } from '../controller'
import { knock, solid } from '../solid'

// PS 右肩键 R1
export default ({ radius }) => [
  bumperRight,
  ...text('R1', [12, 12.75]),
]

// 实心：外形填实，挖出按键文字
export const fill = () => [solid(bumperRight), knock(text('R1', [12, 12.75]))]
