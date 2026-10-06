import { ZODIAC } from '../zodiac'

// 黄道十二宫：♈ 白羊
export default ({ radius }) => ZODIAC.aries.paths(Math.min(radius, 1.5))
