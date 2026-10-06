import { ZODIAC } from '../zodiac'

// 黄道十二宫：♎ 天秤
export default ({ radius }) => ZODIAC.libra.paths(Math.min(radius, 1.5))
