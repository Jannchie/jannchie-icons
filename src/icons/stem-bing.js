import { STEMS } from '../stems'

// 天干：丙
export default ({ radius }) => STEMS.bing.paths(Math.min(radius, 1.5))
