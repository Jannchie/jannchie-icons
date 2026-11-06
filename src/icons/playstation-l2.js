import { triggerLeft, text } from '../controller'
import { knock, solid } from '../solid'

// PS 左扳机 L2
export default ({ radius }) => [
  triggerLeft,
  ...text('L2', [12, 13]),
]

// 实心：外形填实，挖出按键文字
export const fill = () => [solid(triggerLeft), knock(text('L2', [12, 13]))]
