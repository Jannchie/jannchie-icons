import { ring } from '../marks'
import { cross } from '../symbols'
import { knock, solid } from '../solid'

// 圆圈 + 叉
export default ({ radius }) => [ring(), ...cross([12, 12], 1.6, radius)]

export const fill = ({ radius }) => [solid(ring()), knock(cross([12, 12], 1.6, radius))]
