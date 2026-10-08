import { bumperLeft, text } from '../controller'

// PS 左肩键 L1
export default ({ radius }) => [
  bumperLeft,
  ...text('L1', [12, 12.75]),
]
