import { BRANCHES } from '../branches'

// 地支：戌
export default ({ radius }) => BRANCHES.xu.paths(Math.min(radius, 1.5))
