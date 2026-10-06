import { ZODIAC } from '../zodiac'

// 黄道十二宫：♉ 金牛
export default ({ radius }) => ZODIAC.taurus.paths(Math.min(radius, 1.5))
