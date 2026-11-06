import { ring } from '../marks'
import { check } from '../symbols'
import { knock, solid } from '../solid'

// 圆圈 + 勾
export default ({ radius }) => [ring(), ...check([12, 12], 1.4, radius)]

// 实心：圆片上挖出勾
export const fill = ({ radius }) => [solid(ring()), knock(check([12, 12], 1.4, radius))]
