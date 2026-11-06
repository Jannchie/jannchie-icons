import { triggerRight, text } from '../controller'
import { knock, solid } from '../solid'

// Xbox 右扳机 RT
export default ({ radius }) => [
  triggerRight,
  ...text('RT', [12, 13]),
]

// 实心：外形填实，挖出按键文字
export const fill = () => [solid(triggerRight), knock(text('RT', [12, 13]))]
