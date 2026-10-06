import { ZODIAC } from '../zodiac'

// 黄道十二宫：♑ 摩羯
export default ({ radius }) => ZODIAC.capricorn.paths(Math.min(radius, 1.5))
