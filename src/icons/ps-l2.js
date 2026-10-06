import { triggerLeft, text } from '../controller'

// PS 左扳机 L2
export default ({ radius }) => [
  triggerLeft,
  ...text('L2', [12, 13]),
]
