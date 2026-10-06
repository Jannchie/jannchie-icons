import { BRANCHES } from '../branches'

// 地支：未
export default ({ radius }) => BRANCHES.wei.paths(Math.min(radius, 1.5))
