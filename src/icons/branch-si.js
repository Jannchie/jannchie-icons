import { BRANCHES } from '../branches'

// 地支：巳
export default ({ radius }) => BRANCHES.si.paths(Math.min(radius, 1.5))
