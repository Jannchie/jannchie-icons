import { bumperLeft, text } from '../controller'

// Xbox 左肩键 LB
export default ({ radius }) => [
  bumperLeft,
  ...text('LB', [12, 12.75]),
]
