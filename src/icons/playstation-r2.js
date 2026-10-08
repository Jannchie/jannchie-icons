import { triggerRight, text } from '../controller'

// PS 右扳机 R2
export default ({ radius }) => [
  triggerRight,
  ...text('R2', [12, 13]),
]
