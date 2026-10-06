import { BRANCHES } from '../branches'

// 地支：酉
export default ({ radius }) => BRANCHES.you.paths(Math.min(radius, 1.5))
