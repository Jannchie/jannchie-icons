import { BRANCHES } from '../branches'

// 地支：丑
export default ({ radius }) => BRANCHES.chou.paths(Math.min(radius, 1.5))
