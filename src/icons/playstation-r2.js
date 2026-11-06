import { triggerRight, text } from '../controller'
import { knock, solid } from '../solid'

// PS 右扳机 R2
export default ({ radius }) => [
  triggerRight,
  ...text('R2', [12, 13]),
]

// 实心：外形填实，挖出按键文字
export const fill = () => [solid(triggerRight), knock(text('R2', [12, 13]))]
