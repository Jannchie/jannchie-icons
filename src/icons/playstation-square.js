import { ring } from '../marks'
import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// PS 面键 □：圆圈 + 小方块
export default ({ radius }) => [
  ring(),
  rounded([[8.5, 8.5], [15.5, 8.5], [15.5, 15.5], [8.5, 15.5]], Math.min(radius, 1)),
]

// 实心：圆片上挖出小方块
export const fill = ({ radius }) => [solid(ring()), knock(rounded([[8.5, 8.5], [15.5, 8.5], [15.5, 15.5], [8.5, 15.5]], Math.min(radius, 1)))]
