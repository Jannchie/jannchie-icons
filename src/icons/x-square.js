import { square } from '../marks'
import { cross } from '../symbols'

// 方框 + 叉
export default ({ radius }) => [square(radius), ...cross([12, 12], 1.6, radius)]
