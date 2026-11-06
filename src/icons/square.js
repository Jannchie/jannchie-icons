import { ring, square } from '../marks'
import { solid } from '../solid'

// 方块
export default ({ radius, stroke }) => [
  square(radius),
]

export const fill = ({ radius }) => [solid(square(radius))]
