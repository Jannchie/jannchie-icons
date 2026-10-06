import { BRANCHES } from '../branches'

// 地支：亥
export default ({ radius }) => BRANCHES.hai.paths(Math.min(radius, 1.5))
