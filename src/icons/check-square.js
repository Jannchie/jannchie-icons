import { square } from '../marks'
import { check } from '../symbols'
import { knock, solid } from '../solid'

// 方框 + 勾
export default ({ radius }) => [square(radius), ...check([12, 12], 1.4, radius)]

export const fill = ({ radius }) => [solid(square(radius)), knock(check([12, 12], 1.4, radius))]
