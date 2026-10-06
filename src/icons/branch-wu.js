import { BRANCHES } from '../branches'

// 地支：午
export default ({ radius }) => BRANCHES.wu.paths(Math.min(radius, 1.5))
