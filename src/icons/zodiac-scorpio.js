import { ZODIAC } from '../zodiac'

// 黄道十二宫：♏ 天蝎
export default ({ radius }) => ZODIAC.scorpio.paths(Math.min(radius, 1.5))
