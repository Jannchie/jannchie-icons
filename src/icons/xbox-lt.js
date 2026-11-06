import { triggerLeft, text } from '../controller'
import { knock, solid } from '../solid'

// Xbox 左扳机 LT
export default ({ radius }) => [
  triggerLeft,
  ...text('LT', [12, 13]),
]

// 实心：外形填实，挖出按键文字
export const fill = () => [solid(triggerLeft), knock(text('LT', [12, 13]))]
