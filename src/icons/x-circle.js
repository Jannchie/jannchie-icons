import { ring } from '../marks'
import { cross } from '../symbols'

// 圆圈 + 叉
export default ({ radius }) => [ring(), ...cross([12, 12], 1.6, radius)]
