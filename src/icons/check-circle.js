import { ring } from '../marks'
import { check } from '../symbols'

// 圆圈 + 勾
export default ({ radius }) => [ring(), ...check([12, 12], 1.4, radius)]
