import { ZODIAC } from '../zodiac'

// 黄道十二宫：♍ 处女
export default ({ radius }) => ZODIAC.virgo.paths(Math.min(radius, 1.5))
