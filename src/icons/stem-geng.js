import { STEMS } from '../stems'

// 天干：庚
export default ({ radius }) => STEMS.geng.paths(Math.min(radius, 1.5))
