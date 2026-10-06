import { bumperRight, text } from '../controller'

// PS 右肩键 R1
export default ({ radius }) => [
  bumperRight,
  ...text('R1', [12, 12.75]),
]
