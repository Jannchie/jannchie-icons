import { ZODIAC } from '../zodiac'

// 黄道十二宫：♓ 双鱼
export default ({ radius }) => ZODIAC.pisces.paths(Math.min(radius, 1.5))
