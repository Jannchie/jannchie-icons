import { square } from '../marks'
import { knock, solid } from '../solid'
import { cross } from '../symbols'

// 方框 + 叉
export default ({ radius }) => [square(radius), ...cross([12, 12], 1.6, radius)]

// 实心：方块一块，挖掉叉
export const fill = ({ radius }) => [solid(square(radius)), knock(cross([12, 12], 1.6, radius))]
