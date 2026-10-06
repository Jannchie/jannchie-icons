import { STEMS } from '../stems'

// 天干：辛
export default ({ radius }) => STEMS.xin.paths(Math.min(radius, 1.5))
