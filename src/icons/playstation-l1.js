import { bumperLeft, text } from '../controller'
import { knock, solid } from '../solid'

// PS 左肩键 L1
export default ({ radius }) => [
  bumperLeft,
  ...text('L1', [12, 12.75]),
]

// 实心：外形填实，挖出按键文字
export const fill = () => [solid(bumperLeft), knock(text('L1', [12, 12.75]))]
