import { BRANCHES } from '../branches'

// 地支：卯
export default ({ radius }) => BRANCHES.mao.paths(Math.min(radius, 1.5))
