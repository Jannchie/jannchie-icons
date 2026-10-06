import { BRANCHES } from '../branches'

// 地支：寅
export default ({ radius }) => BRANCHES.yin.paths(Math.min(radius, 1.5))
