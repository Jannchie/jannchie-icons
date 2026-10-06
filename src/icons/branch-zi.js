import { BRANCHES } from '../branches'

// 地支：子
export default ({ radius }) => BRANCHES.zi.paths(Math.min(radius, 1.5))
