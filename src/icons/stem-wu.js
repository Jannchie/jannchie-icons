import { STEMS } from '../stems'

// 天干：戊
export default ({ radius }) => STEMS.wu.paths(Math.min(radius, 1.5))
