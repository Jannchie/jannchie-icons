import { triggerLeft, text } from '../controller'

// Xbox 左扳机 LT
export default ({ radius }) => [
  triggerLeft,
  ...text('LT', [12, 13]),
]
