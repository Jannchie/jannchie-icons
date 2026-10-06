import { BRANCHES } from '../branches'

// 地支：申
export default ({ radius }) => BRANCHES.shen.paths(Math.min(radius, 1.5))
