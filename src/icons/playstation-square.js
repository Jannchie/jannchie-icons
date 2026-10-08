import { ring } from '../marks'
import { rounded } from '../geometry'

// PS 面键 □：圆圈 + 小方块
export default ({ radius }) => [
  ring(),
  rounded([[8.5, 8.5], [15.5, 8.5], [15.5, 15.5], [8.5, 15.5]], Math.min(radius, 1)),
]
