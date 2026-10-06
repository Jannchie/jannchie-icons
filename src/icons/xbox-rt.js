import { triggerRight, text } from '../controller'

// Xbox 右扳机 RT
export default ({ radius }) => [
  triggerRight,
  ...text('RT', [12, 13]),
]
