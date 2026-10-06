import { BRANCHES } from '../branches'

// 地支：辰
export default ({ radius }) => BRANCHES.chen.paths(Math.min(radius, 1.5))
