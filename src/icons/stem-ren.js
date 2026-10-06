import { STEMS } from '../stems'

// 天干：壬
export default ({ radius }) => STEMS.ren.paths(Math.min(radius, 1.5))
