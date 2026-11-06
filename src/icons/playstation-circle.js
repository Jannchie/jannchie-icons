import { ring } from '../marks'
import { circle } from '../geometry'
import { knock, solid } from '../solid'

// PS 面键 ○：圆圈 + 小圆
export default ({ radius }) => [
  ring(),
  circle(12, 12, 4),
]

// 实心：圆片上挖出小圆
export const fill = () => [solid(ring()), knock(circle(12, 12, 4))]
