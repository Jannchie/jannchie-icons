import { square } from '../marks'
import { check } from '../symbols'

// 方框 + 勾
export default ({ radius }) => [square(radius), ...check([12, 12], 1.4, radius)]
