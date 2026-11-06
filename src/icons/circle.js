import { ring, square } from '../marks'
import { solid } from '../solid'

// 圆
export default ({ radius, stroke }) => [
  ring(),
]

export const fill = () => [solid(ring())]
