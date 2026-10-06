import { STEMS } from '../stems'

// 天干：甲
export default ({ radius }) => STEMS.jia.paths(Math.min(radius, 1.5))
