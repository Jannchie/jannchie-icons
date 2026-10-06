import { ZODIAC } from '../zodiac'

// 黄道十二宫：♌ 狮子
export default ({ radius }) => ZODIAC.leo.paths(Math.min(radius, 1.5))
