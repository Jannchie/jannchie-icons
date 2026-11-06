import { rounded } from '../geometry'
import { solid } from '../solid'

// 停止：方块
export default ({ radius }) => [
  rounded([[6.5, 6.5], [17.5, 6.5], [17.5, 17.5], [6.5, 17.5]], radius),
]

export const fill = ({ radius }) => [solid(rounded([[6.5, 6.5], [17.5, 6.5], [17.5, 17.5], [6.5, 17.5]], radius))]
