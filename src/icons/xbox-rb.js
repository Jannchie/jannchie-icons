import { bumperRight, text } from '../controller'

// Xbox 右肩键 RB
export default ({ radius }) => [
  bumperRight,
  ...text('RB', [12, 12.75]),
]
